/* quest 파일에서 제출용 최종 코드(py/cpp)를 뽑는다.
   코드는 문자열 배열(py:[...] / cpp:[...] / FULL_PY=[...])로 흩어져 있다. */
import fs from "node:fs";

// 배열 리터럴 하나를 통째로 읽어 문자열 원소만 이어붙인다 (t(...) 같은 건 건너뜀)
function readArray(src, start) {
  let d = 0, i = start, out = [];
  for (; i < src.length; i++) {
    const c = src[i];
    if (c === "[") d++;
    else if (c === "]") { d--; if (!d) break; }
    else if (c === '"' && d === 1) {
      /* ⚠️ 직접 풀지 마라. `'\\n'`(C++ 개행 문자)을 손으로 풀었다가 진짜 줄바꿈이 돼
         cowsplits·moohunt 가 컴파일이 깨졌다. 따옴표째 잘라 JSON.parse 에 맡긴다. */
      let j = i + 1;
      while (j < src.length && src[j] !== '"') j += src[j] === "\\" ? 2 : 1;
      out.push(JSON.parse(src.slice(i, j + 1))); i = j;
    }
  }
  return [out, i];
}

function collect(file, key) {
  const src = fs.readFileSync(file, "utf8");
  const re = new RegExp(`(?:^|[\\s{,])(?:const\\s+)?${key}\\s*[:=]\\s*\\[`, "gm");
  const lines = [];
  let m;
  while ((m = re.exec(src))) {
    const [arr, end] = readArray(src, src.indexOf("[", m.index + m[0].length - 1));
    lines.push(...arr); re.lastIndex = end;
  }
  return lines;
}

const un = (s) => s;   // JSON.parse 가 이미 풀었다

/* CLI 로 한 건만 뽑기:  node scripts/extract-usaco-code.mjs <quest> <파일> <PY키> <CPP키> */
const argv = process.argv.slice(2);
const TARGETS = argv.length === 4
  ? [[argv[0], argv[1], argv[2], argv[3]]]
  : [
  ["buymilk",      "quest-problems/buymilk/components.jsx",      "FULL_PY", "FULL_CPP"],
  ["photoshoot25", "quest-problems/photoshoot25/components.jsx", "FULL_PY", "FULL_CPP"],
  ["moohunt",      "quest-problems/moohunt/fast.jsx",            "FAST_PY", "FAST_CPP"],
  ["cowsplits",    "quest-problems/cowsplits/components.jsx",    "py",      "cpp"],
];
for (const [q, file, pyKey, cppKey] of TARGETS) {
  for (const [lang, key, ext] of [["py", pyKey, "py"], ["cpp", cppKey, "cpp"]]) {
    const L = collect(file, key);
    if (!L.length) { console.log(`⚠️ ${q} ${lang}: 못 찾음 (${key} in ${file})`); continue; }
    const out = `docs/usaco-submit/${q}.${ext}`;
    fs.writeFileSync(out, L.map(un).join("\n") + "\n");
    console.log(`${out}  ${L.length}줄`);
  }
}
