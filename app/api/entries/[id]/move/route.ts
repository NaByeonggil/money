import { NextResponse } from "next/server";
import { findEntry, mutate } from "@/lib/db";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

/** 항목 순서 이동 (섹션 안에서 위/아래) */
export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params;
  const { dir } = (await req.json()) as { dir: "up" | "down" };
  let found = true;
  const plan = await mutate((p) => {
    const hit = findEntry(p, id);
    if (!hit) {
      found = false;
      return;
    }
    const { section, index } = hit;
    const to = dir === "up" ? index - 1 : index + 1;
    if (to < 0 || to >= section.entries.length) return;
    const [moved] = section.entries.splice(index, 1);
    section.entries.splice(to, 0, moved);
  });
  if (!found) return NextResponse.json({ error: "항목을 찾을 수 없습니다." }, { status: 404 });
  return NextResponse.json(plan);
}
