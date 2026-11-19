/**
 * Lesson 17.2 Reference Module:
 * Zero-Dependency WebAssembly (.wasm) Binary Emitter & Inspector (AZ CTE Stds 4.0, 11.6)
 *
 * Constructs genuine, spec-compliant WASM binaries directly in JavaScript Uint8Array
 * without requiring external wat2wasm / emcc / wasm-pack binaries.
 */

export const WASM_MAGIC = [0x00, 0x61, 0x73, 0x6d]; // "\0asm"
export const WASM_VERSION = [0x01, 0x00, 0x00, 0x00]; // v1 little-endian

export const VALTYPE = {
  i32: 0x7f,
  i64: 0x7e,
  f32: 0x7d,
  f64: 0x7c,
  voidBlock: 0x40,
};

export const SECTION = {
  TYPE: 1,
  FUNCTION: 3,
  MEMORY: 5,
  EXPORT: 7,
  CODE: 10,
};

export const OP = {
  block: 0x02,
  loop: 0x03,
  if: 0x04,
  end: 0x0b,
  br: 0x0c,
  br_if: 0x0d,
  return: 0x0f,
  local_get: 0x20,
  local_set: 0x21,
  local_tee: 0x22,
  i32_load8_u: 0x2d,
  i32_store8: 0x3a,
  i32_const: 0x41,
  i32_lt_s: 0x48,
  i32_gt_s: 0x4a,
  i32_ge_u: 0x4f,
  i32_add: 0x6a,
  i32_mul: 0x6c,
  i32_xor: 0x73,
};

export function encodeULEB128(value) {
  let v = value >>> 0;
  const bytes = [];
  do {
    let byte = v & 0x7f;
    v >>>= 7;
    if (v !== 0) byte |= 0x80;
    bytes.push(byte);
  } while (v !== 0);
  return bytes;
}

export function encodeSLEB128(value) {
  let v = value | 0;
  const bytes = [];
  let more = true;
  while (more) {
    let byte = v & 0x7f;
    v >>= 7;
    if ((v === 0 && (byte & 0x40) === 0) || (v === -1 && (byte & 0x40) !== 0)) {
      more = false;
    } else {
      byte |= 0x80;
    }
    bytes.push(byte);
  }
  return bytes;
}

function encodeString(str) {
  const utf8 = new TextEncoder().encode(str);
  return [...encodeULEB128(utf8.length), ...utf8];
}

function makeSection(id, payloadBytes) {
  return [id, ...encodeULEB128(payloadBytes.length), ...payloadBytes];
}

function makeFuncBody(localTypes, instructions) {
  const localDecls = localTypes.map((t) => [1, t]).flat();
  const body = [...encodeULEB128(localTypes.length), ...localDecls, ...instructions, OP.end];
  return [...encodeULEB128(body.length), ...body];
}

/**
 * Builds a complete, spec-valid WebAssembly module exporting:
 * - memory (1 initial page = 64 KiB, max 4 pages)
 * - add(a: i32, b: i32) -> i32
 * - factorial(n: i32) -> i32
 * - fibonacci(n: i32) -> i32
 * - sumBytes(ptr: i32, len: i32) -> i32
 * - xorTransform(ptr: i32, len: i32, key: i32) -> i32
 */
