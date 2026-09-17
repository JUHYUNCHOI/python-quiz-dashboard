#!/usr/bin/env python3
"""학생이 읽는 글에서 **어려운 말**과 **같은 것을 다르게 부르는 말**을 찾는다.

왜 있나 — 선생님(2026-09-17) `buymilk` 4쪽을 보시고:
  *"뭔말인지 하나도 못알아듣겠어. 담당자 누구지? 말을 넘 어렵게해"*

그 쪽에서 같은 것을 **세 이름**으로 부르고 있었다 — 1~3쪽은 "거래"(19번),
4쪽부터 갑자기 "딜"(11번), 거기에 "블록"(26번)까지. 학생은 셋이 다른 건 줄 안다.

**왜 아무도 못 봤나** — `ux-reviewer` 가 용어를 보긴 하는데 **"정의 안 하고 쓴 말"** 만 본다.
그리고 검토자는 **한 쪽씩** 연다. **쪽과 쪽 사이의 이름 차이는 구조적으로 안 보인다**
(`memory/feedback_reviewers_see_pages_teacher_sees_story.md`).
그래서 사람이 아니라 기계가 **quest 전체를 한 번에** 보게 만든다.

쓰는 법
    python3 scripts/check-word-difficulty.py            # 전체 요약
    python3 scripts/check-word-difficulty.py buymilk    # 한 quest, 자리까지

⚠️ **판정이 아니라 볼 자리 표시다.** 일부러 두 이름을 쓰는 자리도 있다
   (예: 문제 원문 용어 ↔ 코드 변수명). 사람이 보고 정한다.
"""
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
QUEST_DIR = ROOT / "quest-problems"

# ── ① 같은 것을 다르게 부르는 짝. 첫 번째가 **쉬운 쪽**(권장).
SYNONYMS = [
    ("묶음",   ["딜", "블록", "번들"]),
    ("거래",   ["딜"]),
    ("통",     ["버킷", "바구니"]),
    ("표",     ["테이블"]),
    ("목록",   ["리스트", "배열"]),
    ("사전",   ["딕셔너리", "맵"]),
    ("반복",   ["루프"]),
    ("글자",   ["문자", "캐릭터"]),
    ("글",     ["문자열", "스트링"]),
    ("자리",   ["인덱스"]),
    ("쌓기",   ["스택"]),
    ("줄",     ["행", "로우"]),
    ("칸",     ["셀", "열"]),
]

# ⚠️ **한국어는 짧은 낱말이 긴 낱말 안에 숨는다.** 그냥 세면 거짓말을 한다.
#    2026-09-17 실측(mooin3): "글 138번" 인데 그중 136번이 **글자** 안이었다.
#    진짜 '글' 은 2번이다. 그런데 검사기는 "글 80번 vs 문자열 17번 — 이름이 섞였다"
#    라고 보고했다. 그 숫자를 믿고 quest 25개를 일괄 수정할 뻔했다.
#    그래서 **긴 낱말 안에 든 것은 빼고 센다.**
INSIDE = {
    "글":   ["글자", "한글", "글씨", "글쓰기"],
    "문자": ["문자열"],
    "열":   ["문자열", "배열", "나열", "열다", "열어", "열고", "열린", "열리", "열기", "열쇠",
             "열심", "계열", "서열", "열째", "열번", "열혈"],
    "줄":   ["줄이", "줄어", "줄기", "줄자"],
    "행":   ["행동", "행복", "실행", "진행", "은행", "여행", "수행", "시행", "행렬",
             "행운", "행사", "행성", "비행", "행위"],
    "통":   ["통과", "보통", "통째", "통계", "전통", "소통", "통해", "통로", "교통",
             "통틀", "통신", "통일", "공통", "통상", "통당"],
    "표":   ["표시", "발표", "목표", "표준", "대표", "투표", "표현", "표정", "좌표",
             "표기", "표면"],
    "칸":   ["칸막"],
    "맵":   ["맵다", "맵게", "매맵"],
    "딜":   ["딜러", "딜리", "딜레"],
    "행렬": [],
    "자리": ["자리수"],
    "셀":   ["셀프", "셀까", "셀 수", "세셀"],
    "반복": [],
}


