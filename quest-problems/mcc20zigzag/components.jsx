import { C, t } from "@/components/quest/theme";
import { ProgressiveCodeStepper } from "@/components/quest/ProgressiveCodeStepper";
import { CodeBlock } from "@/components/quest/shared";

const A = "#8b5cf6";

/* ⛔⛔ 2026-10-01 — **🔒 풀이 코드를 갈았다.** 옛 코드는 O(K·N²) 3중 루프였다.
     실측: N=2000·K=100 에 **28.4초** → 제약 상한 N=20000 이면 **약 47분**.
   ⭐ 그런데 **바로 앞 쪽 화면이 스스로** *"문자열은 20000 글자까지, K 는 100 까지
     커져요 … 확인은커녕 적어 내려가는 것조차 끝낼 수 없어요"* 라고 말한 뒤
     그 코드를 **「🚀 빠름」이라 불렀다.** 화면이 쓴 제약에서 돌지 않는 코드다 —
     속도 문제가 아니라 **정직성 문제**였다(`quest_problem_standard` 의 '결' 단계).

   새 코드 = **공식 에디토리얼 그대로** O(N·K·26). 지어낸 최적화가 아니다
     (PM 이 `public/problems/mcc20zigzag.pdf` 를 직접 열어 확인 — "Case 8-10").
   바뀐 생각 한 줄: 앞의 모든 자리를 **다시 훑는 대신**, 지나온 글자들의 합을
     **a~z 칸 26 개**에 모아 두고 그중 「나보다 작은 쪽 / 큰 쪽」만 더한다.
   그리고 길이 축을 표로 안 들고 **한 층씩 굴린다** — 그래서 `up[i][j]` 가
     `up[i]` 로 줄었고, 계획 쪽이 말하던 *"글자마다 숫자 두 개"* 가 **참이 됐다**
     (학생 B 가 *"계획은 숫자 두 개인데 코드는 표 두 개"* 라고 잡은 자리다).

   검증 (python-qa 역할, 2026-10-01):
     ① 전수 3자 대조 — abc·N≤7·K 전부 **21,324 건**, 새 코드 ↔ 옛 코드 ↔
        **정의 그대로의 브루트**(부분수열을 다 만들어 확인) 셋이 전부 일치, 불일치 0.
        ⭐ 브루트를 넣은 이유 — 새·옛이 **같은 버그를 공유**하면 둘만 봐선 못 잡는다.
     ② 전수 2자 대조 — a~f·N≤6 **324,726 건**, 브루트와 일치, 불일치 0.
     ③ 경계 10가지 — 공식 샘플(bcade,K=3→5) · K=1 · K=N · K>N · 전부 같은 글자 ·
        완전 오름/내림차순 · N=1 · N=2 · z와a만. 전부 3자 일치.
     ④ 큰 무작위 80판(N 50~400, K 1~40) — 옛 코드를 오라클로 대조, 불일치 0.
     ⑤ 제약 상한 N=20000·K=100 — **1.76초**(옛 코드 추정 47분).
   ⚠️ MCC 2020 은 채점기가 없다(`feedback_sample_pass_is_not_correct` — HackerRank 는
     2015 만). 그래서 **공식 샘플 통과 + 브루트 전수 대조**가 낼 수 있는 최선이다.
   ⚠️ 이 quest 는 `USACO_VERIFIED` 가 아니다 — 재제출 의무 없음(PM 이 재확인). */

