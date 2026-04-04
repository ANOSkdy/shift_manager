import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getDatabaseUrl, query } from '@/lib/db';

export const runtime = 'nodejs';

const idSchema = z.coerce.number().int().positive();
const patchSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    completed: z.boolean().optional()
  })
  .refine((value) => value.title !== undefined || value.completed !== undefined, {
    message: 'At least one field must be provided'
  });

type TodoRow = {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
};

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getDatabaseUrl()) {
    return NextResponse.json({ error: 'MISSING_DATABASE_URL' }, { status: 503 });
  }

  const { id } = await params;
  const idResult = idSchema.safeParse(id);
  if (!idResult.success) {
    return NextResponse.json({ error: 'INVALID_ID' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  }

  const parse = patchSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'INVALID_BODY', details: parse.error.flatten() }, { status: 400 });
  }

  const updates: string[] = [];
  const values: unknown[] = [];

  if (parse.data.title !== undefined) {
    values.push(parse.data.title);
    updates.push(`title = $${values.length}`);
  }

  if (parse.data.completed !== undefined) {
    values.push(parse.data.completed);
    updates.push(`completed = $${values.length}`);
  }

  values.push(idResult.data);

  try {
    const result = await query<TodoRow>(
      `UPDATE todos
       SET ${updates.join(', ')}
       WHERE id = $${values.length}
       RETURNING id, title, completed, created_at`,
      values
    );

    if ((result.rowCount ?? 0) === 0) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    }

    return NextResponse.json({ data: result.rows[0] });
  } catch {
    return NextResponse.json({ error: 'DB_QUERY_FAILED' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!getDatabaseUrl()) {
    return NextResponse.json({ error: 'MISSING_DATABASE_URL' }, { status: 503 });
  }

  const { id } = await params;
  const idResult = idSchema.safeParse(id);
  if (!idResult.success) {
    return NextResponse.json({ error: 'INVALID_ID' }, { status: 400 });
  }

  try {
    const result = await query('DELETE FROM todos WHERE id = $1', [idResult.data]);

    if ((result.rowCount ?? 0) === 0) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'DB_QUERY_FAILED' }, { status: 500 });
  }
}
