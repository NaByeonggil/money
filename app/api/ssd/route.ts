import { NextResponse } from "next/server";
import { readSsdStatus } from "@/lib/ssd";

export const dynamic = "force-dynamic";

/** SSD 사용량·남은 용량·웨어율 조회 */
export async function GET() {
  return NextResponse.json(await readSsdStatus());
}
