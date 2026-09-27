/**
 * 서비스 화면 목업 — 이미 개발·운영 중인 PWA를 40~60대 기준으로 재설계한 화면.
 * 원본: supplement_pwa_three_screen_mockup.html,
 *       supplement_pwa_retention_verification_pharmacy_screens.html
 *
 * 원본 마크업을 그대로 보존한다. 색과 아이콘은 app/globals.css의
 * .mockup 블록에서 문서 색상 체계에 맞춰 정의하므로, 소스가 갱신되면
 * 이 파일의 문자열만 교체하면 된다.
 *
 * MOCKUP_REPORT · MOCKUP_REVIEW 는 복용안심 전환 후 새로 그린 화면으로,
 * 같은 토큰과 마크업 규칙을 따른다.
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

/** ⑦ 약·건기식 입력 → ⑧ 복용안심 리포트 → ⑨ 약사 확인과 다음 단계 */
export const MOCKUP_REPORT = `<div style="background: var(--surface-1); border-radius: 12px; padding: 1.25rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>9:41</span><span><i class="ti ti-wifi" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">지금 드시는 것을<br>모두 알려주세요</div>
<div style="border:2px solid var(--border-accent); background: var(--bg-accent); color: var(--text-accent); border-radius:8px; padding:12px; font-size:14px; display:flex; align-items:center; justify-content:center; gap:8px;"><i class="ti ti-camera" style="font-size:17px;" aria-hidden="true"></i>약 봉투·라벨 사진 찍기</div>
<div style="font-size:12px; font-weight:500; margin-top:2px;">약 3종 <span style="font-weight:400; color: var(--text-muted);">· 약 봉투에서 읽음</span></div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:9px 10px; font-size:12px; line-height:1.7;">아토르바스타틴 <span style="color: var(--text-muted);">고지혈증</span><br>아스피린 저용량 <span style="color: var(--text-muted);">혈전 예방</span><br>메트포르민 <span style="color: var(--text-muted);">당뇨</span></div>
<div style="font-size:12px; font-weight:500;">건강기능식품 4종 <span style="font-weight:400; color: var(--text-muted);">· 라벨에서 읽음</span></div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:9px 10px; font-size:12px; line-height:1.7;">종합비타민<br>비타민D 2,000IU<br>오메가3<br>홍국</div>
<div style="display:flex; align-items:center; gap:6px; font-size:11px; color: var(--text-secondary); line-height:1.4;"><i class="ti ti-users" style="font-size:14px;" aria-hidden="true"></i>부모님 것을 대신 입력하고 있어요</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">무료로 1차 점검</div>
</div>

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>9:52</span><span><i class="ti ti-x" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">복용안심 리포트</div>
<div style="display:inline-flex; align-items:center; gap:6px; background: var(--bg-success); color: var(--text-success); border-radius:8px; padding:7px 9px; font-size:11px; line-height:1.4;"><i class="ti ti-circle-check" style="font-size:14px;" aria-hidden="true"></i>약사 확인 완료 · 7종 점검</div>
<div style="display:flex; gap:6px;">
<div style="flex:1; background: var(--bg-warning); color: var(--text-warning); border-radius:8px; padding:7px 4px; text-align:center; font-size:11px; line-height:1.4;"><span style="font-size:16px; font-weight:500;">1</span><br>주의 조합</div>
<div style="flex:1; background: var(--surface-1); color: var(--text-secondary); border-radius:8px; padding:7px 4px; text-align:center; font-size:11px; line-height:1.4;"><span style="font-size:16px; font-weight:500;">1</span><br>중복 성분</div>
<div style="flex:1; background: var(--bg-accent); color: var(--text-accent); border-radius:8px; padding:7px 4px; text-align:center; font-size:11px; line-height:1.4;"><span style="font-size:16px; font-weight:500;">1</span><br>확인 권고</div>
</div>
<div style="border:0.5px solid var(--border-warning); background: var(--bg-warning); border-radius:8px; padding:9px; font-size:11px; line-height:1.5; color: var(--text-warning);"><span style="font-weight:500;"><i class="ti ti-alert-triangle" style="font-size:13px; vertical-align:-2px;" aria-hidden="true"></i> 홍국 + 아토르바스타틴</span><br>홍국의 모나콜린K는 고지혈증 약과 같은 계열 성분이에요. 함께 드시면 근육 관련 이상반응 위험이 커질 수 있어요</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:9px; font-size:11px; line-height:1.5; color: var(--text-secondary);"><span style="font-weight:500; color: var(--ink);">비타민D 중복</span><br>종합비타민 1,000IU + 단일 제품 2,000IU<br>하루 3,000IU를 드시고 있어요</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:9px; font-size:11px; line-height:1.5; color: var(--text-secondary);"><span style="font-weight:500; color: var(--text-accent);">메트포르민 장기 복용</span><br>비타민B12가 낮아질 수 있어요. 다음 검사 때 수치를 물어보세요</div>
<div style="margin-top:auto; border:0.5px solid var(--border-strong); border-radius:8px; padding:12px; text-align:center; font-size:14px;">약사 확인 내용 보기</div>
</div>

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>9:53</span><span><i class="ti ti-chevron-left" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">약사가<br>확인했어요</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:10px; font-size:12px; line-height:1.6;"><span style="font-size:11px; color: var(--text-muted);">검토 약사 의견</span><br>홍국 제품을 드시고 있다는 것을 다음 진료 때 담당 의사에게 꼭 알려주세요. 비타민D는 한 제품으로 정리할 수 있어요.</div>
<div style="background: var(--surface-1); border-radius:8px; padding:9px; font-size:11px; color: var(--text-secondary); line-height:1.5;">이 리포트는 성분 정보를 정리한 것이에요. 약을 바꾸거나 끊기 전에는 반드시 담당 의사·약사와 상의하세요</div>
<div style="border-top:0.5px solid var(--border); padding-top:10px; display:flex; flex-direction:column; gap:6px;">
<div style="font-size:12px; font-weight:500;">진료·상담 때 보여드리세요</div>
<div style="display:flex; align-items:center; gap:7px; font-size:11px; color: var(--text-secondary);"><i class="ti ti-file-text" style="font-size:14px;" aria-hidden="true"></i>리포트 PDF · 확인 항목 3건</div>
<div style="display:flex; align-items:center; gap:7px; font-size:11px; color: var(--text-secondary);"><i class="ti ti-pill" style="font-size:14px;" aria-hidden="true"></i>복용 목록 7종</div>
</div>
<div style="display:flex; align-items:center; gap:6px; font-size:11px; color: var(--text-muted); line-height:1.4;"><i class="ti ti-refresh" style="font-size:13px;" aria-hidden="true"></i>3개월 뒤 다시 점검해 드려요</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">가까운 약국에서 상담</div>
</div>

</div>`;

