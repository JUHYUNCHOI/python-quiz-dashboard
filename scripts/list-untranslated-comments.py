#!/usr/bin/env python3
"""quest 코드 안 한국어 주석 중 **아직 영어 번역이 없는** 것을 뽑는다.

왜 (2026-09-11): 코드 배열이 `t(E, 영어, 한국어)` 가 아니라 한 벌뿐이라
화면을 English 로 바꿔도 주석만 한국어로 남는다.
student-algorithm 이 moohunt 를 영어 모드로 따라가다 잡았다.

`components/quest/localizeCode.ts` 가 그리는 자리에서 바꾸고,
번역은 `components/quest/codeCommentsEn.ts` 의 표에서 찾는다.
**표에 없으면 그 줄을 비운다** — 영어 학생에게 읽을 수 없는 한국어를 남기는 것보다 낫지만,
설명이 사라지는 것이므로 표를 채우는 게 맞다. 이 스크립트가 그 남은 목록이다.

  python3 scripts/list-untranslated-comments.py           # 많이 쓰이는 순
  python3 scripts/list-untranslated-comments.py --quest reflection
  python3 scripts/list-untranslated-comments.py --ts      # 붙여 넣을 수 있는 TS 뼈대

⚠️ 키는 **주석 기호(`#`/`//`)를 뗀 뒤 trim 한 그대로** 다. localizeCode 와 같은 규칙으로 뽑는다.
"""
import glob, io, json, re, sys

STR = re.compile(r'"((?:[^"\\]|\\.)*)"')
HANGUL = re.compile(r"[가-힣]")


def comment_body(line):
    """localizeCode.one() 과 **같은 규칙**으로 주석 본문을 꺼낸다.
    ⚠️ 이 둘이 어긋나면 표에 넣어도 안 맞는다 — 고칠 땐 둘 다 고쳐라."""
    m = re.match(r"^\s*(#|//)(.*)$", line)
    if m:
        body = m.group(2).strip()
        return body if HANGUL.search(body) else None
    q = None
    for i, c in enumerate(line):
        if q:
            if c == "\\":
                continue
            if c == q:
                q = None
            continue
        if c in "\"'":
            q = c
            continue
        mark = "#" if c == "#" else ("//" if line.startswith("//", i) else None)
        if mark:
            body = line[i + len(mark):].strip()
            return body if HANGUL.search(body) else None
    return None


def known_keys():
    src = io.open("components/quest/codeCommentsEn.ts", encoding="utf-8").read()
    # 표의 키만 — 값은 영어라 한글이 없다. 한글이 든 문자열 리터럴을 키로 본다.
    out = set()
    for m in STR.finditer(src):
        try:
            v = json.loads('"%s"' % m.group(1))
        except Exception:
            continue
        if HANGUL.search(v):
            out.add(v)
    return out


want = None
if "--quest" in sys.argv:
    want = sys.argv[sys.argv.index("--quest") + 1]

have = known_keys()
found = {}
for f in sorted(glob.glob("quest-problems/*/*.jsx")):
    quest = f.split("/")[1]
    if want and quest != want:
        continue
    src = io.open(f, encoding="utf-8", errors="replace").read()
    for m in STR.finditer(src):
        try:
            v = json.loads('"%s"' % m.group(1))
        except Exception:
            continue
        body = comment_body(v)
        if body and body not in have:
            e = found.setdefault(body, {"n": 0, "q": set()})
            e["n"] += 1
            e["q"].add(quest)

rows = sorted(found.items(), key=lambda x: (-x[1]["n"], x[0]))
lines = sum(v["n"] for _, v in rows)

if "--ts" in sys.argv:
    print("  // 아래를 번역해서 CODE_COMMENT_EN 에 넣어라")
    for k, v in rows:
        print('  %s:\n    "",   // %d줄 · %s' % (json.dumps(k, ensure_ascii=False), v["n"], ", ".join(sorted(v["q"]))))
    sys.exit(0)

print(f"번역이 없는 주석 {len(rows)}개 · {lines}줄" + (f" (quest={want})" if want else ""))
print(f"  표에 이미 있는 것 {len(have)}개\n")
for k, v in rows[:40]:
    print(f"  ({v['n']:2}) {k[:88]}")
    print(f"       {', '.join(sorted(v['q'])[:6])}")
if len(rows) > 40:
    print(f"\n  … 그리고 {len(rows) - 40}개 더. `--ts` 로 전체를 TS 뼈대로 뽑을 수 있다.")
sys.exit(1 if rows else 0)
