import Link from "next/link";
import type { FormBlock, FormSection } from "@/lib/form";
import PlanTabs from "./PlanTabs";

function Block({ block }: { block: FormBlock }) {
  switch (block.type) {
    case "heading":
      return <div className={block.level === 3 ? "h3" : "h4"}>{block.text}</div>;
    case "notice":
      return (
        <div className="warn">
          {block.lines.map((l, i) => (
            <div key={i}>※ {l}</div>
          ))}
        </div>
      );
    case "guide":
      return (
        <div className="form-guide">
          {block.lines.map((l, i) => (
            <div key={i}>{/^[-*]/.test(l) ? l : `※ ${l}`}</div>
          ))}
        </div>
      );
    case "bullets":
      return <pre className="form-blank">{block.lines.join("\n")}</pre>;
    case "table":
      return (
        <div className="tbl-scroll">
          {block.note && <div className="form-guide">{block.note}</div>}
          <table>
            <thead>
              <tr>
                {block.columns.map((c) => (
                  <th key={c}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) =>
                    block.headerColumn && c === 0 ? (
                      <th key={c}>{cell}</th>
                    ) : (
                      <td key={c} className="form-cell">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

/** 공고 원본 문서를 읽기 전용으로 보여주는 화면 */
export default function FormView({
  current,
  label,
  source,
  title,
  sub,
  legend,
  sections,
  originalUrl,
}: {
  current: "form" | "docs";
  label: string;
  source: string;
  title: string;
  sub: string;
  legend: React.ReactNode;
  sections: FormSection[];
  originalUrl?: string;
}) {
  return (
    <div>
      <div className="topbar no-print">
        <div className="topbar-in">
          <Link className="btn" href="/">
            메뉴
          </Link>
          <span className="status">
            <b>{label}</b> · 공고 원본 (읽기 전용)
          </span>
          {originalUrl && (
            <a className="btn" href={originalUrl} target="_blank" rel="noreferrer">
              원본 HWP
            </a>
          )}
          <PlanTabs current={current} />
        </div>
      </div>

      <div className="wrap">
        <header className="masthead">
          <div className="eyebrow">{source}</div>
          <h1>{title}</h1>
          <p className="sub">{sub}</p>
        </header>

        <div className="legend">
          <h2>이 화면 읽는 법</h2>
          <ul>{legend}</ul>
        </div>

        {sections.map((section, i) => (
          <section key={i}>
            <div className="sec-head">
              <span className="sec-num">{section.num}</span>
              <div className="h2">{section.title}</div>
              <div className="sec-en">{section.en}</div>
            </div>
            {section.blocks.map((block, b) => (
              <Block key={b} block={block} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
