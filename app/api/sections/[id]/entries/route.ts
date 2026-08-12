import { NextResponse } from "next/server";
import { findSection, mutate } from "@/lib/db";
import { blankEntry, type EntryType } from "@/lib/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const TYPES: EntryType[] = [
  "heading",
  "text",
  "list",
  "table",
  "code",
  "mockup",
  "tip",
  "warn",
  "checklist",
];

/** 섹션 안에 항목 추가. index를 주면 그 자리에 끼워 넣는다. */
export async function POST(req: Request, { params }: Ctx) {
  const { id } = await params;
  const body = (await req.json().catch(() => ({}))) as { type?: EntryType; index?: number };
  const type = body.type ?? "text";
  if (!TYPES.includes(type)) {
    return NextResponse.json({ error: `알 수 없는 항목 유형: ${type}` }, { status: 400 });
  }

  let found = true;
  let newEntryId = "";
  const plan = await mutate((p) => {
    const section = findSection(p, id);
    if (!section) {
      found = false;
      return;
    }
    const entry = blankEntry(type);
    newEntryId = entry.id;
    const at =
      typeof body.index === "number"
        ? Math.max(0, Math.min(body.index, section.entries.length))
        : section.entries.length;
    section.entries.splice(at, 0, entry);
  });

  if (!found) return NextResponse.json({ error: "섹션을 찾을 수 없습니다." }, { status: 404 });
  return NextResponse.json({ plan, entryId: newEntryId });
}
