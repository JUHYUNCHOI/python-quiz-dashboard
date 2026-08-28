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
    /* 시작 opacity 를 0 이 아니라 .35 로: 애니메이션이 멈춘 상태(배경 탭 등)에서도
       내용을 읽을 수 있어야 함. 0 이면 화면이 비어 버림. */
    "@keyframes questStepIn{from{opacity:.35;transform:translateY(8px)}to{opacity:1;transform:none}}" +
    /* fill-mode 를 쓰지 않는다: 애니메이션이 안 돌아도(배경 탭·구형 브라우저)
       기본 상태가 opacity 1 이라 내용이 반드시 보임. */
    ".qStepIn{animation:questStepIn 200ms cubic-bezier(.22,.61,.36,1)}" +
    "@media (prefers-reduced-motion:reduce){.qStepIn{animation:none}}";
  document.head.appendChild(el);
}

export function StepFade({ k, children }) {
  injectOnce();
  return (
    <div key={k} className="qStepIn">
      {children}
    </div>
  );
}

export default StepFade;
