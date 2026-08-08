export type EntryType =
  | "heading" // 소제목 (h3 / h4)
  | "text" // 문단
  | "list" // 불릿 목록
  | "table" // 표
  | "code" // 도식·산식 (고정폭, 줄바꿈 보존)
  | "tip" // 작성 요령 (노란 박스)
  | "warn" // 주의 (붉은 박스)
  | "checklist"; // 체크리스트

export interface ListItem {
  id: string;
  text: string;
  done?: boolean;
}

export interface TableRow {
  id: string;
  cells: string[];
}

export interface Entry {
  id: string;
  type: EntryType;
  /** heading: 제목 텍스트 / text·tip·warn: 본문 */
  text?: string;
  /** heading 레벨 (3 = 대소제목, 4 = 소소제목) */
  level?: 3 | 4;
  /** list · checklist */
  items?: ListItem[];
  /** table */
  columns?: string[];
  rows?: TableRow[];
  /** table 첫 열을 머리글(th)로 렌더링할지 */
  headerColumn?: boolean;
}

export interface Section {
  id: string;
  num: string;
  title: string;
  en: string;
  entries: Entry[];
}

export interface Plan {
  title: string;
  eyebrow: string;
  subtitle: string;
  chips: string[];
  sections: Section[];
  footer: string;
  updatedAt: string;
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

/** 새 항목의 기본 형태 */
export function blankEntry(type: EntryType): Entry {
  const base: Entry = { id: newId(), type };
  switch (type) {
    case "heading":
      return { ...base, text: "새 소제목", level: 4 };
    case "text":
      return { ...base, text: "" };
    case "code":
      return { ...base, text: "단계 1\n  ↓\n단계 2" };
    case "tip":
      return { ...base, text: "작성 요령을 적어두세요." };
    case "warn":
      return { ...base, text: "놓치면 안 되는 항목을 적어두세요." };
    case "list":
    case "checklist":
      return { ...base, items: [{ id: newId(), text: "", done: false }] };
    case "table":
      return {
        ...base,
        columns: ["항목", "내용"],
        rows: [
          { id: newId(), cells: ["", ""] },
          { id: newId(), cells: ["", ""] },
        ],
        headerColumn: false,
      };
  }
}
