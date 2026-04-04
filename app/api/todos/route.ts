import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDatabaseUrl, query } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const listSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20)
});

const createTodoSchema = z.object({
  title: z.string().trim().min(1).max(200)
});

type TodoRow = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

export async function GET(request: Request) {
  if (!getDatabaseUrl()) {
    return NextResponse.json({ error: 'MISSING_DATABASE_URL' }, { status: 503 });
  }

  const parse = listSchema.safeParse(Object.fromEntries(new URL(request.url).searchParams));
  if (!parse.success) {
    return NextResponse.json({ error: 'INVALID_QUERY', details: parse.error.flatten() }, { status: 400 });
  }

  try {
    const result = await query<TodoRow>(
      `SELECT id, title, completed, created_at
       FROM todos
       ORDER BY created_at DESC
       LIMIT $1`,
      [parse.data.limit]
    );

    return NextResponse.json({ data: result.rows });
  } catch {
    return NextResponse.json({ error: 'DB_QUERY_FAILED' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!getDatabaseUrl()) {
    return NextResponse.json({ error: 'MISSING_DATABASE_URL' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  }

  const parse = createTodoSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'INVALID_BODY', details: parse.error.flatten() }, { status: 400 });
  }

  try {
    const result = await query<TodoRow>(
      `INSERT INTO todos (title)
       VALUES ($1)
       RETURNING id, title, completed, created_at`,
      [parse.data.title]
    );

    return NextResponse.json({ data: result.rows[0] }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'DB_QUERY_FAILED' }, { status: 500 });
  }
}
