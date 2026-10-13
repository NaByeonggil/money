import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");
// ssd-monitor 컨테이너가 주기적으로 써 두는 smartctl -j 출력
const SMART_FILE = path.join(DATA_DIR, "ssd-smart.json");
// 이보다 오래된 SMART 값은 수집이 멈춘 것으로 본다
const STALE_MS = 30 * 60 * 1000;

export type SsdUsage = {
  totalBytes: number;
  usedBytes: number;
  freeBytes: number;
  usedPercent: number;
};

export type SsdSmart = {
  model: string;
  firmware: string;
  capacityBytes: number;
  passed: boolean;
  /** 웨어율(수명 사용률, %). 제조사 보증 쓰기량 기준이라 100을 넘을 수 있다 */
  wearPercent: number;
  sparePercent: number;
  spareThresholdPercent: number;
  temperatureC: number;
  writtenBytes: number;
  readBytes: number;
  powerOnHours: number;
  powerCycles: number;
  unsafeShutdowns: number;
  mediaErrors: number;
  criticalWarning: number;
  collectedAt: string;
  stale: boolean;
};

export type SsdStatus = {
  usage: SsdUsage;
  smart: SsdSmart | null;
  checkedAt: string;
};

/** 프로젝트가 놓인 파일시스템의 사용량 (df 와 같은 기준) */
async function readUsage(): Promise<SsdUsage> {
  const s = await fs.statfs(process.cwd());
  const usedBytes = (s.blocks - s.bfree) * s.bsize;
  const freeBytes = s.bavail * s.bsize;
  return {
    totalBytes: s.blocks * s.bsize,
    usedBytes,
    freeBytes,
    // 루트 예약 블록은 쓸 수 없으므로 df 처럼 used/(used+avail) 로 계산
    usedPercent: (usedBytes / (usedBytes + freeBytes)) * 100,
  };
}

async function readSmart(): Promise<SsdSmart | null> {
  try {
    const [raw, stat] = await Promise.all([fs.readFile(SMART_FILE, "utf8"), fs.stat(SMART_FILE)]);
    const j = JSON.parse(raw);
    const log = j.nvme_smart_health_information_log;
    if (!log) return null;
    // NVMe data unit = 512바이트 × 1000
    const unit = 512_000;
    return {
      model: j.model_name ?? "",
      firmware: j.firmware_version ?? "",
      capacityBytes: j.user_capacity?.bytes ?? 0,
      passed: j.smart_status?.passed === true,
      wearPercent: log.percentage_used,
      sparePercent: log.available_spare,
      spareThresholdPercent: log.available_spare_threshold,
      temperatureC: log.temperature,
      writtenBytes: log.data_units_written * unit,
      readBytes: log.data_units_read * unit,
      powerOnHours: log.power_on_hours,
      powerCycles: log.power_cycles,
      unsafeShutdowns: log.unsafe_shutdowns,
      mediaErrors: log.media_errors,
      criticalWarning: log.critical_warning,
      collectedAt: stat.mtime.toISOString(),
      stale: Date.now() - stat.mtimeMs > STALE_MS,
    };
  } catch {
    return null;
  }
}

export async function readSsdStatus(): Promise<SsdStatus> {
  const [usage, smart] = await Promise.all([readUsage(), readSmart()]);
  return { usage, smart, checkedAt: new Date().toISOString() };
}
