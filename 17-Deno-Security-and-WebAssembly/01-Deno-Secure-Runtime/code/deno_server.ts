/**
 * Lesson 17.1 Native Deno Reference Server (TypeScript + Web Standards + Sandbox)
 *
 * Run with explicit least-privilege permissions:
 *   deno run --allow-net=127.0.0.1:8080 --allow-env=PORT,APP_ENV deno_server.ts
 *
 * Compare denied vs allowed read access:
 *   deno run --allow-net=127.0.0.1:8080 --deny-read deno_server.ts
 */

import { basename } from '@std/path';

interface HealthPayload {
  runtime: 'deno';
  environment: string;
  entryFile: string;
  permissions: {
    net: string;
    env: string;
    read: string;
  };
}

const port = Number(Deno.env.get('PORT') ?? '8080');
const appEnv = Deno.env.get('APP_ENV') ?? 'sandbox-dev';

async function checkPermissionState(desc: Deno.PermissionDescriptor): Promise<string> {
  const status = await Deno.permissions.query(desc);
  return status.state;
}

export async function handleRequest(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    const payload: HealthPayload = {
      runtime: 'deno',
      environment: appEnv,
      entryFile: basename(import.meta.url),
      permissions: {
        net: await checkPermissionState({ name: 'net', host: `127.0.0.1:${port}` }),
        env: await checkPermissionState({ name: 'env', variable: 'APP_ENV' }),
        read: await checkPermissionState({ name: 'read', path: './deno.json' }),
      },
    };
    return Response.json(payload, { status: 200 });
  }

  if (req.method === 'GET' && url.pathname === '/api/config-preview') {
    const readPerm = await Deno.permissions.query({ name: 'read', path: './deno.json' });
    if (readPerm.state !== 'granted') {
      return Response.json(
        {
          error: 'PermissionDenied',
          message: 'Deno denied read access to ./deno.json without --allow-read=./',
        },
        { status: 403 }
      );
    }
    const raw = await Deno.readTextFile('./deno.json');
    return new Response(raw, {
      status: 200,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  return Response.json({ error: 'Not Found', path: url.pathname }, { status: 404 });
}

if (import.meta.main) {
  Deno.serve({ hostname: '127.0.0.1', port }, handleRequest);
}
