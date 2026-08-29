"use client";

/* 📄 PDF — 화면에서 보는 그대로의 종합 학습 노트.
 *
 * 선생님 2026-08-29: "pdf가 우리가 학습한거랑 완전 다른데?"
 *   전 버전(components.jsx 의 downloadChipXchgPDF)은 '코드 조각 + 왜' 만 담아서
 *   1장의 12페이지 설명이 통째로 빠져 있었다.
 *
 * 방식: 챕터 데이터를 그대로 가져와 각 시뮬을 '모든 단계' 로 한 번씩 정적 렌더.
 *   단계는 TraceStepper 의 ForcedStepContext 로 밖에서 지정하고,
 *   총 단계 수는 시뮬이 report 로 알려 준다 (밖에선 알 수 없으므로 1회 렌더로 알아낸 뒤 반복).
 *   → 화면과 어긋날 수 없음. 내용을 고치면 PDF 도 자동으로 따라온다.
 *
 * react-dom/server 는 클릭할 때 동적 import — 초기 번들에 안 들어감.
 */

import React from "react";
import { t } from "@/components/quest/theme";
import { ForcedStepContext } from "@/components/quest/TraceStepper";
import { makeChipXchgCh1, makeChipXchgCh2 } from "./chapters";

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const META = {
  ko: {
    title: "칩 교환 (Chip Exchange)",
    sub: "USACO 2026 First Contest · Bronze 1번 — 종합 학습 노트",
    ch1: "1장 · 문제를 이해하고 공식을 만들기",
    ch2: "2장 · 코드",
    step: "단계",
    lead: "이 노트는 화면에서 보는 내용을 그대로 옮긴 것이에요.\n순서대로 읽으면 공식이 어디서 나왔는지 알 수 있어요.",
    hint: "인쇄 창에서 'PDF로 저장' 을 고르세요.",
  },
  en: {
    title: "Chip Exchange",
    sub: "USACO 2026 First Contest · Bronze #1 — Full Study Notes",
    ch1: "Chapter 1 · Understand the problem, build the formula",
    ch2: "Chapter 2 · Code",
    step: "step",
    lead: "These notes mirror the on-screen walkthrough.\nRead them in order to see where the formula comes from.",
    hint: "In the print dialog, choose 'Save as PDF'.",
  },
};

const CSS = `
@page { size: A4; margin: 13mm 12mm 15mm; }
* { box-sizing: border-box; }
body { margin:0; font-family:"Apple SD Gothic Neo","Noto Sans KR",-apple-system,"Helvetica Neue",sans-serif;
  color:#1f2937; font-size:11.5px; line-height:1.6;
  -webkit-print-color-adjust:exact; print-color-adjust:exact; }
.hint { background:#eff6ff; border:1px solid #2563eb; border-radius:8px; padding:10px 14px;
  margin:10px 12px; font-size:12px; color:#1e3a8a; text-align:center; }
.cover { height:245mm; display:flex; flex-direction:column; justify-content:center;
  align-items:center; text-align:center; }
.cover h1 { font-size:40px; margin:0 0 10px; color:#2563eb; letter-spacing:-.5px; }
.cover .s { font-size:14px; color:#64748b; margin-bottom:34px; }
.cover .lead { max-width:400px; font-size:12.5px; color:#475569; line-height:1.9;
  word-break:keep-all; text-wrap:balance; border-top:1px solid #e2e8f0; padding-top:20px; white-space:pre-line; }
.chaph { font-size:19px; color:#2563eb; margin:0 0 5mm; padding-bottom:2mm; border-bottom:2px solid #2563eb; }
.qp { page-break-before:always; padding-top:3mm; }
.qp > h3 { font-size:15px; margin:0 0 2mm; color:#1e3a8a; }
.qp > h3 .num { display:inline-block; min-width:22px; height:22px; line-height:22px; text-align:center;
  background:#2563eb; color:#fff; border-radius:6px; font-size:12px; margin-right:7px; }
.narr { background:#eff6ff; border-left:3px solid #2563eb; padding:6px 11px; margin:0 0 4mm;
  font-size:11.5px; color:#1e3a8a; word-break:keep-all; text-wrap:balance; }
.qstep { page-break-inside:avoid; margin:0 0 5mm; padding-left:9px; border-left:2px solid #e2e8f0; }
.qstep > div { padding-bottom:0 !important; padding-top:4px !important; }
.slab { font-size:9.5px; font-weight:800; color:#94a3b8; letter-spacing:.5px; margin-bottom:2px; }
.codewrap { page-break-before:always; padding-top:3mm; }
.codewrap div, .codewrap pre { max-height:none !important; overflow:visible !important; height:auto !important; }
.codewrap pre, .codewrap code, .codewrap span { font-size:10px !important; line-height:1.5 !important; }
.cstep { page-break-inside:avoid; margin:0 0 6mm; }
table { font-size:10.5px !important; }
/* 화면용 조작 버튼(⏮ ◀ ▶ · 코드 복사)은 종이에선 의미 없음 */
button { display:none !important; }
@media print { .hint { display:none; } }
`;

