#!/usr/bin/env python3
"""quest 맨 위에 **「이 문제를 뭘로 어떻게 푸나」** 가 보이나 — `AlgorithmTags`.

왜 (2026-09-30): 선생님이 `strangefn` 화면을 보시고 말씀하셨다 —

  *"전체적으로 저렇게 해결방법을 생각한 **그 단계 접근방법이 보이지 않네**"*
  *"학생들은 이런 문제들을 **어떻게 접근할수 있을까**가 궁금할것 같아"*

⛔ 그런데 이건 **새 지적이 아니었다.** 2026-07-13 에 선생님이 이미 하셨다 —

  *"각 사용된 알고리즘이 위에 태그처럼 나왔으면 좋겠어.
    **뭘 어떻게 풀어갈건지 크게 보이지가 않아.**"*

그때 `components/quest/AlgorithmTags.jsx` 를 만들었다. **만들고 9개에만 붙였다.**
그 뒤로 quest 가 170개가 됐는데 **아무도 「이 태그가 붙었나」를 안 봤다.**
그래서 두 달 뒤 선생님이 **같은 말씀을 다시** 하시게 됐다.

이 저장소에서 같은 모양이 반복된다 —
**규칙은 있었고 도구도 있었는데 「거치는 문」 목록에 없어서 아무도 안 돌렸다**
(`feedback_fix_all_at_once_not_one_by_one`). 그래서 문에 넣는다.

⛔⛔ **화면에 비슷해 보이는 장치가 둘이다 — 이 검사기는 ②만 본다.** (2026-10-01 혼선)

    ① **핵심 토픽 띠** — *"📘 이 문제 핵심: **그래프** — 막히면 배우기 →"*
       `lib/quest-algo.ts` → `app/quest/[problemId]/client.tsx` 가 렌더한다.
       **토픽 이름표 + 학습 페이지 링크.** 실측 USACO 12/122 · MCC 10/48.
    ② **풀이 방법 칩** — *"🔍 작은 값 실험 · 🧩 패턴 찾기 · ✅ 규칙 검증 · Σ 공식화"*
       `AlgorithmTags` 컴포넌트, 각 quest 의 `*App.jsx`. **접근하는 차례.**
       실측 USACO 10/122 · **MCC 0/48.**  ← **이 검사기가 세는 것**

    ⚠️ **①이 있다고 ②가 채워진 게 아니다.** 하는 일이 다르다 —
       ①은 *"이건 그래프 문제야"*(이름표), ②는 *"이렇게 덤벼라"*(차례).
       선생님이 물으신 것은 **②**다.
    ⚠️ **①의 공백에는 이미 판정이 있는 자리가 있다** — `mcc20kitty`·`mcc20missing` 은
       *"표준 토픽이 없어서 **일부러 비웠다**"*(틀린 배지가 빈 배지보다 나쁘다).
       **그건 ①의 판정이고 ②와 무관하다.** ②는 토픽 이름이 아니라 「푸는 차례」라
       **표준 토픽이 없어도 쓸 수 있다**(`strangefn` 이 그 예 — 링크 없이 칩만 붙였다).

무엇을 보나 — quest 폴더 안 어디서든 `AlgorithmTags` 를 **import 하거나 쓰나.**
`app/quest/[problemId]/data.ts` 에서 `section` 이 **USACO·MCC** 인 것만 센다
(LeetCode·MCO 는 성격이 달라 뺀다).

⚠️ **판정이 아니라 볼 자리 표시다.** 태그가 정말 필요 없는 quest 가 있을 수 있다 —
   칩 **문구**는 사람(`pedagogy-reviewer`)이 정한다. 기계는 **없다는 것만** 안다.
⚠️ **0건이 결백이 아니다** — 태그가 **붙어 있는데 내용이 틀린** 것은 못 본다.
   실제로 `AlgorithmTags` 는 `href` 로 `app/algo/` 토픽에 링크를 걸 수 있는데,
   **없는 토픽으로 링크가 걸려 있어도 이 검사기는 통과시킨다.**
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CATALOG = os.path.join(ROOT, "app", "quest", "[problemId]", "data.ts")
QUESTS = os.path.join(ROOT, "quest-problems")

# 이 두 섹션만 본다 — 선생님 방침이 Bronze + MCC 우선이다
# (memory/decision_bronze_mcc_first.md, 2026-09-29).
SECTIONS = ("USACO", "MCC")


def catalog_rows():
    """카탈로그에서 (id, section) 을 뽑는다. 한 줄에 한 문제인 모양을 전제한다."""
    with open(CATALOG, encoding="utf-8") as f:
        text = f.read()
    rows = []
    for line in text.splitlines():
        m_id = re.search(r'id:\s*"([^"]+)"', line)
        m_sec = re.search(r'section:\s*"([^"]+)"', line)
        if m_id and m_sec:
            rows.append((m_id.group(1), m_sec.group(1)))
    return rows


def uses_tags(qid):
    """그 quest 폴더 안 어디서든 AlgorithmTags 를 쓰나."""
    folder = os.path.join(QUESTS, qid)
    if not os.path.isdir(folder):
        return None  # 폴더가 없다 — 카탈로그에만 있는 것
    for dirpath, _dirnames, filenames in os.walk(folder):
        for name in filenames:
            if not name.endswith((".jsx", ".tsx", ".js", ".ts")):
                continue
            with open(os.path.join(dirpath, name), encoding="utf-8", errors="replace") as f:
                if "AlgorithmTags" in f.read():
                    return True
    return False


def main(argv):
    only = set(argv[1:])
    rows = catalog_rows()
    missing, has, nofolder = [], [], []
    for qid, section in rows:
        if section not in SECTIONS:
            continue
        if only and qid not in only:
            continue
        state = uses_tags(qid)
        if state is None:
            nofolder.append(qid)
        elif state:
            has.append(qid)
        else:
            missing.append((qid, section))

    total = len(has) + len(missing)
    print(f"「뭘 어떻게 푸나」 태그가 없는 quest — {len(missing)}개 / 검사 {total}개 "
          f"(USACO·MCC)")
    if has:
        print(f"  ✅ 쓰는 quest {len(has)}개: {' '.join(sorted(has))}")
    if missing:
        by_sec = {}
        for qid, sec in missing:
            by_sec.setdefault(sec, []).append(qid)
        for sec in sorted(by_sec):
            ids = sorted(by_sec[sec])
            print(f"\n  ⚠️ {sec} — {len(ids)}개")
            for i in range(0, len(ids), 6):
                print("     " + "  ".join(ids[i:i + 6]))
    if nofolder:
        print(f"\n  ℹ️ quest-problems 에 폴더가 없어 못 본 것 {len(nofolder)}개: "
              f"{' '.join(sorted(nofolder))}")

    print("""
⚠️ **판정이 아니라 볼 자리 표시다.** 칩 **문구**는 사람이 정한다 —
   그 quest 가 실제로 무엇으로 푸는지는 코드를 읽어야 안다(`pedagogy-reviewer` 몫).
⚠️ **0건이 결백이 아니다** — 태그가 **붙어 있는데 내용이 틀린 것**은 못 본다.
   `href` 가 **없는 `app/algo/` 토픽**을 가리켜도 여기서는 통과한다.
근거: 선생님 2026-07-13 *"뭘 어떻게 풀어갈건지 크게 보이지가 않아"*
      → 2026-09-30 **같은 지적 반복.** 도구는 있었고 문 목록에 없었다.""")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