const FULL_PY = [
  "# 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "s = \"bcade\"",
  "K = 3",
  "N = len(s)",
  "MOD = 1000   # answer is printed modulo 1000",
  "",
  "if K > N:",
  "    print(0)",
  "elif K == 1:",
  "    print(N % MOD)",
  "else:",
  "    # up[i] · dn[i] = i 에서 끝나는 「지금 길이」 지그재그 개수",
  "    #   up 은 마지막 걸음이 오름, dn 은 마지막 걸음이 내림",
  "    # 길이 1 일 때는 어느 자리든 자기 혼자로 1 가지예요.",
  "    letters = \"abcdefghijklmnopqrstuvwxyz\"",
  "    up = [1] * N",
  "    dn = [1] * N",
  "",
  "    # 길이를 2 부터 K 까지 한 칸씩 늘려 가요.",
  "    for length in range(2, K + 1):",
  "        # a~z 칸 26 개 — 지나온 글자들의 합을 글자별로 모아 둬요.",
  "        up_by_letter = [0] * 26",
  "        dn_by_letter = [0] * 26",
  "        new_up = [0] * N",
  "        new_dn = [0] * N",
  "",
  "        for i in range(N):",
  "            c = letters.index(s[i])",
  "            # 나보다 작은 글자에서 왔으면 마지막 걸음이 오름이에요.",
  "            new_up[i] = sum(dn_by_letter[:c]) % MOD",
  "            # 나보다 큰 글자에서 왔으면 마지막 걸음이 내림이에요.",
  "            new_dn[i] = sum(up_by_letter[c + 1:]) % MOD",
  "            # 이제 이 자리도 뒤에서 볼 「지나온 글자」가 돼요.",
  "            up_by_letter[c] = (up_by_letter[c] + up[i]) % MOD",
  "            dn_by_letter[c] = (dn_by_letter[c] + dn[i]) % MOD",
  "",
  "        up = new_up",
  "        dn = new_dn",
  "",
  "    ans = sum(up[i] + dn[i] for i in range(N)) % MOD",
  "    print(ans)",
];

const FULL_CPP = [
  "#include <iostream>",
  "#include <vector>",
  "#include <string>",
  "using namespace std;",
  "",
  "int main() {",
  "    // 이 대회는 입력 형식이 따로 없어요. 값을 이렇게 줘요 (공식 예제)",
  "    string s = \"bcade\";",
  "    int K = 3;",
  "    int N = s.size();",
  "    const long long MOD = 1000;   // answer is printed modulo 1000",
  "",
  "    if (K > N) {",
  "        cout << 0 << \"\\n\";",
  "        return 0;",
  "    }",
  "    if (K == 1) {",
  "        cout << N % MOD << \"\\n\";",
  "        return 0;",
  "    }",
  "",
  "    // up[i] · dn[i] — i 에서 끝나는 「지금 길이」 개수, 마지막 걸음이 위 · 아래",
  "    // 길이 1 일 때는 어느 자리든 자기 혼자로 1 가지예요.",
  "    vector<long long> up(N, 1);",
  "    vector<long long> dn(N, 1);",
  "",
  "    for (int length = 2; length <= K; length++) {",
  "        // a~z 칸 26 개 — 지나온 글자들의 합을 글자별로 모아 둬요.",
  "        vector<long long> upByLetter(26, 0);",
  "        vector<long long> dnByLetter(26, 0);",
  "        vector<long long> newUp(N, 0);",
  "        vector<long long> newDn(N, 0);",
  "",
  "        for (int i = 0; i < N; i++) {",
  "            int c = s[i] - 'a';",
  "            long long sumUnder = 0;",
  "            for (int d = 0; d < c; d++) {",
  "                sumUnder += dnByLetter[d];",
  "            }",
  "            long long sumOver = 0;",
  "            for (int d = c + 1; d < 26; d++) {",
  "                sumOver += upByLetter[d];",
  "            }",
  "            newUp[i] = sumUnder % MOD;",
  "            newDn[i] = sumOver % MOD;",
  "            upByLetter[c] = (upByLetter[c] + up[i]) % MOD;",
  "            dnByLetter[c] = (dnByLetter[c] + dn[i]) % MOD;",
  "        }",
  "        up = newUp;",
  "        dn = newDn;",
  "    }",
  "",
  "    long long ans = 0;",
  "    for (int i = 0; i < N; i++) {",
  "        ans = (ans + up[i] + dn[i]) % MOD;",
  "    }",
  "    cout << ans << \"\\n\";",
  "",
  "    return 0;",
  "}",
];

/* 2026-09-17: 섹션이 1 개였다. why 는 "한 부분씩 읽어 봐요" 한 줄뿐인데
   정작 쪼갤 부분이 없어서 말과 화면이 어긋났다. 게다가 up/dn 표가 무엇을
   세는지 아무 데도 안 적혀 있어서 학생이 여기서 그만뒀다.
   코드 글자는 한 자도 안 바꾸고 FULL_PY / FULL_CPP 를 잘라 쓴다. */
/* ⚠️ 코드를 갈았으니 **자르는 자리도 다시 셌다.** 줄 번호를 안 고치면 섹션이
   어긋난 코드를 보여준다(PDF 다운로드가 이걸 쓴다). 아래 주석의 줄 번호는 0부터다. */
