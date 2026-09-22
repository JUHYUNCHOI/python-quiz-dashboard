#!/usr/bin/env python3
"""vercel.json 이 Vercel 스키마를 지키나 — **푸시하기 전에** 잡는다.

왜 (2026-09-22): `ignoreCommand` 가 **670자**였는데 한도가 **256자**다.
푸시는 성공했고 git 도 아무 말 안 했고 pre-push 걸쇠도 통과했는데,
**프로덕션 빌드가 통째로 실패했다.**

    Build Failed
    The `vercel.json` schema validation failed with the following message:
    `ignoreCommand` should NOT be longer than 256 characters

선생님이 Vercel 화면을 보고 알려주셔야 알았다.

**왜 아무도 못 잡았나**: 우리 걸쇠는 전부 **푸시 전 우리 쪽**만 본다 —
check-frozen(동결 파일) · check-deploy-budget(푸시 횟수) · build:check(타입·빌드).
**푸시 뒤에 Vercel 이 vercel.json 을 검사하는 단계는 아무도 안 봤다.**
`npm run build:check` 는 vercel.json 을 읽지도 않는다.

이 검사기가 그 구멍을 메운다. 순전히 기계적이라(문자 길이·JSON 문법)
오탐이 날 구석이 없다.
"""
import io
import json
import sys

PATH = "vercel.json"

# Vercel 스키마 한도 — 아는 것만 적는다. 새로 알게 되면 여기에 더해라.
MAX_LEN = {
    "ignoreCommand": 256,
    "buildCommand": 256,
    "installCommand": 256,
    "devCommand": 256,
    "outputDirectory": 256,
    "framework": 256,
}


def main():
    try:
        raw = io.open(PATH, encoding="utf-8").read()
    except FileNotFoundError:
        print(f"✅ {PATH} 이 없다 — 검사할 것 없음")
        return 0

    try:
        cfg = json.loads(raw)
    except json.JSONDecodeError as e:
        print(f"❌ {PATH} 이 JSON 으로 안 읽힌다 — {e}")
        print("   이대로 밀면 Vercel 빌드가 통째로 실패한다.")
        return 1

    bad = []
    for key, limit in MAX_LEN.items():
        v = cfg.get(key)
        if isinstance(v, str) and len(v) > limit:
            bad.append((key, len(v), limit, v))

    if not bad:
        shown = [f"{k}={len(cfg[k])}자" for k in MAX_LEN if isinstance(cfg.get(k), str)]
        print("✅ vercel.json — 스키마 한도 안에 있다" + (f"  ({' · '.join(shown)})" if shown else ""))
        return 0

    print(f"❌ vercel.json — 한도를 넘는 필드 {len(bad)}개. **이대로 밀면 빌드가 실패한다.**\n")
    for key, n, limit, v in bad:
        print(f"  `{key}` : {n}자 (한도 {limit}자, {n - limit}자 초과)")
        print(f"      {v[:70]}…\n")
    print("  고치는 법: 긴 셸 로직은 **스크립트 파일로 빼고** 여기선 한 줄로 부른다.")
    print('      예) "ignoreCommand": "bash scripts/vercel-ignore.sh"')
    print("      2026-09-22 에 그렇게 고쳤다 — 670자 → 29자.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
