#!/usr/bin/env python3
"""샘플 입출력 상자에 «뜻 라벨(← 설명)» 이 있나 — 가벼운 grep 검사기.

왜 (2026-09-23): 같은 결함이 **두 번** 나왔다.
  strangefn — 선생님: "입력값과 출력값이 뭘 의미하는데? 학생은 이걸 알았어?"
  moohunt — 숫자만 있는 다크 박스. 옆에 형식 설명 카드가 있어도,
            그 박스 **자체엔** 뜻이 없었다 (형식 카드는 다른 쪽/다른 칸).

PM 판정: moohunt 를 고친 뒤 **가벼운 grep 으로 180개 전수를 재고**,
그 숫자로 다음 스윕(정식 리라이트) 규모를 정한다. 손으로 180개를 다 열지 않는다.
이 파일은 그 재는 도구다 — **판정이 아니라 볼 자리 표시.**

무엇을 «샘플 입출력 상자» 로 보나
  "INPUT"/"OUTPUT"/"입력"/"출력"/">Input<"/">Output<" 표시 바로 아래
  (같은 줄부터 12줄 안) 숫자만 있는 줄 — <div>5 6</div> 처럼 줄마다 나오거나,
  {`5 6\n1 2 3`} 처럼 템플릿 리터럴 한 덩어리로 있는 경우 둘 다 본다.
  (표/제약·문장 안 숫자는 "그 div 전체가 숫자뿐" 조건 때문에 대부분 안 걸린다.)

무엇을 «라벨이 있다» 로 보나
  그 숫자 줄과 **같은 줄**에 "←" 가 있으면 라벨이 있다고 본다
  (strangefn/checkups 가 쓰는 «← 설명» 모양 — moohunt 도 이번에 이 모양으로 고쳤다).
  템플릿 리터럴 한 덩어리는 그 구조상 줄마다 붙일 수 없으므로, 그 블록 **바로 다음
  줄(닫는 </div> 다음 1줄)** 에 "←" 로 시작하는 설명이 있으면 라벨이 있다고 봐준다.
  숫자 div 바로 다음 3줄 안에 "💬" 가 있어도 라벨로 인정한다 — printseq·reflection 이
  쓰는 «칩 + 💬 노트» 모양(값과 설명을 나란히 둔 것)도 유효한 라벨이다.
  실측(2026-09-23, 71건 중 33개 손으로 열어본 것 중): **이 💬 예외를 넣기 전엔
  printseq·reflection 2개 quest·3건이 오탐이었다** — 이미 라벨이 있는데 "←" 가
  아니라서 걸렸다. 💬 예외를 넣은 뒤 재검증하면 0건이 돼야 한다.
  ⚠️ **다른 모양(→, 화살표 없는 별도 캡션, 인접 카드의 산문 설명)은 이 버전이 못 본다.**
  그런 모양이 흔하면 — 실측해서 — 다음에 추가한다.

⚠️ 이 검사기가 못 보는 것 (읽기 전에 반드시):
  - JSX 를 파싱하지 않는 grep 근사치다. 12줄 창을 벗어난 라벨, `{arr.map(...)}` 로
    동적으로 찍히는 값(소스에 리터럴 숫자가 없음)은 못 본다.
  - "→" 나 다른 화살표, 상자 밖에 따로 있는 형식 카드/캡션은 "없다" 로 오판한다
    (moohunt 원래 상태가 이 경우였다 — 그래서 사람이 먼저 잡았다).
  - 반대 방향(라벨은 있는데 틀린 라벨)은 못 본다 — 뜻이 맞는지는 사람이 코드를 읽어야 안다.
  - **0건이 결백은 아니다.** 이 파일이 아는 두 모양(div-당-한 줄, 템플릿 리터럴) 밖의
    세 번째 모양이 있다면 여전히 못 본다.

  python3 scripts/check-unlabeled-sample-io.py              # 전체
  python3 scripts/check-unlabeled-sample-io.py moohunt       # quest 골라서
  python3 scripts/check-unlabeled-sample-io.py --list        # quest 이름만 쭉
"""
import glob
import re
import sys

MARKER = re.compile(r'>Input<|>Output<|"INPUT"|"OUTPUT"|"입력"|"출력"|"Input"|"Output"')
# <div ...>  다음에 숫자/공백/점/마이너스만 있다가 </div> 나 <span 으로 이어지는 줄.
NUM_DIV = re.compile(r'^\s*<div[^>]*>\s*[\d][\d\s.\-]*\s*(<span|</div>)')
WINDOW = 12


