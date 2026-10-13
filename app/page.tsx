import Link from "next/link";

const MENU = [
  {
    href: "/plan/form",
    title: "예창패 사업계획서 · 기본 양식",
    desc: "공고 양식 원본입니다. 항목, 안내 문구, 예시 표를 비어 있는 상태로 봅니다.",
  },
  {
    href: "/plan",
    title: "예창패 사업계획서 · 작성본",
    desc: "양식 순서대로 우리가 채운 내용입니다. 기록·수정·삭제할 수 있습니다.",
  },
  {
    href: "/plan/docs",
    title: "예창패 증빙서류 제출목록",
    desc: "[별첨 2] 신청할 때 함께 내는 증빙서류 목록과 붙임 양식 안내입니다.",
  },
  {
    href: "/ssd",
    title: "SSD 상태",
    desc: "서버 저장장치의 사용량, 남은 용량, 웨어율을 확인합니다.",
  },
];

export default function Page() {
  return (
    <div className="wrap">
      <header className="masthead">
        <div className="eyebrow">Menu</div>
        <h1>메뉴</h1>
      </header>
      <nav className="menu">
        {MENU.map((m) => (
          <Link key={m.href} className="menu-item" href={m.href}>
            <span className="menu-title">{m.title}</span>
            <span className="menu-desc">{m.desc}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
