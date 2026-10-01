#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""접근 칩(`AlgorithmTags`)의 낱말이 **그 quest 본문에 있나.**

왜 생겼나 (2026-10-01, 하루에 **세 번**):
  MCC 48개에 접근 칩을 붙인 날, 학생(초6) 둘이 각각 같은 모양을 찾았다 —
    · `subseqmedian` 「📐 원소마다 **몫**을 적어두기」
      → *"「몫」은 학교에서 **나눗셈 몫**으로 배웠다. 근데 코드 어디에도 나눗셈이 없었다."*
    · `xorstring` 「📐 그 쌍이 든 **토막** 개수 세기」
      → *"본문에는 「부분문자열」이라고 하는데 칩에는 「토막」이라고 해서
         **같은 걸 다른 말로 부르나?** 싶었다."* (본문 「부분문자열」 12곳, 「토막」 0곳)
    · `xorstring` 「🧩 쌍을 세 종류로 **압축**」
      → *"본문 어디에도 「압축」이 안 나와서 칩이 뭘 가리키는지 **끝까지 몰랐다.**"*

  칩을 정규화할 때 **기호와 알고리즘 이름은 걸렀는데**
  「그 낱말이 이 quest 본문에 있나」는 안 봤다. 그게 이 검사기다.

  ⭐ 칩은 quest **맨 위**에 있다 — 학생이 **제일 먼저** 읽는 글이다.
    거기서 쓴 말이 본문에 없으면 그 말은 **아무 데서도 설명되지 않는다.**
    `feedback_no_invented_terms` 의 「한 값에 이름이 둘」이 **가장 나쁜 자리에서** 일어난다.

⛔ **판정이 아니라 볼 자리 표시다.** 일부러 더 쉬운 말로 바꾼 자리일 수 있다 —
  그때는 **본문도 그 말로 바꾸는 것**이 답이지, 칩만 되돌리는 게 답이 아닐 수 있다.

쓰기:
  python3 scripts/check-chip-words-in-body.py [quest-id ...]
  python3 scripts/check-chip-words-in-body.py --selftest
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QDIR = os.path.join(ROOT, "quest-problems")

# 기능어·흔한 동사는 본문에 없어도 당연하다 — 내용어만 본다.
STOP = set("""
그 이 저 것 수 때 뒤 앞 안 밖 위 아래 왼쪽 오른쪽 하나 둘 셋 넷 모두 다 또 더 덜
개 번 쪽 줄 칸 값 말 곳 자리 순서 경우 가지 만큼 씩 각각 서로 바로 먼저 나중 가장 제일
구하기 세기 찾기 만들기 하기 되기 보기 넣기 빼기 쓰기 읽기 적기 두기 주기 가기 오기
확인 계산 출력 정렬 비교 시도 갱신 반복 적용 유지 처리 판정 검사 시뮬레이션
작은 큰 좋은 같은 다른 새 옛 전 후 처음 끝 최소 최대 길이 개수 합 차이 곱
있다 없다 이다 아니다 된다 한다
""".split())

MIN_LEN = 2  # 한 글자 낱말은 안 본다 (오탐이 압도적)

# 동사·형용사 활용 꼬리 — 본문이 다른 꼴로 썼을 뿐인 경우가 대부분이라 **뺀다.**
# ⛔ 이걸 안 빼면 「쏘기」·「재기」·「풀기」·「곱하기」 같은 게 쏟아진다(실측 101건 → 48건).
VERBISH = ("기", "히", "이", "며", "고", "서", "아", "어", "여", "게", "면",
           "지", "야", "워", "해", "는", "한", "된", "날")


def _chips(qid):
    """그 quest 의 `<AlgorithmTags ... tags={[...]}/>` 에서 ko 문구를 뽑는다."""
    out = []
    qpath = os.path.join(QDIR, qid)
    if not os.path.isdir(qpath):
        return out
    for fn in sorted(os.listdir(qpath)):
        if not fn.endswith((".jsx", ".tsx")):
            continue
        src = open(os.path.join(qpath, fn), encoding="utf-8").read()
        m = re.search(r"<AlgorithmTags\b.*?tags=\{\[(.*?)\]\}", src, re.S)
        if not m:
            continue
        for ko in re.findall(r'\bko:\s*"([^"]+)"', m.group(1)):
            out.append((fn, ko))
    return out


def _body_text(qid, skip_app=True):
    """학생이 보는 본문 글 — 칩이 적힌 `*App.jsx` 는 뺀다(자기 자신과 대조하면 뜻이 없다)."""
    parts = []
    qpath = os.path.join(QDIR, qid)
    for fn in sorted(os.listdir(qpath)):
        if not fn.endswith((".jsx", ".tsx")):
            continue
        if skip_app and fn.endswith("App.jsx"):
            continue
        parts.append(open(os.path.join(qpath, fn), encoding="utf-8").read())
    return "\n".join(parts)


# 떼어낼 조사 — **긴 것부터**. 한 글자 어간(`쌍`·`몫`)이 남을 수 있어야 한다.
PARTICLES = ["으로", "에서", "에게", "부터", "까지", "마다", "처럼", "보다", "라고",
             "을", "를", "이", "가", "은", "는", "의", "에", "로", "와", "과", "도", "만", "씩"]