export function buildToolkitWasmBytes() {
  // Type Section:
  // 0: (i32) -> i32
  // 1: (i32, i32) -> i32
  // 2: (i32, i32, i32) -> i32
  const typeSection = makeSection(SECTION.TYPE, [
    3,
    0x60, 1, VALTYPE.i32, 1, VALTYPE.i32,
    0x60, 2, VALTYPE.i32, VALTYPE.i32, 1, VALTYPE.i32,
    0x60, 3, VALTYPE.i32, VALTYPE.i32, VALTYPE.i32, 1, VALTYPE.i32,
  ]);

  // Function Section: maps func 0..4 to type indices
  // 0: add -> type 1
  // 1: factorial -> type 0
  // 2: fibonacci -> type 0
  // 3: sumBytes -> type 1
  // 4: xorTransform -> type 2
  const funcSection = makeSection(SECTION.FUNCTION, [5, 1, 0, 0, 1, 2]);

  // Memory Section: 1 memory, flags=1 (has max), initial=1 page (64 KiB), max=4 pages
  const memorySection = makeSection(SECTION.MEMORY, [1, 0x01, 1, 4]);

  // Export Section: memory + 5 functions
  const exportEntries = [
    ...encodeString('memory'), 0x02, 0,
    ...encodeString('add'), 0x00, 0,
    ...encodeString('factorial'), 0x00, 1,
    ...encodeString('fibonacci'), 0x00, 2,
    ...encodeString('sumBytes'), 0x00, 3,
    ...encodeString('xorTransform'), 0x00, 4,
  ];
  const exportSection = makeSection(SECTION.EXPORT, [6, ...exportEntries]);

  // Func 0: add(a, b) -> a + b
  const addBody = makeFuncBody([], [OP.local_get, 0, OP.local_get, 1, OP.i32_add]);

  // Func 1: factorial(n) -> n! (locals: 1=acc, 2=i)
  const factorialBody = makeFuncBody(
    [VALTYPE.i32, VALTYPE.i32],
    [
      OP.i32_const, ...encodeSLEB128(1), OP.local_set, 1,
      OP.i32_const, ...encodeSLEB128(2), OP.local_set, 2,
      OP.block, VALTYPE.voidBlock,
      OP.loop, VALTYPE.voidBlock,
      OP.local_get, 2, OP.local_get, 0, OP.i32_gt_s, OP.br_if, 1,
      OP.local_get, 1, OP.local_get, 2, OP.i32_mul, OP.local_set, 1,
      OP.local_get, 2, OP.i32_const, ...encodeSLEB128(1), OP.i32_add, OP.local_set, 2,
      OP.br, 0,
      OP.end,
      OP.end,
      OP.local_get, 1,
    ]
  );

  // Func 2: fibonacci(n) -> F(n) (locals: 1=a, 2=b, 3=i, 4=next)
  const fibonacciBody = makeFuncBody(
    [VALTYPE.i32, VALTYPE.i32, VALTYPE.i32, VALTYPE.i32],
    [
      OP.local_get, 0, OP.i32_const, ...encodeSLEB128(2), OP.i32_lt_s,
      OP.if, VALTYPE.voidBlock,
      OP.local_get, 0, OP.return,
      OP.end,
      OP.i32_const, ...encodeSLEB128(0), OP.local_set, 1,
      OP.i32_const, ...encodeSLEB128(1), OP.local_set, 2,
      OP.i32_const, ...encodeSLEB128(2), OP.local_set, 3,
      OP.block, VALTYPE.voidBlock,
      OP.loop, VALTYPE.voidBlock,
      OP.local_get, 3, OP.local_get, 0, OP.i32_gt_s, OP.br_if, 1,
      OP.local_get, 1, OP.local_get, 2, OP.i32_add, OP.local_set, 4,
      OP.local_get, 2, OP.local_set, 1,
      OP.local_get, 4, OP.local_set, 2,
      OP.local_get, 3, OP.i32_const, ...encodeSLEB128(1), OP.i32_add, OP.local_set, 3,
      OP.br, 0,
      OP.end,
      OP.end,
      OP.local_get, 2,
    ]
  );

  // Func 3: sumBytes(ptr, len) -> sum of unsigned bytes (locals: 2=i, 3=sum)
  const sumBytesBody = makeFuncBody(
    [VALTYPE.i32, VALTYPE.i32],
    [
      OP.i32_const, ...encodeSLEB128(0), OP.local_set, 2,
      OP.i32_const, ...encodeSLEB128(0), OP.local_set, 3,
      OP.block, VALTYPE.voidBlock,
      OP.loop, VALTYPE.voidBlock,
      OP.local_get, 2, OP.local_get, 1, OP.i32_ge_u, OP.br_if, 1,
      OP.local_get, 3,
      OP.local_get, 0, OP.local_get, 2, OP.i32_add, OP.i32_load8_u, 0x00, 0x00,
      OP.i32_add, OP.local_set, 3,
      OP.local_get, 2, OP.i32_const, ...encodeSLEB128(1), OP.i32_add, OP.local_set, 2,
      OP.br, 0,
      OP.end,
      OP.end,
      OP.local_get, 3,
    ]
  );

  // Func 4: xorTransform(ptr, len, key) -> len (locals: 3=i, 4=addr)
  const xorTransformBody = makeFuncBody(
    [VALTYPE.i32, VALTYPE.i32],
    [
      OP.i32_const, ...encodeSLEB128(0), OP.local_set, 3,
      OP.block, VALTYPE.voidBlock,
      OP.loop, VALTYPE.voidBlock,
      OP.local_get, 3, OP.local_get, 1, OP.i32_ge_u, OP.br_if, 1,
      OP.local_get, 0, OP.local_get, 3, OP.i32_add, OP.local_tee, 4,
      OP.local_get, 4, OP.i32_load8_u, 0x00, 0x00,
      OP.local_get, 2, OP.i32_xor,
      OP.i32_store8, 0x00, 0x00,
      OP.local_get, 3, OP.i32_const, ...encodeSLEB128(1), OP.i32_add, OP.local_set, 3,
      OP.br, 0,
      OP.end,
      OP.end,
      OP.local_get, 1,
    ]
  );

  const codeSection = makeSection(SECTION.CODE, [
    5,
    ...addBody,
    ...factorialBody,
    ...fibonacciBody,
    ...sumBytesBody,
    ...xorTransformBody,
  ]);

  return new Uint8Array([
    ...WASM_MAGIC,
    ...WASM_VERSION,
    ...typeSection,
    ...funcSection,
    ...memorySection,
    ...exportSection,
    ...codeSection,
  ]);
}

/**
 * Parses header & top-level section IDs from raw .wasm bytes for binary structure inspection.
 */
export function inspectWasmHeader(bytes) {
  if (!(bytes instanceof Uint8Array) || bytes.length < 8) {
    throw new TypeError('Expected Uint8Array with at least 8 bytes');
  }
  const magic = String.fromCharCode(...bytes.slice(0, 4));
  const version = bytes[4] | (bytes[5] << 8) | (bytes[6] << 16) | (bytes[7] << 24);
  const sections = [];
  let offset = 8;
  while (offset < bytes.length) {
    const id = bytes[offset++];
    let len = 0;
    let shift = 0;
    while (offset < bytes.length) {
      const b = bytes[offset++];
      len |= (b & 0x7f) << shift;
      if ((b & 0x80) === 0) break;
      shift += 7;
    }
    sections.push({ id, byteLength: len });
    offset += len;
  }
  return { magic, version, totalBytes: bytes.length, sections };
}
