/**
 * Lesson 20.2 DOUBLE BONUS: Parametric 3D CAD Design -> Watertight ASCII/Binary STL & OBJ + 3D Printability Validator.
 * Pure JavaScript geometry kernel — zero native dependencies, mathematically watertight manifold meshes.
 */

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function normalize(v) {
  const len = Math.hypot(v[0], v[1], v[2]);
  if (len < 1e-12) return [0, 0, 0];
  return [v[0] / len, v[1] / len, v[2] / len];
}

function makeTri(v1, v2, v3) {
  const normal = normalize(cross(sub(v2, v1), sub(v3, v1)));
  return { normal, vertices: [v1, v2, v3] };
}

function polygonSignedArea2D(pts) {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    area += a[0] * b[1] - b[0] * a[1];
  }
  return area / 2;
}

function pointInTri2D(p, a, b, c) {
  const cross2 = (u, v, w) => (v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0]);
  const c1 = cross2(a, b, p);
  const c2 = cross2(b, c, p);
  const c3 = cross2(c, a, p);
  return c1 >= -1e-9 && c2 >= -1e-9 && c3 >= -1e-9;
}

/**
 * Ear-clipping 2D triangulation for simple CCW polygons (boxes, L-brackets, custom profiles).
 */
export function triangulatePolygon2D(rawPoints) {
  const pts = polygonSignedArea2D(rawPoints) >= 0 ? [...rawPoints] : [...rawPoints].reverse();
  const indices = pts.map((_, i) => i);
  const triangles = [];

  let guard = 0;
  while (indices.length > 3 && guard++ < pts.length * pts.length) {
    let clipped = false;
    for (let k = 0; k < indices.length; k++) {
      const iPrev = indices[(k - 1 + indices.length) % indices.length];
      const iCurr = indices[k];
      const iNext = indices[(k + 1) % indices.length];
      const a = pts[iPrev];
      const b = pts[iCurr];
      const c = pts[iNext];
      const crossVal = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
      if (crossVal <= 1e-9) continue; // reflex angle, not an ear

      let containsOther = false;
      for (const idx of indices) {
        if (idx === iPrev || idx === iCurr || idx === iNext) continue;
        if (pointInTri2D(pts[idx], a, b, c)) {
          containsOther = true;
          break;
        }
      }
      if (!containsOther) {
        triangles.push([a, b, c]);
        indices.splice(k, 1);
        clipped = true;
        break;
      }
    }
    if (!clipped) break;
  }

  if (indices.length === 3) {
    triangles.push([pts[indices[0]], pts[indices[1]], pts[indices[2]]]);
  }
  return triangles;
}

/**
 * Extrude any simple CCW 2D XY polygon along +Z from z=0 to z=heightMm.
 * Guarantees outward normals and watertight 2-manifold edge pairing.
 */
function extrudePolygonZ(polygonXY, heightMm) {
  const pts = polygonSignedArea2D(polygonXY) >= 0 ? polygonXY : [...polygonXY].reverse();
  const tris2d = triangulatePolygon2D(pts);
  const triangles = [];

  for (const [a, b, c] of tris2d) {
    // Bottom face z=0 (outward -Z -> CW in XY)
    triangles.push(makeTri([a[0], a[1], 0], [c[0], c[1], 0], [b[0], b[1], 0]));
    // Top face z=heightMm (outward +Z -> CCW in XY)
    triangles.push(makeTri([a[0], a[1], heightMm], [b[0], b[1], heightMm], [c[0], c[1], heightMm]));
  }

  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % pts.length];
    const pBot = [p[0], p[1], 0];
    const qBot = [q[0], q[1], 0];
    const qTop = [q[0], q[1], heightMm];
    const pTop = [p[0], p[1], heightMm];
    triangles.push(makeTri(pBot, qBot, qTop));
    triangles.push(makeTri(pBot, qTop, pTop));
  }
  return triangles;
}

/**
 * Extrude a simple CCW 2D XZ profile along +Y from y=0 to y=depthMm (grounded at zMin=0).
 */
