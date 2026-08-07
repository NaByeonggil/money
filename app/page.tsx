import { readPlan } from "@/lib/db";
import PlanEditor from "./PlanEditor";

export const dynamic = "force-dynamic";

export default async function Page() {
  const plan = await readPlan();
  return <PlanEditor initial={plan} />;
}
