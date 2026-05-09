"use client";

/**
 * SampleInputAside — drop this next to a code section to remind students
 * what the input looks like. Highlight specific lines to show which lines
 * the current code is reading. Optional `note` for a per-step hint.
 *
 * Use in `aside:` of any section in your `getXxxSections()` data:
 *
 *   aside: <SampleInputAside E={E} sample={SAMPLE} highlight={[0, 1, 2]}
 *            note={t(E, "Reading T then first case", "T 그 다음 첫 케이스")} />
 *
 * Keep this on EVERY section that involves input — students forget the
 * sample format if it's only on chapter 1.
 */

import { t } from "@/components/quest/theme";

interface Props {
  /** Language toggle (English mode) — same E used in chapter helpers. */
  E: boolean;
  /** Sample input as an array of lines (one per row in the panel). */
  sample: string[];
  /** Indices (0-based) of lines to highlight as "this step is reading these". */
  highlight?: number[];
  /** Optional per-step note shown under the lines. Plain text or JSX. */
  note?: React.ReactNode;
  /** Optional override for the panel title. Defaults to "Sample input" / "샘플 입력". */
  title?: string;
}

export function SampleInputAside({ E, sample, highlight = [], note, title }: Props) {
  const hi = new Set(highlight);
  return (
    <div style={{
      background: "#fef3c7", border: "1.5px solid #fbbf24", borderRadius: 10,
      padding: "8px 10px", fontSize: 11.5,
    }}>
      <div style={{ fontSize: 10.5, fontWeight: 800, color: "#92400e", marginBottom: 6, letterSpacing: 0.3 }}>
        📥 {title ?? t(E, "Sample input", "샘플 입력")}
      </div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.55 }}>
        {sample.map((line, i) => (
          <div key={i} style={{
            background: hi.has(i) ? "#fde68a" : "transparent",
            border: hi.has(i) ? "1.5px solid #f59e0b" : "1.5px solid transparent",
            borderRadius: 4, padding: "1px 5px",
            color: hi.has(i) ? "#7c2d12" : "#9ca3af",
            fontWeight: hi.has(i) ? 800 : 500,
            opacity: hi.has(i) ? 1 : 0.7,
          }}>{line || " "}</div>
        ))}
      </div>
      {note && (
        <div style={{ marginTop: 8, paddingTop: 6, borderTop: "1px dashed #fcd34d", fontSize: 11, color: "#7c2d12", lineHeight: 1.5 }}>
          {note}
        </div>
      )}
    </div>
  );
}
