#!/usr/bin/env python3
"""quest 가 고칠 때마다 **늘기만** 하는지를 잰다 — 회귀 검사, 절대 상한 아님.

왜 (2026-09-23, PM 판정 — `.claude/WORK.md` 「✂️ 길이」):
  선생님 *"난 퀴즈 많고 설명 긴거 싫어. 쇼츠에 익숙한 애들이 저걸 다 읽겠어"*
  → *"학생들이랑 선생님들은 뭐하는거지? 이걸 그냥 통과시켰다고?"*

  `strangefn` 이 한 세션에 10쪽 → 17쪽이 됐다. 매 라운드가 학생 지적을
  정직하게 고친 것이었는데 **고치는 방향이 «더 붙이기» 뿐**이었다 — 직전 커밋
  8개가 전부 순증가(삭제 없이 늘기만)였다. `check-narr-length.py` 는 파란 줄
  **한 줄**만 잰다. **쪽 수·클릭 수·퀴즈 수는 어떤 검사기도 안 쟀다.**

  PM: repo 180개 quest 쪽 수 — 중앙값 6 · p75 8 · p90 14. 그런데 `mixmilk`(17쪽) ·
  `moohunt`(8쪽·32클릭)처럼 **큰 수가 정당한 경우가 실재**한다. 단일 절대
  상한("10쪽 이하")은 오탐이 난다 → **「고친 뒤 늘었으면 크게 떠든다」가 맞다.
  막지는 않는다.**

무엇을 재나 (정적 — quest 하나 열지 않고 `chapters.jsx` 만 읽는다):
  · pages       — `type: "..."` 개수. 학생 화면의 스텝 객체 하나 = 페이지 하나.
                  (MooHuntApp.jsx 류 러너가 `steps[cur]` 로 그 배열을 그대로 넘긴다 —
                  실측: 180개 중 178개가 `type:` 개수와 `narr:` 개수가 정확히 같다.)
  · quiz_input  — `type: "quiz"` + `type: "input"` 개수
                  + **`<NumInput` · `<Quiz` JSX 태그 등장 횟수** (2026-09-23 확장).
                  「퀴즈 많고」 를 직접 잰다.

  ⚠️ 2026-09-23 왜 넓혔나 — `strangefn` 은 reveal 스텝 안에 `<NumInput>` 을
    다섯 개 박아 써서 `type: "quiz"/"input"` 이 하나도 안 잡혔다. 선생님이
    «퀴즈 많다» 고 하신 바로 그 quest 가 **quiz_input: 0** 으로 나왔다 —
    검사기가 하필 이 건을 못 잡는 구멍이었다.
    실측(2026-09-23): `<NumInput`·`<Quiz` 태그가 `chapters.jsx` 에 있는 quest 는
    180개 중 **strangefn 하나뿐**이다(`<Quiz` 는 컴포넌트로 쓰이는 자리가
    없고 주석("Quiz")뿐이라 안 걸린다). 그래서 이 확장으로 값이 바뀐 quest 는
    strangefn 하나 — `quiz_input: 0 → 5`. 다른 179개는 그대로다.

⚠️ **글자 수는 일부러 안 넣는다.** 이 저장소는 WHY 주석을 강하게 요구한다
  (CLAUDE.md 곳곳 · 이 파일 자체가 그 증거). 파일 전체 한글 글자 수를 재면
  "이유를 한 줄 더 남겼다" 가 "설명이 늘었다" 로 잘못 잡힌다 — **흔들리는 잣대는
  안 쓴다는 게 PM 지시("재기 쉬운지, 흔들리지 않는지")의 판정이다.**
  그래서 `--verbose` 로 참고 삼아 보여주기만 하고, 늘었다 판정에는 안 쓴다.

무엇을 재나 (동적 — 서버가 떠 있을 때만, quest 하나씩):
  · clicks      — `see-flow.mjs` 가 이미 재는 "눌러야 하는 횟수" 를 그대로 가져온다.
                  시뮬 서브 단계는 파일만 읽어선 못 센다(런타임 상태) — 그래서 이것만 동적이다.
                  180개를 전부 브라우저로 열면 느리다 → **그 quest 를 고쳤을 때만** 갱신한다.

스냅샷은 **커밋되는 파일** `scripts/quest-length-snapshot.json` 에 둔다.
세션이 바뀌어도 "직전" 이 안 사라져야 다음에도 잡는다.

판정 방식 — **래칫(ratchet)**. 절대 상한이 아니라 "이전 기록보다 늘었나" 만 본다:
  · 늘었다  → 크게 떠들고 **스냅샷은 그대로 둔다** (다음 실행에도 계속 걸리게).
             조용히 정상화하면 "늘려놓고 검사기가 알아서 봐주는" 구멍이 생긴다.
  · 줄었거나 같다 → 스냅샀을 새 값으로 낮추고 조용히 지나간다(짧은 한 줄).
  · 처음 보는 quest → 지금 값을 기준선으로 등록한다(경고 없음).

쓰는 법:
  python3 scripts/check-quest-length-regression.py                 # 180개 전부, 정적 지표만
  python3 scripts/check-quest-length-regression.py moohunt          # 하나만
  python3 scripts/check-quest-length-regression.py moohunt --verbose
  python3 scripts/check-quest-length-regression.py moohunt \
      --clicks http://localhost:3000/quest/moohunt                 # + 클릭 수 실측(서버 필요)
  python3 scripts/check-quest-length-regression.py --accept moohunt
      # PM이 "이 늘어난 값은 승인" 한 뒤 기준선을 지금 값으로 올린다. 자동으로는 절대 안 한다.

종료 코드: 늘어난 quest 가 하나라도 있으면 1, 아니면 0.
"""
import io
import json
import re
import subprocess
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUEST_DIR = ROOT / "quest-problems"
SNAPSHOT_PATH = ROOT / "scripts" / "quest-length-snapshot.json"

