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

export { SOLUTION_CODE } from "../permutation/chapters";

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
      "The table above lists outcomes — now AUDIT them yourself. Pick a candidate p, then ▶ step Nhoj's process and check each produced hint against h. You'll see exactly where wrong candidates die and why [3, 1, 2, 4] survives all three checks.",
      "위 표는 결과만 보여줘요 — 이제 직접 검증해 봐요. 후보 p 를 고르고 ▶ 으로 한 단계씩 Nhoj 과정을 돌리며 만들어진 힌트를 h 와 한 칸씩 대조. 틀린 후보가 어디서 죽는지, 왜 [3, 1, 2, 4] 만 끝까지 살아남는지 직접 확인."),
    content: (<DeepAuditSim E={E} />),
  };
  return [...base.slice(0, insertIdx), auditStep, ...base.slice(insertIdx)];
}

export const makeFavPerm2Ch3 = makePermCh3;
