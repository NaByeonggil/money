"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Entry, EntryType, Plan, Section } from "@/lib/types";

const SAVE_DELAY = 600;

const TYPE_LABEL: Record<EntryType, string> = {
  heading: "소제목",
  text: "문단",
  list: "목록",
  table: "표",
  code: "도식·산식",
  mockup: "화면 목업",
  tip: "작성요령",
  warn: "주의",
  checklist: "체크리스트",
};

/* ------------------------------------------------------------------ */
/* 높이가 내용에 맞춰 늘어나는 입력칸                                   */
/* ------------------------------------------------------------------ */
function Auto({
  value,
  onChange,
  placeholder,
  readOnly,
  className = "",
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  // 【 】 로 감싼 값 = 아직 채우지 않은 자리. 「 」는 법령·보고서 제목에 쓰이므로 제외한다.
  const isSlot = value.includes("【");
  return (
    <textarea
      ref={ref}
      rows={1}
      aria-label={ariaLabel}
      className={`f ${isSlot ? "slot" : ""} ${className}`}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/* ------------------------------------------------------------------ */
/* 목업 마크업 정리 — 스크립트와 이벤트 핸들러는 렌더링하지 않는다.       */
/* 내가 붙여넣은 HTML이라도 문서 안에서 코드가 실행될 이유는 없다.        */
/* ------------------------------------------------------------------ */
function sanitize(html: string): string {
  return html
    .replace(/<\s*(script|iframe|object|embed|link|meta)\b[\s\S]*?<\s*\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|iframe|object|embed|link|meta)\b[^>]*\/?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*("|')?\s*javascript:[^"'>]*("|')?/gi, "");
}

/* ------------------------------------------------------------------ */

export default function PlanEditor({ initial }: { initial: Plan }) {
  const [plan, setPlan] = useState<Plan>(initial);
  const [edit, setEdit] = useState(true);
  const [inflight, setInflight] = useState(0);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* --- 저장 큐: 타이핑은 모아서 한 번에 보낸다 --- */
  type Pending = { url: string; body: Record<string, unknown>; timer: ReturnType<typeof setTimeout> };
  const pending = useRef(new Map<string, Pending>());

  const send = useCallback(async (url: string, init: RequestInit) => {
    setInflight((n) => n + 1);
    try {
      const res = await fetch(url, {
        headers: { "content-type": "application/json" },
        ...init,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? `요청 실패 (${res.status})`);
      }
      setError(null);
      setSavedAt(Date.now());
      return await res.json();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      throw e;
    } finally {
      setInflight((n) => n - 1);
    }
  }, []);

  const flush = useCallback(
    async (key: string) => {
      const p = pending.current.get(key);
      if (!p) return;
      clearTimeout(p.timer);
      pending.current.delete(key);
      await send(p.url, { method: "PATCH", body: JSON.stringify(p.body) }).catch(() => {});
    },
    [send],
  );

  const flushAll = useCallback(async () => {
    await Promise.all([...pending.current.keys()].map((k) => flush(k)));
  }, [flush]);

  const queuePatch = useCallback(
    (key: string, url: string, patch: Record<string, unknown>) => {
      const cur = pending.current.get(key);
      if (cur) clearTimeout(cur.timer);
      const body = { ...(cur?.body ?? {}), ...patch };
      const timer = setTimeout(() => void flush(key), SAVE_DELAY);
      pending.current.set(key, { url, body, timer });
    },
    [flush],
  );

  // 저장 안 된 내용이 있는 채로 창을 닫으려 하면 경고
  useEffect(() => {
    const onLeave = (e: BeforeUnloadEvent) => {
      if (pending.current.size > 0) e.preventDefault();
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, []);

  /* --- 로컬 상태 갱신 (화면은 즉시, 서버는 조금 뒤) --- */
  const patchPlanMeta = (patch: Partial<Plan>) => {
    setPlan((prev) => ({ ...prev, ...patch }));
    queuePatch("plan", "/api/plan", patch as Record<string, unknown>);
  };

  const patchSection = (sectionId: string, patch: Partial<Section>) => {
    setPlan((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === sectionId ? { ...s, ...patch } : s)),
    }));
    queuePatch(`sec:${sectionId}`, `/api/sections/${sectionId}`, patch as Record<string, unknown>);
  };

  const patchEntry = (entryId: string, patch: Partial<Entry>) => {
    setPlan((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => ({
        ...s,
        entries: s.entries.map((e) => (e.id === entryId ? { ...e, ...patch } : e)),
      })),
    }));
    queuePatch(`ent:${entryId}`, `/api/entries/${entryId}`, patch as Record<string, unknown>);
  };

  /* --- 구조 변경: 먼저 대기 중인 저장을 비우고 서버 응답으로 전체 교체 --- */
  const structural = async (url: string, init: RequestInit) => {
    await flushAll();
    try {
      const data = await send(url, init);
      setPlan((data as { plan?: Plan }).plan ?? (data as Plan));
    } catch {
      /* 오류 메시지는 send()에서 표시 */
    }
  };

  const addEntry = (sectionId: string, type: EntryType) =>
    structural(`/api/sections/${sectionId}/entries`, {
      method: "POST",
      body: JSON.stringify({ type }),
    });

  const deleteEntry = (entryId: string, label: string) => {
    if (!confirm(`이 ${label} 항목을 삭제할까요? 되돌릴 수 없습니다.`)) return;
    return structural(`/api/entries/${entryId}`, { method: "DELETE" });
  };

  const moveEntry = (entryId: string, dir: "up" | "down") =>
    structural(`/api/entries/${entryId}/move`, { method: "POST", body: JSON.stringify({ dir }) });

  const addSection = () => structural("/api/sections", { method: "POST", body: "{}" });

  const deleteSection = (section: Section) => {
    if (!confirm(`'${section.title}' 목차를 통째로 삭제할까요? 안의 항목도 함께 사라집니다.`)) return;
    return structural(`/api/sections/${section.id}`, { method: "DELETE" });
  };

  const reset = async () => {
    if (!confirm("작성한 내용을 모두 버리고 원본 초안으로 되돌립니다. 계속할까요?")) return;
    await flushAll();
    try {
      const data = await send("/api/plan/reset", { method: "POST" });
      setPlan(data as Plan);
    } catch {
      /* noop */
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `사업계획서_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const ro = !edit;

  return (
    <div className={ro ? "locked" : ""}>
      <div className="topbar no-print">
        <div className="topbar-in">
          <span className="status">
            {error ? (
              <b style={{ color: "var(--alert)" }}>⚠ {error}</b>
            ) : inflight > 0 || pending.current.size > 0 ? (
              "저장 중…"
            ) : savedAt ? (
              <>
                <b>저장됨</b> · {new Date(savedAt).toLocaleTimeString("ko-KR")}
              </>
            ) : (
              <>
                마지막 저장 ·{" "}
                {new Date(plan.updatedAt).toLocaleString("ko-KR", {
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </>
            )}
          </span>
          <button className={`btn ${edit ? "on" : ""}`} onClick={() => setEdit((v) => !v)}>
            {edit ? "편집 중" : "읽기 전용"}
          </button>
          <button className="btn" onClick={() => void flushAll()}>
            지금 저장
          </button>
          <button className="btn" onClick={() => window.print()}>
            인쇄 · PDF
          </button>
          <button className="btn" onClick={exportJson}>
            JSON 내보내기
          </button>
          <button className="btn danger" onClick={() => void reset()}>
            초안으로 초기화
          </button>
        </div>
      </div>

      <div className="wrap">
        <header className="masthead">
          <div className="eyebrow">
            <Auto
              value={plan.eyebrow}
              readOnly={ro}
              onChange={(v) => patchPlanMeta({ eyebrow: v })}
              ariaLabel="말머리"
            />
          </div>
          <div className="h1">
            <Auto
              value={plan.title}
              readOnly={ro}
              onChange={(v) => patchPlanMeta({ title: v })}
              placeholder="사업계획서 제목"
              ariaLabel="제목"
            />
          </div>
          <div className="sub">
            <Auto
              value={plan.subtitle}
              readOnly={ro}
              onChange={(v) => patchPlanMeta({ subtitle: v })}
              placeholder="부제"
              ariaLabel="부제"
            />
          </div>
          <div className="meta">
            {plan.chips.map((c, i) => (
              <span className="chip" key={i}>
                {c}
                {edit && (
                  <button
                    className="x"
                    title="태그 삭제"
                    onClick={() => patchPlanMeta({ chips: plan.chips.filter((_, j) => j !== i) })}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
            {edit && (
              <button
                className="add no-print"
                onClick={() => {
                  const v = prompt("추가할 태그");
                  if (v?.trim()) patchPlanMeta({ chips: [...plan.chips, v.trim()] });
                }}
              >
                + 태그
              </button>
            )}
          </div>
        </header>

        <div className="legend no-print">
          <h2>읽는 법</h2>
          <ul>
            <li>
              노란색으로 표시된 칸은 아직 채워야 할 자리입니다. <b>【 】</b> 안의 안내 문구를 지우고
              직접 쓰면 색이 사라집니다.
            </li>
            <li>모든 칸은 바로 고칠 수 있고, 타이핑을 멈추면 자동 저장됩니다.</li>
            <li>항목 위에 마우스를 올리면 순서 이동·삭제 버튼이 나타납니다.</li>
            <li>
              <b>핵심 원칙: 모든 주장에 숫자와 출처를 붙일 것.</b> 평가위원은 검증 가능한지만 봅니다.
            </li>
          </ul>
        </div>

        {plan.sections.map((section) => (
          <section key={section.id} id={`s-${section.id}`}>
            <div className="sec-head">
              <span className="sec-num">
                <input
                  value={section.num}
                  readOnly={ro}
                  aria-label="목차 번호"
                  onChange={(e) => patchSection(section.id, { num: e.target.value })}
                />
              </span>
              <div className="h2">
                <Auto
                  value={section.title}
                  readOnly={ro}
                  onChange={(v) => patchSection(section.id, { title: v })}
                  placeholder="목차 제목"
                  ariaLabel="목차 제목"
                />
              </div>
              <div className="sec-en">
                <Auto
                  value={section.en}
                  readOnly={ro}
                  onChange={(v) => patchSection(section.id, { en: v })}
                  placeholder="EN"
                  ariaLabel="영문 표기"
                />
              </div>
            </div>

            {section.entries.map((entry, i) => (
              <EntryView
                key={entry.id}
                entry={entry}
                edit={edit}
                first={i === 0}
                last={i === section.entries.length - 1}
                onPatch={(patch) => patchEntry(entry.id, patch)}
                onMove={(dir) => void moveEntry(entry.id, dir)}
                onDelete={() => void deleteEntry(entry.id, TYPE_LABEL[entry.type])}
              />
            ))}

            {edit && (
              <div className="adder no-print">
                <span className="lbl">항목 추가</span>
                {(Object.keys(TYPE_LABEL) as EntryType[]).map((t) => (
                  <button key={t} className="add" onClick={() => void addEntry(section.id, t)}>
                    + {TYPE_LABEL[t]}
                  </button>
                ))}
                <button
                  className="add"
                  style={{ marginLeft: "auto", color: "var(--alert)" }}
                  onClick={() => void deleteSection(section)}
                >
                  목차 삭제
                </button>
              </div>
            )}
          </section>
        ))}

        {edit && (
          <div className="no-print" style={{ margin: "-32px 0 48px" }}>
            <button className="btn" onClick={() => void addSection()}>
              + 목차 추가
            </button>
          </div>
        )}

        <footer>
          <Auto
            value={plan.footer}
            readOnly={ro}
            onChange={(v) => patchPlanMeta({ footer: v })}
            ariaLabel="꼬리말"
          />
        </footer>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 항목 하나                                                            */
/* ------------------------------------------------------------------ */
function EntryView({
  entry,
  edit,
  first,
  last,
  onPatch,
  onMove,
  onDelete,
}: {
  entry: Entry;
  edit: boolean;
  first: boolean;
  last: boolean;
  onPatch: (patch: Partial<Entry>) => void;
  onMove: (dir: "up" | "down") => void;
  onDelete: () => void;
}) {
  const ro = !edit;

  const ops = edit && (
    <div className="entry-ops no-print">
      <span className="tag">{TYPE_LABEL[entry.type]}</span>
      {entry.type === "heading" && (
        <button
          className="iconbtn"
          title="제목 크기 전환"
          onClick={() => onPatch({ level: entry.level === 3 ? 4 : 3 })}
        >
          H{entry.level ?? 3}
        </button>
      )}
      <button className="iconbtn" title="위로" disabled={first} onClick={() => onMove("up")}>
        ↑
      </button>
      <button className="iconbtn" title="아래로" disabled={last} onClick={() => onMove("down")}>
        ↓
      </button>
      <button className="iconbtn danger" title="삭제" onClick={onDelete}>
        삭제
      </button>
    </div>
  );

  const body = () => {
    switch (entry.type) {
      case "heading":
        return (
          <div className={entry.level === 4 ? "h4" : "h3"}>
            <Auto
              value={entry.text ?? ""}
              readOnly={ro}
              onChange={(v) => onPatch({ text: v })}
              placeholder="소제목"
              ariaLabel="소제목"
            />
          </div>
        );

      case "text":
        return (
          <p>
            <Auto
              value={entry.text ?? ""}
              readOnly={ro}
              onChange={(v) => onPatch({ text: v })}
              placeholder="내용을 입력하세요"
              ariaLabel="문단"
            />
          </p>
        );

      case "code":
        return (
          <pre className="code">
            <Auto
              value={entry.text ?? ""}
              readOnly={ro}
              onChange={(v) => onPatch({ text: v })}
              placeholder="도식이나 산식을 줄바꿈 그대로 입력하세요"
              ariaLabel="도식·산식"
            />
          </pre>
        );

      case "mockup":
        return (
          <figure className="mockup-fig">
            <div className="mockup" dangerouslySetInnerHTML={{ __html: sanitize(entry.text ?? "") }} />
            <figcaption>
              <Auto
                value={entry.caption ?? ""}
                readOnly={ro}
                onChange={(v) => onPatch({ caption: v })}
                placeholder="화면 설명"
                ariaLabel="목업 설명"
              />
            </figcaption>
            {edit && (
              <details className="no-print mockup-src">
                <summary>HTML 편집</summary>
                <Auto
                  value={entry.text ?? ""}
                  onChange={(v) => onPatch({ text: v })}
                  placeholder="목업 HTML"
                  ariaLabel="목업 HTML"
                />
              </details>
            )}
          </figure>
        );

      case "tip":
      case "warn":
        return (
          <div className={entry.type}>
            <Auto
              value={entry.text ?? ""}
              readOnly={ro}
              onChange={(v) => onPatch({ text: v })}
              placeholder={entry.type === "tip" ? "작성 요령" : "주의 사항"}
              ariaLabel={entry.type === "tip" ? "작성 요령" : "주의 사항"}
            />
          </div>
        );

      case "list":
        return <ListBody entry={entry} edit={edit} onPatch={onPatch} />;

      case "checklist":
        return <ChecklistBody entry={entry} edit={edit} onPatch={onPatch} />;

      case "table":
        return <TableBody entry={entry} edit={edit} onPatch={onPatch} />;
    }
  };

  return (
    <div className="entry">
      {ops}
      {body()}
    </div>
  );
}

/* ---- 목록 ---- */
function ListBody({
  entry,
  edit,
  onPatch,
}: {
  entry: Entry;
  edit: boolean;
  onPatch: (patch: Partial<Entry>) => void;
}) {
  const items = entry.items ?? [];
  const setItems = (next: typeof items) => onPatch({ items: next });
  return (
    <>
      <ul className="bullets">
        {items.map((it, i) => (
          <li key={it.id}>
            <div className="li-row">
              <Auto
                value={it.text}
                readOnly={!edit}
                onChange={(v) =>
                  setItems(items.map((x, j) => (j === i ? { ...x, text: v } : x)))
                }
                placeholder="목록 항목"
                ariaLabel="목록 항목"
              />
              {edit && (
                <button
                  className="iconbtn danger no-print"
                  title="이 줄 삭제"
                  onClick={() => setItems(items.filter((_, j) => j !== i))}
                >
                  ×
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {edit && (
        <button
          className="add no-print"
          onClick={() => setItems([...items, { id: rid(), text: "" }])}
        >
          + 줄 추가
        </button>
      )}
    </>
  );
}

/* ---- 체크리스트 ---- */
function ChecklistBody({
  entry,
  edit,
  onPatch,
}: {
  entry: Entry;
  edit: boolean;
  onPatch: (patch: Partial<Entry>) => void;
}) {
  const items = entry.items ?? [];
  const setItems = (next: typeof items) => onPatch({ items: next });
  return (
    <>
      <div className="check">
        {items.map((it, i) => (
          <div className={`row ${it.done ? "done" : ""}`} key={it.id}>
            <input
              type="checkbox"
              checked={!!it.done}
              aria-label="완료 표시"
              onChange={(e) =>
                setItems(items.map((x, j) => (j === i ? { ...x, done: e.target.checked } : x)))
              }
            />
            <Auto
              value={it.text}
              readOnly={!edit}
              onChange={(v) => setItems(items.map((x, j) => (j === i ? { ...x, text: v } : x)))}
              placeholder="확인할 항목"
              ariaLabel="체크리스트 항목"
            />
            {edit && (
              <button
                className="iconbtn danger no-print"
                title="이 줄 삭제"
                onClick={() => setItems(items.filter((_, j) => j !== i))}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      {edit && (
        <button
          className="add no-print"
          style={{ marginTop: 8 }}
          onClick={() => setItems([...items, { id: rid(), text: "", done: false }])}
        >
          + 줄 추가
        </button>
      )}
    </>
  );
}

/* ---- 표 ---- */
function TableBody({
  entry,
  edit,
  onPatch,
}: {
  entry: Entry;
  edit: boolean;
  onPatch: (patch: Partial<Entry>) => void;
}) {
  const columns = entry.columns ?? [];
  const rows = entry.rows ?? [];

  const setCell = (rowIndex: number, colIndex: number, v: string) =>
    onPatch({
      rows: rows.map((r, i) =>
        i === rowIndex ? { ...r, cells: r.cells.map((c, j) => (j === colIndex ? v : c)) } : r,
      ),
    });

  const addRow = () =>
    onPatch({ rows: [...rows, { id: rid(), cells: columns.map(() => "") }] });

  const deleteRow = (rowId: string) => onPatch({ rows: rows.filter((r) => r.id !== rowId) });

  const addColumn = () =>
    onPatch({
      columns: [...columns, "새 열"],
      rows: rows.map((r) => ({ ...r, cells: [...r.cells, ""] })),
    });

  const deleteColumn = (colIndex: number) => {
    if (columns.length <= 1) return;
    onPatch({
      columns: columns.filter((_, j) => j !== colIndex),
      rows: rows.map((r) => ({ ...r, cells: r.cells.filter((_, j) => j !== colIndex) })),
    });
  };

  return (
    <>
      <div className="tbl-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((c, j) => (
                <th key={j}>
                  <div className="li-row">
                    <Auto
                      value={c}
                      readOnly={!edit}
                      onChange={(v) =>
                        onPatch({ columns: columns.map((x, k) => (k === j ? v : x)) })
                      }
                      placeholder="열 이름"
                      ariaLabel="열 이름"
                    />
                    {edit && columns.length > 1 && (
                      <button
                        className="iconbtn danger no-print"
                        title="이 열 삭제"
                        onClick={() => deleteColumn(j)}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {edit && <th className="rowops" />}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id}>
                {columns.map((_, j) => {
                  const Cell = entry.headerColumn && j === 0 ? "th" : "td";
                  return (
                    <Cell key={j}>
                      <Auto
                        value={r.cells[j] ?? ""}
                        readOnly={!edit}
                        onChange={(v) => setCell(i, j, v)}
                        ariaLabel="표 내용"
                      />
                    </Cell>
                  );
                })}
                {edit && (
                  <td className="rowops">
                    <button
                      className="iconbtn danger no-print"
                      title="이 행 삭제"
                      onClick={() => deleteRow(r.id)}
                    >
                      ×
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {edit && (
        <div className="no-print" style={{ display: "flex", gap: 6, margin: "-10px 0 22px" }}>
          <button className="add" onClick={addRow}>
            + 행
          </button>
          <button className="add" onClick={addColumn}>
            + 열
          </button>
          <button
            className="add"
            onClick={() => onPatch({ headerColumn: !entry.headerColumn })}
            title="첫 열을 머리글로 쓸지 전환"
          >
            첫 열 머리글 {entry.headerColumn ? "끄기" : "켜기"}
          </button>
        </div>
      )}
    </>
  );
}

function rid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}
