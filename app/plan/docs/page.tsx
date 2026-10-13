import type { Metadata } from "next";
import { DOCS_ORIGINAL_URL, DOCS_SECTIONS, DOCS_SOURCE, DOCS_TITLE } from "@/lib/docs";
import FormView from "../FormView";

export const metadata: Metadata = { title: "예창패 증빙서류 제출목록" };

export default function Page() {
  return (
    <FormView
      current="docs"
      label="증빙서류"
      source={DOCS_SOURCE}
      title={DOCS_TITLE}
      sub="신청할 때 함께 내는 증빙서류 목록과 붙임 1~7 첨부 양식의 안내 문구를 그대로 옮긴 화면입니다."
      sections={DOCS_SECTIONS}
      originalUrl={DOCS_ORIGINAL_URL}
      legend={
        <>
          <li>(필수)는 모든 신청자가, (해당 시)는 해당하는 사람만 냅니다.</li>
          <li>
            <span className="form-guide-inline">파란색 글씨</span>는 각 붙임 양식의 안내 문구입니다. 실제 제출 파일에는 이
            자리에 스캔본을 붙입니다.
          </li>
          <li>날짜는 2026년 공고(공고일 2026.2.27.) 기준입니다.</li>
        </>
      }
    />
  );
}
