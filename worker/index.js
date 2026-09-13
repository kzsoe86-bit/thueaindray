const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/health') return json({ ok: true, service: 'p1-learning' });

    if (url.pathname === '/api/progress' && request.method === 'POST') {
      if (!env.DB) return json({ saved: false, mode: 'device-only' }, 202);
      const body = await request.json().catch(() => null);
      if (!body || typeof body.deviceId !== 'string' || typeof body.letterId !== 'string') return json({ error: 'Invalid request' }, 400);
      await env.DB.prepare('INSERT INTO progress (device_id, letter_id, completed_at) VALUES (?, ?, ?) ON CONFLICT(device_id, letter_id) DO UPDATE SET completed_at = excluded.completed_at')
        .bind(body.deviceId.slice(0, 80), body.letterId.slice(0, 8), new Date().toISOString()).run();
      return json({ saved: true });
    }

    if (url.pathname.startsWith('/api/')) return json({ error: 'Not found' }, 404);
    return env.ASSETS.fetch(request);
  },
};
