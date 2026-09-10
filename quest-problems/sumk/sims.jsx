// Sum^K (MCC 2023 P6) 용 시뮬 — components.jsx 는 건드리지 않고 여기에만
// (cowsplits / chipxchg / photoshoot25 와 같은 방식).
//
// 원칙 (quest_problem_standard + pain_points):
//   · 학생이 주인공 — 학생 목소리(해요체), 관찰 → 추론
//   · 시뮬로 개념: 작은 예 {1,2,3} 의 7개 부분집합을 직접 세며 (합)^K 누적
//   · Tile/Say/Row/Caption 은 cowsplits/sims.jsx 에서 그대로 가져옴

import { t } from "@/components/quest/theme";
import { useTraceStep, SimShell, StepHeader } from "@/components/quest/TraceStepper";

/* 2026-09-10 — 이 파일의 시뮬 둘은 `SimShell` 을 쓴다. 저장소에서 printseq 다음으로 두 번째다.
   왜 바꿨나: ux 가 좌표로 재보니 **SumkSim 의 ▶ 가 4단계부터 9단계까지 전부**
   모바일 하단 고정 바(top 744) 밑으로 내려가 있었다 — 최대 119px.
   전엔 `paddingBottom: 110` 으로 막아뒀는데, 걸음이 진행되며 누적 표가 한 줄씩 자라
   그 여유분을 도로 잡아먹었다. **고정 숫자로 막으면 내용이 자라는 순간 다시 터진다.**

   `SimShell` (components/quest/TraceStepper.tsx:181) 은 이걸 위해 이미 만들어져 있었다 —
   내용은 화면 높이에 맞춰 안에서 스크롤되고 ▶ 는 항상 밖에 남는다.
   그런데 시뮬이 있는 quest 27개 중 **printseq 하나만** 쓰고 있었다. */

const A = "#8b5cf6";
const PUR = "#8b5cf6", PURBG = "#f5f3ff", PURDK = "#5b21b6";

/* cowsplits/sims.jsx 에서 그대로 — 글자/숫자 타일 */
function Tile({ ch, size = 42, bg = "#fff", bd = "#e2e8f0", fg = "#1f2937", faded = false, badge = null }) {
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center",
      justifyContent: "center", borderRadius: 9, background: bg, border: `2px solid ${bd}`,
      fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: size * 0.5, color: fg,
      opacity: faded ? 0.3 : 1, transition: "all .15s" }}>
      {ch}
      {badge != null && (
        <span style={{ position: "absolute", top: -9, right: -8, minWidth: 17, height: 17, borderRadius: 999,
          background: PUR, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex",
          alignItems: "center", justifyContent: "center", padding: "0 3px", boxShadow: "0 2px 5px rgba(0,0,0,.2)" }}>
          {badge}
        </span>
      )}
    </div>
  );
}