TYPE_RE = re.compile(r'type:\s*"([A-Za-z0-9_-]+)"')
HANGUL_RE = re.compile(r"[가-힣]")
# 2026-09-23: type: "quiz"/"input" 스텝 밖에서 쓰는 퀴즈성 JSX 태그도 센다.
# (strangefn 이 reveal 스텝 안에 <NumInput> 을 박아 써서 type: 카운트가 0 으로 나온 구멍)
NUMQUIZ_TAG_RE = re.compile(r"<(?:NumInput|Quiz)\b")


def all_quest_ids():
    return sorted(
        d.name for d in QUEST_DIR.iterdir()
        if d.is_dir() and (d / "chapters.jsx").exists()
    )


def measure_static(qid):
    """chapters.jsx 만 읽어서 pages · quiz_input · (참고용) korean_chars 를 센다."""
    f = QUEST_DIR / qid / "chapters.jsx"
    if not f.exists():
        return None
    text = io.open(f, encoding="utf-8").read()
    types = TYPE_RE.findall(text)
    pages = len(types)
    quiz_input = sum(1 for t in types if t in ("quiz", "input"))
    quiz_input += len(NUMQUIZ_TAG_RE.findall(text))
    korean_chars = len(HANGUL_RE.findall(text))  # 참고용, 판정에는 안 씀 (주석 섞임)
    return {"pages": pages, "quiz_input": quiz_input, "korean_chars_ref": korean_chars}


def measure_clicks(url):
    """see-flow.mjs 를 돌려 '눌러야 하는 횟수' 를 가져온다. 서버가 떠 있어야 한다."""
    try:
        r = subprocess.run(
            ["node", str(ROOT / "scripts" / "see-flow.mjs"), url],
            capture_output=True, text=True, timeout=120, cwd=str(ROOT),
        )
    except (subprocess.TimeoutExpired, FileNotFoundError) as e:
        print(f"  🚨 see-flow.mjs 실행 실패: {e}")
        return None
    out = r.stdout + r.stderr
    m = re.search(r"눌러야 하는 횟수:\s*(\d+)회", out)
    if not m:
        print("  🚨 see-flow.mjs 출력에서 '눌러야 하는 횟수' 를 못 찾았다 — 서버가 안 떠 있거나 화면이 안 떴을 수 있다.")
        print("     이 값은 못 믿는다. clicks 는 갱신하지 않는다.")
        return None
    return int(m.group(1))


def load_snapshot():
    if not SNAPSHOT_PATH.exists():
        return {}
    return json.loads(SNAPSHOT_PATH.read_text(encoding="utf-8"))