def numeric_lines_in_window(lines, start, end):
    """[start, end) 구간에서 '숫자만 있는 div 줄' 과, 템플릿 리터럴 숫자 블록을 찾는다.
    반환: [(lineno, text, has_label_same_line)] — 템플릿 리터럴은 lineno=블록 시작,
    has_label_same_line 은 "닫는 } 다음 줄이 ← 로 시작하나" 로 대신 판정."""
    found = []
    i = start
    in_template = False
    tpl_start = None
    tpl_lines = []
    while i < end and i < len(lines):
        line = lines[i]
        if not in_template:
            # 템플릿 리터럴 시작: 줄이 정확히 "{`" 로 끝나거나 그 줄 안에 있음
            if re.search(r'\{`\s*$', line) or re.match(r'^\s*\{`', line):
                # 한 줄짜리 {`...`} 도 있을 수 있으니 먼저 한 줄짜리 시도
                one_line = re.match(r'^\s*\{`([\d\s.\-]*)`\}\s*$', line)
                if one_line:
                    if one_line.group(1).strip():
                        found.append((i, line.strip()[:60], "same"))
                    i += 1
                    continue
                in_template = True
                tpl_start = i
                tpl_lines = []
                i += 1
                continue
            if NUM_DIV.match(line):
                # printseq/reflection 이 쓰는 다른 라벨 모양: 숫자 칩 바로 다음 몇 줄
                # 안에 💬 노트가 붙는다 ("←" 없이도 라벨이 있는 것 — 실측으로 찾은
                # 유일한 오탐 종류, 2026-09-23). 3줄 안에 있으면 라벨로 인정.
                nearby = "".join(lines[i:min(i + 4, len(lines))])
                has_label = "←" in line or "💬" in nearby
                found.append((i, line.strip()[:60], "same" if has_label else None))
            i += 1
        else:
            if '`}' in line:
                tpl_lines.append(line.split('`}')[0])
                content = "\n".join(tpl_lines)
                if re.fullmatch(r'[\d\s.\-]*', content) and content.strip():
                    # 라벨은 이 블록 바로 다음 줄이 "←" 로 시작하면 인정
                    after = lines[i + 1] if i + 1 < len(lines) else ""
                    label = "next" if after.strip().startswith("←") else None
                    found.append((tpl_start, lines[tpl_start].strip()[:60] + " …(template)", label))
                in_template = False
                i += 1
                continue
            tpl_lines.append(line)
            i += 1
    return found


def scan_file(path):
    with open(path, encoding="utf-8") as f:
        lines = f.readlines()
    hits = []
    seen_windows = set()
    for i, line in enumerate(lines):
        if not MARKER.search(line):
            continue
        window_key = i // 4  # 너무 촘촘한 중복 마커(같은 상자 안 여러 t() 호출) 대충 합치기
        nums = numeric_lines_in_window(lines, i, min(i + WINDOW, len(lines)))
        if not nums:
            continue
        unlabeled = [n for n in nums if n[2] is None]
        if unlabeled:
            key = (i, unlabeled[0][0])
            if key in seen_windows:
                continue
            seen_windows.add(key)
            hits.append({
                "marker_line": i + 1,
                "marker_text": line.strip()[:60],
                "example_line": unlabeled[0][0] + 1,
                "example_text": unlabeled[0][1],
            })
    return hits


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("-")]
    list_only = "--list" in sys.argv
    want = set(args) or None

    total = 0
    flagged = {}
    for d in sorted(glob.glob("quest-problems/*/")):
        quest = d.rstrip("/").split("/")[-1]
        if want and quest not in want:
            continue
        fp = d + "chapters.jsx"
        try:
            hits = scan_file(fp)
        except FileNotFoundError:
            continue
        if hits:
            flagged[quest] = hits
            total += len(hits)

    if list_only:
        for q in sorted(flagged):
            print(q)
        return 0

    print(f"샘플 입출력 상자로 보이는데 «← 라벨» 이 없는 자리 — {total}건 · quest {len(flagged)}개"
          f" (전체 {len(glob.glob('quest-problems/*/chapters.jsx'))}개 파일 중)")
    for q in sorted(flagged):
        print(f"\n  ■ {q}")
        for h in flagged[q][:4]:
            print(f"      L{h['marker_line']} \"{h['marker_text']}\" → L{h['example_line']} \"{h['example_text']}\"")
        if len(flagged[q]) > 4:
            print(f"      … +{len(flagged[q]) - 4}건 더")

    print()
    print("⚠️ 판정이 아니라 볼 자리 표시다. grep 근사치 — 12줄 창 밖 라벨·다른 화살표 모양은")
    print("   못 보고 «없다» 로 오판할 수 있다. 사람이 20건(적으면 전수) 손으로 열어 진짜 비율을 재라.")
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