function extrudePolygonY(polygonXZ, depthMm) {
  const pts = polygonSignedArea2D(polygonXZ) >= 0 ? polygonXZ : [...polygonXZ].reverse();
  const tris2d = triangulatePolygon2D(pts);
  const triangles = [];

  for (const [a, b, c] of tris2d) {
    // Front face y=0 (outward -Y -> CCW in XZ because X x Z = -Y)
    triangles.push(makeTri([a[0], 0, a[1]], [b[0], 0, b[1]], [c[0], 0, c[1]]));
    // Back face y=depthMm (outward +Y -> reversed)
    triangles.push(makeTri([a[0], depthMm, a[1]], [c[0], depthMm, c[1]], [b[0], depthMm, b[1]]));
  }

  for (let i = 0; i < pts.length; i++) {
    const p = pts[i];
    const q = pts[(i + 1) % pts.length];
    const pFront = [p[0], 0, p[1]];
    const qFront = [q[0], 0, q[1]];
    const qBack = [q[0], depthMm, q[1]];
    const pBack = [p[0], depthMm, p[1]];
    triangles.push(makeTri(pFront, pBack, qBack));
    triangles.push(makeTri(pFront, qBack, qFront));
  }
  return triangles;
}

/**
 * Build a watertight annular spur gear with central shaft bore hole in XY, z in [0, heightMm].
 */
function buildSpurGearTriangles({
  teeth = 12,
  outerRadiusMm = 24,
  rootRadiusMm = 19,
  boreRadiusMm = 6,
  heightMm = 8,
}) {
  const nTeeth = Math.max(6, Math.round(teeth));
  const samplesPerTooth = 4;
  const totalPts = nTeeth * samplesPerTooth;
  const cx = outerRadiusMm;
  const cy = outerRadiusMm;

  const outerRing = [];
  const innerRing = [];

  for (let k = 0; k < totalPts; k++) {
    const theta = (k / totalPts) * Math.PI * 2;
    const subStep = k % samplesPerTooth;
    const rOut = subStep === 1 || subStep === 2 ? outerRadiusMm : rootRadiusMm;
    outerRing.push([cx + rOut * Math.cos(theta), cy + rOut * Math.sin(theta)]);
    innerRing.push([cx + boreRadiusMm * Math.cos(theta), cy + boreRadiusMm * Math.sin(theta)]);
  }

  const triangles = [];
  for (let k = 0; k < totalPts; k++) {
    const next = (k + 1) % totalPts;
    const i0 = innerRing[k];
    const i1 = innerRing[next];
    const o0 = outerRing[k];
    const o1 = outerRing[next];

    const i0Bot = [i0[0], i0[1], 0];
    const i1Bot = [i1[0], i1[1], 0];
    const o0Bot = [o0[0], o0[1], 0];
    const o1Bot = [o1[0], o1[1], 0];

    const i0Top = [i0[0], i0[1], heightMm];
    const i1Top = [i1[0], i1[1], heightMm];
    const o0Top = [o0[0], o0[1], heightMm];
    const o1Top = [o1[0], o1[1], heightMm];

    // Top ring (+Z)
    triangles.push(makeTri(i0Top, o0Top, o1Top));
    triangles.push(makeTri(i0Top, o1Top, i1Top));
    // Bottom ring (-Z)
    triangles.push(makeTri(o0Bot, i0Bot, i1Bot));
    triangles.push(makeTri(o0Bot, i1Bot, o1Bot));
    // Outer tooth perimeter
    triangles.push(makeTri(o0Bot, o1Bot, o1Top));
    triangles.push(makeTri(o0Bot, o1Top, o0Top));
    // Inner bore perimeter (outward normal faces inward toward center hole)
    triangles.push(makeTri(i1Bot, i0Bot, i0Top));
    triangles.push(makeTri(i1Bot, i0Top, i1Top));
  }

  return triangles;
}

