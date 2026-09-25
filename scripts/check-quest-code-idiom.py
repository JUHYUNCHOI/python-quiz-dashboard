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

# ── 시프트 `<<` — 언어마다 답이 다르다 (2026-09-15 추가)
#    파이썬: 레슨 어디에도 없다. C++: cpp-20 "CP 실전 팁" 이 가르치는데
#    **Part 3 의 끝에서 두 번째**다 (`lib/curriculum-data.ts` 의 cpp-part3, 바로 다음이 cpp-p3).
#    그래서 "안 가르쳤다" 가 아니라 **"학생이 거기 닿기 전에 quest 를 만난다"** 가 문제다.
#    quest 에는 잠금이 없다.
SHIFT = re.compile(r"\b\d+L?L?\s*<<\s*\w|\(\s*1L?L?\s*<<")
# ⚠️ `cout << 1 << "\n"` 같은 출력 체이닝이 위 정규식에 걸린다. 2026-09-15 에 이 오탐으로
#    quest 를 13개로 잘못 셌다(진짜는 5개). 같은 줄에 스트림이 있으면 시프트가 아니다.
STREAM = re.compile(r"\bcout\b|\bcin\b|\bfout\b|\bfin\b|\bendl\b|\bcerr\b")


def uses_shift(code):
    """줄 단위로 본다 — 스트림 출력 줄은 빼고."""
    for line in code.split("\n"):
        if STREAM.search(line):
            continue
        if SHIFT.search(line):
            return True
    return False


# 레슨이 가르치는 것 — 설명 본문만 본다. 코드에만 나오면 '쓴 것'이지 '가르친 것'이 아니다.
# ⚠️ **파이썬과 C++ 을 반드시 갈라서 읽는다.** 2026-09-15 까지는 둘을 한 덩어리로 합쳐서
#    판정했다. 지금 있는 IDIOMS 여섯 개는 우연히 결과가 같아서 **틀린 답은 안 나오고 있었지만**
#    (직접 대조 확인), C++ 에서만 가르치는 것을 규칙에 넣는 순간 **파이썬 갭이 마스킹된다.**
#    `<<` 가 정확히 그 경우라 이번에 갈랐다.
py_lesson_text = "".join(
    io.open(f, encoding="utf-8", errors="replace").read()
    for f in glob.glob("data/lesson*.ts"))
cpp_lesson_text = "".join(
    io.open(f, encoding="utf-8", errors="replace").read()
    for f in glob.glob("data/cpp/lesson*.ts"))

# ⭐ 2026-09-25 — **「가르쳤나」를 한 층만 보다가 틀렸다.**
#   `mooin3` 의 `chr(c+97)` 를 두고 *"커리briculum 에 아예 없다"* 고 보고했는데 **틀렸다.**
#   `data/lesson*.ts` 에는 정말 0건이지만, **`data/algorithm/topics/string.ts` 가
#   `ord(s[i]) - ord('a')` 를 a→0 · z→25 그림까지 붙여 가르치고 있었다.**
#   `learning_tracks.md` 상 알고리즘(4단계)이 대회(5단계)보다 **앞**이라, 거기서 가르쳤으면
#   quest 가 전제해도 되는 것이다. **한 층만 보고 「없다」고 하면 엉뚱한 처방이 나온다** —
#   실제로 그때 「🔒 코드를 바꾸자(=USACO 재제출)」까지 갈 뻔했고, 진짜 답은
#   **「가르친 걸 이 quest 가 안 이어줬다」(화면만 고치면 됨)** 였다.
#
# 그래서 **다리를 세 층에서 찾는다:**
#   ① 파이썬 레슨      `data/lesson*.ts`
#   ② 알고리즘 토픽    `data/algorithm/topics/*.ts`   ← 이게 빠져 있었다
#   ③ **그 quest 자신**                               ← 아래 per-quest 에서 따로 본다
#      (quest 가 자기 화면에서 설명했으면 그건 다리가 **있는** 것이다.
#       `mooin3` 에 실제로 그런 다리를 놓았다 — 그걸 검사기가 못 보면 영원히 걸린다)
algo_topic_text = "".join(
    io.open(f, encoding="utf-8", errors="replace").read()
    for f in glob.glob("data/algorithm/topics/*.ts"))
