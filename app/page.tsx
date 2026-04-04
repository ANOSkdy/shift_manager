export default function HomePage() {
  return (
    <main className="container" aria-labelledby="page-title">
      <h1 id="page-title">Shift Manager Starter</h1>
      <p>
        Mobile-first, build-safe Next.js App Router baseline with TypeScript, Neon Postgres-ready API routes,
        and explicit migrations.
      </p>

      <section aria-labelledby="quick-start-title">
        <h2 id="quick-start-title">Quick start</h2>
        <ol>
          <li>Copy <code>.env.example</code> to <code>.env.local</code> and set your Neon URL.</li>
          <li>Run <code>pnpm db:migrate</code> to create schema.</li>
          <li>Check <code>/api/health/db</code> and <code>/api/todos</code>.</li>
        </ol>
      </section>

      <nav aria-label="API links">
        <a href="/api/health/db">DB Health</a>
        <a href="/api/todos">Todos API</a>
      </nav>
    </main>
  );
}
