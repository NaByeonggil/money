"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { SsdStatus } from "@/lib/ssd";

const REFRESH_MS = 60_000;

function bytes(n: number): string {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (n >= 1000 && i < units.length - 1) {
    n /= 1000;
    i++;
  }
  return `${n.toFixed(n >= 100 || i === 0 ? 0 : 1)} ${units[i]}`;
}

function time(iso: string): string {
  return new Date(iso).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** 낮을수록 좋은 비율 막대 */
function Meter({ percent, warnAt, alertAt }: { percent: number; warnAt: number; alertAt: number }) {
  const level = percent >= alertAt ? "alert" : percent >= warnAt ? "warn" : "";
  return (
    <div className="meter" role="img" aria-label={`${percent.toFixed(0)}%`}>
      <div className={`meter-fill ${level}`} style={{ width: `${Math.min(100, Math.max(0, percent))}%` }} />
    </div>
  );
}

export default function SsdPanel({ initial }: { initial: SsdStatus }) {
  const [status, setStatus] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ssd", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus((await res.json()) as SsdStatus);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "조회 실패");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setInterval(() => void refresh(), REFRESH_MS);
    return () => clearInterval(t);
  }, [refresh]);

  const { usage, smart } = status;

  return (
    <div>
      <div className="topbar">
        <div className="topbar-in">
          <Link className="btn" href="/">
            메뉴
          </Link>
          <span className="status">
            {error ? (
              <b style={{ color: "var(--alert)" }}>⚠ {error}</b>
            ) : (
              <>
                <b>조회</b> · {time(status.checkedAt)}
              </>
            )}
          </span>
          <button className="btn" onClick={() => void refresh()} disabled={loading}>
            {loading ? "조회 중…" : "새로고침"}
          </button>
        </div>
      </div>

      <div className="wrap">
        <header className="masthead">
          <div className="eyebrow">Server Storage</div>
          <h1>SSD 상태</h1>
          <p className="sub">
            {smart ? `${smart.model} · ${bytes(smart.capacityBytes)} · 펌웨어 ${smart.firmware}` : "이 서버의 저장장치"}
          </p>
        </header>

        <div className="ssd-grid">
          <div className="ssd-card">
            <div className="ssd-label">사용량</div>
            <div className="ssd-value">
              {bytes(usage.usedBytes)} <small>{usage.usedPercent.toFixed(1)}%</small>
            </div>
            <Meter percent={usage.usedPercent} warnAt={80} alertAt={90} />
            <div className="ssd-note">전체 {bytes(usage.totalBytes)} 중</div>
          </div>

          <div className="ssd-card">
            <div className="ssd-label">남은 용량</div>
            <div className="ssd-value">
              {bytes(usage.freeBytes)} <small>{(100 - usage.usedPercent).toFixed(1)}%</small>
            </div>
            <Meter percent={usage.usedPercent} warnAt={80} alertAt={90} />
            <div className="ssd-note">새로 쓸 수 있는 공간</div>
          </div>

          <div className="ssd-card">
            <div className="ssd-label">웨어율 (수명 사용률)</div>
            {smart ? (
              <>
                <div className="ssd-value">
                  {smart.wearPercent}% <small>남은 수명 {Math.max(0, 100 - smart.wearPercent)}%</small>
                </div>
                <Meter percent={smart.wearPercent} warnAt={70} alertAt={90} />
                <div className="ssd-note">누적 쓰기 {bytes(smart.writtenBytes)}</div>
              </>
            ) : (
              <>
                <div className="ssd-value">—</div>
                <div className="ssd-note">SMART 값을 아직 수집하지 못했습니다</div>
              </>
            )}
          </div>
        </div>

        {smart ? (
          <>
            {smart.stale && (
              <div className="warn">
                SMART 값이 {time(smart.collectedAt)} 이후 갱신되지 않았습니다. ssd-monitor 컨테이너가 실행 중인지
                확인하세요.
              </div>
            )}
            <table className="ssd-table">
              <tbody>
                <tr>
                  <th>SMART 종합 판정</th>
                  <td className={smart.passed ? "" : "ssd-bad"}>{smart.passed ? "정상" : "이상"}</td>
                </tr>
                <tr>
                  <th>예비 블록</th>
                  <td>
                    {smart.sparePercent}% (경고 기준 {smart.spareThresholdPercent}% 이하)
                  </td>
                </tr>
                <tr>
                  <th>온도</th>
                  <td>{smart.temperatureC}°C</td>
                </tr>
                <tr>
                  <th>누적 쓰기 / 읽기</th>
                  <td>
                    {bytes(smart.writtenBytes)} / {bytes(smart.readBytes)}
                  </td>
                </tr>
                <tr>
                  <th>사용 시간</th>
                  <td>
                    {smart.powerOnHours.toLocaleString("ko-KR")}시간 · 전원 켬 {smart.powerCycles.toLocaleString("ko-KR")}회
                  </td>
                </tr>
                <tr>
                  <th>비정상 종료</th>
                  <td>{smart.unsafeShutdowns.toLocaleString("ko-KR")}회</td>
                </tr>
                <tr>
                  <th>미디어 오류</th>
                  <td className={smart.mediaErrors > 0 ? "ssd-bad" : ""}>{smart.mediaErrors.toLocaleString("ko-KR")}건</td>
                </tr>
                <tr>
                  <th>SMART 수집 시각</th>
                  <td>{time(smart.collectedAt)}</td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <div className="warn">
            웨어율은 ssd-monitor 컨테이너가 수집합니다.{" "}
            <code>docker compose -f docker-compose.production.yml up -d</code> 로 함께 실행하세요.
          </div>
        )}

        <p className="ssd-note">
          웨어율은 SSD가 스스로 보고하는 값(NVMe Percentage Used)으로, 제조사 보증 쓰기량 대비 지금까지 소모한
          비율입니다. 사용량·남은 용량은 조회할 때마다, SMART 값은 5분마다 갱신됩니다.
        </p>
      </div>
    </div>
  );
}
