#!/usr/bin/env python3
"""quest 하나를 오늘 몇 번이나 고쳤나 — **PM 판정 없이 더는 못 돈다.**

왜 (2026-09-23, PM 지시):
  `strangefn` 하나를 오늘 **여덟 라운드** 고쳤다. 라운드마다 «고치고 → 학생 붙이고
  → 또 고치고» 를 **PM 판정 없이** 돌렸고, quest 가 10쪽 → 17쪽이 됐다.
  선생님: **"야! 자꾸 왜 이 상황이 되는거지?"**

  문서로는 안 막힌다 — PM 이 직접 짚었다: *"오늘 아침에 만든 원칙이 오늘 오후에
  지켜지지 않았다."* 오늘만 메모리 문서 둘, 에이전트 배포 넷이 나갔는데
  **그 세션 안에서 행동이 안 바뀌었다.** 같은 일이 배포 예산에서 있었고, 그때 답은
  걸쇠였다(`.githooks/pre-push` + `check-deploy-budget.py`). 이걸 본뜬다.

────────────────────────────────────────────────────────────────────────
왜 **커밋 훅**인가 (푸시 훅이 아니라) — 반드시 읽을 것
────────────────────────────────────────────────────────────────────────
  배포 예산은 **푸시**를 센다 — "배포" 라는 사건 자체가 푸시이기 때문이다.
  이번 문제는 다르다. **여덟 번 고친 건 전부 커밋이었지, 푸시가 아니었다**
  (`pre-push` 가 하루 1회로 이미 막고 있어서 그날 안에 여러 번 못 민다).
  **사고가 나는 자리는 «커밋을 쌓는 동안» 이지 «미는 순간» 이 아니다.**
  푸시 시점에 검사하면 이미 여덟 라운드를 다 돌린 **뒤**라 손을 쓸 수가 없다
  — 사후 부검 보고서지 제동장치가 아니다. 그래서 **pre-commit** 에 건다.

  ⚠️ 대가: 로컬 커밋 자체가 끊길 수 있다. 그래서 **예산을 quest 디렉터리를
  건드리는 커밋에만** 걸고(`scripts/`·`docs/`·다른 quest 커밋은 안 건드림),
  **하루 3번까지는 공짜**로 둔다 — 첫 발견·바로 다음 수정 한 번 정도는
  일하는 흐름을 안 끊는 게 더 중요하다는 판단(PM 판정 요청 문서의
  "너무 빡빡하면 정상 작업이 막힌다" 경고를 따른 것).

────────────────────────────────────────────────────────────────────────
«PM 판정 항목» 을 어떻게 알아보나 — **롤링(rolling) 예산**
────────────────────────────────────────────────────────────────────────
  예산은 "오늘 3번까지" 가 아니라 **"마지막 PM 판정 이후 3번까지"** 다.
  하루 안에 여러 라운드가 있을 수 있고(정말 그랬다 — `strangefn` 은
  ①재구성 ②"다시 닫혔다" ③"✂️ 길이" 세 번 판정을 받았다), **매 라운드가
  각자 예산 3개를 새로 받는다.** PM 판정이 한 번이라도 있으면 "그 하루는
  영원히 무제한" 이 되는 허점을 막기 위해서다 — 실제로 `strangefn` 재검증
  중, 첫 판정(00:20) 이후로도 **네 커밋이 더** PM 판정 없이 이어졌다
  (`d7878d1c`~`babafa84`). 롤링이 아니면 이 구멍을 못 잡는다.

  «PM 판정 항목» 인정 기준 — `.claude/WORK.md` 를 `^## ` 로 블록을 나누고,
  한 블록 안에 **①그 quest id ②"PM 판정" 이라는 글자 ③오늘 날짜**가
  전부 있으면 그 블록을 판정으로 센다(제목줄만 보지 않는다 — 실제로
  `strangefn` 「다시 닫혔다」 판정은 소제목(`###`) 에 "PM 판정" 이 있고
  H2 제목엔 없다). 그 블록이 **처음** 등장한 커밋의 시각을 "체크포인트"
  로 쓴다 — 매번 새로 나온 판정마다 체크포인트가 하나씩 더 생긴다.

  너무 빡빡함(A) vs 너무 헐거움(B) 트레이드오프를 이렇게 골랐다:
  · A 아님 — 제목줄 하나에 다 있어야 한다는 요구를 안 한다(위 "다시 닫혔다"
    사례처럼 소제목에 있어도 인정).
  · B 아님 — "그날 아무 때나 한 번 있으면 무제한" 을 안 준다(롤링).

쓰는 법:
  python3 scripts/check-quest-polish-budget.py <id>              # 지금 커밋 가능한지
  python3 scripts/check-quest-polish-budget.py <id> --simulate   # 오늘 커밋 내역을
                                                                  # 하나씩 재생하며 몇 번째서
                                                                  # 막혔을지 보여준다(보고용)
  python3 scripts/check-quest-polish-budget.py --staged          # pre-commit 이 쓰는 모드 —
                                                                  # 지금 스테이징된 파일에서
                                                                  # quest id 를 스스로 찾는다

종료 코드: 막혀야 하면 1, 진행해도 되면 0.
"""
import re
import subprocess
import sys
from datetime import datetime, timedelta
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FREE_BUDGET = 3  # 마지막 체크포인트 이후 공짜 커밋 개수

