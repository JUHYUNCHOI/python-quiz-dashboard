#!/usr/bin/env python3
"""학생에게 보이는 코드가 레슨에서 안 가르친 *기교*를 쓰나 (파이썬 · C++).

왜 (2026-09-11): reflection 의 파이썬 풀이가 `sys.stdin.buffer` · `bytearray` ·
`== 35`(ord 값) 로 짜여 있었다. 선생님: *"저게 학생이 볼만한건가?"*
원인을 따라가 보니 **usaco.org 공식 만점 답안이 C++ 뿐**이었고
(공식 파이썬은 작은 서브태스크용 브루트포스),
우리가 그 C++ 모양을 파이썬으로 그대로 옮기면서 기교가 같이 딸려 들어왔다.
게다가 그 모양은 파이썬에서 **오히려 느렸다** (1.08s → 표를 빼니 0.62s).

기존 `count-quests.py --list untaught` 는 **알고리즘 개념**(비트연산·2차원리스트)만 본다.
이건 다른 층이다 — 알고리즘은 맞는데 **손버릇**이 안 배운 것이다.
그래서 그 검사기로는 reflection 이 안 걸렸다.

무엇을 보나 — quest 의 파이썬 코드 배열에서 아래를 찾고,
그 문법을 `data/lesson*.ts` 의 **설명 본문**에서 가르치는지 대조한다.
⚠️ **판정이 아니라 볼 자리 표시다.** 대회 문제라 필요한 자리가 있을 수 있다.
   본질이면 레슨에서 가르치고, 수단이면 갈아치운다 — 판별은 사람이 한다.
"""
import glob, io, json, re, sys

# (이름, quest 코드에서 찾을 정규식, 레슨 설명에서 "가르쳤다" 로 볼 정규식, 왜 위험한가)
IDIOMS = [
    ("한 뭉치로 읽고 pos 로 꺼내기",
     re.compile(r"sys\.stdin\.read\(\)\.split\(\)"),
     re.compile(r"stdin\.read\(\)\.split|한 번에 다 읽어|토큰 위치|pos 로 꺼"),
     "입력이 몇 줄인지 안 보이고, pos += 1 을 손으로 세야 한다"),
    ("바이트로 읽기 (stdin.buffer)",
     re.compile(r"sys\.stdin\.buffer"),
     re.compile(r"stdin\.buffer|바이트로 읽"),
     "문자열이 아니라 바이트라서 b'' · decode 가 따라 나온다"),
    ("bytearray",
     re.compile(r"\bbytearray\("),
     re.compile(r"bytearray"),
     "리스트처럼 보이는데 숫자만 들어간다 — '#' 이 35 가 된다"),
    ("글자를 숫자 코드로 (ord 값 직접)",
     re.compile(r"==\s*(?:35|46|48|65|97)\b|!=\s*(?:35|46|48|65|97)\b"),
     re.compile(r"ord\(|아스키|ASCII|문자 코드"),
     "화면의 '#' 과 코드의 35 가 이어지지 않는다"),
    ("decode()",
     re.compile(r"\.decode\(\)"),
     re.compile(r"decode\(|바이트를 문자열로"),
     "bytes → str 변환이 왜 필요한지 설명된 적이 없다"),
    ("재귀 한도 올리기",
     re.compile(r"setrecursionlimit"),
     re.compile(r"setrecursionlimit|재귀 한도"),
     "왜 1000 이 모자란지를 먼저 말해야 한다"),
]

# ── C++ 쪽. 선생님(2026-09-11): "입출력은 그냥 cout, cin 쓰고 include 는 우리 방식을 썼으면해"
#    "우리 방식" 은 저장소가 이미 쓰는 것이다 — 실측: <iostream> 209곳 vs <bits/stdc++.h> 5곳.
CPP_RULES = [
    ("bits/stdc++.h — 우리 방식이 아니다",
     re.compile(r"#include\s*<bits/stdc\+\+\.h>"),
     "필요한 헤더를 하나씩 적는다 — <iostream> <vector> <string> <algorithm>"),
    ("ios::sync_with_stdio — 그냥 cin/cout 을 쓴다",
     re.compile(r"sync_with_stdio"),
     "설명한 적 없는 속도 기교다. 빼도 USACO 제한 안에 든다(reflection 실측 0.98s → 1.29s, 제한 2s)"),
    # ⚠️ 2026-09-11 quest-auditor 가 손으로 찾았다 — 검사기는 moohunt 를 "0건" 으로 넘겼는데
    #    C++ 코드가 map<...>::iterator 로 순회하고 있었다. **또 조용히 틀린 것이다.**
    ("::iterator — 레슨이 안 가르친다",
     re.compile(r"::iterator\b"),
     "for (auto& kv : m) 또는 구조적 바인딩 for (auto& [k, v] : m). auto 는 C++ 레슨 28개, range-for 는 23개가 가르친다"),
    ("scanf/printf — 그냥 cin/cout 을 쓴다",
     re.compile(r"\b(?:scanf|printf)\s*\("),
     "C 스타일 입출력은 레슨에서 안 가르친다"),
]

