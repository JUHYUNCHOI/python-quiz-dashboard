// USACO 공식 문제 cpid → 우리 quest id (사이트 안 단계별 풀이) 매핑.
// 2026-06-29 quest-problems/*/ 의 usaco.org cpid 링크에서 추출 + app/quest 카탈로그 교집합(라우팅 안전).
// 용도: 경로/사다리의 USACO 문제가 외부(usaco.org) 대신 우리 /quest/<id> 로 가게.
// (중복 cpid 1396: exchange/milkexchange → milkexchange 채택)

export const CPID_TO_QUEST: Record<number, string> = {
  663: "sqpasture", 664: "blockgame", 665: "cowsignal", 687: "dontbelast", 688: "hps17",
  689: "cowtipping", 711: "crossroad1", 712: "crossroad2", 713: "crossroad3", 735: "lostcow",
  736: "bovgenomics", 737: "modernart", 759: "billboard", 760: "bovshuffle", 761: "milkmeas",
  783: "billboard2", 784: "lifeguards", 785: "outofplace", 807: "teleport", 808: "hoofball",
  809: "tameherd", 831: "teamttt", 832: "milkorder", 833: "familytree", 855: "mixmilk",
  856: "bucketlist", 857: "backforth", 891: "shellgame", 892: "sleepysort", 893: "guessanimal",
  915: "sleepyherd", 916: "revegetation", 917: "meastraffic", 939: "bucketbrigade", 940: "milkfactory",
  941: "cowevolution", 963: "cowgym", 964: "whereami", 965: "livestock", 987: "wordproc",
  988: "photoshoot20", 989: "race", 1061: "stuckinrut", 1084: "oddphotos", 1085: "stalling",
  1108: "comfycows", 1132: "acowdemia2", 1133: "acowdemia3", 1155: "lonelyphoto", 1156: "aircond1",
  1157: "walkhome", 1179: "herdle", 1180: "nontrans", 1181: "drought", 1203: "sleepclass",
  1204: "photoshoot2", 1205: "blocks", 1227: "photoshoot", 1229: "alchemy", 1252: "feedcows",
  1253: "reverseeng", 1276: "aircond", 1324: "moolang", 1396: "milkexchange", 1469: "checkups",
};

// usaco.org URL 에서 cpid 추출 → 우리 quest 경로(/quest/<id>) 있으면 반환, 없으면 null.
export function questPathForUrl(url: string | undefined): string | null {
  if (!url) return null;
  const m = url.match(/cpid=(\d+)/);
  if (!m) return null;
  const id = CPID_TO_QUEST[Number(m[1])];
  return id ? `/quest/${id}` : null;
}