/** ⑩ 약사 검토 대기열 → ⑪ AI 1차 분류 검토 → ⑫ 리포트 발행 */
export const MOCKUP_REVIEW = `<div style="background: var(--surface-1); border-radius: 12px; padding: 1.25rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px;">

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>10:02</span><span><i class="ti ti-wifi" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">검토 대기<br>17건</div>
<div style="display:flex; gap:6px;">
<div style="flex:1; border:2px solid var(--border-warning); background: var(--bg-warning); color: var(--text-warning); border-radius:8px; padding:7px 4px; text-align:center; font-size:11px; line-height:1.4;">C 고위험<br><span style="font-size:15px; font-weight:500;">1</span></div>
<div style="flex:1; border:0.5px solid var(--border); border-radius:8px; padding:7px 4px; text-align:center; font-size:11px; line-height:1.4;">B 주의<br><span style="font-size:15px; font-weight:500;">4</span></div>
<div style="flex:1; border:0.5px solid var(--border); border-radius:8px; padding:7px 4px; text-align:center; font-size:11px; line-height:1.4; color: var(--text-secondary);">A 저위험<br><span style="font-size:15px; font-weight:500;">12</span></div>
</div>
<div style="border:0.5px solid var(--border-warning); border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:3px;">
<div style="display:flex; justify-content:space-between; align-items:center;"><div style="font-size:13px; font-weight:500;">60대 · 7종</div><div style="font-size:10px; background: var(--bg-warning); color: var(--text-warning); border-radius:8px; padding:3px 7px;">C</div></div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">와파린 + 은행잎 · 예상 20분</div>
</div>
<div style="border:2px solid var(--border-accent); border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:3px;">
<div style="display:flex; justify-content:space-between; align-items:center;"><div style="font-size:13px; font-weight:500;">50대 · 7종</div><div style="font-size:10px; background: var(--bg-accent); color: var(--text-accent); border-radius:8px; padding:3px 7px;">B</div></div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">홍국 + 스타틴 · 예상 10분</div>
</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:10px; display:flex; flex-direction:column; gap:3px;">
<div style="display:flex; justify-content:space-between; align-items:center;"><div style="font-size:13px; font-weight:500;">A 등급 12건</div><div style="font-size:10px; background: var(--bg-success); color: var(--text-success); border-radius:8px; padding:3px 7px;">A</div></div>
<div style="font-size:11px; color: var(--text-secondary); line-height:1.5;">해당 항목 없음 · 건당 3분</div>
</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">고위험부터 검토</div>
</div>

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>10:04</span><span><i class="ti ti-chevron-left" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">AI 1차 분류<br>확인하기</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:9px; display:flex; flex-direction:column; gap:6px;">
<div style="font-size:12px; line-height:1.5;"><span style="font-weight:500;">홍국 + 아토르바스타틴</span><br><span style="color: var(--text-secondary);">AI: 주의 조합</span></div>
<div style="display:flex; gap:6px;"><div style="flex:1; border:2px solid var(--border-accent); background: var(--bg-accent); color: var(--text-accent); border-radius:8px; padding:7px; text-align:center; font-size:11px;">동의</div><div style="flex:1; border:0.5px solid var(--border); border-radius:8px; padding:7px; text-align:center; font-size:11px;">수정</div></div>
</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:9px; display:flex; flex-direction:column; gap:6px;">
<div style="font-size:12px; line-height:1.5;"><span style="font-weight:500;">비타민D 합산 3,000IU</span><br><span style="color: var(--text-secondary);">AI: 중복 성분</span></div>
<div style="display:flex; gap:6px;"><div style="flex:1; border:2px solid var(--border-accent); background: var(--bg-accent); color: var(--text-accent); border-radius:8px; padding:7px; text-align:center; font-size:11px;">동의</div><div style="flex:1; border:0.5px solid var(--border); border-radius:8px; padding:7px; text-align:center; font-size:11px;">수정</div></div>
</div>
<div style="border:0.5px solid var(--border-warning); background: var(--bg-warning); border-radius:8px; padding:9px; font-size:11px; line-height:1.5; color: var(--text-warning);"><span style="font-weight:500;"><i class="ti ti-pencil" style="font-size:12px; vertical-align:-1px;" aria-hidden="true"></i> 약사 추가</span><br>메트포르민 장기 복용 → 비타민B12 확인 권고</div>
<div style="font-size:11px; color: var(--text-muted); line-height:1.5;">추가·수정한 항목은 분류 로직 개선에 반영돼요</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">의견 쓰기</div>
</div>

<div style="background: var(--surface-2); border: 0.5px solid var(--border); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; gap: 10px;">
<div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color: var(--text-muted);"><span>10:12</span><span><i class="ti ti-chevron-left" aria-hidden="true"></i></span></div>
<div style="font-size:17px; font-weight:500; line-height:1.4;">발행 전<br>마지막 확인</div>
<div style="border:0.5px solid var(--border); border-radius:8px; padding:10px; font-size:12px; line-height:1.8;">
<div style="display:flex; justify-content:space-between;"><span style="color: var(--text-secondary);">등급</span><span>B 주의</span></div>
<div style="display:flex; justify-content:space-between;"><span style="color: var(--text-secondary);">AI 분류 동의</span><span>2 / 2건</span></div>
<div style="display:flex; justify-content:space-between;"><span style="color: var(--text-secondary);">약사 추가</span><span>1건</span></div>
<div style="display:flex; justify-content:space-between;"><span style="color: var(--text-secondary);">검토 시간</span><span>8분</span></div>
</div>
<div style="font-size:12px; font-weight:500; margin-top:2px;">표현 점검</div>
<div style="display:flex; align-items:center; gap:7px; font-size:11px; color: var(--text-success);"><i class="ti ti-check" style="font-size:13px;" aria-hidden="true"></i>복용 중단·변경 지시 없음</div>
<div style="display:flex; align-items:center; gap:7px; font-size:11px; color: var(--text-success);"><i class="ti ti-check" style="font-size:13px;" aria-hidden="true"></i>특정 제품 추천 없음</div>
<div style="display:flex; align-items:center; gap:7px; font-size:11px; color: var(--text-success);"><i class="ti ti-check" style="font-size:13px;" aria-hidden="true"></i>질병 치료·예방 표현 없음</div>
<div style="margin-top:auto; background: var(--fill-primary); color: var(--on-primary); border-radius:8px; padding:13px; text-align:center; font-size:15px; font-weight:500;">리포트 발행</div>
</div>

</div>`;