/* 학생 목소리 말풍선 (초록 = 관찰/진행, 노랑 = 막힘, 파랑 = 발견) */
function Say({ children, tone = "go" }) {
  const c = tone === "stuck" ? { bg: "#fffbeb", bd: "#fbbf24", fg: "#92400e" }
          : tone === "aha"   ? { bg: "#eff6ff", bd: "#60a5fa", fg: "#1e40af" }
          : { bg: "#ecfdf5", bd: "#6ee7b7", fg: "#065f46" };
  return (
    <div style={{ maxWidth: 540, margin: "6px auto 16px", padding: "12px 16px", borderRadius: 12,
      background: c.bg, border: `1.5px solid ${c.bd}`, color: c.fg,
      fontSize: 13.5, fontWeight: 700, textAlign: "center", wordBreak: "keep-all", textWrap: "balance", lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

/* 부분집합 칩 한 줄. 칩 하나 = **작은 타일 3개**(자리 고정) + 그 아래 합.

   2026-09-10 선생님: **"차라리 지금 뭐가 담아져 있는지 보여줘. 어떻게 보여줘야할지는 디자이너가"**

   이 자리에서 선생님이 **네 번** 막히셨고 네 번 다 내가 "글자로 어떻게 쓸까" 만 고민했다:
     ① 합만(`0 1 2 3`)  → "갑자기 왜 3?"
     ② 더하기 식(`1+2`) → 두 뜻으로 읽히고, 원소 하나짜리는 `2` 라 첫 칩만 규칙이 달랐다
     ③ 줄 라벨 "2 안 담음" → "2만 빼고 다 있다는건가?"
     ④ 집합 기호(`{1,2}`) → "차라리 지금 뭐가 담아져 있는지 보여줘"
   → 글자를 버린다. 디자이너 실측안: `Tile` 을 16px 로 줄여 **3자리 고정, 켜짐/꺼짐**.
     담긴 것 진하게 · 안 담긴 것 흐리게. 폭 실측 321px < 가용 343px (모바일 한 줄).
   ⚠️ 진한 보라(PUR)는 위쪽 "지금 고르는 차례" 에만 쓰던 색이었다. 여기선 연보라만 쓴다 —
      같은 모양이 두 뜻이 되면 안 된다 (`memory/feedback_same_number_two_meanings.md`). */
/* 2026-09-10 선생님: **"세트는 {}로 하던가 해야할것 같은데"** / **"알아보기가 어려워"**
   타일 사이 2px, 칩 사이 4px 이라 12개가 한 줄로 늘어선 것처럼 보였다 —
   **어디서 한 부분집합이 끝나는지 안 보였다.**

   기획 판정: 이건 글자 `{ }` 로 돌아가자는 게 아니라 **그릇을 달라**는 말이다.
   (이 quest 는 `{1,2}` 중괄호를 이미 여러 곳에서 정의 없이 쓴다. 서술문에 한 번씩이면 문맥이
    뜻을 잡아주지만, 칩 4개 × 여러 걸음으로 밀집시키면 아까 걷어낸 문제가 그대로 재발한다.)

   디자인 판정: **`outline`** 을 쓴다. `border` 와 달리 **레이아웃 폭을 0 먹는다.**
     · 리터럴 `{`·`}` 글자 → 칩당 2글자 × 4칩 = 48~64px 필요. **여유가 18px 뿐이라 불가**
     · 배경 알약 → 좌우 패딩만큼 폭을 먹어 그 18px 를 잠식
     · outline → **폭 0.** 칩 43px 그대로, 줄바꿈 위험 없음
   그리고 그릇은 **각진 상자**, 합은 **완전한 원** — 모양을 갈라 "원 안의 원" 을 피한다. */
function MiniSet({ items, arr, added = null, isNew = false }) {
  /* 2026-09-10 선생님: **"그냥 실제로 담아져 있는것만 보여주면 어떨까? 투 머치 인포같아.
     색도 선명하지 않아서 결국 뭐가 있다는건지 모르겠고"**
     학생 B 도 같은 말을 했다 — "확대해서 보니 진한 칸=담김이 보였는데,
     **실제 화면 크기 그대로면 숫자가 작아서 진하고 흐린 게 구분 잘 안 될 것 같음.**"

     전엔 1·2·3 세 자리를 늘 그리고 **안 담긴 것은 흐리게** 했다.
     자리 고정은 위아래 짝을 맞추려던 것인데, 그 대가로 **화면에 늘 세 배가 떠 있었다.**
     그리고 흐린 회색과 연보라 차이가 13px 에서는 거의 안 보인다.

     → **담긴 것만 그린다.** 대신 **칸(상자)의 폭은 3자리로 고정**해서 짝은 그대로 맞춘다.
       "적게 보이되 자리는 안 흔들린다" — 둘 다 가진다.
       그리고 담긴 타일은 **진한 보라에 흰 글씨**로 확실하게 칠한다. */
  const on = arr.filter((v) => items.includes(v));
  const W = arr.length * 13 + (arr.length - 1) * 2;      // 3자리분 고정 폭
  return (
    <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
      <span style={{ width: W, height: 19, display: "inline-flex", gap: 2, borderRadius: 5,
        alignItems: "center", justifyContent: "center",
        background: isNew ? "#f5f3ff" : "#fff",
        outline: `${isNew ? 2 : 1.5}px solid ${isNew ? PURDK : "#ddd6fe"}`, outlineOffset: 0 }}>
        {on.length === 0 ? (
          <span style={{ fontSize: 9, fontWeight: 800, color: "#cbd5e1" }}>—</span>
        ) : on.map((v) => {
          const isNew = added != null && v === added;
          return (
            <span key={v} style={{ width: 13, height: 13, borderRadius: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 9,
              background: isNew ? PURDK : PUR, color: "#fff" }}>{v}</span>
          );
        })}
      </span>
      <span style={{ minWidth: 20, textAlign: "center", padding: "1px 6px", borderRadius: 999,
        fontSize: 11.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
        background: PURBG, color: PURDK, border: "1.5px solid #c4b5fd" }}>
        {items.reduce((p, v) => p + v, 0)}
      </span>
    </span>
  );
}

/* 지금까지 만든 **부분집합 목록 하나.** 방금 생긴 것은 진하게.

   2026-09-10 선생님: **"1 담음에서 왜 다음 화면에 2로 바뀌지 순간 헷갈렸음.
   원래 {}, {1}, {2}, {1,2} 여야 하는거 아닌가? 뭘하려는거지?"**

   맞다. 그 걸음의 목록은 `{}` `{1}` `{2}` `{1,2}` 네 개인데
   나는 그걸 **"2 안 담음 / 2 담음" 두 줄로 쪼개** 보여주고 있었다.
   두 줄은 **그 걸음에서만 쓰는 임시 장치**다 — 걸음이 넘어가면 라벨의 숫자가 바뀐다.
   그래서 "지금 목록이 뭐냐" 를 화면에서 읽을 수가 없었다.

   → **한 줄로 합친다.** 목록은 하나고, 방금 생긴 절반만 진하다.
     "숫자 하나에 목록이 두 배" 도 이 한 줄에서 그대로 보인다 — 절반이 새것이니까. */
function SubsetList({ subs, arr, added = null }) {
  /* 2026-09-10 선생님: **"2 다음에 이러기 때문에 1,2세트가 생기고 뭔가 더 단계적으로,
     갑자기 두개가 생기니까 뭔가 정보가 확 생기는 느낌"**

     기획·디자인이 따로 냈는데 **같은 답**을 냈다 — **짝을 나란히 놓아라.**
       기획: "새 항목을 목록 끝이 아니라 **부모 바로 옆**에. 렌더 순서만 바꾸면 된다.
              걸음 수 0 증가. 컴포넌트는 이미 부모-자식 관계를 알고 있다."
       디자인: "옛것 전부 → 새것 전부 로 늘어놓으니 **새것만 모인 줄**이 생긴다.
              인터리브하면 4쌍 × 66px = 264px < 343px 로 **한 줄**에 들어가고,
              줄바꿈이 나도 줄마다 짝이 섞여 있어 '완전히 새 줄' 이 안 생긴다."

     전엔 `{},{1},{2},{1,2}` 다음에 `{3},{1,3},{2,3},{1,2,3}` 이 통째로 이어붙었다.
     그래서 `{1,3}` 이 `{1}` 에서 나온 것이라는 걸 **인덱스 암산**으로 찾아야 했다.
     이제 `{} → {3}` · `{1} → {1,3}` 처럼 **짝이 붙어 있다.** */
  if (added == null) {
    return (
      <span style={{ display: "flex", gap: 7, flexWrap: "wrap", justifyContent: "center" }}>
        {subs.map((x, i) => <MiniSet key={i} items={x.items} arr={arr} />)}
      </span>
    );
  }
  const half = subs.length / 2;
  return (
    <span style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
      {subs.slice(0, half).map((x, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "flex-start", gap: 4 }}>
          <MiniSet items={x.items} arr={arr} />
          <span style={{ fontSize: 12, fontWeight: 800, color: PURDK, lineHeight: "19px" }}>→</span>
          <MiniSet items={subs[half + i].items} arr={arr} isNew added={added} />
        </span>
      ))}
    </span>
  );
}

function Row({ children }) {
  return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 6, flexWrap: "wrap" }}>{children}</div>;
}
function Caption({ color, children }) {
  return <div style={{ textAlign: "center", marginTop: 13, fontSize: 13.5, fontWeight: 800, color, fontFamily: "'JetBrains Mono',monospace" }}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════
   SumkSim — [작은 예로 직접] {1,2,3} 의 7개 비어있지 않은 부분집합을
   하나씩 세며 (합)^K 를 누적. K = 2 (제곱).
     {1}→1²=1(누적1) {2}→4(5) {3}→9(14) {1,2}→9(23)
     {1,3}→16(39) {2,3}→25(64) {1,2,3}→36(100)
   ═══════════════════════════════════════════════════════════════ */
export function SumkSim({ E }) {
  const arr = [1, 2, 3];
  const K = 2;
  const subs = [[0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2]];

  // 각 부분집합의 합 / 제곱 / 누적 미리 계산
  const rows = [];
  let run = 0;
  for (const idxs of subs) {
    const sum = idxs.reduce((s, i) => s + arr[i], 0);
    const sq = sum * sum;
    run += sq;
    rows.push({ idxs, sum, sq, run });
  }
  const grand = run; // 100

  const steps = [{ kind: "intro" }, ...subs.map((_, i) => ({ kind: "sub", i })), { kind: "done" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  const setStr = (idxs) => "{" + idxs.map((i) => arr[i]).join(", ") + "}";
  const cur = s.kind === "sub" ? rows[s.i] : null;
  const shownCount = s.kind === "sub" ? s.i + 1 : s.kind === "done" ? rows.length : 0;

  const say =
    s.kind === "intro"
      ? t(E, <>Small case: <b>A = [1, 2, 3]</b>, <b>K = 2</b>. There are <b>7</b> non-empty subsets. For each, take its <b>sum</b>, square it, and add to a <b>running total</b>.</>,
             <>작은 예: <b>A = [1, 2, 3]</b>, <b>K = 2</b>. 비어있지 않은 부분집합은 <b>7개</b>. 각각 <b>원소 합</b>을 구해 <b>제곱</b>하고, <b>누적 합</b>에 더해요.</>)
      : s.kind === "sub"
      ? t(E, <>Subset <b>{setStr(cur.idxs)}</b>: sum = <b>{cur.sum}</b> → <b>{cur.sum}² = {cur.sq}</b> → running total <b>{cur.run}</b>.</>,
             <>부분집합 <b>{setStr(cur.idxs)}</b>: 합 = <b>{cur.sum}</b> → <b>{cur.sum}² = {cur.sq}</b> → 누적 <b>{cur.run}</b>.</>)
      : t(E, <>All 7 done! Add every (sum)² → the answer is <b>{grand}</b>. (This is the sample: <b>3 2 / 1 2 3 → 100</b>.)</>,
             <>7개 끝! 모든 (합)²을 더하면 → 답은 <b>{grand}</b>. (이게 바로 샘플: <b>3 2 / 1 2 3 → 100</b>.)</>);

  return (
    /* 여기 원래 `paddingBottom: 110` 이 있었다 — 모바일에서 ▶ 가 하단 고정 바에 가리길래
       여백을 손으로 준 것이다. 그런데 아래 누적 표가 걸음마다 한 줄씩 자라서
       그 여유분을 도로 먹었고, 4~9단계가 다시 가려졌다(2026-09-10 재발, 최대 119px).
       고정 숫자로는 못 막는다 → SimShell 로 옮겼다. 파일 위 주석 참고. */
    /* maxHeightCss — SimShell 기본값은 `calc(100dvh - 340px)` 인데 이 quest 는 그걸로 부족했다.
       실측: 기본값으로도 5~9단계가 모바일 하단 바를 46px 넘겼다(전엔 119px 넘겼다).
       이 쪽은 카드 위에 제목·파란 바가 더 있어서 340 이 모자란다. 400 으로 재서 맞췄다.
       도구 = `node check-sim-nav.mjs sumk 2` / `sumk 4`. */
    <SimShell idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels
        maxHeightCss="calc(100dvh - 400px)">
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Add (sum)² over all 7 subsets", "7개 부분집합의 (합)² 다 더하기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.kind === "done" ? "aha" : s.kind === "intro" ? "go" : "go"}>{say}</Say>

      {/* 현재 부분집합의 원소 in/out 타일 */}
      {s.kind === "sub" && (
        <>
          {/* "A = [1, 2, 3]" 라벨을 뺐다 — 바로 아래 타일 세 개가 그대로 보여준다.
              모바일에서 아래 누적 목록이 최대 47px 잘리던 자리라 한 줄이라도 아낀다. */}
          <Row>
            {arr.map((v, i) => {
              const inSet = cur.idxs.includes(i);
              return <Tile key={i} ch={v} size={48}
                bg={inSet ? PUR : "#fff"} bd={inSet ? PUR : "#e2e8f0"} fg={inSet ? "#fff" : "#1f2937"}
                faded={!inSet} />;
            })}
          </Row>
          {/* 2026-09-10 — 캡션("합 5 → 5² = 25")을 뺐다.
              바로 위 말풍선이 이미 "부분집합 {2,3}: 합 = 5 → 5² = 25 → 누적 64" 라고 말한다.
              같은 말을 두 번 하면서 세로를 30px 먹었고, 그만큼 아래 목록이 잘렸다. */}
        </>
      )}

      {/* 2026-09-10 — 누적 합 박스를 **목록 위로** 올렸다.
          ux 실측: 모바일에서 걸음이 갈수록 시뮬 안쪽이 잘리는데(4단계 14px → 7단계 127px),
          잘리는 게 하필 **누적 합 박스**였다. 7단계에서는 방금 칠해진 활성 행까지 화면 밖이었다.
          잘릴 거면 지나간 목록이 잘려야지 답이 잘리면 안 된다 — 그래서 순서를 뒤집는다.
          (check-sim-nav.mjs 는 ▶ 버튼만 재서 이걸 못 잡았다. 도구도 같이 고쳤다.) */}
      {/* 누적 합 박스 */}
      <div style={{ maxWidth: 380, margin: "10px auto 0", background: "#fff", border: `1.5px solid #c4b5fd`,
        borderRadius: 10, padding: "9px 14px", textAlign: "center" }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: "#7c3aed", letterSpacing: 0.5 }}>
          {t(E, "RUNNING TOTAL", "누적 합")}
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: PURDK, fontFamily: "'JetBrains Mono',monospace" }}>
          {s.kind === "intro" ? 0 : s.kind === "done" ? grand : cur.run}
        </div>
        {s.kind === "done" && (
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "#15803d", marginTop: 2 }}>
            ✅ {t(E, "answer", "답")} = {grand} {t(E, "(mod 998244353)", "(mod 998244353)")}
          </div>
        )}
      </div>


      {/* 누적 장부 — 7개 부분집합을 세로로, 지나온 것은 색칠 */}
      {/* 2026-09-10 — 줄 높이를 줄였다. 모바일에서 목록이 자라며 최대 127px 이 잘렸다.
          답(누적 합)은 위로 올렸으니 잘려도 치명적이진 않지만, 지나온 계산이 안 보이면
          "직접 세어봐요" 라는 미션 자체가 반쪽이 된다. */}
      <div style={{ maxWidth: 380, margin: "8px auto 0", display: "grid", gap: 2 }}>
        {/* 아직 안 나온 줄은 **그리지도 않는다** (2026-09-08).
            ① 미션이 "직접 세어봐요" 인데 안 지나온 값까지 자리를 차지하면 답을 미리 보여주는 셈이고,
            ② 그 빈 줄들이 세로를 다 먹어서 모바일에서 SimNav 가 하단 고정 바 밑으로 내려갔다.
            둘이 같은 원인이었다 — 한 번에 고친다. 한 줄만 앞서 보여줘서 "다음이 있다" 는 알린다. */}
        {rows.slice(0, Math.min(rows.length, shownCount + 1)).map((r, i) => {
          const passed = i < shownCount;
          const active = s.kind === "sub" && i === s.i;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "1px 11px", borderRadius: 8,
              background: active ? PUR : passed ? PURBG : "#f8fafc",
              border: `1.5px solid ${active ? PURDK : passed ? "#c4b5fd" : "#e2e8f0"}`,
              opacity: passed ? 1 : 0.4, transition: "all .15s" }}>
              {/* 2026-09-10 기획: 이 쪽은 **위에는 타일 문법, 아래 장부는 `{1,2}` 글자 표기**를
                  쓰고 있었다 — 한 쪽 안에서 같은 것을 두 모양으로 부른 셈이다.
                  5쪽 칩과 같은 문법으로 맞춘다. */}
              <span style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <span style={{ display: "inline-flex", gap: 2, borderRadius: 5,
                  background: active ? "rgba(255,255,255,.15)" : "#fff",
                  outline: `1.5px solid ${active ? "rgba(255,255,255,.5)" : "#c4b5fd"}`, outlineOffset: 0 }}>
                  {arr.map((v, z) => {
                    const on = r.idxs.includes(z);
                    return (
                      <span key={z} style={{ width: 13, height: 13, borderRadius: 3,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 9,
                        background: on ? (active ? "#fff" : PURBG) : "transparent",
                        border: `1.5px solid ${on ? (active ? "#fff" : "#c4b5fd") : "transparent"}`,
                        color: on ? (active ? PURDK : PURDK) : (active ? "rgba(255,255,255,.35)" : "#e2e8f0") }}>{v}</span>
                    );
                  })}
                </span>
              </span>
              {/* 2026-09-08 — 안 지나온 줄은 값을 가린다.
                  미션이 "직접 세어봐요" 인데 7개 부분집합의 제곱값이 **처음부터 다 보였다.**
                  그러면 학생은 계산하는 게 아니라 확인만 하게 된다.
                  실제로 학생이 이 쪽을 난이도 1로 매기고 "아까 봤는데 또 나와요" 라고 했다. */}
              <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#ede9fe" : passed ? "#7c3aed" : "#cbd5e1" }}>
                {passed || active ? `${r.sum}² = ${r.sq}` : "? ² = ?"}
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                color: active ? "#fff" : "#15803d", minWidth: 48, textAlign: "right" }}>
                {passed ? `→ ${r.run}` : ""}
              </span>
            </div>
          );
        })}
      </div>

    </SimShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SumkBuildSim — [빠진 다리] 나열하지 않고 답이 자라는 걸 보여준다.

   왜 만들었나 (2026-09-10, 팀 넷이 같은 자리를 짚었다):
     · pedagogy: "3쪽 시뮬은 **부분집합을 통째로 나열**하고, 4쪽은 **원소를 하나씩 넣는다** —
       순회 방식 자체가 다른데 둘이 같은 100 을 낸다는 걸 잇는 문장이 없다."
     · student(초6): **4쪽에서 그만뒀다.** "(옛합 + a)ᵗ 를 이항정리로 펼치면 을 읽는 순간
       뭔 소린지 몰라서 눈으로만 흘려보고 넘겼다. 5쪽 코드는 읽는 척만 했다."
       "4쪽부터는 그림이 하나도 없다."
     · quest-auditor: 이항정리·이항계수·파스칼이 **정의 없이 이름만** 쓰인다.
       `count-quests.py --list untaught` 에 sumk 가 [조합론] 으로 걸린다 —
       레슨·algo 토픽 어디에도 없는 개념이다.

   설계 (project-lead 판정: "이항정리 없이 먼저, 유도는 그 다음"):
     · 이름을 마지막에 붙인다 — 내내 **개수 · 합의 합 · 합²의 합** 이라고 부르고,
       맨 끝에서야 "이 셋을 P[0]·P[1]·P[2] 라고 불러요" 로 잇는다
       (feedback_first_concept_scaffolding.md — 이름은 나중에).
     · 이항정리도 이름을 먼저 대지 않는다. **(2+3)² 를 손으로 펼쳐** 보이고,
       그게 갱신식의 세 항이 되는 걸 눈으로 확인한 뒤에 이름을 준다.
     · 숫자는 전부 이 파일에서 그 자리에 계산한다. 브루트와 대조까지 여기서 한다 —
       화면 숫자가 틀릴 수 없게.

   검산 (2026-09-10, 브루트 대조 완료):
     시작 [1,0,0] → 1 넣고 [2,1,1] → 2 넣고 [4,6,14] → 3 넣고 [8,24,100]
     마지막 100 이 3쪽에서 손으로 구한 그 100 이다. 그게 이 시뮬의 전부다.
   ═══════════════════════════════════════════════════════════════ */
