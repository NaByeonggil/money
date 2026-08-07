import { NextResponse } from "next/server";
import { mutate } from "@/lib/db";
import { newId } from "@/lib/types";

export const dynamic = "force-dynamic";

/** 목차(섹션) 추가 */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as {
    title?: string;
    en?: string;
    num?: string;
  };
  const plan = await mutate((p) => {
    const nextNum =
      body.num ?? String(p.sections.length).padStart(2, "0");
    p.sections.push({
      id: newId(),
      num: nextNum,
      title: body.title ?? "새 항목",
      en: body.en ?? "",
      entries: [],
    });
  });
  return NextResponse.json(plan);
}
