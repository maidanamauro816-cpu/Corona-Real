const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/health") {
      return json({ ok: true, service: "corona-real" });
    }

    // TODO: reemplazar el token administrativo por autenticación individual
    // por profesional (identidad verificada, permisos y autorización por recurso).
    if (url.pathname.startsWith("/api/admin/")) {
      const supplied = request.headers.get("authorization") || "";
      if (!env.API_ADMIN_TOKEN || supplied !== `Bearer ${env.API_ADMIN_TOKEN}`) {
        return json({ error: "Unauthorized" }, 401);
      }
      return json({ error: "Endpoint not implemented" }, 501);
    }

    if (url.pathname === "/" && request.method === "GET") {
      return new Response("Corona Real API is running.", {
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    return json({ error: "Not found" }, 404);
  },
};