def count_word(word, text):
    """긴 낱말 안에 든 것은 빼고 센다. '글' 은 '글자' 안의 것을 세지 않는다."""
    n = len(re.findall(re.escape(word), text))
    for longer in INSIDE.get(word, []):
        n -= len(re.findall(re.escape(longer), text))
    return max(n, 0)


# ── ② 초6 에게 어려운 말 → 쉬운 말. 근거: memory/feedback_no_invented_terms.md
HARD = {
    "최저가": "제일 싼 값", "최소값": "제일 작은 값", "최대값": "제일 큰 값",
    "단가": "한 개에 얼마", "누적": "쌓아 온", "갱신": "새로 고침",
    "정규화": "값을 고르게 맞추기", "초기화": "처음 값으로",
    "순회": "하나씩 보기", "탐색": "찾기", "연산": "계산",
    "반환": "돌려주기", "호출": "부르기", "선언": "만들기",
    "조건문": "if 문", "제어문": "if·for 문", "매개변수": "받는 값",
    "임의의": "아무", "최적": "제일 좋은", "판별": "가려내기",
    "상한": "가장 큰 값", "하한": "가장 작은 값", "이하": "보다 작거나 같은",
}

# ── ③ **번역 티가 나는 한국어** (2026-09-17 추가)
#    선생님: *"영어를 부자연스럽게 한국어로 바꾼건지 너무 어색하고 뭔말인지 모르는경우가 많아."*
#    2026-08-29 에도 같은 지적을 하셨다 — **세 번째다.**
#    원인은 코드 모양 자체다: `t(E, "영어", "한국어")` 는 **영어를 먼저 쓰고 한국어를 붙인다.**
#    그래서 한국어가 영어 문장 구조를 그대로 물려받는다. 학생은 한국어만 읽는데.
TRANSLATIONESE = [
    ("세미콜론 — 한국어엔 `;` 를 안 쓴다",
     re.compile(r";")),
    ("콜론으로 문장을 이어붙였다",
     # 콜론 뒤가 한글이 아니어도 잡는다 — "가격은 엄격 증가: a_1 < a_2" 처럼
     # **수식이 뒤에 오는 자리**를 2026-09-17 에 놓쳤다 (선생님이 화면에서 먼저 보셨다).
     re.compile(r"[가-힣]\s*:\s*\S")),
    ("조사를 빼고 명사만 늘어놨다",
     re.compile(r"[가-힣]{2,}\s+[가-힣]{2,}\s+(?:필요|출력|초기화|계산|저장|반복)\.")),
    ("영어를 음만 옮겼다 (쿼리·버킷…)",
     re.compile(r"쿼리|버킷|루프|인덱스|테이블|스택|딜(?![러리])")),
]

# 화면에 나가는 한국어만 본다 — t(E, "영어", "한국어") 의 **두 번째** 자리
T_CALL = re.compile(r't\(\s*E\s*,\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"\s*\)')
KO_STR = re.compile(r'"((?:[^"\\]|\\.)*[가-힣][^"\\]*)"')


def screen_text(path):
    """그 파일에서 **학생 화면에 나가는 한국어**만 모은다 (주석·코드 제외)."""
    out = []
    in_block = False                       # /* ... */ 안인가
    for raw in path.read_text(encoding="utf-8", errors="replace").split("\n"):
        line = raw.strip()
        if in_block:
            # 여러 줄 주석의 가운데 줄은 `*` 로 시작하지 않을 때가 많다.
            # 그래서 시작/끝을 상태로 따라가야 한다 (2026-09-17: 여기서
            # 파일 맨 위 설계 메모가 '학생 글' 로 세어져 없는 문제가 떴다).
            if "*/" in raw:
                in_block = False
            continue
        if line.startswith("/*") and "*/" not in line:
            in_block = True
            continue
        if line.startswith("//") or line.startswith("*") or line.startswith("/*"):
            continue                       # 우리끼리 보는 주석은 뺀다
        for m in T_CALL.finditer(raw):
            out.append(m.group(2))         # 한국어 쪽
        if "t(E," not in raw:
            for m in KO_STR.finditer(raw):
                out.append(m.group(1))
    return out


