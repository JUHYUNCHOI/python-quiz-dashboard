// CodeWalk — 코드를 '한 조각씩 밝히며' 그 조각 바로 위에 설명 말풍선.
// (선생님 2026-07-13: "코드 위에 설명을 안 읽게 되더라" — 설명 블록을 코드와 떨어뜨리면
//  눈이 코드로 바로 가서 설명을 건너뜀. 그래서 설명을 '지금 밝아진 줄'에 붙임.)
//
// (선생님 2026-07-13 추가: "코드가 길면 버튼 누르기 힘들고, 말풍선이 위에 있으면 설명할 때
//  안 보인다." → 코드를 '고정 높이 창'으로 만들고, 지금 밝아진 줄을 창 맨 위로 자동 스크롤.
//  말풍선·코드창·버튼이 항상 한 화면에 같이 보이게. 페이지가 길어지지 않음.)
//
// 사용:
//   <CodeWalk E={E} lang="py" code={[...lines]} accent="#16a34a" beats={[
//     { hi: [0, 3], bubble: t(E, "...", "...") },   // hi = 밝힐 줄 범위 (0-based, 양끝 포함)
//   ]} />

import { useRef, useEffect, useState, Fragment } from "react";
import { t } from "@/components/quest/theme";
import { highlight } from "@/components/quest/shared";
import { useTraceStep, SimNav } from "@/components/quest/TraceStepper";

// vars(선택): [{ v:"seq", ko:"수열", en:"the sequence" }, ...] — 코드창 위에 '변수 뜻' 범례로 항상 표시.
// (선생님 2026-07-13: 코드 깊이 들어가면 "n이 뭐였지? seq가 뭐였지?" 함 → 늘 보이는 리마인더)
// marks(선택): [{ from, to, ko, en }] — 항상 눈에 띄어야 하는 줄(예: 재귀의 베이스 케이스)을
// 장미색 밴드 + 뱃지로 상시 표시 (선생님 2026-07-17: "base case 가 눈에 잘 보이게").
// badge(선택): { ko, en, color } — 코드워크 맨 위에 '항상' 붙는 띠.
// (선생님 2026-07-18: 재귀 번외편을 주 풀이로 착각 — "아직도 recursion이 있는데?".
//  내레이션은 스크롤하면 안 보여서, 워크 안에 상시 표시가 필요.)
import { localizeCode } from "@/components/quest/localizeCode";

