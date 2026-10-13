import Link from "next/link";

/** 기본 양식 · 작성본 · 증빙서류 전환 */
export default function PlanTabs({ current }: { current: "form" | "filled" | "docs" }) {
  return (
    <>
      <Link className={`btn ${current === "form" ? "on" : ""}`} href="/plan/form">
        기본 양식
      </Link>
      <Link className={`btn ${current === "filled" ? "on" : ""}`} href="/plan">
        작성본
      </Link>
      <Link className={`btn ${current === "docs" ? "on" : ""}`} href="/plan/docs">
        증빙서류
      </Link>
    </>
  );
}