/** 시뮬 하나를 '모든 단계' 로 펼쳐 정적 HTML 배열로. */
function renderAllSteps(renderToStaticMarkup, node) {
  let total = 1;
  const once = (i) =>
    renderToStaticMarkup(
      <ForcedStepContext.Provider value={{ idx: i, report: (n) => { total = n; } }}>
        {node}
      </ForcedStepContext.Provider>
    );
  const out = [once(0)];              // 1회 렌더로 total 을 알아낸 뒤
  for (let i = 1; i < total; i++) out.push(once(i));
  return out;
}

export async function downloadChipXchgStudyPDF(E, lang = "py") {
  const win = window.open("", "_blank");
  if (!win) { alert(t(E, "Pop-up blocked.", "팝업이 차단됐어요.")); return; }
  const m = META[E ? "en" : "ko"];
  win.document.write(
    `<!doctype html><meta charset="utf-8"><title>${esc(m.title)}</title>` +
    `<style>body{font-family:sans-serif;padding:40px;color:#64748b}</style>` +
    `<p>${esc(t(E, "Building the notes…", "노트를 만드는 중…"))}</p>`
  );

  const { renderToStaticMarkup } = await import("react-dom/server");

  const parts = [
    `<div class="hint">📄 ${esc(m.hint)}</div>`,
    `<div class="cover"><h1>${esc(m.title)}</h1>` +
      `<div class="s">${esc(m.sub)}</div>` +
      `<div class="lead">${esc(m.lead)}</div></div>`,
  ];

  makeChipXchgCh1(E).forEach((p, i) => {
    const head = i === 0 ? `<h2 class="chaph">${esc(m.ch1)}</h2>` : "";
    const label = typeof p.label === "string" ? p.label : "";
    const narr = typeof p.narr === "string" ? p.narr : "";
    parts.push(`<div class="qp">${head}<h3><span class="num">${i + 1}</span>${esc(label)}</h3>`);
    if (narr) parts.push(`<div class="narr">${esc(narr)}</div>`);
    const steps = p.content ? renderAllSteps(renderToStaticMarkup, p.content) : [];
    steps.forEach((html, k) => {
      const slab = steps.length === 1 ? "" :
        `<div class="slab">${esc(m.step)} ${k + 1} / ${steps.length}</div>`;
      parts.push(`<div class="qstep">${slab}${html}</div>`);
    });
    parts.push("</div>");
  });

  makeChipXchgCh2(E, lang).forEach((p) => {
    parts.push('<div class="codewrap">');
    const steps = p.content ? renderAllSteps(renderToStaticMarkup, p.content) : [];
    steps.forEach((html, k) => {
      const head = k === 0 ? `<h2 class="chaph">${esc(m.ch2)}</h2>` : "";
      parts.push(`<div class="cstep">${head}` +
        `<div class="slab">${esc(m.step)} ${k + 1} / ${steps.length}</div>${html}</div>`);
    });
    parts.push("</div>");
  });

  win.document.open();
  win.document.write(
    `<!doctype html><html lang="${E ? "en" : "ko"}"><head><meta charset="utf-8">` +
    `<title>${esc(m.title)}</title><style>${CSS}</style></head><body>` +
    parts.join("") +
    `<div style="margin-top:30px;font-size:10px;color:#94a3b8;text-align:center;` +
    `border-top:1px solid #e5e7eb;padding-top:8px;">© Coderin · 코드린</div>` +
    `</body></html>`
  );
  win.document.close();
  setTimeout(() => { win.focus(); win.print(); }, 600);
}