export function computeMeshMetrics(triangles) {
  let xMin = Infinity;
  let yMin = Infinity;
  let zMin = Infinity;
  let xMax = -Infinity;
  let yMax = -Infinity;
  let zMax = -Infinity;
  let signedVolume = 0;

  const key = (v) =>
    `${Math.round(v[0] * 1000)},${Math.round(v[1] * 1000)},${Math.round(v[2] * 1000)}`;
  const directedEdges = new Map();
  let invalidNormals = 0;

  for (const tri of triangles) {
    const [a, b, c] = tri.vertices;
    for (const v of [a, b, c]) {
      xMin = Math.min(xMin, v[0]);
      yMin = Math.min(yMin, v[1]);
      zMin = Math.min(zMin, v[2]);
      xMax = Math.max(xMax, v[0]);
      yMax = Math.max(yMax, v[1]);
      zMax = Math.max(zMax, v[2]);
    }

    const nLen = Math.hypot(tri.normal[0], tri.normal[1], tri.normal[2]);
    const geomNormal = normalize(cross(sub(b, a), sub(c, a)));
    if (nLen < 0.99 || nLen > 1.01 || dot(tri.normal, geomNormal) < 0.99) {
      invalidNormals += 1;
    }

    // Divergence theorem signed volume: (1/6) * sum(a . (b x c))
    signedVolume += dot(a, cross(b, c)) / 6;

    const verts = [key(a), key(b), key(c)];
    for (let i = 0; i < 3; i++) {
      const u = verts[i];
      const v = verts[(i + 1) % 3];
      const edgeKey = `${u}->${v}`;
      directedEdges.set(edgeKey, (directedEdges.get(edgeKey) || 0) + 1);
    }
  }

  let nakedEdges = 0;
  let nonManifoldEdges = 0;
  for (const [edgeKey, count] of directedEdges.entries()) {
    if (count > 1) nonManifoldEdges += count - 1;
    const [u, v] = edgeKey.split('->');
    const twin = `${v}->${u}`;
    if ((directedEdges.get(twin) || 0) !== 1) {
      nakedEdges += 1;
    }
  }

  return {
    triangleCount: triangles.length,
    bounds: {
      xMin,
      yMin,
      zMin,
      xMax,
      yMax,
      zMax,
      widthMm: Number((xMax - xMin).toFixed(3)),
      depthMm: Number((yMax - yMin).toFixed(3)),
      heightMm: Number((zMax - zMin).toFixed(3)),
    },
    signedVolumeMm3: Number(signedVolume.toFixed(3)),
    invalidNormals,
    nakedEdges,
    nonManifoldEdges,
    watertight: triangles.length >= 4 && nakedEdges === 0 && nonManifoldEdges === 0,
  };
}

export function generateMeshFromCadSpec(spec = {}) {
  const shape = String(spec.shape || 'box').toLowerCase();
  let triangles;
  let name;
  let minWallMm;
  let openjscadScript;

  if (shape === 'l-bracket') {
    const w = Number(spec.widthMm ?? 50);
    const d = Number(spec.depthMm ?? 30);
    const h = Number(spec.heightMm ?? 40);
    const t = Number(spec.thicknessMm ?? 5);
    if (t <= 0 || t >= w || t >= h || d <= 0) {
      throw new RangeError('Invalid L-bracket dimensions');
    }
    name = 'l_bracket';
    minWallMm = Math.min(t, d);
    triangles = extrudePolygonY(
      [
        [0, 0],
        [w, 0],
        [w, t],
        [t, t],
        [t, h],
        [0, h],
      ],
      d
    );
    openjscadScript = `const main = () => extrudeLinear({ height: ${d} }, polygon({ points: [[0,0],[${w},0],[${w},${t}],[${t},${t}],[${t},${h}],[0,${h}]] }));`;
  } else if (shape === 'spur-gear') {
    const teeth = Number(spec.teeth ?? 12);
    const outerRadiusMm = Number(spec.outerRadiusMm ?? 24);
    const rootRadiusMm = Number(spec.rootRadiusMm ?? 19);
    const boreRadiusMm = Number(spec.boreRadiusMm ?? 6);
    const heightMm = Number(spec.heightMm ?? 8);
    if (boreRadiusMm <= 0 || rootRadiusMm <= boreRadiusMm + 1.2 || outerRadiusMm <= rootRadiusMm) {
      throw new RangeError('Invalid spur-gear radii (must keep >= 1.2mm ring wall)');
    }
    name = `spur_gear_${teeth}t`;
    minWallMm = Number(Math.min(rootRadiusMm - boreRadiusMm, heightMm).toFixed(3));
    triangles = buildSpurGearTriangles({ teeth, outerRadiusMm, rootRadiusMm, boreRadiusMm, heightMm });
    openjscadScript = `const main = () => subtract(extrudeLinear({ height: ${heightMm} }, gear({ teeth: ${teeth}, outerR: ${outerRadiusMm}, rootR: ${rootRadiusMm} })), cylinder({ radius: ${boreRadiusMm}, height: ${heightMm} }));`;
  } else {
    const w = Number(spec.widthMm ?? 40);
    const d = Number(spec.depthMm ?? 30);
    const h = Number(spec.heightMm ?? 20);
    if (w <= 0 || d <= 0 || h <= 0) {
      throw new RangeError('Box dimensions must be positive');
    }
    name = 'parametric_box';
    minWallMm = Math.min(w, d, h);
    triangles = extrudePolygonZ(
      [
        [0, 0],
        [w, 0],
        [w, d],
        [0, d],
      ],
      h
    );
    openjscadScript = `const main = () => cuboid({ size: [${w}, ${d}, ${h}], center: [${w / 2}, ${d / 2}, ${h / 2}] });`;
  }

  const metrics = computeMeshMetrics(triangles);
  return {
    name,
    shape,
    spec,
    minWallMm,
    openjscadScript,
    triangles,
    ...metrics,
  };
}

