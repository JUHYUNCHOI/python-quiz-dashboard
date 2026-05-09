import { useEffect, useRef, useState } from "react";
import { C, t } from "@/components/quest/theme";

/**
 * GrowthSim — animated bar chart showing two plants growing day by day.
 * h = [7, 3], a = [8, 9], target t = [1, 0].
 * Plant 1 starts shorter (h=3) but grows faster (a=9), tying on day 4 and
 * overtaking on day 5 where t = [1, 0] finally matches.
 *
 * The student can scrub days 0..7 with a slider, or press Play to auto-step.
 * The bar chart makes "overtake" eye-evident — no need to read numbers in a
 * grid of cards.  Below the chart we show h and t for the current day, and
 * highlight the moment of match.
 */
export function GrowthSim({ E }) {
  const H0 = 7, A0 = 8;     // plant 0
  const H1 = 3, A1 = 9;     // plant 1
  const TARGET = [1, 0];
  const MAX_DAY = 7;
  const heightAt = (day, h, a) => h + a * day;
  const maxBar = heightAt(MAX_DAY, H1, A1);   // plant 1 ends tallest

  const [day, setDay] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setDay(d => {
        if (d >= MAX_DAY) { setPlaying(false); return d; }
        return d + 1;
      });
    }, 700);
    return () => clearInterval(timer.current);
  }, [playing]);

  const h0 = heightAt(day, H0, A0);
  const h1 = heightAt(day, H1, A1);
  const t0 = h1 > h0 ? 1 : 0;       // strictly taller-than plant 0
  const t1 = h0 > h1 ? 1 : 0;
  const match = t0 === TARGET[0] && t1 === TARGET[1];
  const tie = h0 === h1;

  const barH = v => Math.max(6, (v / maxBar) * 160);

  const Bar = ({ idx, h, color, fill }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color, fontFamily: "'JetBrains Mono',monospace" }}>
        {h}
      </div>
      <div style={{
        width: 56, height: barH(h), background: fill, border: `2px solid ${color}`,
        borderRadius: "6px 6px 2px 2px", transition: "height .45s ease",
        display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 4,
        fontSize: 18,
      }}>🌱</div>
      <div style={{ fontSize: 10, color: C.dim }}>{t(E, "Plant", "식물")} {idx}</div>
    </div>
  );

  return (
    <div style={{ padding: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#065f46", textAlign: "center", marginBottom: 8 }}>
        {t(E, "h = [7, 3], a = [8, 9], target t = [1, 0]",
              "h = [7, 3], a = [8, 9], 목표 t = [1, 0]")}
      </div>

      {/* Growth chart */}
      <div style={{
        background: match ? "#dcfce7" : "#ecfdf5",
        border: `1.5px solid ${match ? "#16a34a" : "#a7f3d0"}`,
        borderRadius: 12, padding: "14px 12px 10px", marginBottom: 10,
        transition: "background .3s, border-color .3s",
      }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 28, height: 200 }}>
          <Bar idx={0} h={h0} color="#0891b2" fill="#cffafe" />
          <Bar idx={1} h={h1} color="#7c3aed" fill="#ede9fe" />
        </div>
        <div style={{
          textAlign: "center", marginTop: 8, fontSize: 13, fontWeight: 700,
          color: match ? "#15803d" : tie ? "#a16207" : "#065f46",
        }}>
          {t(E, "Day", "Day")} {day}
          {tie && !match && <span style={{ marginLeft: 8 }}>{t(E, "— tie!", "— 동점!")}</span>}
          {match && <span style={{ marginLeft: 8 }}>✓ {t(E, "MATCH!", "일치!")}</span>}
        </div>
      </div>

      {/* h and t row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        <div style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: 10, padding: "8px 12px", textAlign: "center" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C.dim, letterSpacing: 0.5 }}>{t(E, "HEIGHTS", "키")}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, color: "#0f172a", marginTop: 3 }}>
            h = [{h0}, {h1}]
          </div>
        </div>
        <div style={{
          background: match ? "#dcfce7" : "#fff",
          border: `1px solid ${match ? "#16a34a" : "#cbd5e1"}`,
          borderRadius: 10, padding: "8px 12px", textAlign: "center",
        }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: match ? "#15803d" : C.dim, letterSpacing: 0.5 }}>
            {t(E, "TALLER-THAN COUNT", "더 큰 식물 수")}
          </div>
          <div style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 13,
            fontWeight: match ? 800 : 500,
            color: match ? "#15803d" : "#0f172a", marginTop: 3,
          }}>
            t = [{t0}, {t1}] {match && <span>== [1, 0]</span>}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <button
          onClick={() => { if (day >= MAX_DAY) setDay(0); setPlaying(p => !p); }}
          style={{
            background: playing ? "#f59e0b" : "#059669", color: "#fff",
            border: "none", borderRadius: 8, padding: "6px 14px",
            fontSize: 12, fontWeight: 800, cursor: "pointer", flexShrink: 0,
          }}
        >
          {playing ? `⏸ ${t(E, "Pause", "정지")}` : `▶ ${t(E, "Play", "재생")}`}
        </button>
        <input
          type="range" min={0} max={MAX_DAY} step={1} value={day}
          onChange={e => { setPlaying(false); setDay(parseInt(e.target.value, 10)); }}
          style={{ flex: 1, accentColor: "#059669" }}
        />
        <button
          onClick={() => { setPlaying(false); setDay(0); }}
          style={{
            background: "#fff", color: "#059669", border: "1.5px solid #059669",
            borderRadius: 8, padding: "5px 10px", fontSize: 12, fontWeight: 700, cursor: "pointer",
          }}
        >↺</button>
      </div>

      <div style={{
        fontSize: 11, color: C.text, lineHeight: 1.7, textAlign: "center",
        background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: 8, padding: "6px 10px",
      }}>
        {t(E,
          "Plant 1 starts shorter but grows faster.  Day 4 they tie — 'strictly taller' fails for both.  Day 5 plant 1 overtakes → t = [1, 0] matches → answer = 5.",
          "식물 1 은 더 작게 시작하지만 더 빨리 자라요. 4 일에 동점 — 둘 다 '큼' 아님. 5 일에 식물 1 이 추월 → t = [1, 0] 일치 → 답 = 5.")}
      </div>
    </div>
  );
}