const PY_READ = FULL_PY.slice(0, 10);    // 0~9   입력 + 바로 답이 나오는 경우
const PY_TABLE = FULL_PY.slice(11, 17);  // 11~16 글자마다 숫자 두 개
const PY_FILL = FULL_PY.slice(18, 38);   // 18~37 길이를 한 칸씩 늘리기
const PY_SUM = FULL_PY.slice(39, 41);    // 39~40 답 모으기

const CPP_READ = FULL_CPP.slice(0, 20);
const CPP_TABLE = FULL_CPP.slice(21, 25);
const CPP_FILL = FULL_CPP.slice(26, 51);
const CPP_SUM = FULL_CPP.slice(52, 57);

export function getMcc20ZigzagSections(E) {
  return [
    {
      label: t(E, "① Read the input, answer the easy cases", "① 입력 읽기 · 바로 답이 나오는 경우"),
      color: "#0891b2",
      py: PY_READ, cpp: CPP_READ,
      why: [
        t(E, "If K is longer than the string there is nothing to pick, so the answer is 0. If K is 1 every single letter is a zig-zag by itself, so the answer is N.",
            "고를 글자 수 K 가 문자열보다 길면 만들 수 없으니 답은 0 이에요. K 가 1 이면 글자 하나하나가 그대로 답이 되니까 N 개예요."),
        t(E, "The answer is printed modulo 1000, so we keep every count small as we go.",
            "답은 1000 으로 나눈 나머지만 쓰면 되니까, 세는 동안 수를 계속 작게 줄여 둬요."),
      ],
      cppOnly: [
        t(E, "Split #include into specific headers you've learned (iostream, vector, string).",
            "#include 는 배운 것들로 (iostream, vector, string) 나눠 적어요."),
      ],
    },
    {
      /* ⚠️ 2026-10-01 — 라벨이 「표 두 개」였는데 계획 쪽은 *"글자마다 숫자 두 개"* 라고
           했다. 학생 B 가 그 어긋남을 잡았다. 새 코드는 길이 축을 표로 안 들고 한 층씩
           굴리므로 **계획 쪽 말이 맞다** — 라벨을 코드에 맞춘다. */
      label: t(E, "② Two numbers per letter: last step up, last step down", "② 글자마다 숫자 두 개 — 마지막이 오름 / 마지막이 내림"),
      color: "#8b5cf6",
      why: [
        t(E, "up[i] = how many zig-zags of the length we are working on end at letter i with the last step going UP. dn[i] is the same but the last step went DOWN.",
            "up[i] 는 지금 다루는 길이의 지그재그 중에서 i 번째 글자에서 끝나고 마지막 걸음이 '오름' 인 것의 개수예요. dn[i] 는 마지막 걸음이 '내림' 인 것의 개수예요."),
        t(E, "Why two numbers instead of one? Because zig-zag means the next step must go the opposite way. To know what is allowed next, we have to know which way the last step went.",
            "왜 숫자를 두 개로 나눌까요. 지그재그는 다음 걸음이 반드시 반대 방향이어야 해요. 그러니 다음에 무엇이 되는지 알려면 마지막 걸음이 어느 쪽이었는지를 알아야 해요. 개수만 세면 그걸 잃어버려요."),
        t(E, "Length 1 starts both at 1: a single letter is a zig-zag by itself, and it has no last step yet, so it can be extended either way.",
            "길이 1 은 둘 다 1 에서 시작해요. 글자 하나는 그것만으로 지그재그고, 아직 마지막 걸음이 없어서 어느 쪽으로든 이어 붙일 수 있어요."),
      ],
      py: PY_TABLE, cpp: CPP_TABLE,
    },
    {
      label: t(E, "③ Grow the length one step at a time", "③ 길이를 한 칸씩 늘리기"),
      color: "#d97706",
      py: PY_FILL, cpp: CPP_FILL,
      why: [
        t(E, "To make a zig-zag one letter longer, we glue s[i] onto one that already ended earlier. If the earlier letter is smaller than s[i] the new step goes up, so what came before must have ended going down — a dn count.",
            "지그재그를 한 글자 더 길게 만들려면, 앞에서 이미 끝나 있던 것에 s[i] 를 이어 붙여요. 앞 글자가 s[i] 보다 작으면 새 걸음은 오름이니까, 그 앞은 내림으로 끝났어야 해요 — dn 쪽 수예요."),
        /* ⭐ 여기가 **빨라진 까닭**이다. 옛 코드는 이 자리에서 앞의 모든 자리를
             다시 훑어(`for p in range(i)`) N² 이 됐다. */
        t(E, "The trick: we do not walk back over every earlier letter. We keep 26 running totals — one per letter a..z — of the dn and up counts seen so far. Then the answer for s[i] is just the totals on the smaller side (or the bigger side).",
            "빨라지는 요령은 이거예요. 앞의 글자를 하나하나 다시 훑지 않아요. a 부터 z 까지 글자마다 칸을 하나씩 두고(26 칸), 지금까지 지나온 dn 과 up 을 그 칸에 더해 둬요. 그러면 s[i] 의 답은 나보다 작은 쪽 칸들의 합(또는 큰 쪽 칸들의 합)이면 끝이에요."),
        t(E, "Reading 26 boxes costs the same no matter how long the string is. Even with 20000 letters and K = 100 it finishes in under two seconds.",
            "칸 26 개를 읽는 값은 문자열이 아무리 길어도 똑같아요.\n20000 글자에 K = 100 이어도 2 초 아래에서 끝나요."),
        t(E, "We only ever need the length just below, so we do not keep a whole table of lengths — we roll the two lists forward one length at a time.",
            "필요한 건 바로 한 칸 아래 길이뿐이에요. 그래서 길이별 표를 통째로 들고 있지 않고, 목록 두 개를 길이 한 칸씩 굴려요."),
      ],
    },
    {
      label: t(E, "④ Add up every ending place", "④ 끝나는 자리를 모두 더하기"),
      color: "#15803d",
      py: PY_SUM, cpp: CPP_SUM,
      why: [
        t(E, "A length-K zig-zag has to end somewhere, and its last step went either up or down. So the answer is the sum of up[i] + dn[i] over every i — no zig-zag is counted twice.",
            "길이 K 짜리 지그재그는 어딘가에서 끝나고, 마지막 걸음은 오름이거나 내림이거나 둘 중 하나예요. 그러니 모든 i 에 대해 up[i] + dn[i] 를 더하면 돼요. 같은 것을 두 번 세는 일은 없어요."),
      ],
      cppOnly: [
        t(E, "Use long long for the running sum so the additions before the modulo cannot overflow.",
            "더해 나가는 합은 long long 으로 둬요. 나머지를 취하기 전 덧셈에서 넘치지 않게요."),
      ],
    },
  ];
}

