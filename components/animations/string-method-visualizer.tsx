"use client";

import { useState, useMemo } from "react";
import { Scissors, Search, RefreshCw, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type MethodType = "substr" | "find" | "replace";

const INPUT = "Hello World";

export default function StringMethodVisualizer() {
  const [activeMethod, setActiveMethod] = useState<MethodType>("substr");

  const [substrPos, setSubstrPos] = useState(0);
  const [substrLen, setSubstrLen] = useState(5);
  const [findStr, setFindStr] = useState("World");
  const [replacePos, setReplacePos] = useState(6);
  const [replaceLen, setReplaceLen] = useState(5);
  const [replaceNewStr, setReplaceNewStr] = useState("C++");

  const { result, highlightedIndices, pythonEquivalent, foundAt } = useMemo(() => {
    const chars = INPUT.split("");
    switch (activeMethod) {
      case "substr": {
        const end = Math.min(substrPos + substrLen, chars.length);
        return {
          result: `"${INPUT.substring(substrPos, end)}"`,
          highlightedIndices: Array.from({ length: end - substrPos }, (_, i) => substrPos + i),
          pythonEquivalent: `s[${substrPos}:${end}]`,
          foundAt: -1,
        };
      }
      case "find": {
        const idx = INPUT.indexOf(findStr);
        return {
          result: idx === -1 ? "string::npos" : String(idx),
          highlightedIndices: idx === -1 ? [] : Array.from({ length: findStr.length }, (_, i) => idx + i),
          pythonEquivalent: `s.find("${findStr}") → ${idx === -1 ? "-1" : idx}`,
          foundAt: idx,
        };
      }
      case "replace": {
        const end = Math.min(replacePos + replaceLen, chars.length);
        return {
          result: `"${INPUT.substring(0, replacePos) + replaceNewStr + INPUT.substring(end)}"`,
          highlightedIndices: Array.from({ length: end - replacePos }, (_, i) => replacePos + i),
          pythonEquivalent: `s[:${replacePos}] + "${replaceNewStr}" + s[${end}:]`,
          foundAt: -1,
        };
      }
    }
  }, [activeMethod, substrPos, substrLen, findStr, replacePos, replaceLen, replaceNewStr]);

  const warning = {
    substr: (
      <>
        <strong>끝 인덱스가 아니라 길이예요!</strong> 파이썬{" "}
        <code className="bg-amber-200 px-1.5 py-0.5 rounded font-mono text-amber-900">s[0:5]</code>는 인덱스 5 전까지, C++{" "}
        <code className="bg-amber-200 px-1.5 py-0.5 rounded font-mono text-amber-900">substr(0,5)</code>는 0부터 5글자.
      </>
    ),
    find: (
      <>
        <strong>못 찾으면 string::npos!</strong> 파이썬은 -1을 반환하지만, C++는{" "}
        <code className="bg-amber-200 px-1.5 py-0.5 rounded font-mono text-amber-900">string::npos</code>를 반환해요.
      </>
    ),
    replace: (
      <>
        <strong>문자열 검색이 아니에요!</strong> 파이썬{" "}
        <code className="bg-amber-200 px-1.5 py-0.5 rounded font-mono text-amber-900">s.replace(&quot;old&quot;,&quot;new&quot;)</code>와 달리, C++는 위치와 길이로 교체해요.
      </>
    ),
  }[activeMethod];

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-slate-200">
      {/* Terminal Header */}
      <div className="bg-slate-900 px-5 py-3.5 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <code className="text-slate-300 font-mono text-sm ml-2">
          string s = <span className="text-green-400">"Hello World"</span>
        </code>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {([
          { id: "substr"  as MethodType, icon: Scissors,  label: ".substr()" },
          { id: "find"    as MethodType, icon: Search,     label: ".find()" },
          { id: "replace" as MethodType, icon: RefreshCw,  label: ".replace()" },
        ] as const).map((tab) => {
          const Icon = tab.icon;
          const active = activeMethod === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveMethod(tab.id)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-3.5 text-sm font-bold transition-all",
                active
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content — mobile: 세로 / desktop: 가로 */}
      <div className="flex flex-col md:flex-row">

        {/* ── 왼쪽: 시각화 ── */}
        <div className="flex-1 p-5 md:p-8 space-y-5">
          {/* Syntax 블록 */}
          <div className="bg-slate-900 rounded-2xl px-5 py-4">
            <code className="text-lg md:text-xl font-mono">
              <span className="text-slate-400">s.</span>
              <span className="text-white font-bold">{activeMethod}</span>
              <span className="text-slate-400">(</span>
              {activeMethod === "substr" && (
                <><span className="text-amber-400">pos</span><span className="text-slate-500">, </span><span className="text-cyan-400">len</span></>
              )}
              {activeMethod === "find" && (
                <span className="text-amber-400">"{findStr || "..."}"</span>
              )}
              {activeMethod === "replace" && (
                <><span className="text-amber-400">pos</span><span className="text-slate-500">, </span><span className="text-cyan-400">len</span><span className="text-slate-500">, </span><span className="text-green-400">"{replaceNewStr}"</span></>
              )}
              <span className="text-slate-400">)</span>
            </code>
          </div>

          {/* 문자 박스 */}
          <div className="flex flex-wrap gap-1.5">
            {INPUT.split("").map((ch, i) => {
              const on = highlightedIndices.includes(i);
              return (
                <div key={i} className="flex flex-col items-center">
                  <div className={cn(
                    "w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl text-base md:text-lg font-bold transition-all",
                    on ? "bg-indigo-600 text-white shadow-md shadow-indigo-300/50" : "bg-slate-100 text-slate-500"
                  )}>
                    {ch === " " ? <span className="text-[9px] md:text-[10px] text-slate-400">SPC</span> : ch}
                  </div>
                  <span className={cn("text-[10px] mt-1 font-mono", on ? "text-indigo-600 font-bold" : "text-slate-400")}>
                    {i}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 파이썬 비교 */}
          <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-200">
            <span className="text-xl">🐍</span>
            <span className="text-slate-500 text-sm font-medium">파이썬:</span>
            <code className="font-mono font-bold text-slate-800 text-sm">{pythonEquivalent}</code>
          </div>
        </div>

        {/* 구분선 */}
        <div className="hidden md:block w-px bg-slate-200" />
        <div className="md:hidden h-px bg-slate-200" />

        {/* ── 오른쪽: 컨트롤 + 결과 ── */}
        <div className="md:w-80 lg:w-96 p-5 md:p-8 flex flex-col gap-5">

          {/* 컨트롤 */}
          {activeMethod === "substr" && (
            <div className="flex justify-around">
              <ControlGroup label="POS" value={substrPos} min={0} max={INPUT.length - 1}
                onChange={v => { setSubstrPos(v); if (v + substrLen > INPUT.length) setSubstrLen(INPUT.length - v); }} />
              <div className="w-px bg-slate-200" />
              <ControlGroup label="LEN" value={substrLen} min={1} max={INPUT.length - substrPos} onChange={setSubstrLen} />
            </div>
          )}

          {activeMethod === "find" && (
            <div className="text-center space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">검색 문자열</label>
              <input
                type="text" value={findStr} onChange={e => setFindStr(e.target.value)}
                maxLength={11}
                className="w-full md:w-40 h-12 md:h-14 text-center text-xl font-mono font-bold rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none mx-auto block"
              />
            </div>
          )}

          {activeMethod === "replace" && (
            <div className="flex justify-around flex-wrap gap-3">
              <ControlGroup label="POS" value={replacePos} min={0} max={INPUT.length - 1}
                onChange={v => { setReplacePos(v); if (v + replaceLen > INPUT.length) setReplaceLen(INPUT.length - v); }} />
              <ControlGroup label="LEN" value={replaceLen} min={1} max={INPUT.length - replacePos} onChange={setReplaceLen} />
              <div className="text-center">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">NEW</label>
                <input
                  type="text" value={replaceNewStr} onChange={e => setReplaceNewStr(e.target.value)}
                  maxLength={15}
                  className="w-24 h-11 text-center text-lg font-mono font-bold rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* 결과 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center">결과</span>
            <div className={cn(
              "rounded-2xl py-6 md:py-8 px-4 border text-center",
              activeMethod === "find" && foundAt === -1
                ? "bg-red-50 border-red-200"
                : "bg-slate-50 border-slate-200"
            )}>
              <p className={cn(
                "text-2xl md:text-3xl font-mono font-black",
                activeMethod === "find" && foundAt === -1 ? "text-red-600" : "text-slate-900"
              )}>{result}</p>
            </div>
          </div>

          {/* find: if문 트레이스 */}
          {activeMethod === "find" && findStr.length > 0 && (
            <div className="rounded-xl overflow-hidden border border-slate-800 text-xs font-mono">
              <div className="bg-slate-800 px-3 py-1.5 text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />if문 실행 흐름
              </div>
              <div className="bg-slate-950 divide-y divide-slate-800/60">
                <div className="px-3 py-2 text-slate-400">
                  <span className="text-purple-400">if</span>{" (pos "}<span className="text-yellow-400">!=</span>{" string::npos) {"}
                </div>
                <div className={cn("px-3 py-2.5 flex items-center justify-between transition-all", foundAt >= 0 ? "bg-emerald-950" : "opacity-20")}>
                  <div className={cn(foundAt >= 0 ? "border-l-2 border-emerald-500 pl-2.5 text-slate-300" : "pl-3 text-slate-500")}>
                    <span className="text-sky-400">cout</span>{" << "}<span className="text-orange-300">"찾았어요! 위치: "</span>{" << "}<span className="text-sky-400">pos</span>{";"}
                  </div>
                  {foundAt >= 0 && <span className="ml-2 shrink-0 text-[10px] text-emerald-400 bg-emerald-900/60 px-1.5 py-0.5 rounded-full">✅ {foundAt}</span>}
                </div>
                <div className="px-3 py-2 text-slate-400">{"} "}<span className="text-purple-400">else</span>{" {"}</div>
                <div className={cn("px-3 py-2.5 flex items-center justify-between transition-all", foundAt < 0 ? "bg-red-950" : "opacity-20")}>
                  <div className={cn(foundAt < 0 ? "border-l-2 border-red-500 pl-2.5 text-slate-300" : "pl-3 text-slate-500")}>
                    <span className="text-sky-400">cout</span>{" << "}<span className="text-orange-300">"못 찾았어요!"</span>{";"}
                  </div>
                  {foundAt < 0 && <span className="ml-2 shrink-0 text-[10px] text-red-400 bg-red-900/60 px-1.5 py-0.5 rounded-full">❌</span>}
                </div>
                <div className="px-3 py-2 text-slate-400">{"}"}</div>
              </div>
            </div>
          )}

          {/* 경고 */}
          <div className="bg-amber-50 border-2 border-amber-300 rounded-xl px-4 py-3 flex items-start gap-2.5">
            <span className="text-lg shrink-0">⚠️</span>
            <p className="text-xs md:text-sm text-amber-900 leading-relaxed">{warning}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlGroup({ label, value, onChange, min, max }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number;
}) {
  return (
    <div className="text-center">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">{label}</label>
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
          className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 disabled:opacity-30 transition-colors"
        >
          <Minus className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
        </button>
        <span className="w-7 md:w-8 text-2xl md:text-3xl font-black text-slate-900 tabular-nums text-center">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
          className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-slate-300 flex items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 disabled:opacity-30 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
