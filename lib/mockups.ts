/**
 * 서비스 화면 목업 — 이미 개발·운영 중인 PWA를 40~60대 기준으로 재설계한 화면.
 * 원본: supplement_pwa_three_screen_mockup.html,
 *       supplement_pwa_retention_verification_pharmacy_screens.html
 *
 * 원본 마크업을 그대로 보존한다. 색과 아이콘은 app/globals.css의
 * .mockup 블록에서 문서 색상 체계에 맞춰 정의하므로, 소스가 갱신되면
 * 이 파일의 문자열만 교체하면 된다.
 */

/** ① 설문 입력 → ② 약사 검증 추천 → ③ 수령 방법 선택 */
export const MOCKUP_ONBOARDING = `<div style="background: var(--surface-1); border-radius: 12px; padding: 1.25rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>9:41</span><span><i class="ti ti-wifi" aria-hidden="true"></i></span></div>
<div style="font-size:15px; font-weight:500;">3단계 중 2단계</div>
<div style="height:5px; background: var(--surface-0); border-radius: 999px;"><div style="width:66%; height:5px; background: var(--fill-accent); border-radius:999px;"></div></div>
<div style="font-size:17px; font-weight:500; line-height:1.4; margin-top:4px;">지금 드시는 약이<br>있으신가요?</div>
<div style="font-size:12px; color: var(--text-secondary); line-height:1.5;">약과 함께 먹으면 안 되는 성분을 걸러드려요</div>
<div style="display:flex; flex-direction:column; gap:8px; margin-top:2px;">
<div style="border:2px solid var(--border-accent); border-radius:8px; padding:12px; font-size:14px; display:flex; align-items:center; gap:8px; background: var(--bg-accent); color: var(--text-accent);"><i class="ti ti-check" aria-hidden="true"></i>혈압약</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:12px; font-size:14px;">당뇨약</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:12px; font-size:14px;">고지혈증약</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:12px; font-size:14px; color: var(--text-secondary);">없어요</div>
</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">다음</div>
</div>

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>9:43</span><span><i class="ti ti-wifi" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">나에게 맞는<br>3가지 성분</div>
<div style="display:inline-flex; align-items:center; gap:6px; background: var(--bg-success); color: var(--text-success); border-radius:8px; padding:7px 9px; font-size:11px; line-height:1.4;"><i class="ti ti-circle-check" style="font-size:14px;" aria-hidden="true"></i>약사가 검증한 조합</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:3px;">
<div style="font-size:14px; font-weight:500;">오메가3</div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">혈행 개선 · 하루 1,000mg</div>
</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:3px;">
<div style="font-size:14px; font-weight:500;">루테인</div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">눈 건강 · 하루 20mg</div>
</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:3px;">
<div style="font-size:14px; font-weight:500;">마그네슘</div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">근육 기능 · 하루 315mg</div>
</div>
<div style="background: var(--bg-warning); border-radius:8px; padding:9px; font-size:11px; line-height:1.5; color: var(--text-warning);"><i class="ti ti-alert-triangle" style="font-size:13px; vertical-align:-2px;" aria-hidden="true"></i> 혈압약 복용 중이라 은행잎은 제외했어요</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">제품 보기</div>
</div>

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>9:45</span><span><i class="ti ti-wifi" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">이렇게<br>받아보세요</div>
<div style="border:2px solid var(--border-accent); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:5px;">
<div style="font-size:10px; background: var(--bg-accent); color: var(--text-accent); border-radius:8px; padding:3px 8px; align-self:flex-start;">추천</div>
<div style="font-size:14px; font-weight:500;">약국에서 상담받기</div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">가까운 제휴 약국 3곳<br>도보 7분 이내</div>
</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:5px;">
<div style="font-size:14px; font-weight:500;">바로 주문하기</div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">3종 묶음 · 1개월분<br>92,000원</div>
</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:5px;">
<div style="font-size:14px; font-weight:500;">3개월 정기배송</div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;"><span style="color: var(--text-success);">15% 할인</span> · 78,200원/월</div>
</div>
<div style="display:flex; align-items:center; gap:6px; font-size:11px; color: var(--text-muted); line-height:1.4; margin-top:2px;"><i class="ti ti-bell" style="font-size:13px;" aria-hidden="true"></i>다 드실 때쯤 알려드려요</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">선택하기</div>
</div>

</div>`;