export function Mcc20ZigzagProgressiveCode(props) {
  return <ProgressiveCodeStepper {...props} accentColor="#8b5cf6" />;
}

/* ── CodeWalk 데이터 — 설명을 코드 줄에 붙여 생각 순서로 (선생님 2026-07-14: 모든 quest 코드
   이 방식). ⚠️ FULL_PY 는 한 글자도 안 바꾸고 그대로 쓴다 — beats(설명 말풍선)만 덧붙인다.
   MCC 는 C++ 이 필요 없어(선생님 지시) — Python 만 만든다.
   getMcc20ZigzagSections() 는 PDF 다운로드가 계속 쓰므로 그대로 둔다. ── */
export function getMcc20ZigzagWalk(E) {
  const code = FULL_PY;
  return {
    code,
    vars: [
      { v: "up[i] / dn[i]", ko: "지금 길이의 지그재그 중 i 에서 끝나는 개수 (마지막이 오름/내림)", en: "count of zig-zags of the current length ending at i, last step up/down" },
      { v: "up_by_letter / dn_by_letter", ko: "a~z 칸 26 개 — 지나온 글자들의 합을 글자별로 모은 것", en: "26 boxes, a..z — running totals of what we have passed, per letter" },
      { v: "length", ko: "지금 만들고 있는 지그재그 길이 (2 부터 K 까지)", en: "the length we are building right now (2 up to K)" },
    ],
    /* ⚠️ 2026-10-01 코드를 갈았으니 **말풍선도 다시 썼다.** 옛 말풍선은 `up[i][j]` 표와
         `for p in range(i)` 를 설명하는데 그 줄이 이제 없다 — 그대로 두면 **없는 코드를
         설명**한다(`check-prose-vs-final-code` 가 보는 층).
       ⭐ 여는 문장은 **지금 마주한 질문**이다 — 파일 순서가 아니라 생각 순서
         (`check-codewalk-thinking-order`, 선생님 2026-07-14).
       ⚠️ 걸음은 4 → 5 다. 늘린 이유는 옛 걸음 3 이 **15줄을 한 덩어리**로 덮고 있었고
         (`feedback_one_thing_changes_at_a_time`), 빨라지는 까닭이 바로 그 안에 묻혀
         있었기 때문이다. 쪽 수·퀴즈 수는 그대로다. */
    beats: [
      { hi: [0, 9], bubble: t(E,
        "What do we need? The count of length-K zig-zags in s, mod 1000. Two cases answer themselves: if K is longer than the string there is nothing to pick — 0. If K is 1, every single letter counts — N.",
        "무엇을 구해야 하나요? s 안에서 길이 K 짜리 지그재그의 개수를 1000 으로 나눈 나머지로 구해요.\n두 경우는 바로 답이 나와요 — K 가 문자열보다 길면 고를 수 없으니 0,\nK 가 1 이면 글자 하나하나가 답이니 N 개예요.") },
      { hi: [10, 16], bubble: t(E,
        "What do we have to remember as we go? For each letter, two numbers: how many zig-zags end here going up, and how many end here going down. Both, because a zig-zag's next step must go the opposite way — so we must know which way the last step went.",
        "가면서 무엇을 기억해야 하나요? 글자마다 숫자 두 개예요.\n여기서 끝나며 마지막이 오름인 것이 몇 개인지, 내림인 것이 몇 개인지.\n둘 다 필요한 건 다음 걸음이 반드시 반대 방향이어서예요 — 마지막 걸음이 어느 쪽이었는지 알아야 해요.") },
      { hi: [18, 24], bubble: t(E,
        "How do we get longer ones? Length by length — a length-5 zig-zag is a length-4 one with a letter glued on. And we set up 26 boxes, one per letter a..z, to hold the totals we have passed so far.",
        "더 긴 것은 어떻게 만들까요? 길이를 한 칸씩 늘려요 —\n길이 5 짜리는 길이 4 짜리에 글자 하나를 붙인 것이에요.\n그리고 a 부터 z 까지 칸을 26 개 두어, 지금까지 지나온 합을 글자별로 담아요.") },
      { hi: [26, 34], bubble: t(E,
        "Here is the whole trick. To extend to s[i] going up, the one before must have ended going down from a smaller letter — so add up the dn boxes on the smaller side. Going down is the mirror. We never walk back over the earlier letters; reading 26 boxes costs the same however long the string is.",
        "여기가 요령 전부예요.\ns[i] 로 오름으로 이으려면 그 앞은 더 작은 글자에서 내림으로 끝났어야 해요 —\n그러니 나보다 작은 쪽 dn 칸들을 더하면 돼요. 내림은 거울처럼 반대예요.\n앞 글자를 하나하나 다시 훑지 않아요 — 칸 26 개 읽는 값은 문자열이 길어도 똑같아요.") },
      { hi: [36, 40], bubble: t(E,
        "Roll the two lists forward and repeat until the length reaches K. A length-K zig-zag ends somewhere, with its last step either up or down — so sum up[i] + dn[i] over every i, and print it.",
        "목록 두 개를 다음 길이로 넘기고, 길이가 K 가 될 때까지 되풀이해요.\n길이 K 짜리는 어딘가에서 끝나고 마지막 걸음은 오름 또는 내림이에요 —\n그러니 모든 i 에 대해 up[i] + dn[i] 를 더해서 출력해요.") },
    ],
  };
}


