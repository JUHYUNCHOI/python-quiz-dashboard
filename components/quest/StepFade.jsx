"use client";

/* 스텝/페이지가 바뀔 때 '새 내용'이라는 신호를 주는 아주 짧은 등장 효과.
   선생님 2026-08-27: "전체 화면전환이 뭔가 팍팍 지나가니까 불편한건가?",
                    "새로운 정보는 새로운 정보만 보게 해줘야지. 다 읽어봐야하는건가?"
   전엔 한 프레임에 통째로 갈아치워져서(높이 1863 → 2890px) 눈이 어디를 봐야 할지 몰랐음.

   쓰는 법:  <StepFade k={`${tab}-${cur}`}>{renderContent()}</StepFade>
   k 가 바뀌면 remount 되어 효과가 다시 재생됨. */

let _injected = false;

function injectOnce() {
  if (_injected || typeof document === "undefined") return;
  _injected = true;
  const el = document.createElement("style");
  el.setAttribute("data-quest-stepfade", "");
  el.textContent =
    /* 움직임이 신호다 — 아래에서 위로 미끄러져 들어오는 게 눈에 보여야 함.
       opacity 는 .55 에서 시작: 애니메이션이 멈춰도(배경 탭) 절대 안 보이는 일은 없음.
       fill-mode 도 안 씀 — 애니메이션이 아예 안 돌면 기본 상태(완전 불투명)로 보임. */
    "@keyframes questStepIn{" +
    "from{opacity:.55;transform:translateY(16px)}" +
    "60%{opacity:1}" +
    "to{opacity:1;transform:none}}" +
    ".qStepIn{animation:questStepIn 300ms cubic-bezier(.16,.84,.44,1)}" +
    /* 시뮬 안(▶)은 더 짧게 — 같은 화면 안에서 바뀌니까 */
    ".qStepInFast{animation:questStepIn 200ms cubic-bezier(.16,.84,.44,1)}" +
    "@media (prefers-reduced-motion:reduce){.qStepIn,.qStepInFast{animation:none}}";
  document.head.appendChild(el);
}

export function StepFade({ k, fast = false, children }) {
  injectOnce();
  return (
    <div key={k} className={fast ? "qStepInFast" : "qStepIn"}>
      {children}
    </div>
  );
}

export default StepFade;
