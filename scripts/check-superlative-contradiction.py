#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""한 조각 안에서 **「가장 큰」과 「가장 작은」이 엇갈리나** — 자기모순 라벨 찾기.

왜 생겼나 (2026-10-01):
  `mcc20missing` 🚀 상자의 꼬리표가 **「가장 큰 수가 MIN」** 이었다.
  그 줄 출력은 `11 12 7` 이고 강조된 건 7 — **제일 작은 수**다.
  **학생(초6)이 찾았다.** 기계 검사 7개가 전부 통과했고 담당 둘이 독립 판정했는데도 샜다.
  선생님: *"도대체 뭔말인지 모르는것들이 있어."*

  이 결함은 **「어려운 말」도 「정의 없는 말」도 아니다** — 낱말은 전부 쉽고 정의도 돼 있다.
  **글자 그대로 자기모순**이다. 그래서 어느 그물에도 안 걸렸다.

무엇을 보나 — **아주 좁게**:
  화면 글 한 조각 안에 「큰 쪽을 가리키는 말」과 「작은 쪽을 가리키는 말」이
  **둘 다** 있는 자리. 그게 다다.

⛔ **판정이 아니다. 볼 자리 표시다.**
  정당한 자리가 많다 — *"가장 큰 값과 가장 작은 값을 찾아요"* 는 맞는 문장이다.
  그래서 **둘이 「~가/는 ~이다」로 이어진** 모양에 가중치를 둬 따로 센다.

⚠️ 원리상 못 보는 것: 모순이 **조각 두 개에 걸쳐** 있으면 못 본다
  (`check-jsx-joined-text` 와 같은 한계). 그리고 「가장 큰 크기가 MIN」처럼
  **뜻이 맞는 경우**(크기가 가장 큰 수가 최솟값 자리에 앉는다)도 걸린다 —
  이게 바로 사람이 읽어야 하는 까닭이다.

쓰기:
  python3 scripts/check-superlative-contradiction.py [quest-id ...]
  python3 scripts/check-superlative-contradiction.py --selftest
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QDIR = os.path.join(ROOT, "quest-problems")

# 큰 쪽 / 작은 쪽을 가리키는 말. **짧고 분명한 것만** 넣는다.
BIG = [
    "가장 큰", "제일 큰", "가장 많은", "제일 많은", "최댓값", "최대값", "최대",
    "MAX", "biggest", "largest", "maximum",
]
SMALL = [
    "가장 작은", "제일 작은", "가장 적은", "제일 적은", "최솟값", "최소값", "최소",
    "MIN", "smallest", "minimum", "fewest",
]
# 「A 가 B 다」로 **이어진** 모양 — 모순일 가능성이 훨씬 높다
LINK = re.compile(
    r"(가|이|는|은)\s*(MAX|MIN|최댓값|최솟값|최대|최소)\b"
    r"|\bis\s+(the\s+)?(MAX|MIN|biggest|largest|smallest)\b"
)


def _screen_fragments(path):
    """화면에 나오는 글 조각만 뽑는다 — 주석·코드 배열은 뺀다."""
    out = []
    try:
        src = open(path, encoding="utf-8").read()
    except OSError:
        return out
    # 블록 주석 제거
    src = re.sub(r"/\*.*?\*/", " ", src, flags=re.S)
    for i, line in enumerate(src.split("\n"), 1):
        s = line.strip()
        if s.startswith("//") or s.startswith("*"):
            continue
        # 코드 배열 줄(파이썬/C++ 소스가 문자열로 들어 있는 줄)은 뺀다
        if re.search(r'^\s*"(\s{2,}|def |for |if |while |print|#|//|int |long )', s):
            continue
        # ⛔ 길이 하한을 정규식 안에 두면 **따옴표 짝이 밀린다.**
        #    `"3"` 처럼 짧은 조각을 건너뛰다가 `", sign: "` 를 한 조각으로 읽었고,
        #    그래서 같은 줄의 `"가장 큰 수가 MIN"` 을 **통째로 놓쳤다**(2026-10-01 실측).
        #    짝은 먼저 맞추고, 길이는 **뒤에서** 걸러라.
        for m in re.finditer(r'"([^"\\\n]*)"', line):
            if len(m.group(1).strip()) >= 2:
                out.append((i, m.group(1)))
        for m in re.finditer(r"`([^`\\\n]*)`", line):
            if len(m.group(1).strip()) >= 2:
                out.append((i, m.group(1)))
    return out