export function CodeWalk({ E, code: rawCode, lang = "py", beats, accent = "#16a34a", vars = null, marks = null, badge = null }) {
  /* 코드 안 한국어 주석을 영어 화면에서도 읽히게 한다 (2026-09-11).
     ⚠️ 원본 배열은 절대 안 건드린다 — 🔒 USACO_VERIFIED 파일이 많다. **그리는 자리에서만** 바꾼다.
     번역이 없으면 그 줄을 비운다. **줄 수는 유지**하므로 beats 의 hi 번호가 안 밀린다. */
  const code = localizeCode(rawCode, !!E);
  const { idx, setIdx, total } = useTraceStep(beats.length);

  /* 언어를 바꾸면 **1단계로 돌아간다** (2026-09-16, pedagogy 판정).
     왜 — `idx` 는 이 컴포넌트의 로컬 state 라, 언어를 바꾸면 `beats` 만 새로 만들어지고
     번호는 그대로 남는다. 그런데 두 언어는 코드가 달라서 스텝 수도 다르다
     (buymilk: 파이썬 7단계 · C++ 6단계 — C++ 엔 `**` 가 없어 두 배 표를 따로 만든다).
     그래서 "3번째" 라는 숫자만 같고 내용이 딴것이 된다.
     학생(2026-09-15): *"오가니까 오히려 더 헷갈렸음 — 번호가 안 맞아서."*
     ⚠️ 스텝 수를 억지로 맞추는 안은 기각했다 — 코드가 거짓말을 하게 된다.
     `useCodeLang` 을 쓰는 곳 전부에 걸린다. */
  const [shownLang, setShownLang] = useState(lang);
  const [langNotice, setLangNotice] = useState(false);
  const langJustChanged = shownLang !== lang;
  useEffect(() => {
    if (shownLang === lang) return;
    setShownLang(lang);
    setIdx(0);
    setLangNotice(true);          // ⓒ 왜 처음으로 갔는지 그 자리에서 말해준다
  }, [lang, shownLang, setIdx]);

  const safeIdx = langJustChanged ? 0 : idx;
  useEffect(() => { if (safeIdx > 0) setLangNotice(false); }, [safeIdx]);

  /* ⚠️ 2026-09-16 ux 가 **보류**를 냈다 — 모바일에서 안내 띠가 화면 위로 사라졌다.
     모바일은 코드창이 48vh 라 `다음 ▶` 버튼에 닿으려면 아래로 스크롤하게 된다.
     그 상태에서 언어 버튼(맨 위 고정바라 스크롤 안 올려도 눌린다)을 누르면,
     코드만 1번으로 점프하고 **안내 띠와 새 말풍선은 뷰포트 위쪽(-89px)으로 밀려나** 안 보였다.
     → 이 기능을 만든 이유("리셋만 하면 '왜 처음으로 갔지' 가 생긴다")가 모바일에서 그대로 재발.
     그래서 리셋할 때 **창 스크롤도 같이** 올려서 안내 띠가 보이게 한다.
     고정바(`client.tsx:238` sticky top-[57px])에 가리지 않게 여유를 둔다. */
  /* ⓒ 안내를 **어디에 띄우나** — 세 번 틀리고 네 번째에 자리를 찾았다 (2026-09-16).
     1차 흐름 안 + window 스크롤 → 띠 그리기 전에 재서 빗나감.
     2차 rAF 로 그린 뒤 측정   → 다른 곳이 다시 아래로 스크롤해 −182px. 또 실패.
     3차 `position: fixed, top: 112` → 모바일은 됐는데 **데스크탑에서 코드를 덮었다.**
         고정바가 모바일 2단(93px)·데스크탑 1단(45px)이라 코드창 시작 높이가 다르다.
         ux: *"왜 1번으로 갔는지를 설명하려고 만든 배너가, 그 1번 스텝이 정작 무엇을
         설명하는지는 가려버린다."* — 실측으로 밝아진 줄 2개를 완전히 덮었다.
     4차(지금) **말풍선 안에 넣는다.** 별도 배너를 두지 않는다.
       · 말풍선은 이미 코드창이 **자동으로 스크롤해서 보여주는** 자리다 — 위치 계산이 필요 없다
       · 흐름 안이라 **무엇도 덮지 않는다**
       · 뷰포트 크기·고정바 단수와 **무관**하다 (하드코딩한 px 이 하나도 없다)
     교훈: 덮어쓰는 배너는 자리를 아무리 잘 잡아도 결국 무언가를 가린다. */
  const beat = beats[Math.min(safeIdx, beats.length - 1)];
  const [lo, hi] = beat.hi;
  const done = safeIdx >= beats.length - 1;
  const bColor = done ? "#6ee7b7" : "#fbbf24";

  // 전체 코드 복사 (선생님 2026-07-17: "전체 코드 복사하는 부분이 없다")
  const [copied, setCopied] = useState(false);
  const copyAll = async () => {
    const text = code.join("\n");
    try { await navigator.clipboard.writeText(text); }
    catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };

  // 코드창: 스텝 바뀔 때마다 '지금 밝아진 줄 바로 위 말풍선'을 창 맨 위로 스크롤.
  // (선생님 2026-08-10: 말풍선을 위에 고정하지 말고 '진짜 설명되는 코드 줄 위'에 띄우기.
  //  말풍선이 코드 흐름 안(밝아진 줄 lo 직전)에 들어가므로, 그 말풍선으로 스크롤하면
  //  말풍선 + 밝아진 줄이 한 번에 창 위쪽에 보인다.)
  // (2026-09-16: 말풍선을 창 맨 꼭대기(offset -10)에 딱 붙이면 그 위 코드가 한 줄도
  //  안 보였다 — 학생이 `c[i]` 말풍선을 보면서 `c` 를 만든 줄이 화면 밖이라 짐작만 했다.
  //  위로 3줄 정도 여유를 둬서, 그 변수가 나온 자리를 스크롤 없이 같이 볼 수 있게 한다.
  //  줄 높이를 하드코딩하지 않고 방금 밝아진 줄(row)을 직접 재서 쓴다 — 폰트 크기가
  //  바뀌어도 안 깨지게.)
  const boxRef = useRef(null);
  const inlineBubbleRef = useRef(null);
  useEffect(() => {
    const box = boxRef.current;
    const bub = inlineBubbleRef.current;
    if (!box || !bub) return;
    const lineRow = bub.nextElementSibling;               // 말풍선 바로 다음 = 밝아진 첫 줄
    const lineH = lineRow ? lineRow.offsetHeight : 27;     // 실측 줄 높이(px), 못 재면 대략값
    const margin = lineH * 3;                              // 위로 대략 3줄 여유
    box.scrollTop = Math.max(0, bub.offsetTop - margin);
  }, [safeIdx, lo]);

  return (
    <div style={{ padding: 16 }}>
      {/* 상시 배지 — 스크롤해도 항상 보이게 맨 위 고정 띠 (예: "🎁 번외 · 안 봐도 돼요") */}
      {badge && (
        <div style={{
          maxWidth: 560, margin: "0 auto 10px",
          background: `${badge.color || "#0d9488"}15`,
          border: `1.5px dashed ${badge.color || "#0d9488"}`,
          borderRadius: 999, padding: "5px 14px",
          fontSize: 11.5, fontWeight: 800, textAlign: "center",
          color: badge.color || "#0d9488", wordBreak: "keep-all", letterSpacing: 0.2,
        }}>
          {t(E, badge.en, badge.ko)}
        </div>
      )}

      {/* 말풍선은 이제 코드창 안, '지금 밝아진 줄 바로 위'에 뜬다 (아래 code.map 참고). */}

      {/* 변수 뜻 범례 — 늘 보이게 (코드 깊이 들어가도 "n이 뭐였지?" 안 하게) */}
      {vars && vars.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 6, maxWidth: 1040, margin: "0 auto 8px" }}>
          {vars.map((vr, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              fontSize: 11.5, padding: "2px 9px", borderRadius: 999,
              background: "#f1f5f9", border: "1px solid #e2e8f0", color: "#475569", wordBreak: "keep-all",
            }}>
              <code style={{ fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, color: "#0f172a" }}>{vr.v}</code>
              <span style={{ color: "#94a3b8" }}>=</span>
              <span style={{ fontWeight: 600 }}>{t(E, vr.en, vr.ko)}</span>
            </span>
          ))}
        </div>
      )}

      {/* 코드 — 고정 높이 창, 밝아진 줄로 자동 스크롤.
          배경/글자색은 다른 레슨(CodeBlock)과 동일한 gray-900. 흐림 없이 전부 또렷,
          강조는 '밝은 왼쪽 막대 + 살짝 밝은 배경'만 (선생님 2026-07-13: 어둡지 않게). */}
      <div ref={boxRef} className="qcode-scroll qcode-wide" style={{
        background: "#111827", borderRadius: 12, padding: "12px 10px",
        overflowY: "auto", overflowX: "auto",
        // 기본은 적당한 높이, 그런데 학생·선생님이 아래 모서리를 끌어서 늘릴 수 있게.
        // (선생님 2026-07-21: "에디터 크기를 조절할 수가 없네" — 큰 화면에선 좁은 창에
        //  갇혀 스크롤만 하게 됨. resize 로 원하는 만큼 펼쳐서 코드 전체를 보게.)
        // ⚠️ 2026-09-18 선생님: *"코드 보는 곳에 너무 좁다는 생각은 나만 하는건가?"*
        // 740px · 380px 이었다. 수업은 노트북·패드(큰 화면)에서 하는데 코드가 한가운데
        // 좁은 칸에 갇혀 세로로만 흘렀다. 넓히고 키운다. (끌어서 더 늘리는 건 그대로.)
        height: "min(64vh, 560px)",
        maxHeight: "none",
        minHeight: 140,
        resize: "vertical",
        fontFamily: "'JetBrains Mono',monospace",
        // ligature 끄기 — != 를 ≠ 로 합치지 말고 그대로 (선생님 2026-07-13)
        fontVariantLigatures: "none", fontFeatureSettings: '"liga" 0, "calt" 0',
        fontSize: 14.5, lineHeight: 1.8, maxWidth: 1040, margin: "0 auto",
        position: "relative",
        // 아래에 더 있다 / **오른쪽에 더 있다** 는 힌트. 오른쪽은 2026-09-11 추가 —
        // pre 로 바꾼 뒤 긴 줄이 표시 없이 잘리고 있었다(ux 가 checkups 에서 잡음).
        boxShadow: "inset 0 -10px 12px -10px rgba(0,0,0,.4), inset -14px 0 14px -10px rgba(0,0,0,.55)",
      }}>
        {code.map((line, i) => {
          const isHot = i >= lo && i <= hi;
          // marks: 이 줄이 상시 강조 구간에 속하나 (color 로 종류 구분 —
          // 기본 장미 = ✋베이스 케이스, 남보라 = ↺재귀 호출 등)
          const mk = marks && marks.find((m) => i >= m.from && i <= m.to);
          const mc = mk ? (mk.color || "#f43f5e") : null;
          return (
            <Fragment key={i}>
              {/* 지금 밝아진 줄(lo) 바로 위에 말풍선을 흐름 안으로 끼워 넣음 — 그 줄을 가리킴 */}
              {i === lo && (
                <div ref={inlineBubbleRef} style={{ margin: "3px 2px 7px" }}>
                  <div style={{
                    background: done ? "#ecfdf5" : "#fffbeb", border: `1.5px solid ${bColor}`,
                    borderRadius: 12, padding: "9px 13px", fontSize: 13,
                    color: done ? "#065f46" : "#92400e", lineHeight: 1.5,
                    /* 한글 줄바꿈 4종 세트 — balance 가 없으면 마지막 줄만 짧게 남아 어정쩡하게 갈림 */
                    fontWeight: 600, wordBreak: "keep-all", whiteSpace: "pre-line", textWrap: "balance",
                    fontFamily: "system-ui, -apple-system, 'Apple SD Gothic Neo', sans-serif", // 코드폰트 아닌 읽기폰트
                    boxShadow: "0 6px 16px rgba(0,0,0,.30)",
                  }}>
                    {langNotice && safeIdx === 0 && (
                      <div style={{
                        marginBottom: 7, paddingBottom: 6, borderBottom: `1px dashed ${bColor}`,
                        fontSize: 12, fontWeight: 700, color: "#1e40af",
                      }}>
                        🔄 {t(E,
                          `Switched to ${lang === "cpp" ? "C++" : "Python"} — different code, so we start from step 1.`,
                          `${lang === "cpp" ? "C++" : "파이썬"} 으로 바꿨어요 — 코드가 달라서 1번부터 다시 봐요.`)}
                      </div>
                    )}
                    💬 {beat.bubble}
                  </div>
                  {/* 아래(밝아진 코드 줄)를 가리키는 꼬리 */}
                  <div style={{ width: 0, height: 0, marginLeft: 26,
                    borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
                    borderTop: `9px solid ${bColor}` }} />
                </div>
              )}
              <div
                style={{
                  display: "flex", alignItems: "flex-start",
                  background: isHot ? "#1f2b3e" : mk ? `${mc}21` : "transparent",   // gray-900 보다 살짝 밝게 (어둡지 않음)
                  borderLeft: isHot ? `4px solid ${bColor}` : mk ? `4px solid ${mc}` : "4px solid transparent",
                  borderRadius: isHot || mk ? 5 : 0,
                  padding: "1px 6px 1px 6px",
                  opacity: 1,                                       // 흐림 없음 — 모든 줄 또렷
                  transition: "background .2s",
                }}>
                <span style={{ color: isHot ? "#a3b3c9" : "#5b6675", width: 24, textAlign: "right", marginRight: 12, flexShrink: 0, userSelect: "none", fontSize: 11.5 }}>{i + 1}</span>
                {/* ⚠️ 2026-09-11: break-word 가 **식별자 한가운데를 쪼갰다.**
                    모바일 375px 에서 `int` 가 "in"+"t" 로, `it->first` 가 "it-"+">first" 로 갈렸다
                    (ux 가 moohunt C++ 3번째 조각 스크린샷에서 잡음).
                    바깥 상자에 이미 overflowX: auto 가 있다(99줄) — 코드는 **접지 말고 가로로 밀어야** 한다.
                    한글 줄바꿈 규칙은 말풍선 얘기다. 코드 영역엔 적용되지 않는다. */}
                <span style={{ whiteSpace: "pre", wordBreak: "normal", overflowWrap: "normal", flexShrink: 0 }}>
                  {highlight(line, lang)}
                </span>
                {mk && i === mk.from && (
                  <span style={{
                    marginLeft: 8, alignSelf: "center", flexShrink: 0,
                    fontSize: 10, fontWeight: 800, whiteSpace: "nowrap",
                    color: "#fff", background: `${mc}40`,
                    border: `1px solid ${mc}90`, borderRadius: 999, padding: "1px 8px",
                  }}>{t(E, mk.en, mk.ko)}</span>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>

      {/* 진행 표시 + 전체 코드 복사 (코드창 바로 아래) */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, margin: "8px 0 2px" }}>
        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 700 }}>
          {t(E, `part ${safeIdx + 1} of ${total}`, `${total} 조각 중 ${safeIdx + 1} 번째`)}
        </span>
        <button onClick={copyAll} style={{
          fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 999, cursor: "pointer",
          background: copied ? "#059669" : "#fff",
          border: `1.5px solid ${copied ? "#059669" : "#cbd5e1"}`,
          color: copied ? "#fff" : "#475569",
          transition: "all .15s",
        }}>
          {copied ? `✓ ${t(E, "copied!", "복사됨!")}` : `📋 ${t(E, "copy full code", "전체 코드 복사")}`}
        </button>
      </div>

      {/* 버튼 — 코드창이 고정 높이라 항상 여기, 스크롤 없이 닿음 */}
      <div style={{ marginTop: 4 }}>
        <SimNav idx={safeIdx} total={total} onIdx={setIdx} accent={accent} showLabels isEn={E} />
      </div>
    </div>
  );
}