/* 숫자 뒤 조사 — 한국어는 **숫자를 읽은 소리**의 받침으로 정해진다.
   1(일)·3(삼)·6(육)·7(칠)·8(팔)·0(영) → 을 / 2(이)·4(사)·5(오)·9(구) → 를.
   "2 을 넣어요" 로 나오던 것을 고쳤다. */
const EUL = (n) => ("136780".includes(String(n % 10)) ? "을" : "를");   // 일·삼·육·칠·팔·영 = 받침 있음
const EUN = (n) => ("136780".includes(String(n % 10)) ? "은" : "는");   // 같은 규칙의 은/는

/* ═══════════════════════════════════════════════════════════════
   AreaSquare — 한 변이 (x + a) 인 정사각형을 네 조각으로 자른 그림.

   왜 (2026-09-10): 학생 A(초6) —
     "**(a+b)² 전개 자체를 배운 적이 없다.** 초등학교 6학년이 (a+b)²=a²+2ab+b² 를
      증명 없이 받아들이고 그 위에 이항계수·파스칼까지 쌓아 올리는 건 무리라고 느꼈다."
   맞다. 곱셈공식은 중학교 과정이다. 그래서 **식으로 주지 않고 넓이로 보여준다** —
   초6 이 아는 건 "넓이 = 가로 × 세로" 뿐이고, 이 그림엔 그것만 있으면 된다.

   그리고 **똑같은 직사각형이 두 개**라서 계수가 2 다.
   학생 둘이 못 알아본 "늘 2" 이름표가 이 그림에선 아예 필요 없다.

   색은 장부 세 줄과 맞춘다 — 초록 = 합², 파랑 = 합, 보라 = 개수.
   ═══════════════════════════════════════════════════════════════ */