const PY_KEYWORDS = ["def","return","for","if","else","elif","while","import","from","in","range","not","and","or","True","False","None","print","int","len","str","continue","break","sys","map","input","list","max","min","sorted","sum","set","tuple","dict","abs"];
const CPP_KEYWORDS = ["int","long","double","float","void","char","bool","return","if","else","for","while","do","break","continue","struct","class","public","private","namespace","using","const","auto","true","false","nullptr","main","sizeof","static","string","ios","cin","cout","endl","include","vector","max","min","sort","pair","map","set"];
function highlightHTML(line, lang) {
  const escHTML = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const keywords = lang === "py" ? PY_KEYWORDS : CPP_KEYWORDS;
  let comment = ""; let rest = line;
  if (lang === "py") { const i = rest.indexOf("#"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  else { const i = rest.indexOf("//"); if (i >= 0) { comment = rest.slice(i); rest = rest.slice(0, i); } }
  let out = ""; let work = rest;
  if (lang === "cpp") {
    const ppm = work.match(/^(\s*)(#\w+)/);
    if (ppm) { out += escHTML(ppm[1]) + `<span style="color:#c084fc;">${escHTML(ppm[2])}</span>`; work = work.slice(ppm[0].length); }
  }
  const re = /(\b\w+\b|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\d+|[^\w\s]|\s+)/g;
  let m;
  while ((m = re.exec(work)) !== null) {
    const tok = m[0];
    if (keywords.includes(tok)) out += `<span style="color:#c084fc;">${escHTML(tok)}</span>`;
    else if (/^\d+$/.test(tok)) out += `<span style="color:#fbbf24;">${escHTML(tok)}</span>`;
    else if (/^["']/.test(tok)) out += `<span style="color:#34d399;">${escHTML(tok)}</span>`;
    else out += `<span style="color:#f8fafc;">${escHTML(tok)}</span>`;
  }
  if (comment) out += `<span style="color:#8b949e;font-style:italic;">${escHTML(comment)}</span>`;
  return out;
}
function highlightCode(lines, lang) {
  return lines.map((line, i) => {
    const num = String(i + 1).padStart(2, " ");
    return `<span style="color:#475569;display:inline-block;width:24px;text-align:right;margin-right:10px;user-select:none;">${num}</span>${highlightHTML(line, lang) || "&nbsp;"}`;
  }).join("\n");
}


export function downloadMcc20ZigzagPDF(E, sections, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "새 창이 막혔어요.")); return; }
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const langLabel = lang === "py" ? "🐍 Python" : "💻 C++";
  const fileTitle = t(E, "Mcc20Zigzag — Full Study Guide", "Mcc20Zigzag — 종합 풀이 노트");
  const codeBlock = (lines) => `<pre>${highlightCode(lines, lang)}</pre>`;
  const sectionCode = (s) => codeBlock(lang === "py" ? s.py : s.cpp);
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${fileTitle}</title>
<style>
  @page { margin: 14mm; }
  body { font-family: -apple-system, "Apple SD Gothic Neo", sans-serif; color: #1f2937; line-height: 1.55; max-width: 820px; margin: 0 auto; padding: 12px; font-size: 13px; }
  h1 { font-size: 22px; margin: 0 0 4px; color: ${A}; }
  .sub { color: #6b7280; font-size: 12px; margin-bottom: 18px; }
  h3 { font-size: 14px; margin: 14px 0 6px; color: ${A}; }
  .why { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 8px 12px; margin: 8px 0; font-size: 12px; page-break-inside: avoid; white-space: pre-line; word-break: keep-all; }
  .why b { color: ${A}; }
  .why ul { margin: 4px 0 0; padding-left: 18px; }
  pre { background: #0f172a; padding: 10px 14px; border-radius: 8px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; overflow-x: auto; white-space: pre; word-break: keep-all; page-break-inside: avoid; margin: 8px 0 12px; line-height: 1.55; }
  pre span { font-family: inherit; }
  .lang-tag { display: inline-block; background: ${A}; color: white; padding: 3px 10px; border-radius: 5px; font-size: 12px; margin-left: 8px; vertical-align: middle; font-weight: 800; }
  .hint { background: #fef3c7; border: 1px solid #fbbf24; border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #92400e; }
  @media print { body { padding: 0; } .hint { display: none; } h2, h3 { page-break-after: avoid; } }
</style></head><body>
<div class="hint">📄 ${t(E, "In the print dialog, choose 'Save as PDF'.", "인쇄 창에서 'PDF로 저장' 을 선택해요.")}</div>
<h1>${fileTitle} <span class="lang-tag">${langLabel}</span></h1>
<div class="sub">USACO · ${t(E, "Self-contained walkthrough", "독립 학습용")}</div>
${sections.map(s => `
  <h3 style="background:${s.color}20;color:${s.color};padding:6px 10px;border-radius:6px;">${s.label}</h3>
  <div class="why"><b>💡 ${t(E, "Why this way?", "왜 이렇게?")}</b><ul>${s.why.map(w => `<li>${esc(w)}</li>`).join("")}</ul></div>
  ${sectionCode(s)}
`).join("")}
<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>
</body></html>`;
  win.document.write(html);
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 500);
}