/** ④ 재구매 시점 복용 점검 → ⑤ 추천 근거 공개 → ⑥ 제휴 약국 예약 */
export const MOCKUP_RETENTION = `<div style="background: var(--surface-1); border-radius: 12px; padding: 1.25rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>8:00</span><span><i class="ti ti-wifi" aria-hidden="true"></i></span></div>
<div style="background: var(--bg-accent); border-radius:8px; padding:10px; display:flex; gap:8px; align-items:flex-start;">
<i class="ti ti-bell" style="font-size:15px; color: var(--text-accent);" aria-hidden="true"></i>
<div style="font-size:11px; color: var(--text-accent); line-height:1.5;">오메가3가 6일 남았어요</div>
</div>
<div style="font-size:17px; font-weight:500; line-height:1.4; margin-top:2px;">이번 달은<br>어떠셨어요?</div>
<div style="font-size:12px; color: var(--text-secondary); line-height:1.5;">답해주시면 다음 추천이 더 정확해져요</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:8px;">
<div style="font-size:13px; font-weight:500;">잘 챙겨 드셨나요?</div>
<div style="display:flex; gap:6px;">
<div style="flex:1; border:2px solid var(--border-accent); background: var(--bg-accent); color: var(--text-accent); border-radius:8px; padding:9px; text-align:center; font-size:12px;">거의 매일</div>
<div style="flex:1; border:0.5px solid var(--border); border-radius:8px; padding:9px; text-align:center; font-size:12px;">가끔</div>
</div>
</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:8px;">
<div style="font-size:13px; font-weight:500;">눈 피로는요?</div>
<div style="display:flex; gap:6px;">
<div style="flex:1; border:0.5px solid var(--border); border-radius:8px; padding:9px; text-align:center; font-size:12px;">나아짐</div>
<div style="flex:1; border:0.5px solid var(--border); border-radius:8px; padding:9px; text-align:center; font-size:12px;">비슷</div>
</div>
</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">답하고 재주문</div>
</div>

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>9:44</span><span><i class="ti ti-x" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">이 추천이<br>만들어진 과정</div>
<div style="display:flex; gap:9px; align-items:flex-start;">
<div style="width:22px; height:22px; border-radius:50%; background: var(--bg-accent); color: var(--text-accent); font-size:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">1</div>
<div style="font-size:12px; line-height:1.5;"><span style="font-weight:500;">설문 분석</span><br><span style="color: var(--text-secondary);">복약 1건, 목표 2개 확인</span></div>
</div>
<div style="display:flex; gap:9px; align-items:flex-start;">
<div style="width:22px; height:22px; border-radius:50%; background: var(--bg-accent); color: var(--text-accent); font-size:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">2</div>
<div style="font-size:12px; line-height:1.5;"><span style="font-weight:500;">성분 걸러내기</span><br><span style="color: var(--text-secondary);">14종 중 5종 제외</span></div>
</div>
<div style="display:flex; gap:9px; align-items:flex-start;">
<div style="width:22px; height:22px; border-radius:50%; background: var(--bg-success); color: var(--text-success); font-size:11px; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="ti ti-check" aria-hidden="true"></i></div>
<div style="font-size:12px; line-height:1.5;"><span style="font-weight:500;">약사 검증</span><br><span style="color: var(--text-secondary);">2026.08.12 확인 완료</span></div>
</div>
<div style="border-top:0.5px solid var(--border); padding-top:9px; font-size:12px; font-weight:500;">제외된 성분</div>
<div style="border:0.5px solid var(--border-warning); background: var(--bg-warning); border-radius:8px; padding:9px; font-size:11px; line-height:1.5; color: var(--text-warning);">은행잎 추출물<br>혈압약과 함께 드시면 출혈 위험</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:9px; font-size:11px; line-height:1.5; color: var(--text-secondary);">비타민D<br>이미 드시는 종합영양제에 들어 있어요</div>
<div style="margin-top:auto; border:0.5px solid var(--border-strong); border-radius:8px; padding:12px; text-align:center; font-size:14px;">약사에게 물어보기</div>
</div>

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>9:46</span><span><i class="ti ti-chevron-left" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">가까운<br>제휴 약국</div>
<div style="border:2px solid var(--border-accent); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:5px;">
<div style="display:flex; justify-content:space-between; align-items:center;">
<div style="font-size:14px; font-weight:500;">중앙약국</div>
<div style="font-size:10px; background: var(--bg-success); color: var(--text-success); border-radius:8px; padding:3px 7px;">상담 가능</div>
</div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">도보 4분 · 소분 판매 등록<br>오늘 오후 2시 예약 가능</div>
</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:11px; display:flex; flex-direction:column; gap:5px;">
<div style="font-size:14px; font-weight:500;">행복약국</div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">도보 7분 · 내일 오전 가능</div>
</div>
<div style="border-top:0.5px solid var(--border); padding-top:10px; display:flex; flex-direction:column; gap:6px;">
<div style="font-size:12px; font-weight:500;">가져가실 내용</div>
<div style="display:flex; align-items:center; gap:7px; font-size:11px; color: var(--text-secondary);"><i class="ti ti-file-text" style="font-size:14px;" aria-hidden="true"></i>추천 성분 3종 · 제외 사유</div>
<div style="display:flex; align-items:center; gap:7px; font-size:11px; color: var(--text-secondary);"><i class="ti ti-pill" style="font-size:14px;" aria-hidden="true"></i>복용 중인 약 목록</div>
</div>
<div style="background: var(--surface-1); border-radius:8px; padding:9px; font-size:11px; color: var(--text-secondary); line-height:1.5; margin-top:2px;">약사님께 미리 전달돼요. 설명을 다시 하지 않으셔도 됩니다</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">2시로 예약</div>
</div>

</div>`;