def scan(quest_dir):
    files = [f for f in quest_dir.glob("*.jsx")]
    text_by_file = {f.name: screen_text(f) for f in files}
    allwords = " ".join(w for v in text_by_file.values() for w in v)

    # 같은 뜻인데 여러 이름
    mixed = []
    for easy, others in SYNONYMS:
        used = {}
        for name in [easy] + others:
            n = count_word(name, allwords)
            if n:
                used[name] = n
        if len(used) >= 2:
            mixed.append((easy, used))

    # 어려운 말
    hard = {}
    for word, easy in HARD.items():
        n = count_word(word, allwords)
        if n:
            hard[word] = (n, easy)

    # 번역 티 — 문장 단위로 센다
    sents = [w for v in text_by_file.values() for w in v
             if len(w) > 8 and re.search(r"[가-힣]", w)]
    trans = {}
    for label, pat in TRANSLATIONESE:
        bad = [x for x in sents if pat.search(x)]
        if bad:
            trans[label] = (len(bad), bad[0][:64])
    return mixed, hard, trans, text_by_file


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    dirs = sorted(d for d in QUEST_DIR.iterdir() if d.is_dir())
    if args:
        dirs = [d for d in dirs if d.name in args]
        if not dirs:
            print(f"그런 quest 가 없다: {', '.join(args)}")
            return 1
    detail = bool(args)

    rows = []
    for d in dirs:
        mixed, hard, trans, _ = scan(d)
        score = len(mixed) * 3 + len(hard) + sum(n for n, _ in trans.values())
        if score:
            rows.append((score, d.name, mixed, hard, trans))
    rows.sort(reverse=True)

    tot_mixed = sum(len(m) for _, _, m, _, _ in rows)
    tot_hard = sum(len(h) for _, _, _, h, _ in rows)
    tot_trans = sum(n for _, _, _, _, t in rows for n, _ in t.values())
    print(f"같은 것 다른 이름 {tot_mixed}건 · 어려운 말 {tot_hard}건 "
          f"· **번역 티 {tot_trans}건** · quest {len(rows)}개\n")

    for score, name, mixed, hard, trans in rows[:40 if not detail else len(rows)]:
        print(f"  {name}")
        for easy, used in mixed:
            shown = " · ".join(f"{k} {v}번" for k, v in sorted(used.items(), key=lambda x: -x[1]))
            print(f"     🔀 {shown}   → 쉬운 쪽: **{easy}** 하나로")
        if detail:
            for w, (n, easy) in sorted(hard.items(), key=lambda x: -x[1][0]):
                print(f"     📖 '{w}' {n}번 → '{easy}'")
        elif hard:
            top = sorted(hard.items(), key=lambda x: -x[1][0])[:4]
            print("     📖 " + " · ".join(f"{w}({n})" for w, (n, _) in top))
        for label, (n, ex) in sorted(trans.items(), key=lambda x: -x[1][0]):
            print(f"     🗣️ {label} — {n}건")
            if detail:
                print(f"          예) {ex}")
        print()

    if not detail and len(rows) > 40:
        print(f"  … 그리고 {len(rows)-40}개 더. 한 quest 만 보려면 이름을 넣어라.\n")
    print("⚠️ 판정이 아니라 **볼 자리 표시**다. 일부러 두 이름을 쓰는 자리도 있다")
    print("   (문제 원문 용어 ↔ 코드 변수명). 사람이 보고 정한다.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