def scan(qid):
    qpath = os.path.join(QDIR, qid)
    hits = []
    if not os.path.isdir(qpath):
        return hits
    for fn in sorted(os.listdir(qpath)):
        if not fn.endswith((".jsx", ".tsx", ".js")):
            continue
        for ln, text in _screen_fragments(os.path.join(qpath, fn)):
            big = [w for w in BIG if w in text]
            small = [w for w in SMALL if w in text]
            if not (big and small):
                continue
            linked = bool(LINK.search(text))
            hits.append({
                "file": fn, "line": ln, "text": text.strip(),
                "big": big[0], "small": small[0], "linked": linked,
            })
    return hits


def selftest():
    """잣대가 사는지 먼저 본다 — 죽은 잣대로 「0건」을 찍는 게 제일 나쁘다."""
    cases = [
        ("가장 큰 수가 MIN", True, True),                 # 실제로 났던 결함
        ("biggest is MIN", True, True),
        ("that one is the MIN", False, False),            # 고친 뒤 — 걸리면 안 된다
        ("가장 큰 값과 가장 작은 값을 찾아요", True, False),  # 정당 — 걸리되 linked 아님
        ("크기가 가장 큰 수가 MIN 쪽", True, True),         # **참인데 걸린다** → 사람이 봐야
        ("크기가 가장 큰 수는 MAX 쪽", False, False),       # 작은 쪽 말이 없다 → 안 걸린다
        ("배열을 한 번 훑어요", False, False),
    ]
    ok = True
    for text, want_hit, want_link in cases:
        big = [w for w in BIG if w in text]
        small = [w for w in SMALL if w in text]
        got_hit = bool(big and small)
        got_link = got_hit and bool(LINK.search(text))
        mark = "✅" if (got_hit == want_hit and got_link == want_link) else "🚨"
        if mark == "🚨":
            ok = False
        print("  %s  걸림=%-5s 이어짐=%-5s  「%s」" % (mark, got_hit, got_link, text))
    print("\n%s" % ("잣대가 산다." if ok else "🚨 잣대가 죽었다 — 고쳐라."))
    return 0 if ok else 1


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if "--selftest" in sys.argv:
        return selftest()
    ids = args or sorted(d for d in os.listdir(QDIR)
                         if os.path.isdir(os.path.join(QDIR, d)))
    all_hits, linked_total, quests = [], 0, 0
    for qid in ids:
        hits = scan(qid)
        if not hits:
            continue
        quests += 1
        linked = [h for h in hits if h["linked"]]
        linked_total += len(linked)
        all_hits.append((qid, hits, linked))

    print("한 조각 안에서 큰 쪽·작은 쪽이 **같이** 나오는 자리 — %d건 · quest %d개"
          % (sum(len(h) for _, h, _ in all_hits), quests))
    print("   그중 **「~가 MAX/MIN 이다」로 이어진** 것 — %d건  ← 여기부터 봐라\n" % linked_total)

    for qid, hits, linked in sorted(all_hits, key=lambda x: -len(x[2])):
        if not linked:
            continue
        print("  ■ %s — 이어진 것 %d건 (전체 %d건)" % (qid, len(linked), len(hits)))
        for h in linked[:6]:
            print("      %s:%d  [%s ↔ %s]  %s"
                  % (h["file"], h["line"], h["big"], h["small"], h["text"][:90]))
    rest = [(q, h, l) for q, h, l in all_hits if not l]
    if rest:
        print("\n  (이어지지 않은 자리만 있는 quest %d개 — 대개 정당하다: %s)"
              % (len(rest), " ".join(q for q, _, _ in rest[:12])))

    print("""
⛔ **판정이 아니라 볼 자리 표시다.** 정당한 문장이 많다 —
   *"가장 큰 값과 가장 작은 값을 찾아요"* 는 맞는 말이고,
   *"크기가 가장 큰 수가 MIN 쪽"* 도 **참**이다(크기가 큰 음수는 최솟값 자리에 앉는다).
   ⭐ 물어볼 것은 하나다 — **그 줄의 숫자를 보면 그 말이 참인가?**
⚠️ 모순이 **조각 두 개에 걸쳐** 있으면 원리상 못 본다. 0건이 결백이 아니다.
근거: 2026-10-01 `mcc20missing` 꼬리표 「가장 큰 수가 MIN」 — **학생이 찾았다.**""")
    return 0


if __name__ == "__main__":
    sys.exit(main())