ID_TOKEN = re.compile(r"[A-Za-z0-9_-]+")


def run(args, **kw):
    return subprocess.run(args, capture_output=True, text=True, cwd=str(ROOT), **kw)


def today_str():
    return datetime.now().strftime("%Y-%m-%d")


def midnight_dt():
    now = datetime.now()
    return now.replace(hour=0, minute=0, second=0, microsecond=0)


def parse_git_dt(s):
    # "2026-09-23 13:02:05 +0800" -> naive local datetime (tz 무시, 로컬 기준 상대비교만 함)
    return datetime.strptime(s[:19], "%Y-%m-%d %H:%M:%S")


def quest_commits(qid, since_iso):
    """오늘 quest-problems/<qid>/ 를 건드린 커밋 — (hash, datetime) 오름차순."""
    r = run([
        "git", "log", f"--since={since_iso}", "--reverse",
        "--pretty=format:%H|%ai", "--", f"quest-problems/{qid}/",
    ])
    out = []
    for line in r.stdout.splitlines():
        if not line.strip():
            continue
        h, dt = line.split("|", 1)
        out.append((h, parse_git_dt(dt)))
    return out


def workmd_commits(since_iso):
    """오늘 .claude/WORK.md 를 건드린 커밋 — (hash, datetime) 오름차순."""
    r = run([
        "git", "log", f"--since={since_iso}", "--reverse",
        "--pretty=format:%H|%ai", "--", ".claude/WORK.md",
    ])
    out = []
    for line in r.stdout.splitlines():
        if not line.strip():
            continue
        h, dt = line.split("|", 1)
        out.append((h, parse_git_dt(dt)))
    return out


def workmd_content_at(commit_hash):
    r = run(["git", "show", f"{commit_hash}:.claude/WORK.md"])
    return r.stdout if r.returncode == 0 else ""


def workmd_content_staged():
    """지금 커밋하면 들어갈 WORK.md 내용 (인덱스). 없으면 워킹트리로 폴백."""
    r = run(["git", "show", ":.claude/WORK.md"])
    if r.returncode == 0 and r.stdout:
        return r.stdout
    f = ROOT / ".claude" / "WORK.md"
    return f.read_text(encoding="utf-8") if f.exists() else ""


def split_h2_blocks(text):
    """`^## ` 로 블록을 나눈다. 각 블록 = (제목줄, 제목줄 포함 본문 전체)."""
    lines = text.splitlines()
    blocks = []
    cur_head = None
    cur_lines = []
    for line in lines:
        if line.startswith("## "):
            if cur_head is not None:
                blocks.append((cur_head, "\n".join(cur_lines)))
            cur_head = line
            cur_lines = [line]
        else:
            if cur_head is not None:
                cur_lines.append(line)
    if cur_head is not None:
        blocks.append((cur_head, "\n".join(cur_lines)))
    return blocks


def id_in_text(qid, text):
    # 단어 경계 매칭 — "cow" 가 "cowsignal" 을 잘못 맞히지 않게.
    return re.search(r"(?<![A-Za-z0-9_-])" + re.escape(qid) + r"(?![A-Za-z0-9_-])", text) is not None


def matching_headings(text, qid, date_str):
    """이 WORK.md 전문에서, qid + 'PM 판정' + 오늘 날짜가 다 있는 블록의 제목줄 집합."""
    heads = set()
    for head, body in split_h2_blocks(text):
        if id_in_text(qid, body) and "PM 판정" in body and date_str in body:
            heads.add(head)
    return heads