export function exportAsciiStl(mesh) {
  const lines = [`solid ${mesh.name}`];
  for (const tri of mesh.triangles) {
    lines.push(
      `  facet normal ${tri.normal[0].toFixed(6)} ${tri.normal[1].toFixed(6)} ${tri.normal[2].toFixed(6)}`
    );
    lines.push('    outer loop');
    for (const v of tri.vertices) {
      lines.push(`      vertex ${v[0].toFixed(6)} ${v[1].toFixed(6)} ${v[2].toFixed(6)}`);
    }
    lines.push('    endloop');
    lines.push('  endfacet');
  }
  lines.push(`endsolid ${mesh.name}`);
  return `${lines.join('\n')}\n`;
}

export function exportBinaryStl(mesh) {
  const count = mesh.triangles.length;
  const buf = Buffer.alloc(84 + count * 50);
  buf.write(`JavaScript-First CAD STL: ${mesh.name}`.slice(0, 79), 0, 'ascii');
  buf.writeUInt32LE(count, 80);

  let offset = 84;
  for (const tri of mesh.triangles) {
    for (let i = 0; i < 3; i++) {
      buf.writeFloatLE(tri.normal[i], offset);
      offset += 4;
    }
    for (const v of tri.vertices) {
      for (let i = 0; i < 3; i++) {
        buf.writeFloatLE(v[i], offset);
        offset += 4;
      }
    }
    buf.writeUInt16LE(0, offset);
    offset += 2;
  }
  return buf;
}

export function exportWavefrontObj(mesh) {
  const lines = [`# JavaScript-First Parametric CAD OBJ (${mesh.name})`, `o ${mesh.name}`];
  const vertMap = new Map();
  let nextVert = 1;
  const faces = [];

  for (let i = 0; i < mesh.triangles.length; i++) {
    const tri = mesh.triangles[i];
    lines.push(`vn ${tri.normal[0].toFixed(6)} ${tri.normal[1].toFixed(6)} ${tri.normal[2].toFixed(6)}`);
    const vnIdx = i + 1;
    const refs = [];
    for (const v of tri.vertices) {
      const k = `${v[0].toFixed(4)},${v[1].toFixed(4)},${v[2].toFixed(4)}`;
      if (!vertMap.has(k)) {
        vertMap.set(k, nextVert++);
        lines.push(`v ${v[0].toFixed(6)} ${v[1].toFixed(6)} ${v[2].toFixed(6)}`);
      }
      refs.push(`${vertMap.get(k)}//${vnIdx}`);
    }
    faces.push(`f ${refs.join(' ')}`);
  }
  return `${[...lines, ...faces].join('\n')}\n`;
}

