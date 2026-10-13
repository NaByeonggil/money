import type { Metadata } from "next";
import { FORM_SECTIONS, FORM_SOURCE, FORM_TITLE } from "@/lib/form";
import FormView from "../FormView";

export const metadata: Metadata = { title: "예창패 사업계획서 · 기본 양식" };

export default function Page() {
  return (
    <FormView
      current="form"
      label="기본 양식"
      source={FORM_SOURCE}
      title={FORM_TITLE}
      sub="공고 양식의 항목·안내 문구·예시 표를 그대로 옮긴 화면입니다. 우리가 채운 내용은 상단의 「작성본」에서 봅니다."
      sections={FORM_SECTIONS}
      legend={
        <>
          <li>
            <span className="form-guide-inline">파란색 글씨</span>는 양식의 안내 문구와 예시입니다. 제출할 때는 지우고 검정
            글씨로 작성합니다.
          </li>
          <li>붉은 상자는 양식에 적힌 작성 유의사항입니다.</li>
          <li>◦ 와 - 만 있는 칸은 양식에서 비워 둔 본문 자리입니다.</li>
        </>
      }
    />
  );
}