CURRICULUM_TEXT = py_lesson_text + algo_topic_text
taught = {name: bool(teach.search(CURRICULUM_TEXT)) for name, _, teach, _ in IDIOMS}
taught_where = {
    name: ("레슨" if teach.search(py_lesson_text) else "알고리즘 토픽")
    for name, _, teach, _ in IDIOMS if teach.search(CURRICULUM_TEXT)
}

# ⚠️ 배열 **이름**으로 찾지 마라. 2026-09-11 에 그렇게 짰다가 chipxchg(`code`)와
#    mooin2(`bruteReadCpp`)의 진짜 <bits/stdc++.h> 를 놓쳤다 — 검사기는 "2개" 라고 했고
#    실제로는 4개였다. 이름은 quest 마다 제멋대로다. **내용으로 언어를 가른다.**
def _strip_arrays(src):
    """배열 리터럴이 차지한 **원본 구간**을 통째로 지운다 (코드 배열 제거용).

    `arrays()` 와 같은 괄호-깊이 방식이되, 내용이 아니라 **범위**를 돌려준다.
    """
    out, i, keep = [], 0, 0
    while True:
        i = src.find("[", i)
        if i < 0:
            out.append(src[keep:])
            return "".join(out)
        d, j, instr = 0, i, None
        while j < len(src):
            ch = src[j]
            if instr:
                if ch == "\\":
                    j += 1
                elif ch == instr:
                    instr = None
            elif ch in "\"'`":
                instr = ch
            elif ch == "[":
                d += 1
            elif ch == "]":
                d -= 1
                if not d:
                    break
            j += 1
        if j >= len(src):
            out.append(src[keep:])
            return "".join(out)
        out.append(src[keep:i])          # 배열 앞까지만 남긴다
        keep = j + 1
        i = j + 1


_PROSE_CACHE = {}


def prose_of(quest):
    """그 quest 가 **학생에게 보여주는 글**(코드 배열 밖). 다리가 quest 안에 있나 볼 때 쓴다.

    코드 배열은 통째로 지운다 — 코드에 `ord(` 를 쓴 건 「쓴 것」이지 「가르친 것」이 아니다.
    """
    if quest in _PROSE_CACHE:
        return _PROSE_CACHE[quest]
    txt = []
    for f in glob.glob(f"quest-problems/{quest}/*.jsx") + glob.glob(f"quest-problems/{quest}/*.tsx"):
        src = io.open(f, encoding="utf-8", errors="replace").read()
        # ⚠️ 2026-09-25 — 처음엔 `src.replace(unesc(lines), "")` 로 지웠는데 **아무 일도 안 했다.**
        #    `unesc()` 가 돌려주는 건 **디코드된 코드 문자열**이라 원본(따옴표로 쪼개진 JS 배열)에
        #    그대로 들어있지 않다. 그래서 코드 안의 `sys.stdin.buffer` 가 「quest 가 설명했다」로
        #    **거짓 통과**했다 — `mooin3`·`photoshoot25`·`rounding` 셋 다 그랬다.
        #    **거짓 통과는 진짜 구멍을 가린다.** 손으로 확인해서 잡았다.
        #    → 배열이 차지한 **원본 구간**을 잘라낸다.
        txt.append(_strip_arrays(src))
    _PROSE_CACHE[quest] = "".join(txt)
    return _PROSE_CACHE[quest]


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
self_taught = {}   # quest 가 자기 화면에서 설명해 둔 것
shift_py, shift_cpp = set(), set()
for f in sorted(glob.glob("quest-problems/*/*.jsx")):
    quest = f.split("/")[1]
    src = io.open(f, encoding="utf-8", errors="replace").read()
    for lines in arrays(src):
        code = unesc(lines)
        if CPP_SIGN.search(code):                      # C++ 배열
            for name, use, _ in CPP_RULES:
                if use.search(code):
                    cpp_hits.setdefault(name, set()).add(quest)
            if uses_shift(code):
                shift_cpp.add(f"{quest}({f.split(chr(47))[-1][:-4]})")
        elif PY_SIGN.search(code):                     # 파이썬 배열
            for name, use, teach, _ in IDIOMS:
                if not use.search(code) or taught[name]:
                    continue
                # ③ 그 quest 가 **자기 화면에서** 설명했으면 다리가 있는 것이다.
                #    코드 배열 밖(= 학생에게 보여주는 글)에서만 찾는다 — 코드에 쓴 건
                #    「쓴 것」이지 「가르친 것」이 아니다.
                if teach.search(prose_of(quest)):
                    self_taught.setdefault(name, set()).add(quest)
                    continue
                hits.setdefault(name, set()).add(quest)
            if uses_shift(code):
                shift_py.add(f"{quest}({f.split(chr(47))[-1][:-4]})")

