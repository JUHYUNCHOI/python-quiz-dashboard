#!/usr/bin/env python3
"""입출력 형식 카드가 "왜 그 답인지" 까지 말하고 있나 — **후보 추림이지 판정이 아니다.**

왜 (2026-09-09): 오늘 검토한 MCC quest 10개 중 10개가 이 결함이었다.
형식 카드는 "각 줄이 무엇인가" 까지가 몫이고 "왜 그 답인가" 는 뒤 쪽 몫인데,
카드가 답을 먼저 말하면 **그 뒤 쪽들이 전부 발견이 아니라 재확인이 된다.**

⚠️ **정확도를 실측했다. 이 숫자를 알고 써라 — 사람을 대신할 수 없다.**
  · "결론어 + 계산식" 두 조건 → 알려진 참 10개 중 **1개**만 잡음(재현율 10%)
  · "결론어" 한 조건만       → **5개** (재현율 50%)
    계산식 조건이 절반을 날린 이유: fences 의 "가장 작은 값이 2 → 제일 싸요" 처럼
    결론에 산술이 없는 경우가 흔하다.
  · 이미 고친 10개에 돌리니 5건이 떴고 **진짜는 1건**(정밀도 20%).
    헛경보 넷은 일부러 넣은 티저("어느 열이 제일 쌀까요?"), 제약의 "최대 5,000",
    출력 설명의 "최소 비용" 같은 것들이었다.

**그래서 이 검사기로 사람 검토 범위를 줄이면 안 된다.**
pedagogy 가 1라운드에서 "스캐너로 후보를 추리고 사람은 걸린 것만 보자" 고 제안했다가
이 숫자를 보고 접었다: *"정밀도를 올리려 하면 재현율이, 재현율을 올리려 하면 정밀도가
무너진다. 스포일러는 어휘가 아니라 의미 문제라 규칙 기반의 천장이 낮다."*

**쓰는 법**: 사람 검토와 **나란히** 돌린다. 비용이 0이고, 실제로
사람이 두 번 본 fences 에서 놓친 스포일러 하나를 더 찾았다(커밋 ec45c0b2).
"0건" 을 결백의 증거로 쓰지 마라.
"""
import re,io,sys,glob,os
# 형식(승) 카드 안에 "결론어 + 계산" 이 같이 있나 — 후보 추림이지 판정이 아니다.
CONCL=re.compile(r'가장|제일|최선|최소|최대|더 싸|제일 싸|이겨|worse|better|best|wins|cheapest|smallest is|→ *답|답은|so the answer|that column|→ *\bYES\b|→ *\bNO\b')
CALC =re.compile(r'\d+\s*[+\-×*/=]\s*\d+|=\s*\d+|\d+\s*→\s*\d+')
def io_blocks(src):
    """형식 카드 스텝 = '입출력/Input/📥/샘플' 이 들어간 스텝 조각."""
    parts=['"'+x for x in re.split(r'\n\s*\{\s*\n?\s*type:\s*"', src)]
    parts[0]=parts[0][1:]
    return [p for p in parts if re.search(r'📥|📤|입력\s*형식|Input Format|입출력|Sample|샘플', p)]
def ko(blk):
    return [b for a,b in re.findall(r't\(E,\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"', blk)]
def scan(path):
    src=io.open(path,encoding="utf-8").read()
    out=[]
    for blk in io_blocks(src):
        for t in ko(blk):
            if CONCL.search(t): out.append(t[:90])
    return out
for q in sys.argv[1:]:
    p=f"quest-problems/{q}/chapters.jsx"
    if not os.path.exists(p): print(f"  {q:16} (파일 없음)"); continue
    h=scan(p)
    print(f"  {q:16} {'🚨 '+str(len(h))+'건' if h else '— 0건'}")
    for x in h[:2]: print(f"       {x}")
