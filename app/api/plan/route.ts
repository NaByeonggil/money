import { NextResponse } from "next/server";
import { mutate, readPlan } from "@/lib/db";
import type { Plan } from "@/lib/types";

export const dynamic = "force-dynamic";

/** 문서 전체 조회 */
export async function GET() {
  return NextResponse.json(await readPlan());
}

/** 문서 머리말(제목·부제·태그·꼬리말) 수정 */
export async function PATCH(req: Request) {
  const body = (await req.json()) as Partial<Plan>;
  const plan = await mutate((p) => {
    for (const key of ["title", "eyebrow", "subtitle", "footer"] as const) {
      if (typeof body[key] === "string") p[key] = body[key];
    }
    if (Array.isArray(body.chips)) p.chips = body.chips.map(String);
  });
  return NextResponse.json(plan);
}