const AC = {
  s2:  { bg: "#d1fae5", bd: "#059669", fg: "#065f46" },   // 합²
  s1:  { bg: "#dbeafe", bd: "#2563eb", fg: "#1e40af" },   // 합
  cnt: { bg: "#ede9fe", bd: "#7c3aed", fg: "#5b21b6" },   // 개수
};
function AreaSquare({ x, a, unit = 27, colored = false }) {
  const W = (x + a) * unit;
  /* 2026-09-10 — 칸 안에 `1×1=1` 을 넣었더니 **27px 칸에 다섯 글자**라 넘쳤다.
     칸에는 **넓이 숫자만** 쓴다. 가로·세로가 바깥에 적혀 있으니 곱셈은 눈으로 보인다.
     합(1+3+3+9=16)은 말풍선이 이미 말한다. */
  const P = [
    { l: 0,        t: 0,        w: x, h: x, tone: "s2",  lab: x * x },
    { l: x * unit, t: 0,        w: a, h: x, tone: "s1",  lab: x * a },
    { l: 0,        t: x * unit, w: x, h: a, tone: "s1",  lab: a * x },
    { l: x * unit, t: x * unit, w: a, h: a, tone: "cnt", lab: a * a },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "18px 0 6px" }}>
      <div style={{ position: "relative", width: W, height: W }}>
        {P.map((p, i) => {
          const c = colored ? AC[p.tone] : { bg: "#f8fafc", bd: "#94a3b8", fg: "#475569" };
          return (
            <div key={i} style={{ position: "absolute",
              left: p.l, top: p.t, width: p.w * unit, height: p.h * unit,
              boxSizing: "border-box", background: c.bg, border: `2px solid ${c.bd}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'JetBrains Mono',monospace", fontWeight: 800,
              fontSize: Math.max(11, unit * 0.42), color: c.fg, transition: "all .2s" }}>
              {p.lab}
            </div>
          );
        })}
        {/* 변 길이 — 한 변이 x + a 라는 걸 글이 아니라 자리로 보인다 */}
        <span style={{ position: "absolute", left: 0, top: -17, width: x * unit,
          textAlign: "center", fontSize: 11, fontWeight: 800, color: "#64748b" }}>{x}</span>
        <span style={{ position: "absolute", left: x * unit, top: -17, width: a * unit,
          textAlign: "center", fontSize: 11, fontWeight: 800, color: "#9a3412" }}>{a}</span>
        <span style={{ position: "absolute", left: -14, top: 0, height: x * unit,
          display: "flex", alignItems: "center", fontSize: 11, fontWeight: 800, color: "#64748b" }}>{x}</span>
        <span style={{ position: "absolute", left: -14, top: x * unit, height: a * unit,
          display: "flex", alignItems: "center", fontSize: 11, fontWeight: 800, color: "#9a3412" }}>{a}</span>
      </div>
    </div>
  );
}

export function SumkBuildSim({ E }) {
  const arr = [1, 2, 3];

  const stages = [];
  let subs = [{ items: [], sum: 0 }];
  stages.push({ a: null, subs: subs.slice() });
  for (const a of arr) {
    subs = [...subs, ...subs.map((x) => ({ items: [...x.items, a], sum: x.sum + a }))];
    stages.push({ a, subs: subs.slice() });
  }
  const ledger = (ss) => ({
    cnt: ss.length,
    s1: ss.reduce((p, x) => p + x.sum, 0),
    s2: ss.reduce((p, x) => p + x.sum * x.sum, 0),
  });

  /* ═══ 걸음 목록 (2026-09-10 재설계 · 코드보다 이 표를 먼저 썼다) ═══════════
     선생님이 이 시뮬 하나에서 **열한 번** 막히셨고, 나는 그때마다 하나씩 고쳤다.
     숲 담당 실측: 그날 커밋 12개 제목이 전부 "~이 없었다 → 넣는다" 이고
     "뺐다" 는 하나뿐이었다. 한 화면 글 덩어리가 **23개**가 됐다.
     이유가 도구에 있었다 — `narr` 은 55자 상한이 있어 못 커지는데
     시뮬 본문엔 상한이 없어서 **"설명 하나 더 붙이기" 가 저항 없는 유일한 길**이었다.

     그래서 이번 규칙: **한 걸음 = 말풍선 1개 + 시각 블록 1개.**
     장부(답 줄)만 상시. 둘이 필요하면 그건 두 걸음이라는 뜻이다.
     pedagogy 가 이 규칙으로 내 초안의 8걸음을 잡아냈다("도형과 장부가 동시에 바뀐다")
     → 8a(색만) / 8b(장부에 두 줄 등장) 로 쪼갰다.

     덜어낸 것: 집합 기호 · 더하기 식 · 장부 밑 식 · 머리말 ·
                "골라 담을 숫자들" 타일 줄 · 알약 범벅 4걸음 · 앞부분 2걸음.
     13걸음 → 10걸음.                                        ═══════════════ */
  const steps = [
    { k: "ask" },
    { k: "stage", i: 1 }, { k: "stage", i: 2 }, { k: "stage", i: 3 },
    { k: "same" },
    { k: "double" },
  ];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];

  /* 넓이 그림에 쓸 값. pedagogy 판정: **되돌아가지 않는다.**
     3 을 담기 직전 상태(1·2 만 정한 상태)를 그대로 쓴다 — 그게 3걸음이 끝난 자리다.
     x = 그 상태의 합 하나(부분집합 {2} 의 합 = 2), a = 지금 담는 수 3.
     검산: (2+3)² = 4 + 6 + 6 + 9 = 25 ✓ */
  const PRE = 2;                                   // 1·2 까지 정한 상태
  const pre = ledger(stages[PRE].subs);
  /* 2026-09-10 학생 A: "7걸음 정사각형 그림의 **4, 6** 이 9걸음 장부의
     **개수 4 · 합 6** 과 **우연히 똑같아서** 둘이 같은 걸 가리키는 줄 착각했다.
     실제론 완전히 다른 것(하나는 예시 그림, 하나는 8개 전체 합계)이었다."
     맞다. x=2 면 조각이 [4, 6, 6, 9] 인데 장부가 [4, 6, 14] 다 — 두 개가 겹친다.
     x 를 1 로 바꾼다: 조각 [1, 3, 3, 9], 장부 [4, 6, 14] — **겹치는 값이 없다.**
     그리고 똑같은 직사각형 두 개(3, 3)가 오히려 더 또렷하다. */
  const AX = 1, AA = arr[PRE];                     // x = 1, a = 3 → (1+3)² = 1+3+3+9 = 16
  const takeS2 = pre.s2 + 2 * AA * pre.s1 + AA * AA * pre.cnt;
  const L2FINAL = ledger(stages[stages.length - 1].subs).s2;   // 100 — 안 담은 쪽 + 담은 쪽

  const stageIdx = s.k === "stage" ? s.i : s.k === "ask" ? 0  : stages.length - 1;
  const st = stages[stageIdx];
  const L = ledger(st.subs);
  const prev = stageIdx > 0 ? ledger(stages[stageIdx - 1].subs) : null;
  const threeRows = false;      // 세 줄은 다음 쪽에서 **필요해질 때** 생긴다

  if (process.env.NODE_ENV !== "production") {
    if (ledger(stages[3].subs).s2 !== 100) console.error("[sumk] 합²의 합이 100 이 아니다");
    if ((AX + AA) ** 2 !== AX * AX + 2 * AX * AA + AA * AA) console.error("[sumk] 넓이 조각 합이 안 맞는다");
    if (pre.s2 + takeS2 !== 100) console.error(`[sumk] 갱신식이 ${pre.s2 + takeS2} 다 — 100 이어야 한다`);
  }

  const say = (() => {
    if (s.k === "ask") return t(E,
      <>Instead of listing every subset, could we just grow <b>the one row below</b>?</>,
      <>부분집합을 다 나열하지 말고, <b>아래 저 한 줄만 키울</b> 순 없을까요?</>);
    if (s.k === "stage") return t(E,
      <><b>1)</b> every subset <b>splits in two</b> — one without <b>{st.a}</b>, one with it. {prev ? prev.cnt : 1} become {L.cnt}.<br />
        <b>2)</b> square every sum and add them up.</>,
      <><b>1)</b> 부분집합 하나하나가 <b>둘로 갈라져요</b> — <b>{st.a}</b>{EUL(st.a)} 안 담은 것과 담은 것. {prev ? prev.cnt : 1}개가 {L.cnt}개가 돼요.<br />
        <b>2)</b> 그 합들을 <b>하나씩 제곱해서 다 더해요.</b></>);
    if (s.k === "same") return t(E,
      <><b>{L.s2}</b> — the number we counted by hand two pages ago.<br />
        (There are {L.cnt} subsets here, not 7: the empty one adds 0² = 0.)</>,
      <><b>{L.s2}</b> — 앞 쪽에서 손으로 세어 구한 그 답이에요.<br />
        (여기 부분집합은 7개가 아니라 {L.cnt}개인데, 빈 것은 0² = 0 만 보태요.)</>);
    /* 2026-09-10 선생님: **"잉? 왜 1,2,4,8?"** / **"무슨 목록 얘기하는지 모르겠어"**
       숫자만 있고 **무엇의 개수인지**가 없었다. 그리고 "목록" 이라는 말은
       1쪽이 정의한 "부분집합" 과 **같은 것을 다르게 부른 것**이었다. 한 이름으로 통일한다. */
    return t(E,
      <>How many subsets we had: <b>1 → 2 → 4 → 8</b>. Doubling, because each one splits in two.<br />
        With 100,000 numbers that is 2¹⁰⁰⁰⁰⁰ — nobody can write them down. So how do we grow that one row? →</>,
      <>부분집합이 몇 개였는지 봐요 — <b>1 → 2 → 4 → 8</b>. 하나하나가 둘로 갈라지니까 두 배씩이에요.<br />
        10만 개면 2¹⁰⁰⁰⁰⁰ 개 — 아무도 다 적을 수 없어요. 그럼 저 한 줄은 어떻게 키우죠? →</>);
    /* 2026-09-10 선생님: **"1 3 3 9?"** / **"뭔말?"**
       다리가 빠져 있었다. "합 1 이 4 가 된다" 다음에 **왜 갑자기 제곱을 하는지**가 없다.
       답에 들어가는 게 (합)² 이라는 건 몇 쪽 전 이야기라 여기서 다시 말해줘야 한다.
       그리고 16 이 장부의 14 와 무슨 상관인지도 — 그건 다음 걸음이 받는다. */
  })();

  const LedgerBox = () => {
    /* 2026-09-10 선생님: **"무슨 순서로 계산을 하는건지"**
       장부 숫자가 1 → 14 → 100 으로 바뀌는데 **어떻게 바뀌는지가 화면에 없었다.**
       (전엔 식이 있었는데 "너무 많은 정보" 지적을 받고 내가 뺐다. 뺄 자리가 아니었다.)
       → 숫자가 **바뀌는 걸음에서만** 식을 보인다. 칩의 합과 1:1 로 이어진다:
         `0²+1²+2²+3² = 14` 의 0·1·2·3 이 바로 위 칩 네 개의 합이다. */
    const sq = st.subs.map((x) => `${x.sum}²`).join("+");
    const pl = st.subs.map((x) => x.sum).join("+");
    const all = [
      { lab: t(E, "how many subsets", "부분집합 개수"), name: "P[0]", v: L.cnt, p: prev && prev.cnt, tone: "cnt", ex: null },
      { lab: t(E, "each sum, added up", "각 합을 더한 것"), name: "P[1]", v: L.s1, p: prev && prev.s1, tone: "s1", ex: pl },
      { lab: t(E, "each sum SQUARED, added up", "각 합을 제곱해서 더한 것"), name: "P[2]", v: L.s2, p: prev && prev.s2, tone: "s2", ex: sq },
    ];
    const rowsOut = threeRows ? all : [all[2]];
    return (
      <div style={{ maxWidth: 340, margin: "10px auto 0", display: "grid", gap: 4 }}>
        {rowsOut.map((r) => {
          const changed = s.k === "stage" && r.p !== r.v;
          const isAnswer = r.name === "P[2]" && ["same", "fast"].includes(s.k);
          const c = AC[r.tone];
          /* `rows` 걸음에서만 장부가 넓이 그림과 **색으로** 이어진다.
             그 전에는 색을 안 쓴다 — 색이 미리 있으면 무슨 뜻인지 모른 채 보게 된다. */
          const painted = threeRows;
          return (
            <div key={r.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", borderRadius: 9,
              background: painted ? c.bg : isAnswer ? "#ecfdf5" : changed ? PURBG : "#f8fafc",
              border: `1.5px solid ${painted ? c.bd : isAnswer ? "#6ee7b7" : changed ? PUR : "#e2e8f0"}` }}>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: painted ? c.fg : "#475569", wordBreak: "keep-all" }}>
                {r.lab}
                {r.ex && s.k === "stage" && (
                  <span style={{ display: "block", fontSize: 9.5, fontWeight: 700, color: "#94a3b8",
                    fontFamily: "'JetBrains Mono',monospace", marginTop: 1, wordBreak: "break-all" }}>
                    {r.ex}
                  </span>
                )}
              </span>
              {/* 2026-09-10 학생 A: "5쪽 마지막 걸음에 **P[0], P[1], P[2] 라는 이름이
                  아무 설명 없이 튀어나왔다**(6쪽에서야 뒤늦게 설명됨)." 맞다. 이름은 6쪽 몫이다. */}
              <span style={{ minWidth: 44, textAlign: "right", fontSize: 15, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace", color: painted ? c.fg : isAnswer ? "#15803d" : changed ? PURDK : "#1f2937" }}>
                {r.v}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <SimShell idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels
      maxHeightCss="calc(100dvh - 400px)">
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Grow the answer without listing", "나열하지 않고 답 키우기")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.k === "double" ? "stuck" : ["same", "rows", "fast"].includes(s.k) ? "aha" : "go"}>{say}</Say>

      <LedgerBox />

      {/* 이번 걸음의 블록 **하나**. 칩이거나, 넓이 그림이거나, 아무것도 아니거나. */}
      {/* 2026-09-10 선생님: **"목록이 매번 두배?"**
          이 걸음은 8개짜리 목록을 **정지 상태로** 보여주면서 "매번 두 배" 라고 말했다.
          두 배가 되던 과정은 2~4걸음에 있었는데 **여기선 이미 사라진 뒤**다 —
          화면이 앞 쪽 기억에 기대고 있었다(`memory/feedback_screen_must_not_rely_on_memory.md`).
          → 칩 8개를 빼고 **개수가 자라온 자취**를 놓는다. 그게 증거다. */}
      {s.k === "double" && (
        <div style={{ maxWidth: 340, margin: "16px auto 0" }}>
          {/* 2026-09-10 선생님: "잉? 왜 1,2,4,8?" — 숫자만 있고 무엇의 개수인지가 없었다. */}
          <div style={{ fontSize: 10.5, fontWeight: 800, color: "#64748b", textAlign: "center",
            marginBottom: 7, wordBreak: "keep-all" }}>
            {t(E, "how many subsets", "부분집합 개수")}
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6 }}>
            {stages.map((g, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "flex-end", gap: 6 }}>
                {i > 0 && (
                  <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center",
                    fontSize: 9.5, fontWeight: 800, color: PURDK, paddingBottom: 4 }}>
                    {/* 2026-09-10 디자인: 화살표 라벨의 "1·2·3"(방금 담은 **원소**)이
                        옆 칩의 "1·2·4·8"(부분집합 **개수**)과 같은 모양이라 뜻이 겹쳤다.
                        원소는 칩 안 타일과 같은 **네모**로 그려 개수(둥근 상자)와 가른다. */}
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
                      <span style={{ width: 13, height: 13, borderRadius: 3, display: "flex",
                        alignItems: "center", justifyContent: "center", background: PUR, color: "#fff",
                        fontFamily: "'JetBrains Mono',monospace", fontWeight: 800, fontSize: 9 }}>{g.a}</span>
                      <span>{t(E, "in", "담기")}</span>
                    </span>
                    <span style={{ fontSize: 13 }}>→</span>
                  </span>
                )}
                <span style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <span style={{ minWidth: 30, textAlign: "center", padding: "4px 8px", borderRadius: 8,
                    fontSize: 14, fontWeight: 800, fontFamily: "'JetBrains Mono',monospace",
                    background: i === stages.length - 1 ? PUR : PURBG,
                    color: i === stages.length - 1 ? "#fff" : PURDK,
                    border: `1.5px solid ${i === stages.length - 1 ? PURDK : "#c4b5fd"}` }}>
                    {ledger(g.subs).cnt}
                  </span>
                </span>
              </span>
            ))}
          </div>
          <Caption color={PURDK}>
            {t(E, "every subset splits in two — so it doubles",
                 "하나하나가 둘로 갈라지니까 두 배")}
          </Caption>
        </div>
      )}

      {(s.k === "stage" || s.k === "same") && (
        <div style={{ maxWidth: 380, margin: "14px auto 0" }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: "#64748b", textAlign: "center",
            marginBottom: 7, wordBreak: "keep-all" }}>
            {t(E, `${L.cnt} subsets now`, `지금 부분집합 ${L.cnt}개`)}
            {s.k === "stage" && (
              <b style={{ color: PURDK }}>
                {t(E, ` · bold = just made by putting ${st.a} in`, ` · 진한 것 = 방금 ${st.a}${EUL(st.a)} 담아 생긴 것`)}
              </b>
            )}
          </div>
          <SubsetList subs={st.subs} arr={arr} added={s.k === "stage" ? st.a : null} />
        </div>
      )}

    </SimShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SumkAreaSim — [새 쪽] 왜 세 줄이면 되는지, 넓이 그림으로.

   2026-09-10 재설계. 이 걸음들은 원래 앞 쪽 시뮬(`SumkBuildSim`) 안에 있었다.
   선생님이 그 시뮬에서만 **열 번 넘게** 막히셨고, 검토가 원인을 이렇게 냈다:

     디자인: "한 시뮬에서 배워야 하는 **'보는 법' 이 5개**다. 그리고 칩(이산)에서
              넓이(연속)로 **그림이 통째로 갈아치워지는데** 잇는 근거가 말풍선뿐이다."
     디자인(실측): 저장소 관례는 **시뮬당 2개** — rectangles 19걸음짜리도 2개,
              gifts·printseq 는 1개. 어휘를 처음 세우는 쪽만 3~4개.
     기획: "앞 쪽이 반드시 할 일은 '원소 하나가 들어올 때 답이 어떻게 커지는지' 다.
              **왜 2ab 인지는 그 일의 증명이지 그 일 자체가 아니다.** 옮기지 말고 **쪼개라.**"

   디자인은 "기존 공식 쪽에 넣으면 520~530px 라 넘친다" 고 했는데,
   기획 안은 **새 쪽**이라 그 제약이 안 걸린다 — 두 판정이 서로를 푼다.

   여기 보는 법은 **정사각형 하나**다(장부는 앞 쪽에서 이어진 것).
   ═══════════════════════════════════════════════════════════════ */
export function SumkAreaSim({ E }) {
  const arr = [1, 2, 3];
  const stages = [];
  let subs = [{ items: [], sum: 0 }];
  stages.push({ a: null, subs: subs.slice() });
  for (const a of arr) {
    subs = [...subs, ...subs.map((x) => ({ items: [...x.items, a], sum: x.sum + a }))];
    stages.push({ a, subs: subs.slice() });
  }
  const ledger = (ss) => ({
    cnt: ss.length,
    s1: ss.reduce((p, x) => p + x.sum, 0),
    s2: ss.reduce((p, x) => p + x.sum * x.sum, 0),
  });
  const PRE = 2;                       // 1·2 까지 담기로 정한 상태
  const pre = ledger(stages[PRE].subs);
  const AX = 1, AA = arr[PRE];         // x = 1 (부분집합 {1} 의 합), a = 3
  const takeS2 = pre.s2 + 2 * AA * pre.s1 + AA * AA * pre.cnt;
  const FINAL = ledger(stages[stages.length - 1].subs).s2;

  if (process.env.NODE_ENV !== "production") {
    if ((AX + AA) ** 2 !== AX * AX + 2 * AX * AA + AA * AA) console.error("[sumk] 넓이 조각 합이 안 맞는다");
    if (pre.s2 + takeS2 !== FINAL) console.error(`[sumk] 갱신식이 ${pre.s2 + takeS2} 다 — ${FINAL} 이어야 한다`);
    /* ⚠️ 정사각형 조각 값이 장부 값과 **겹치면 안 된다.**
       2026-09-10 학생: "조각의 4, 6 이 장부의 개수 4 · 합 6 과 우연히 같아서
       둘이 같은 걸 가리키는 줄 착각했다." x=1 이면 조각 [1,3,3,9] 로 안 겹친다. */
    const pieces = [AX * AX, AX * AA, AA * AX, AA * AA];
    const led = [pre.cnt, pre.s1, pre.s2];
    const clash = pieces.filter((v) => led.includes(v));
    if (clash.length) console.error(`[sumk] 조각 ${clash} 가 장부 값과 겹친다 — x 를 바꿔라`);
  }

  const steps = [{ k: "area" }, { k: "color" }, { k: "rows" }, { k: "fast" }];
  const ts = useTraceStep(steps);
  const s = steps[ts.safe];
  const threeRows = ["rows", "fast"].includes(s.k);

  const say = (() => {
    /* 되감았다고 **먼저 말하고**, 어느 부분집합의 합인지 칩을 옆에 살려둔다.
       기획: "'합 1' 의 1 이 화면 어디에도 없다" · 디자인: "100 → 14 역행에 이름표가 없다" */
    if (s.k === "area") return t(E,
      <>⏪ Back to just before <b>{AA}</b> went in — {pre.cnt} subsets, squares adding to {pre.s2}.<br />
        Take the one below, sum <b>{AX}</b>. Putting {AA} in makes it <b>{AX + AA}</b>, and the answer needs it <b>squared</b>: {AX + AA}² = <b>{(AX + AA) ** 2}</b>.</>,
      <>⏪ <b>{AA}</b>{EUL(AA)} 담기 <b>직전</b>으로 되돌아가요 — 부분집합 {pre.cnt}개, 합²의 합 {pre.s2}.<br />
        아래 그 하나, 합이 <b>{AX}</b> 예요. {AA}{EUL(AA)} 담으면 <b>{AX + AA}</b> 가 되고, 답엔 그걸 <b>제곱</b>해서 넣어요 — {AX + AA}² = <b>{(AX + AA) ** 2}</b>.</>);
    /* 색이 무엇을 뜻하는지 **이 프레임에서** 말한다. 전엔 다음 걸음에서야 나왔다. */
    if (s.k === "color") return t(E,
      <>Three kinds of piece, and each is one of our rows:<br />
        <b style={{ color: AC.s2.fg }}>green = sum²</b> · <b style={{ color: AC.s1.fg }}>blue = sum</b> (two identical ones!) · <b style={{ color: AC.cnt.fg }}>purple = just count</b></>,
      <>조각이 세 종류인데, 하나하나가 우리 줄이에요 —<br />
        <b style={{ color: AC.s2.fg }}>초록 = 합²</b> · <b style={{ color: AC.s1.fg }}>파랑 = 합</b> (똑같은 게 <b>두 개</b>!) · <b style={{ color: AC.cnt.fg }}>보라 = 개수</b></>);
    /* 디자인: "14 + 36 + 36 = 86 인데 답은 100." 담은 쪽만 쪼개 놓고
       **안 담은 쪽 14 를 다시 더한다는 말을 안 했다.** 끝까지 잇는다. */
    if (s.k === "rows") return t(E,
      <>All {pre.cnt} sums split the same way. Add each colour over all of them:<br />
        <b style={{ color: AC.s2.fg }}>{pre.s2}</b> + <b style={{ color: AC.s1.fg }}>2×{AA}×{pre.s1} = {2 * AA * pre.s1}</b> + <b style={{ color: AC.cnt.fg }}>{AA}²×{pre.cnt} = {AA * AA * pre.cnt}</b> = {takeS2} — the <b>put-in</b> side.<br />
        The <b>left-out</b> side is still {pre.s2}. So {pre.s2} + {takeS2} = <b>{FINAL}</b> ✓</>,
      <>합 {pre.cnt}개가 다 이렇게 갈라져요. 색깔별로 전부 더하면 —<br />
        <b style={{ color: AC.s2.fg }}>{pre.s2}</b> + <b style={{ color: AC.s1.fg }}>2×{AA}×{pre.s1} = {2 * AA * pre.s1}</b> + <b style={{ color: AC.cnt.fg }}>{AA}²×{pre.cnt} = {AA * AA * pre.cnt}</b> = {takeS2} — 이게 <b>담은 쪽</b>.<br />
        <b>안 담은 쪽</b>은 {pre.s2} 그대로니까, {pre.s2} + {takeS2} = <b>{FINAL}</b> ✓</>);
    /* "30만 번" 은 과소평가였다(감사). 고칠 칸 30만 · 곱셈 60만.
       "0.4초" 는 K=3 실측치다(직접 세 번 돌려 0.42~0.45초). K 를 밝힌다. */
    return t(E,
      <><b>So why is it fast?</b> We never write the subsets down — three rows are enough.<br />
        100,000 numbers = 300,000 cells, about 600,000 multiplications. Not 2¹⁰⁰⁰⁰⁰. Really runs in <b>0.4 s</b> (K = 3).</>,
      <><b>그래서 왜 빠른가요?</b> 부분집합을 적어두지 않아요 — 세 줄이면 되니까요.<br />
        10만 개면 고칠 칸 30만, 곱셈 60만 번쯤. 2¹⁰⁰⁰⁰⁰ 이 아니라요. 실제로 <b>0.4초</b> (K = 3).</>);
  })();

  const rowsOut = [
    { lab: t(E, "how many subsets", "부분집합 개수"), v: pre.cnt, tone: "cnt" },
    { lab: t(E, "each sum, added up", "각 합을 더한 것"), v: pre.s1, tone: "s1" },
    { lab: t(E, "each sum SQUARED, added up", "각 합을 제곱해서 더한 것"), v: pre.s2, tone: "s2" },
  ];

  return (
    <SimShell idx={ts.idx} total={ts.total} onIdx={ts.setIdx} accent={A} isEn={E} showLabels
      maxHeightCss="calc(100dvh - 400px)">
      <StepHeader accent={A} idx={ts.safe} total={steps.length} isEn={E}
        title={t(E, "Why three rows are enough", "왜 세 줄이면 되나")}
        subtitle={`(${ts.safe + 1} / ${steps.length})`} />
      <Say tone={s.k === "rows" || s.k === "fast" ? "aha" : "go"}>{say}</Say>

      {/* 장부 — `rows` 부터 세 줄. 그전엔 우리가 원하는 한 줄만. */}
      <div style={{ maxWidth: 340, margin: "10px auto 0", display: "grid", gap: 4 }}>
        {(threeRows ? rowsOut : [rowsOut[2]]).map((r) => {
          const c = AC[r.tone];
          return (
            <div key={r.lab} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px",
              borderRadius: 9, background: threeRows ? c.bg : "#f8fafc",
              border: `1.5px solid ${threeRows ? c.bd : "#e2e8f0"}` }}>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 700, wordBreak: "keep-all",
                color: threeRows ? c.fg : "#475569" }}>{r.lab}</span>
              <span style={{ minWidth: 44, textAlign: "right", fontSize: 15, fontWeight: 800,
                fontFamily: "'JetBrains Mono',monospace", color: threeRows ? c.fg : "#1f2937" }}>{r.v}</span>
            </div>
          );
        })}
      </div>

      {s.k !== "fast" && (
        <>
          {/* 기획: "'합 1' 의 1 이 화면 어디에도 없다" — 그 부분집합을 그림 옆에 살려둔다. */}
          {s.k !== "rows" && (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 12 }}>
              <MiniSet items={[AX]} arr={arr} />
              <span style={{ fontSize: 10.5, fontWeight: 700, color: "#64748b", wordBreak: "keep-all" }}>
                {t(E, `this one, sum ${AX}`, `이 부분집합, 합 ${AX}`)}
              </span>
            </div>
          )}
          <AreaSquare x={AX} a={AA} colored={s.k !== "area"} unit={s.k === "rows" ? 15 : 27} />
        </>
      )}
    </SimShell>
  );
}
