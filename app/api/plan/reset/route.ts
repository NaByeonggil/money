import { NextResponse } from "next/server";
import { resetPlan } from "@/lib/db";

export const dynamic = "force-dynamic";

/** 원본 초안 상태로 되돌리기 */
export async function POST() {
  return NextResponse.json(await resetPlan());
}
