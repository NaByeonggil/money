import { promises as fs } from "fs";
import path from "path";
import { seedPlan } from "./seed";
import type { Entry, Plan, Section } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "plan.json");

export async function readPlan(): Promise<Plan> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as Plan;
  } catch {
    const fresh = seedPlan();
    await persist(fresh);
    return fresh;
  }
}

async function persist(plan: Plan): Promise<Plan> {
  plan.updatedAt = new Date().toISOString();
  await fs.mkdir(DATA_DIR, { recursive: true });
  // 임시 파일에 먼저 쓰고 교체 — 저장 중 중단되어도 원본이 깨지지 않음
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(plan, null, 2), "utf8");
  await fs.rename(tmp, FILE);
  return plan;
}

// 동시 요청이 서로의 쓰기를 덮어쓰지 않도록 직렬화
let queue: Promise<unknown> = Promise.resolve();

/** 계획서를 읽어 fn으로 수정한 뒤 저장하고, 저장된 전체 문서를 돌려준다. */
export function mutate(fn: (plan: Plan) => void | Promise<void>): Promise<Plan> {
  const run = async () => {
    const plan = await readPlan();
    await fn(plan);
    return persist(plan);
  };
  const next = queue.then(run, run);
  queue = next.catch(() => {});
  return next;
}

export async function resetPlan(): Promise<Plan> {
  return mutate((plan) => {
    const fresh = seedPlan();
    Object.assign(plan, fresh);
  });
}

export function findSection(plan: Plan, sectionId: string): Section | undefined {
  return plan.sections.find((s) => s.id === sectionId);
}

export function findEntry(
  plan: Plan,
  entryId: string,
): { section: Section; entry: Entry; index: number } | undefined {
  for (const section of plan.sections) {
    const index = section.entries.findIndex((e) => e.id === entryId);
    if (index !== -1) return { section, entry: section.entries[index], index };
  }
  return undefined;
}
