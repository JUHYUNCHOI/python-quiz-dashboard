// 흩어진 완료 신호를 한 곳에서 읽기 (2026-06-29, unified_path_plan B안).
//  /course/next 의 "이어서"가 학생의 실제 진도 자리로 가게 함.
//  ⚠️ 읽기 전용 — 기존 진도 키(completedLessons 등)에 절대 쓰지 않음.
//  완료 신호 출처:
//   - "completedLessons" (배열): 레슨 + algo 학습 + 연습(practice) 문제 (practice 페이지가 이 키로 solved 판정)
//   - "algo-<topic>-contest-solved" (토픽별 배열): algo 대회 연습 문제
//   - "coderin-path-done" (배열): /next 에서 수동 완료(외부 문제 등). 여기만 우리가 씀.
//  id 공간이 prefix 로 구분돼(arr-/loop-/io-/hr-/kattis-/algo-…) 충돌 위험 없음.
//  못 맞춘 완료 신호는 그냥 무시 → 안전(엉뚱한 항목 완료 표시 안 됨).

const MANUAL_KEY = "coderin-path-done";

function addArr(out: Set<string>, raw: string | null) {
  if (!raw) return;
  try {
    const a = JSON.parse(raw);
    if (Array.isArray(a)) for (const x of a) if (typeof x === "string") out.add(x);
  } catch {}
}

// 레슨/연습/algo학습 + algo대회 + 수동 → 합집합
export function getCompletedIds(): Set<string> {
  const out = new Set<string>();
  if (typeof window === "undefined") return out;
  try {
    addArr(out, localStorage.getItem("completedLessons"));
    addArr(out, localStorage.getItem(MANUAL_KEY));
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && /^algo-.*-contest-solved$/.test(k)) addArr(out, localStorage.getItem(k));
    }
  } catch {}
  return out;
}

// 수동 완료 토글 (외부 문제/override). coderin-path-done 만 건드림.
export function getManualDone(): Set<string> {
  const out = new Set<string>();
  if (typeof window === "undefined") return out;
  addArr(out, localStorage.getItem(MANUAL_KEY));
  return out;
}

export function setManualDone(id: string, done: boolean) {
  if (typeof window === "undefined") return;
  const s = getManualDone();
  if (done) s.add(id); else s.delete(id);
  try { localStorage.setItem(MANUAL_KEY, JSON.stringify([...s])); } catch {}
}