export function validateMeshForPrint(
  mesh,
  { bedWidthMm = 220, bedDepthMm = 220, bedHeightMm = 250, minWallThresholdMm = 1.2 } = {}
) {
  const { bounds, watertight, signedVolumeMm3, invalidNormals, minWallMm, triangleCount } = mesh;
  const fitsBuildPlate =
    bounds.widthMm <= bedWidthMm &&
    bounds.depthMm <= bedDepthMm &&
    bounds.heightMm <= bedHeightMm;
  const grounded = Math.abs(bounds.zMin) <= 1e-3;
  const wallOk = minWallMm >= minWallThresholdMm;
  const positiveVolume = signedVolumeMm3 > 0;
  const normalsOk = invalidNormals === 0;

  const issues = [];
  if (!watertight) issues.push(`Mesh is not watertight (nakedEdges=${mesh.nakedEdges})`);
  if (!positiveVolume) issues.push('Signed volume must be positive (inverted face normals)');
  if (!normalsOk) issues.push(`${invalidNormals} triangles have invalid normals`);
  if (!fitsBuildPlate) {
    issues.push(
      `Part ${bounds.widthMm}x${bounds.depthMm}x${bounds.heightMm}mm exceeds ${bedWidthMm}x${bedDepthMm}x${bedHeightMm}mm build plate`
    );
  }
  if (!grounded) issues.push(`Part zMin=${bounds.zMin}mm is floating off the print bed`);
  if (!wallOk) issues.push(`Min wall thickness ${minWallMm}mm < ${minWallThresholdMm}mm (3 perimeters @ 0.4mm nozzle)`);

  const volumeCm3 = Math.max(0.1, signedVolumeMm3 / 1000);
  const estimatedFilamentGrams = Number((volumeCm3 * 0.45 * 1.24).toFixed(1)); // ~20% infill + shells PLA 1.24g/cm3
  const estimatedPrintMinutes = Math.max(8, Math.round(volumeCm3 * 3.2 + bounds.heightMm * 0.6));

  return {
    printable: issues.length === 0,
    triangleCount,
    watertight,
    positiveVolume,
    normalsOk,
    fitsBuildPlate,
    grounded,
    wallOk,
    issues,
    slicerChecklist: {
      slicerTargets: ['PrusaSlicer', 'UltiMaker Cura'],
      material: 'PLA',
      nozzleMm: 0.4,
      layerHeightMm: 0.2,
      infillPercent: 20,
      nozzleTempC: 205,
      bedTempC: 60,
      adhesion: bounds.widthMm < 20 ? 'Brim (5mm)' : 'Skirt',
      estimatedFilamentGrams,
      estimatedPrintMinutes,
    },
  };
}

/**
 * Extract structured CAD specification from a natural-language user prompt or LLM JSON reply.
 */
export function parseCadSpecFromPrompt(promptText) {
  const raw = String(promptText || '');
  const jsonMatch = raw.match(/\{[\s\S]*"shape"\s*:[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed && parsed.shape) return parsed;
    } catch {
      // fall through to natural language parser
    }
  }

  const lower = raw.toLowerCase();
  const nums = (raw.match(/\d+(?:\.\d+)?/g) || []).map(Number);

  if (lower.includes('gear')) {
    return {
      shape: 'spur-gear',
      teeth: nums[0] && nums[0] >= 6 && nums[0] <= 48 ? Math.round(nums[0]) : 12,
      outerRadiusMm: nums[1] && nums[1] >= 10 ? nums[1] : 24,
      rootRadiusMm: nums[1] && nums[1] >= 10 ? Math.max(8, nums[1] - 5) : 19,
      boreRadiusMm: 6,
      heightMm: nums[2] && nums[2] >= 2 ? nums[2] : 8,
    };
  }
  if (lower.includes('bracket') || lower.includes('l-bracket')) {
    return {
      shape: 'l-bracket',
      widthMm: nums[0] || 50,
      depthMm: nums[1] || 30,
      heightMm: nums[2] || 40,
      thicknessMm: nums[3] || 5,
    };
  }
  return {
    shape: 'box',
    widthMm: nums[0] || 40,
    depthMm: nums[1] || 30,
    heightMm: nums[2] || 20,
  };
}