# 레슨이 가르치는 것 — 설명 본문만 본다. 코드에만 나오면 '쓴 것'이지 '가르친 것'이 아니다.
lesson_text = ""
for f in glob.glob("data/lesson*.ts") + glob.glob("data/cpp/lesson*.ts"):
    lesson_text += io.open(f, encoding="utf-8", errors="replace").read()

taught = {name: bool(teach.search(lesson_text)) for name, _, teach, _ in IDIOMS}

# ⚠️ 배열 **이름**으로 찾지 마라. 2026-09-11 에 그렇게 짰다가 chipxchg(`code`)와
#    mooin2(`bruteReadCpp`)의 진짜 <bits/stdc++.h> 를 놓쳤다 — 검사기는 "2개" 라고 했고
#    실제로는 4개였다. 이름은 quest 마다 제멋대로다. **내용으로 언어를 가른다.**
STR = re.compile(r'"((?:[^"\\]|\\.)*)"')
CPP_SIGN = re.compile(r"#include|using namespace|int main\s*\(|\bcout\b|\bcin\b")
PY_SIGN = re.compile(r"^\s*(?:import |from |def |print\()|sys\.stdin", re.M)


def arrays(src):
    """파일 안의 모든 배열 리터럴을 문자열 목록으로 꺼낸다 (괄호 깊이로 짝 맞춤)."""
    out, i = [], 0
    while True:
        i = src.find("[", i)
        if i < 0:
            return out
        d, j = 0, i
        while j < len(src):
            ch = src[j]
            if ch == "[":
                d += 1
            elif ch == "]":
                d -= 1
                if not d:
                    break
            elif ch == '"':
                j += 1
                while j < len(src) and src[j] != '"':
                    j += 2 if src[j] == "\\" else 1
            j += 1
        body = src[i:j + 1]
        lines = [m.group(1) for m in STR.finditer(body)]
        if lines:
            out.append(lines)
        i = j + 1


def unesc(lines):
    res = []
    for l in lines:
        try:
            res.append(json.loads('"%s"' % l))
        except Exception:
            res.append(l)
    return "\n".join(res)


hits, cpp_hits = {}, {}
for f in sorted(glob.glob("quest-problems/*/*.jsx")):
    quest = f.split("/")[1]
    src = io.open(f, encoding="utf-8", errors="replace").read()
    for lines in arrays(src):
        code = unesc(lines)
        if CPP_SIGN.search(code):                      # C++ 배열
            for name, use, _ in CPP_RULES:
                if use.search(code):
                    cpp_hits.setdefault(name, set()).add(quest)
        elif PY_SIGN.search(code):                     # 파이썬 배열
            for name, use, _, _ in IDIOMS:
                if use.search(code) and not taught[name]:
                    hits.setdefault(name, set()).add(quest)

total = len(set().union(*hits.values())) if hits else 0
print(f"안 가르친 파이썬 기교를 쓰는 quest {total}개")
print("  (판정이 아니다 — 본질이면 레슨에서 가르치고, 수단이면 갈아치운다)\n")
for name, use, teach, why in IDIOMS:
    qs = sorted(hits.get(name, ()))
    mark = "레슨에서 가르침 ✅" if taught[name] else f"레슨 설명에 **없음** — quest {len(qs)}개"
    print(f"  ▸ {name} — {mark}")
    if qs and not taught[name]:
        print(f"     왜 위험한가: {why}")
        for i in range(0, len(qs), 6):
            print("     " + "  ".join(qs[i:i + 6]))
    print()

cpp_total = len(set().union(*cpp_hits.values())) if cpp_hits else 0
print(f"── C++ 쪽: 우리 방식이 아닌 quest {cpp_total}개\n")
for name, _, why in CPP_RULES:
    qs = sorted(cpp_hits.get(name, ()))
    if not qs:
        print(f"  ▸ {name} — 없음 ✅\n")
        continue
    print(f"  ▸ {name} — quest {len(qs)}개")
    print(f"     대신: {why}")
    for i in range(0, len(qs), 6):
        print("     " + "  ".join(qs[i:i + 6]))
    print()

sys.exit(1 if (hits or cpp_hits) else 0)
