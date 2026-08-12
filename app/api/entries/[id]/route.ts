import { NextResponse } from "next/server";
import { findEntry, mutate } from "@/lib/db";
import type { Entry } from "@/lib/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** 항목 내용 수정 — 보낸 필드만 덮어쓴다. */
export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = (await req.json()) as Partial<Entry>;
  let found = true;
  const plan = await mutate((p) => {
    const hit = findEntry(p, id);
    if (!hit) {
      found = false;
      return;
    }
    const { entry } = hit;
    if (typeof body.text === "string") entry.text = body.text;
    if (typeof body.caption === "string") entry.caption = body.caption;
    if (body.level === 3 || body.level === 4) entry.level = body.level;
    if (typeof body.headerColumn === "boolean") entry.headerColumn = body.headerColumn;
    if (Array.isArray(body.items)) entry.items = body.items;
    if (Array.isArray(body.columns)) entry.columns = body.columns;
    if (Array.isArray(body.rows)) entry.rows = body.rows;
  });
  if (!found) return NextResponse.json({ error: "항목을 찾을 수 없습니다." }, { status: 404 });
  return NextResponse.json(plan);
}

/** 항목 삭제 */
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  let found = true;
  const plan = await mutate((p) => {
    const hit = findEntry(p, id);
    if (!hit) {
      found = false;
      return;
    }
    hit.section.entries.splice(hit.index, 1);
  });
  if (!found) return NextResponse.json({ error: "항목을 찾을 수 없습니다." }, { status: 404 });
  return NextResponse.json(plan);
}
