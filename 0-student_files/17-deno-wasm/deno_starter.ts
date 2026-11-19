/**
 * Student Lesson 17.1 Optional Native Deno Starter (TypeScript)
 * Run when Deno is installed:
 *   deno run --allow-net=127.0.0.1:8080 --allow-env=PORT deno_starter.ts
 */

const port = Number(Deno.env.get('PORT') ?? '8080');

export async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  // TODO [L3 Apply]: Return Response.json({ status: 'ok', runtime: 'deno' }) on GET /health
  // and 404 JSON on unknown routes.
  return Response.json({ todo: true, path: url.pathname }, { status: 501 });
}

if (import.meta.main) {
  Deno.serve({ hostname: '127.0.0.1', port }, handler);
}
