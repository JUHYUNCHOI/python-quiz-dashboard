/* ================================================================
   FavPerm2 = SAME PROBLEM as `permutation/` (USACO Open 2024 Bronze #3,
   "Farmer John's Favorite Permutation" — Nhoj's dismantling).

   To avoid drift between the two quest tutorials, FavPerm2 simply
   re-exports the chapter builders + solution code from `permutation/`.
   Any narration / visualization / pedagogical fix made to permutation/
   automatically applies here.

   The student progress key (favperm2) stays intact — the quest still
   exists at /quest/favperm2 and shows the same content as
   /quest/permutation.
   ================================================================ */

export {
  SOLUTION_CODE,
  makePermCh1 as makeFavPerm2Ch1,
  makePermCh2 as makeFavPerm2Ch2,
  makePermCh3 as makeFavPerm2Ch3,
} from "../permutation/chapters";
