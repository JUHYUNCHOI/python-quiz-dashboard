#!/usr/bin/env bash
# Vercel "Ignored Build Step" — 빌드할지 건너뛸지 정한다.
#   exit 0 = 건너뛴다   ·   exit 1 = 빌드한다
#
# ⚠️ 왜 파일로 빠졌나 (2026-09-22):
#   이 로직이 vercel.json 의 `ignoreCommand` 안에 한 줄로 들어 있었는데
#   **670자**였다. Vercel 스키마 한도는 **256자**다.
#   그래서 푸시는 됐는데 **빌드가 통째로 실패**했다 —
#   "The `vercel.json` schema validation failed: `ignoreCommand` should NOT be
#    longer than 256 characters". 학생 화면은 하나도 안 바뀐 채였다.
#   ⛔ 다시 vercel.json 안으로 되돌리지 마라. 여기서 길러라.

echo "[ignore] REF=$VERCEL_GIT_COMMIT_REF SHA=$VERCEL_GIT_COMMIT_SHA PREV=[$VERCEL_GIT_PREVIOUS_SHA]"

# ① main 이 아니면 안 짓는다
if [ -n "$VERCEL_GIT_COMMIT_REF" ] && [ "$VERCEL_GIT_COMMIT_REF" != "main" ]; then
  echo "[ignore] main 이 아니라 건너뜀"
  exit 0
fi

# ② 비교 기준이 없으면 **빌드하는 쪽**으로 넘어진다.
#    ⚠️ 2026-06-21 에 반대로 짰다가 사이트가 며칠 얼었다. 이 방향을 바꾸지 마라.
BASE="$VERCEL_GIT_PREVIOUS_SHA"
if [ -z "$BASE" ]; then
  echo "[ignore] PREV 가 비었다 → 빌드한다(안전쪽)"
  exit 1
fi

# ③ 학생 화면에 닿는 파일이 바뀌었나. 문서·스크립트·설정만 바뀌었으면 안 짓는다.
CHANGED=$(git diff --name-only "$BASE" HEAD -- . \
  ':!.claude' ':!*.md' ':!docs/**' ':!scripts/**' ':!vercel.json' 2>&1)
if [ $? -ne 0 ]; then
  echo "[ignore] git diff 실패 → 빌드한다(안전쪽)"
  exit 1
fi

if [ -z "$CHANGED" ]; then
  echo "[ignore] 화면에 닿는 변화 없음 → 건너뜀"
  exit 0
fi

echo "[ignore] 바뀐 화면 파일:"
echo "$CHANGED" | head -20
exit 1
