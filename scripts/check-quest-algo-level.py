#!/usr/bin/env python3
"""quest 가 자기 등급보다 위 단계 알고리즘 토픽으로 학생을 보내는지 본다.

왜 있나 (2026-09-07):
  moohunt(USACO Jan 2026 **Bronze** #2) 맨 위 배너가
    "🧠 이 문제 핵심: 비트 연산 — 막히면 배우기 →"
  라고 하며 /algo/bitmanipulation 으로 보내고 있었다. 그 토픽 파일에는
    category: '심화 (Gold~Platinum)'
  이라고 적혀 있다. Bronze 학생을 "심화" 라벨이 붙은 페이지로 보낸 것이다.
  learning_tracks.md 4번 — "트랙에 안 맞는 걸 보여주지 않는다" — 정면 위반이다.
  5개월 동안 아무도 못 봤다. 두 파일을 나란히 놓고 본 사람이 없었기 때문이다.
  기계는 매번 나란히 놓는다.

무엇을 하나:
  lib/quest-algo.ts 의 매핑 × app/quest/[problemId]/data.ts 의 대회 등급
  × data/algorithm/topics/*.ts 의 category 를 맞대어 본다.

빠져나가는 법 (일부러 그런 경우):
  lib/quest-algo.ts 의 ALGO_LEVEL_NOTE 에 그 quest 를 등록하고,
  "이 문제엔 무엇만 필요한지" 한 줄을 적는다. 그러면 배너가 학생에게 미리 알려주고,
  이 검사도 통과한다. **등록 없이 위 단계로 보내는 것만 막는다.**
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RANK = {
    "기초 (Bronze~Silver)": 1,
    "탐색 (Silver)": 2,
    "문제 해결 기법 (Silver~Gold)": 3,
    "심화 (Gold~Platinum)": 4,
}
QRANK = [("bronze", 1), ("silver", 2), ("gold", 3), ("platinum", 4)]


def read(p):
    with open(os.path.join(ROOT, p), encoding="utf-8") as f:
        return f.read()


def main():
    data = read("app/quest/[problemId]/data.ts")
    subs = {m.group(1): m.group(2)
            for m in re.finditer(r'\{id:"([^"]+)".*?sub:"([^"]*)"', data)}

    qa = read("lib/quest-algo.ts")
    body = qa[qa.index("export const QUEST_ALGO"):]
    # 주석 줄은 빼고 실제 매핑만 (주석에 적힌 '제거 사유' 를 매핑으로 세지 않게)
    body = "\n".join(l for l in body.splitlines() if not l.strip().startswith("//"))
    mapping = dict(re.findall(r'(\w+):\s*"(\w+)"', body))

    noted = set(re.findall(r"^\s*(\w+):\s*\{ ko:", qa, re.M))

    cats = {}
    tdir = os.path.join(ROOT, "data/algorithm/topics")
    for f in os.listdir(tdir):
        if not f.endswith(".ts") or f == "index.ts":
            continue
        m = re.search(r"category:\s*'([^']+)'", read("data/algorithm/topics/" + f))
        if m:
            cats[f[:-3]] = m.group(1)

    bad = []
    for quest, topic in sorted(mapping.items()):
        sub = subs.get(quest, "")
        ql = next((r for k, r in QRANK if k in sub.lower()), None)
        tr = RANK.get(cats.get(topic, ""), None)
        if ql is None or tr is None:
            continue                      # 대회 등급이 없는 문제(MCC 등)는 판정 불가 — 건너뜀
        # ⚠️ 기준을 좁게 잡는다. 처음엔 "한 단계라도 위면 신고" 로 짰다가 **18건**이 떴다 —
        #    Bronze 문제가 greedy·dp 로 분류되는 건 지극히 정상이다(USACO Bronze 가 원래 그렇다).
        #    헛 경보가 18줄 남으면 아무도 이 검사기를 안 본다.
        #    진짜 문제는 **Bronze 학생에게 '심화(Gold~Platinum)' 라벨이 붙은 페이지를 내미는 것**이다.
        #    그 한 가지만 신고한다.
        if ql == 1 and tr == 4 and quest not in noted:
            bad.append((quest, sub, topic, cats[topic]))

    if bad:
        print(f"🚨 Bronze 문제인데 '심화(Gold~Platinum)' 토픽으로 보내는 quest {len(bad)}건 "
              f"(ALGO_LEVEL_NOTE 미등록):\n")
        for q, sub, t, c in bad:
            print(f"   {q:<14} {sub:<24} → /algo/{t}  [{c}]")
        print("\n   고치는 법 둘 중 하나:")
        print("   ① 매핑이 틀렸으면 QUEST_ALGO 에서 빼라 (왜 뺐는지 주석으로 남길 것)")
        print("   ② 그 알고리즘이 진짜 핵심이면 ALGO_LEVEL_NOTE 에 등록하고")
        print("      '이 문제엔 무엇만 필요한지' 한 줄을 적어라 — 배너가 미리 알려준다")
        return 1

    print(f"검사 {len(mapping)}개 매핑 · Bronze→심화 어긋남 0건 "
          f"(안내 등록 {len(noted)}건은 통과)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
