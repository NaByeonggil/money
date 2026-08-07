import { NextResponse } from "next/server";
import { findSection, mutate } from "@/lib/db";
import type { Section } from "@/lib/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** 섹션 제목·번호 수정 */
export async function PATCH(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = (await req.json()) as Partial<Section>;
  let found = true;
  const plan = await mutate((p) => {
    const section = findSection(p, id);
    if (!section) {
      found = false;
      return;
    }
    for (const key of ["num", "title", "en"] as const) {
      if (typeof body[key] === "string") section[key] = body[key];
    }
  });
  if (!found) return NextResponse.json({ error: "섹션을 찾을 수 없습니다." }, { status: 404 });
  return NextResponse.json(plan);
}

/** 섹션 삭제 (안의 항목까지 함께) */
export async function DELETE(_req: Request, { params }: Ctx) {
  const { id } = await params;
  let found = true;
  const plan = await mutate((p) => {
    const index = p.sections.findIndex((s) => s.id === id);
    if (index === -1) {
      found = false;
      return;
    }
    p.sections.splice(index, 1);
  });
  if (!found) return NextResponse.json({ error: "섹션을 찾을 수 없습니다." }, { status: 404 });
  return NextResponse.json(plan);
}