total = len(set().union(*hits.values())) if hits else 0
print(f"안 가르친 파이썬 기교를 쓰는 quest {total}개")
print("  (판정이 아니다 — 본질이면 레슨에서 가르치고, 수단이면 갈아치운다)\n")
for name, use, teach, why in IDIOMS:
    qs = sorted(hits.get(name, ()))
    if taught[name]:
        mark = f"{taught_where.get(name, '커리큘럼')}에서 가르침 ✅"
    else:
        mark = f"커리큘럼에 **없음** — quest {len(qs)}개"
    st = sorted(self_taught.get(name, ()))
    if st:
        mark += f"  ·  quest 가 스스로 설명함: {', '.join(st)}"
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

# ── 시프트 `<<` — 언어별로 뜻이 다르다
print("── 비트 시프트 `<<` 를 쓰는 quest")
print("  (`cout <<` 는 뺐다 — 같은 줄에 스트림이 있으면 출력이지 시프트가 아니다)\n")
py_taught = bool(re.search(r"1 <<|비트 시프트|시프트 연산", py_lesson_text))
print(f"  ▸ 파이썬 — 레슨에서 {'가르침 ✅' if py_taught else '**안 가르친다**'} · quest {len(shift_py)}개")
if shift_py and not py_taught:
    print("     대신: `2 ** i` 를 쓸 수 있다 — `**` 는 **파이썬 레슨 4** 가 가르친다")
    print("     " + "  ".join(sorted(shift_py)))
print()
cpp_taught = bool(re.search(r"1 <<", cpp_lesson_text))
print(f"  ▸ C++ — cpp-20 'CP 실전 팁' 이 {'가르친다' if cpp_taught else '안 가르친다'} · quest {len(shift_cpp)}개")
if shift_cpp:
    print("     ⚠️ 가르치긴 하는데 **Part 3 의 끝에서 두 번째**다 (다음이 cpp-p3 USACO 모의전).")
    print("        quest 에는 잠금이 없어서 학생은 그 전에 닿는다. '안 가르쳤다' 가 아니라 **순서** 문제다.")
    print("     " + "  ".join(sorted(shift_cpp)))
print()
print("⚠️ 아는 모양만 찾는다. 0건이어도 눈으로 한 번 봐라.")
print("⚠️ **이 검사기는 그 코드가 화면에 실제로 뜨는지 못 가른다.** 파일 이름을 같이 찍는 이유다.")
print("   2026-09-15 확인된 예: `moohunt(components)` 는 **PDF 전용**이고 화면은 brute/fast 를 쓴다.")
print("   `hps(components)` 의 비트는 **'🎁 보너스 · 안 봐도 돼요'** 구간이다. 둘 다 필수 경로가 아니다.")
print("   파일을 열어 그 배열이 어디에 렌더되는지 보고 판정해라.")

sys.exit(1 if (hits or cpp_hits or shift_py) else 0)
