# 예비창업패키지 사업계획서 에디터

브라우저에서 사업계획서를 **기록(추가) · 수정 · 삭제**할 수 있게 만든 Next.js 앱입니다.
운영 주소는 **https://money.obesity.ai.kr** 입니다(Basic 인증 필요).

- 화면 구조·디자인: `예비창업패키지_사업계획서_초안.html`
- 초기 내용: `예비창업패키지_사업계획서_복용안심.md`
  (약사 검증 기반 AI 약·건강기능식품 병용 점검 서비스)

## 실행

```bash
npm run dev      # http://localhost:3000
```

빌드해서 쓰려면:

```bash
npm run build && npm start
```

## 배포 (money.obesity.ai.kr)

이 서버의 Docker에서 실행되고, obesity 프로젝트의 Caddy(80/443)가 HTTPS 인증서 발급과 프록시를 맡습니다.

```bash
docker compose -f docker-compose.production.yml up -d                  # 최초 실행
docker compose -f docker-compose.production.yml restart money-app      # 소스 수정 후 반영
docker compose -f docker-compose.production.yml logs -f money-app      # 로그
```

- 컨테이너는 시작할 때마다 `npm ci && npm run build && npm run start` 를 실행합니다.
- 호스트에서는 `http://127.0.0.1:3002` 로 인증 없이 점검할 수 있습니다.
- 프록시·인증 설정은 `~/바탕화면/obesity/Caddyfile` 의 `money.obesity.ai.kr` 블록에 있습니다.
- 비밀번호를 바꾸려면 `docker exec obesity1_caddy_production caddy hash-password` 로 만든 해시를
  `~/바탕화면/obesity/.env.caddy` 의 `MONEY_AUTH_HASH` 에 넣고(작은따옴표로 감싸기) Caddy 컨테이너를 다시 만듭니다.

## 저장 위치

작성한 내용은 프로젝트 안의 **`.data/plan.json`** 파일 한 개에 저장됩니다.
서버를 껐다 켜도 그대로 남아 있고, 이 파일만 복사해 두면 백업이 됩니다.
(임시 파일에 먼저 쓰고 교체하므로 저장 도중 중단돼도 원본이 깨지지 않습니다.)

처음 실행하면 HTML 초안 내용으로 자동 생성됩니다.

## 쓰는 법

| 하고 싶은 것 | 방법 |
|---|---|
| 내용 수정 | 아무 칸이나 클릭해서 바로 입력 — 멈추면 자동 저장 |
| 항목 추가 | 각 목차 맨 아래 `+ 문단 / 목록 / 표 / 작성요령 / 주의 / 체크리스트` |
| 항목 삭제·이동 | 항목 위에 마우스를 올리면 나타나는 `↑ ↓ 삭제` |
| 표 행·열 | 표 아래 `+ 행` `+ 열`, 각 행·열 오른쪽 `×` |
| 목차 추가·삭제 | 문서 맨 아래 `+ 목차 추가`, 목차 하단 `목차 삭제` |
| 제출용 출력 | 상단 `인쇄 · PDF` (편집 버튼은 인쇄에서 자동 제외) |
| 백업 | 상단 `JSON 내보내기` |
| 처음 상태로 | 상단 `초안으로 초기화` |

**노란 칸**은 아직 채우지 않은 자리입니다. 값에 `【 】` 가 들어 있으면 노랗게 표시되고,
안내 문구를 지우고 직접 쓰면 색이 사라집니다. 남은 노란 칸 = 남은 숙제입니다.
(`「 」` 는 법령·보고서 제목 표기에 쓰이므로 자리 표시로 잡지 않습니다.)

상단 `편집 중 / 읽기 전용` 버튼으로 실수로 고치는 걸 막을 수 있습니다.

## 구조

```
app/
  page.tsx            서버에서 plan.json 읽어 초기 렌더
  PlanEditor.tsx      편집 UI 전체 (클라이언트)
  globals.css         원본 HTML 디자인 + 편집 스타일
  api/
    plan/             GET 전체 조회, PATCH 제목·부제, reset/ 초기화
    sections/         POST 목차 추가, [id] PATCH·DELETE, [id]/entries POST
    entries/[id]/     PATCH 수정, DELETE 삭제, move/ 순서 이동
lib/
  types.ts            데이터 모델
  seed.ts             HTML 초안을 옮긴 초기 데이터
  db.ts               .data/plan.json 읽기·쓰기 (쓰기 직렬화)
```

> 앱 자체에는 인증이 없습니다. 외부 접근은 Caddy의 Basic 인증으로만 막고 있으므로,
> Caddy를 거치지 않는 경로(포트 직접 개방 등)로 노출하지 마세요.
