#!/usr/bin/env python3
"""코드를 조각으로 쪼갤 때 — **조각을 이어 붙이면 원래 코드와 똑같나.**

왜 (2026-09-19): quest 다섯(`drought`·`mcc22birthday`·`mcc20citytour`·`exchange`·
`swapity`)은 화면 글이 *"부분별로 읽어봐요"* 라고 약속하는데 **섹션이 하나뿐**이다.
쪼개기로 설계해 놓고 실행이 안 됐다 (pedagogy 판정, 2026-09-18).

쪼갤 때 제일 무서운 건 **조각 사이에서 코드 줄이 사라지는 것**이다.
학생은 그 줄을 영영 못 본다. 그래서 기계로 증명한다 —
조각들의 `py` 를 순서대로 이어 붙이면 `FULL_PY` 와 **글자 하나까지 같아야** 한다.

  python3 scripts/prove-sections-cover-code.py mcc20citytour
  python3 scripts/prove-sections-cover-code.py            # 쪼개진 quest 전부

⚠️ 🔒 USACO_VERIFIED 파일을 쪼갤 때는 **이 증명이 필수**다.
   코드 텍스트가 안 바뀐다는 뜻이므로 USACO 재제출이 필요 없다.
"""
import glob
import io
import json
import re
import sys

ARR = re.compile(r'\[\s*\n((?:[ \t]*"(?:[^"\\]|\\.)*",?[ \t]*\n)+)[ \t]*\]')


def lines_of(block):
    out = []
    for x in block.strip().split("\n"):
        x = x.strip().rstrip(",")
        if not x.startswith('"'):
            return None
        try:
            out.append(json.loads(x))
        except Exception:
            return None
    return out


def named(src, name):
    m = re.search(r'const %s = \[\s*\n((?:[ \t]*"(?:[^"\\]|\\.)*",?[ \t]*\n)+)[ \t]*\]' % name, src)
    return lines_of(m.group(1)) if m else None


def sections_code(src, key):
    """`get*Sections` 안의 조각들에서 `py:` / `cpp:` 배열을 **순서대로** 꺼낸다."""
    m = re.search(r"export function get\w*Sections\s*\(", src)
    if not m:
        return []
    i, depth, started = m.end(), 0, False
    while i < len(src):
        if src[i] == "{":
            depth += 1
            started = True
        elif src[i] == "}":
            depth -= 1
            if started and depth == 0:
                break
        i += 1
    body = src[m.end():i]
    out = []
    for km in re.finditer(r"\b%s:\s*" % key, body):
        rest = body[km.end():]
        if rest.lstrip().startswith("["):
            am = ARR.match(rest.lstrip())
            if am:
                ls = lines_of(am.group(1))
                if ls is not None:
                    out.append(ls)
        else:
            # `FULL_PY.slice(a, b)` / `FULL_PY.slice(a)` — 우리가 쪼갤 때 쓰는 방식.
            # 코드를 다시 타이핑하지 않으므로 줄이 조용히 사라질 수가 없다.
            sm = re.match(r"([A-Za-z_$][\w$]*)\.slice\(\s*(\d+)\s*(?:,\s*(\d+)\s*)?\)", rest)
            if sm:
                out.append(("slice", sm.group(1), int(sm.group(2)),
                            int(sm.group(3)) if sm.group(3) else None))
                continue
            nm = re.match(r"([A-Za-z_$][\w$]*)", rest)
            if nm:
                out.append(nm.group(1))     # 변수 이름으로 넘긴 것
    return out


def check(quest):
    f = "quest-problems/%s/components.jsx" % quest
    try:
        src = io.open(f, encoding="utf-8").read()
    except OSError:
        print(f"  {quest}: 파일 없음")
        return False
    ok = True
    for key, full_name in (("py", "FULL_PY"), ("cpp", "FULL_CPP")):
        parts = sections_code(src, key)
        if not parts:
            continue
        if len(parts) == 1:
            print(f"  {quest} {key}: 조각이 하나뿐이다 (아직 안 쪼갬)")
            continue
        if all(isinstance(p, tuple) and p[0] == "slice" for p in parts):
            full = named(src, full_name)
            if full is None:
                print(f"  {quest} {key}: {full_name} 을 못 찾아 대조 못 함")
                continue
            covered, pos, gap = [], 0, False
            for _, arr, a, b in parts:
                if arr != full_name:
                    print(f"  🚨 {quest} {key}: 조각이 {arr} 를 자른다 ({full_name} 이 아니다)")
                    ok = False
                    break
                if a != pos:
                    gap = True
                pos = b if b is not None else len(full)
                covered.append((a, pos))
            else:
                if gap or pos != len(full):
                    ok = False
                    print(f"  🚨 {quest} {key}: 조각이 {full_name} 을 빈틈없이 덮지 못한다 — {covered}, 전체 {len(full)}줄")
                else:
                    print(f"  ✅ {quest} {key}: slice 조각 {len(parts)}개가 {full_name} {len(full)}줄을 빈틈없이 덮는다")
            continue
        if any(isinstance(p, str) for p in parts):
            names = [p for p in parts if isinstance(p, str)]
            print(f"  {quest} {key}: 변수로 넘긴 조각이 있어 못 잰다 — {names}")
            continue
        full = named(src, full_name)
        if full is None:
            print(f"  {quest} {key}: {full_name} 을 못 찾아 대조 못 함")
            continue
        joined = [ln for p in parts for ln in p]
        if joined == full:
            print(f"  ✅ {quest} {key}: 조각 {len(parts)}개를 이으면 {full_name} 과 같다 ({len(full)}줄)")
        else:
            ok = False
            print(f"  🚨 {quest} {key}: 이어 붙인 {len(joined)}줄 ≠ {full_name} {len(full)}줄")
            for n, (a, b) in enumerate(zip(joined, full)):
                if a != b:
                    print(f"      처음 어긋난 곳 {n}줄째\n        조각: {a!r}\n        원본: {b!r}")
                    break
            else:
                missing = full[len(joined):] or joined[len(full):]
                print(f"      길이만 다르다 — 빠졌거나 더 들어간 줄: {missing[:3]}")
    return ok


def main():
    want = sys.argv[1:]
    if not want:
        want = sorted(p.split("/")[1] for p in glob.glob("quest-problems/*/components.jsx"))
    bad = 0
    print("조각을 이으면 원래 코드와 같나\n")
    for q in want:
        if not check(q):
            bad += 1
    print(f"\n어긋난 quest {bad}개")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
