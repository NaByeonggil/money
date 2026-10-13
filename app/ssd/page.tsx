import type { Metadata } from "next";
import { readSsdStatus } from "@/lib/ssd";
import SsdPanel from "./SsdPanel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "SSD 상태" };

export default async function Page() {
  return <SsdPanel initial={await readSsdStatus()} />;
}
