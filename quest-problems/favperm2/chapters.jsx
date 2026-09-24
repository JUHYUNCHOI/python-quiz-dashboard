/* ================================================================
   FavPerm2 = SAME PROBLEM as `permutation/` (USACO Open 2024 Bronze #3,
   "Farmer John's Favorite Permutation" — Nhoj's dismantling).

   To avoid drift between the two quest tutorials, FavPerm2 mostly
   re-uses the chapter builders + solution code from `permutation/`.
   Any narration / visualization / pedagogical fix made to permutation/
   automatically applies here.

   Local addition: ONE extra sim step in Ch2 — DeepAuditSim — that
   audits a candidate p against the target h hint-by-hint, deeper
   than the static trace table. The original permutation/ quest is
   left untouched.

   The student progress key (favperm2) stays intact — the quest still
   exists at /quest/favperm2 and shows the same content as
   /quest/permutation, plus the extra audit sim.
   ================================================================ */

import { t } from "@/components/quest/theme";
import { makePermCh1, makePermCh2, makePermCh3 } from "../permutation/chapters";
import { DeepAuditSim } from "./components";

/* 2026-09-17: 여기 `export { SOLUTION_CODE } from "../permutation/chapters";` 가 있었다.
   permutation 쪽의 죽은 사본을 지우면서 **이 줄이 없는 이름을 가리키게 됐다.**
   favperm2 안에서도 쓰지 않는다(0곳). 그래서 같이 지운다.
   ⚠️ 교훈 — 죽은 export 를 지울 때는 **다른 quest 가 다시 내보내는지**도 봐야 한다.
      quest 폴더 안만 보면 이 줄을 못 본다. */

export const makeFavPerm2Ch1 = makePermCh1;

export function makeFavPerm2Ch2(E) {
  const base = makePermCh2(E);
  // Insert the deep-audit sim right after the static "first few attempts"
  // trace table (page 2-2 — the densest info-dump in this chapter), so
  // students can immediately drive an audit on three concrete candidates
  // instead of just reading the table.
  const insertIdx = 2; // base[1] is the static trace; add right after it.
  const auditStep = {
    type: "reveal",
    narr: t(E,
      "Pick a candidate p and check its hints against h step by step.",
      "후보 p 를 골라 나온 힌트를 목표 h 와 한 칸씩 맞춰 봐요."),
    content: (<DeepAuditSim E={E} />),
  };
  return [...base.slice(0, insertIdx), auditStep, ...base.slice(insertIdx)];
}

export const makeFavPerm2Ch3 = makePermCh3;