def save_snapshot(snap):
    ordered = {k: snap[k] for k in sorted(snap)}
    SNAPSHOT_PATH.write_text(
        json.dumps(ordered, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )


METRIC_LABEL = {"pages": "쪽 수", "quiz_input": "퀴즈+입력 수", "clicks": "클릭 수"}


def check_one(qid, snap, verbose=False, click_url=None, accept=False):
    """하나의 quest 를 재고, 스냅샷과 대조하고, 스냅샷을 갱신한다.
    반환: True = 늘어난 게 있었다 (호출부가 exit code 에 반영)."""
    cur = measure_static(qid)
    if cur is None:
        print(f"⚠️  {qid}: chapters.jsx 를 못 읽었다 — 건너뜀")
        return False

    if click_url:
        c = measure_clicks(click_url)
        if c is not None:
            cur["clicks"] = c

    prev = snap.get(qid)
    if prev is None:
        snap[qid] = cur
        if verbose:
            print(f"🆕 {qid}: 처음 봄 — 기준선 등록 {cur}")
        return False

    if accept:
        merged = {**prev, **cur}
        snap[qid] = merged
        print(f"✅ {qid}: 기준선을 지금 값으로 올렸다(승인됨) {merged}")
        return False

    grew = []
    for key in ("pages", "quiz_input", "clicks"):
        if key in cur and key in prev and cur[key] > prev[key]:
            grew.append((key, prev[key], cur[key]))

    if grew:
        print(f"🚨 {qid} 가 늘었다 — 「고친 뒤 늘었으면 후퇴다」 (memory/feedback_shorter_not_longer.md)")
        for key, o, n in grew:
            print(f"     {METRIC_LABEL[key]}: {o} → {n}")
        print("     PM 이 승인한 늘림이면 `--accept` 로 기준선을 올려라. 아니면 빼낼 곳부터 찾아라.")
        # 늘어난 지표는 스냅샷에 반영하지 않는다 — 다음 실행에도 계속 걸리게.
        # 줄지 않은/새로 생긴 다른 지표(clicks 처음 측정 등)만 채워 넣는다.
        for key, val in cur.items():
            if key not in prev:
                snap[qid][key] = val
        return True

    # 안 늘었다 — 줄었으면 조용히 낮추고, 같으면 그대로.
    shrank = [
        (key, prev[key], cur[key])
        for key in ("pages", "quiz_input", "clicks")
        if key in cur and key in prev and cur[key] < prev[key]
    ]
    snap[qid] = {**prev, **cur}
    if shrank and verbose:
        for key, o, n in shrank:
            print(f"   {qid}: {METRIC_LABEL[key]} 줄었다 {o} → {n} (기준선 낮춤)")
    return False


def main():
    argv = sys.argv[1:]
    verbose = "--verbose" in argv
    if verbose:
        argv.remove("--verbose")

    accept_id = None
    if "--accept" in argv:
        i = argv.index("--accept")
        accept_id = argv[i + 1]
        del argv[i:i + 2]

    click_url = None
    if "--clicks" in argv:
        i = argv.index("--clicks")
        click_url = argv[i + 1]
        del argv[i:i + 2]

    target_ids = [a for a in argv if not a.startswith("--")]

    snap = load_snapshot()
    t0 = time.time()

    if accept_id:
        target_ids = [accept_id]

    if target_ids:
        ids = target_ids
    else:
        ids = all_quest_ids()
        if click_url:
            print("⚠️  --clicks 는 quest 하나를 지정할 때만 쓴다 (180개를 브라우저로 다 열면 느리다). 무시한다.")
            click_url = None

    if click_url and len(ids) != 1:
        print("⚠️  --clicks 는 quest id 를 정확히 하나 줄 때만 쓴다.")
        sys.exit(2)

    any_grew = False
    for qid in ids:
        grew = check_one(
            qid, snap, verbose=verbose, click_url=click_url,
            accept=(accept_id == qid),
        )
        any_grew = any_grew or grew

    save_snapshot(snap)
    dt = time.time() - t0

    if not target_ids:
        n_grew = sum(
            1 for qid in ids
            if qid in snap  # (요약용 재확인은 위 루프에서 이미 출력했다)
        )
        print(f"\n{len(ids)}개 quest 정적 스캔 — {dt:.2f}초.")
        if not any_grew:
            print("늘어난 quest 없음. (스크린으로 직접 보는 건 대체 못 한다 — 이 검사기는 «쪽 수·퀴즈 수» 만 본다.)")

    sys.exit(1 if any_grew else 0)


if __name__ == "__main__":
    main()
