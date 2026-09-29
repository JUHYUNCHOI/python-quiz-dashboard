#!/usr/bin/env python3
"""시뮬 **말풍선 한 걸음**이 너무 길어졌나 — 라운드마다 덧붙다 보면 이렇게 된다.

  python3 scripts/check-sim-bubble-length.py [quest-id ...]

─────────────────────────────────────────────────────────────────────────
왜 생겼나 (2026-09-29)

선생님이 `makedistinct` 5쪽 시뮬 화면을 보시고: *"설명 길어. 뭔말인지 모르겠어."*
그 말풍선은 **네 줄**이었고, 주석을 보니 **세 라운드에 걸쳐 덧붙은** 것이었다 —
  2026-09-23 선생님 지적 → 한 줄 추가
  2026-09-28 선생님 지적 → 한 줄 추가
  2026-09-28 학생 지적  → 한 줄 추가
매번 「한 줄만 더」였는데 합쳐서 네 줄이 됐다.

⚠️ **그래서 더 나빠진 게 길이만이 아니다.** 덧붙이다 보니 **특수한 경우(홀짝)를 먼저
   가르치고 그다음 줄에서 되돌리는** 모양이 됐다. 선생님이 그걸 읽고 반례를 드셨다
   (`2 2 5`, K=3 — 확인해 보니 규칙과 안 어긋난다. **화면이 그렇게 안 읽히게 쓴 것**이다).

⭐ **한 걸음이 길어지는 건 「덧붙여 고쳤다」는 신호다.**
   `feedback_shorter_not_longer`(선생님 세 번 지적): 구멍을 메우는 길은 둘인데
   (더한다 / **그걸 만든 걸 뺀다**) 나는 늘 앞쪽만 썼다.

⚠️ **판정이 아니라 볼 자리 표시다.** 긴 게 정당한 걸음도 있다(결론·정리).
   ⚠️ 0건이 결백이 아니다 — 줄 수만 본다. **순서가 뒤집힌 것**(특수 → 일반)은 못 본다.
      그건 사람이 읽어야 한다.
─────────────────────────────────────────────────────────────────────────
"""
import glob
import io
import json
import os
import re
import sys

MAX_LINES = 3          # 말풍선 한 걸음이 이보다 많은 줄이면 표시
MAX_CHARS = 120        # 또는 한국어 글자가 이보다 많으면

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 시뮬 걸음의 한국어 말풍선 — `ko: "…"` 와 `bubble: t(E, "…", "…")` 두 모양을 본다
KO_FIELD = re.compile(r'\bko:\s*("(?:[^"\\]|\\.)*")')
BUBBLE_T = re.compile(r'\bbubble:\s*t\(\s*E\s*,\s*"(?:[^"\\]|\\.)*"\s*,\s*("(?:[^"\\]|\\.)*")', re.S)
MSG_T = re.compile(r'\bmsg:\s*t\(\s*E\s*,\s*"(?:[^"\\]|\\.)*"\s*,\s*("(?:[^"\\]|\\.)*")', re.S)
BLOCK = re.compile(r"/\*.*?\*/", re.S)


def scan(path):
    src = io.open(path, encoding="utf-8", errors="replace").read()
    # 주석은 뺀다 — 이 저장소는 WHY 주석을 길게 쓰는 게 정상이다
    src = BLOCK.sub(lambda m: re.sub(r"[^\n]", " ", m.group(0)), src)
    src = re.sub(r"^\s*//.*$", "", src, flags=re.M)
    out = []
    for rx in (KO_FIELD, BUBBLE_T, MSG_T):
        for m in rx.finditer(src):
            try:
                ko = json.loads(m.group(1))
            except ValueError:
                continue
            if not re.search(r"[가-힣]", ko):
                continue
            lines = [l for l in ko.split("\n") if l.strip()]
            chars = len(re.findall(r"[가-힣]", ko))
            if len(lines) > MAX_LINES or chars > MAX_CHARS:
                out.append((src[:m.start()].count("\n") + 1, len(lines), chars, lines[0][:46]))
    return out


def main():
    want = set(sys.argv[1:])
    hits, seen = {}, 0
    for f in sorted(glob.glob(os.path.join(ROOT, "quest-problems", "*", "*.jsx"))):
        qid = f.split(os.sep)[-2]
        if want and qid not in want:
            continue
        seen += 1
        got = scan(f)
        if got:
            hits.setdefault(qid, []).extend((os.path.basename(f), *g) for g in got)
    total = sum(len(v) for v in hits.values())
    print(f"시뮬 말풍선 한 걸음이 길다 — {total}곳 · quest {len(hits)}개 "
          f"(기준: {MAX_LINES}줄 초과 또는 한글 {MAX_CHARS}자 초과)\n")
    for qid in sorted(hits, key=lambda q: -len(hits[q]))[:12]:
        print(f"  ■ {qid} — {len(hits[qid])}곳")
        for fn, ln, nl, nc, head in sorted(hits[qid], key=lambda x: -x[2])[:3]:
            print(f"      {fn}:{ln}  {nl}줄 · {nc}자  «{head}…»")
    print("\n⚠️ **판정이 아니라 볼 자리 표시다.** 결론·정리 걸음은 길어도 된다.")
    print("⭐ 길어졌다는 건 대개 **「덧붙여 고쳤다」**는 신호다 —")
    print("   `feedback_shorter_not_longer`: 더하지 말고 **그걸 만든 걸 빼라.**")
    print("⚠️ 0건이 결백이 아니다 — **줄 수만** 본다.")
    print("   «특수한 경우를 먼저 가르치고 되돌리는» 순서 문제는 **사람이 읽어야** 잡는다.")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