def _stems(tok):
    """어간 후보를 만든다 — 조사는 **목록으로** 떼고, 어미는 길이로 거칠게 깎는다.

    ⛔ 처음엔 길이로만 깎았는데 `MIN_LEN=2` 라서 **한 글자 어간이 안 만들어졌다** —
       `쌍을`→`쌍`, `몫을`→`몫` 이 생기지 않아, 본문에 `쌍은`·`몫`이 있어도
       **「없다」고 신고했다.** `[가-힣]+` 가 조사까지 한 덩어리로 집는 탓이다.
       그래서 조사는 **목록으로** 떼고(한 글자 어간 허용), 어미 활용은 길이로 본다.
    """
    out = [tok]
    for p in PARTICLES:
        if tok.endswith(p) and len(tok) - len(p) >= 1:
            out.append(tok[: -len(p)])
            break
    # 「되풀이되는」→「되풀이」처럼 활용 꼬리가 붙은 경우 — 두 글자까지 깎아 본다
    out.extend(tok[:n] for n in range(len(tok) - 1, MIN_LEN - 1, -1))
    seen, uniq = set(), []
    for s in out:
        if s and s not in seen:
            seen.add(s)
            uniq.append(s)
    return uniq


def _content_words(phrase):
    """내용어만 — 어간 후보 중 하나라도 기능어면 버린다."""
    words = []
    for tok in re.findall(r"[가-힣]+", phrase):
        if len(tok) < MIN_LEN:
            continue
        stems = _stems(tok)
        if any(st in STOP for st in stems):
            continue
        # 신고는 **조사만 뗀 꼴**로 — `몫을`→`몫`. ⛔ 길이 깎기가 만든 가짜 토막
        #    (`곱하기`→`곱하`)을 신고에 올리면 안 된다. 그게 처음 101건의 절반이었다.
        head = tok
        for pt in PARTICLES:
            if tok.endswith(pt) and len(tok) - len(pt) >= 1:
                head = tok[: -len(pt)]
                break
        # 동사·형용사 활용은 본문이 다른 꼴로 썼을 뿐인 경우가 대부분 — 뺀다
        if head.endswith(VERBISH):
            continue
        words.append(head)
    return words


def _appears(word, body):
    """어간 후보가 **하나라도** 본문에 있으면 통과."""
    return any(st in body for st in _stems(word))


def scan(qid):
    hits = []
    body = _body_text(qid)
    for fn, ko in _chips(qid):
        for w in _content_words(ko):
            if not _appears(w, body):
                hits.append({"file": fn, "chip": ko, "word": w})
    return hits


def selftest():
    cases = [
        # (칩 문구, 본문, 빠진 낱말 기대)
        ("그 쌍이 든 토막 개수 세기", "이웃한 두 글자 쌍이 든 부분문자열을 세어요", ["토막"]),
        ("쌍을 세 종류로 압축", "쌍은 세 종류뿐이라 따로따로 변신해요", ["압축"]),
        ("원소마다 몫을 적어두기", "각 원소의 기여도를 적어요", ["몫"]),
        ("되풀이되는 바퀴 찾기", "한 바퀴가 되풀이돼요", []),          # 어간으로 잡혀야
        ("가장 작은 차이 추적", "차이를 추적해요", []),
        ("두 방향 다 시도하기", "방향을 바꿔서도 해봐요", []),
    ]
    ok = True
    for chip, body, want in cases:
        got = [w for w in _content_words(chip) if not _appears(w, body)]
        mark = "✅" if got == want else "🚨"
        if mark == "🚨":
            ok = False
        print("  %s  빠진 낱말 %-12s (기대 %-12s)  「%s」"
              % (mark, got or "없음", want or "없음", chip))
    print("\n%s" % ("잣대가 산다." if ok else "🚨 잣대가 죽었다 — 고쳐라."))
    return 0 if ok else 1


def main():
    if "--selftest" in sys.argv:
        return selftest()
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    ids = args or sorted(d for d in os.listdir(QDIR)
                         if os.path.isdir(os.path.join(QDIR, d)))
    rows, total = [], 0
    for qid in ids:
        try:
            hits = scan(qid)
        except OSError:
            continue
        if hits:
            rows.append((qid, hits))
            total += len(hits)

    print("칩에만 있고 **본문에 없는 낱말** — %d건 · quest %d개 (검사 %d개)"
          % (total, len(rows), len(ids)))
    print()
    for qid, hits in sorted(rows, key=lambda x: -len(x[1])):
        print("  ■ %s — %d건" % (qid, len(hits)))
        for h in hits:
            print("      「%s」 ← 칩: %s" % (h["word"], h["chip"]))
    print("""
⛔ **판정이 아니라 볼 자리 표시다.**
   ⭐ 칩은 quest **맨 위**다 — 학생이 **제일 먼저** 읽는 글이다.
     거기 쓴 말이 본문에 없으면 그 말은 **아무 데서도 설명되지 않는다.**
   고치는 길이 둘이다 — ①칩을 본문 말로 바꾼다 ②**본문을 칩의 쉬운 말로 바꾼다.**
     일부러 더 쉬운 말을 골랐으면 ②가 답일 수 있다. 사람이 정한다.
⚠️ 어간으로 거칠게 맞춰 본다 — 활용이 많이 달라지면 **놓친다.** 0건이 결백이 아니다.
근거: 2026-10-01 학생 둘이 각각 찾았다 — `몫`(subseqmedian) · `토막`·`압축`(xorstring).""")
    return 0


if __name__ == "__main__":
    sys.exit(main())