def checkpoints(qid, since_iso, date_str, include_staged=True):
    """체크포인트 시각 목록(오름차순) — 자정 + 오늘 새로 나타난 판정 블록마다 하나씩."""
    cps = [midnight_dt()]
    seen = set()
    for h, dt in workmd_commits(since_iso):
        content = workmd_content_at(h)
        heads = matching_headings(content, qid, date_str)
        new = heads - seen
        if new:
            cps.append(dt)
            seen |= new
    if include_staged:
        staged = workmd_content_staged()
        heads = matching_headings(staged, qid, date_str)
        if heads - seen:
            cps.append(datetime.now())
    return sorted(cps)


def commits_since_latest_checkpoint(commit_dt, cps):
    """이 커밋 시각 기준, 그 이전(또는 같은) 가장 최근 체크포인트가 언제인지."""
    latest = cps[0]
    for c in cps:
        if c <= commit_dt:
            latest = c
        else:
            break
    return latest


def evaluate(qid, verbose=False):
    """지금 이 순간, qid 커밋을 하나 더 해도 되나. (staged 판정 포함)"""
    since_iso = midnight_dt().strftime("%Y-%m-%d %H:%M:%S")
    date_str = today_str()
    prior = quest_commits(qid, since_iso)
    cps = checkpoints(qid, since_iso, date_str, include_staged=True)
    latest_cp = commits_since_latest_checkpoint(datetime.now(), cps)
    since_count = sum(1 for _, dt in prior if dt > latest_cp)
    if verbose:
        print(f"  {qid}: 오늘 커밋 {len(prior)}개, 마지막 체크포인트({latest_cp.strftime('%H:%M:%S')}) 이후 {since_count}개")
    if since_count >= FREE_BUDGET:
        return False, latest_cp, since_count
    return True, latest_cp, since_count


def simulate(qid):
    """오늘 커밋을 하나씩 재생하며 몇 번째에서 막혔을지 보여준다 (보고용, 부작용 없음)."""
    since_iso = midnight_dt().strftime("%Y-%m-%d %H:%M:%S")
    date_str = today_str()
    prior = quest_commits(qid, since_iso)
    cps = checkpoints(qid, since_iso, date_str, include_staged=False)
    print(f"{qid} — 오늘 커밋 {len(prior)}개, 판정 체크포인트(자정 포함) {len(cps)}개: "
          + ", ".join(c.strftime("%H:%M:%S") for c in cps))
    for i, (h, dt) in enumerate(prior, start=1):
        latest_cp = commits_since_latest_checkpoint(dt, cps)
        since_count_before = sum(1 for _, d in prior[:i - 1] if d > latest_cp)
        blocked = since_count_before >= FREE_BUDGET
        mark = "🚫 막힘" if blocked else "✅ 통과"
        print(f"  커밋 #{i} {h[:8]} {dt.strftime('%H:%M:%S')} "
              f"(체크포인트 {latest_cp.strftime('%H:%M:%S')} 이후 {since_count_before}번째) — {mark}")


def staged_quest_ids():
    r = run(["git", "diff", "--cached", "--name-only"])
    ids = set()
    for line in r.stdout.splitlines():
        m = re.match(r"quest-problems/([^/]+)/", line)
        if m:
            ids.add(m.group(1))
    return sorted(ids)


def main():
    argv = sys.argv[1:]
    if "--staged" in argv:
        ids = staged_quest_ids()
        if not ids:
            return 0
        blocked_any = False
        for qid in ids:
            ok, latest_cp, since_count = evaluate(qid, verbose=True)
            if not ok:
                blocked_any = True
                print(f"\n⛔ `{qid}` 는 오늘 이미 {since_count}번 고쳤다"
                      f"(마지막 PM 판정 {latest_cp.strftime('%H:%M')} 이후).")
                print("   project-lead 판정 없이 더 못 민다.")
                print("   우회는 `--no-verify` 가 아니라 — `.claude/WORK.md` 에 이 quest 를")
                print("   언급하는 «PM 판정» 항목(같은 블록 안에 quest id·\"PM 판정\"·오늘 날짜)을")
                print("   먼저 남기는 것으로만 뚫린다.")
        return 1 if blocked_any else 0

    if "--simulate" in argv:
        argv.remove("--simulate")
        if not argv:
            print("quest id 를 하나 줘라: --simulate <id>")
            return 2
        simulate(argv[0])
        return 0

    if not argv:
        print("quest id 를 하나 줘라. 또는 --staged / --simulate <id>")
        return 2

    qid = argv[0]
    ok, latest_cp, since_count = evaluate(qid, verbose=True)
    if ok:
        print(f"✅ 지금 `{qid}` 커밋해도 된다.")
        return 0
    print(f"⛔ `{qid}` 는 마지막 PM 판정({latest_cp.strftime('%H:%M')}) 이후 이미 {since_count}번 고쳤다.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
