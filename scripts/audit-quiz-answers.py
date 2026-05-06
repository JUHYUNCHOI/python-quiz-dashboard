#!/usr/bin/env python3
"""
Audit Python MCQ questions in questions_insert.sql.
For every question whose code is a self-contained `print(...)` snippet,
execute it locally and compare actual output to the option marked correct.
Print the mismatches — these are likely answer-key bugs.

Limitations:
- Only audits Python questions whose code runs without input/imports.
- Reads the original SQL inserts; if Supabase has been hand-edited since,
  some bugs may not be in this file. But this catches the baseline.
"""

import re
import subprocess
import sys
from pathlib import Path

SQL = Path(__file__).parent / "output" / "questions_insert.sql"
TIMEOUT_SEC = 4

# INSERT row pattern. Each row spans multiple lines because code has \n.
# Format observed:
# (ID, 'lang', 'lesson', 'diff', 'question', 'code...', ARRAY[opt1,opt2,...], correctIdx, 'expl', ...)
ROW_RE = re.compile(
    r"\((\d+),\s*"
    r"'(python|cpp)',\s*"
    r"'([^']*)',\s*"          # lesson_id
    r"'([^']*)',\s*"          # difficulty
    r"'((?:[^']|'')*)',\s*"   # question (escaped '')
    r"'((?:[^']|'')*)',\s*"   # code
    r"ARRAY\[(.*?)\],\s*"     # options (greedy-stop at ], )
    r"(\d+)",                  # correctIdx
    re.DOTALL,
)

OPTIONS_RE = re.compile(r"'((?:[^']|'')*)'")


def unescape(s: str) -> str:
    """Undo SQL '' -> ' and \\n -> newline."""
    return s.replace("''", "'")


def parse_options(opts_str: str) -> list[str]:
    raw = OPTIONS_RE.findall(opts_str)
    out = []
    for r in raw:
        s = unescape(r)
        # Many options are stored as JSON-encoded strings: "value"
        # Strip outer quotes if present.
        if len(s) >= 2 and s[0] == '"' and s[-1] == '"':
            s = s[1:-1]
        # Also unescape JSON \n \t \"
        s = s.replace("\\n", "\n").replace("\\t", "\t").replace("\\\"", "\"")
        out.append(s)
    return out


def run_python(code: str) -> tuple[str | None, str | None]:
    """Return (stdout, error). stdout trimmed."""
    try:
        r = subprocess.run(
            [sys.executable, "-c", code],
            capture_output=True, text=True, timeout=TIMEOUT_SEC,
        )
        if r.returncode != 0:
            return None, (r.stderr.strip().splitlines()[-1] if r.stderr else "nonzero exit")
        return r.stdout.rstrip("\n"), None
    except subprocess.TimeoutExpired:
        return None, "timeout"
    except Exception as e:
        return None, str(e)


def normalize(s: str) -> str:
    """Loose match: lowercase, collapse whitespace."""
    return " ".join(s.split()).lower()


def looks_like_actual_output(actual: str, opt: str) -> bool:
    if normalize(actual) == normalize(opt):
        return True
    # Allow option with surrounding whitespace or trailing punctuation removed
    if normalize(actual) == normalize(opt.strip(".,!?")):
        return True
    return False


def is_safe_to_run(code: str) -> bool:
    if "input(" in code:
        return False
    # Skip imports of system-mutating libs; harmless ones (math, random) are fine
    BAD = ("os.", "subprocess", "shutil", "sys.exit", "open(", "socket", "import os")
    if any(b in code for b in BAD):
        return False
    return True


def main():
    text = SQL.read_text()
    rows = ROW_RE.findall(text)
    print(f"Found {len(rows)} rows; auditing Python ones...\n")

    py_total = 0
    skipped = 0
    runtime_err = 0
    mismatches = []

    for qid, lang, lesson, diff, question, code, opts_str, correct_idx in rows:
        if lang != "python":
            continue
        py_total += 1
        code = unescape(code)
        question_txt = unescape(question)

        # Only audit "what's the output?" style questions
        is_output_q = ("출력" in question_txt or "결과" in question_txt or "output" in question_txt.lower())
        has_print = "print(" in code
        has_placeholder = "____" in code or "___" in code
        if not (is_output_q and has_print and not has_placeholder):
            continue
        if not is_safe_to_run(code):
            skipped += 1
            continue
        options = parse_options(opts_str)
        try:
            ci = int(correct_idx)
        except ValueError:
            continue
        if ci < 0 or ci >= len(options):
            continue

        actual, err = run_python(code)
        if err:
            runtime_err += 1
            continue
        if actual is None:
            continue

        marked = options[ci]
        # Skip if marked option clearly isn't an output (e.g., "오류", "에러", "Error")
        if marked.strip() in {"오류", "에러", "Error", "error"}:
            continue

        if not looks_like_actual_output(actual, marked):
            # Maybe one of the OTHER options matches the actual output
            other_match = None
            for i, opt in enumerate(options):
                if i != ci and looks_like_actual_output(actual, opt):
                    other_match = i
                    break
            mismatches.append({
                "id": qid,
                "lesson": lesson,
                "code": code,
                "options": options,
                "marked_idx": ci,
                "actual": actual,
                "other_match": other_match,
            })

    print(f"Python total: {py_total}")
    print(f"Skipped (input/dangerous): {skipped}")
    print(f"Runtime errors: {runtime_err}")
    print(f"Mismatches: {len(mismatches)}\n")

    for m in mismatches[:200]:
        print("=" * 70)
        print(f"id={m['id']}  lesson={m['lesson']}")
        print(f"code:\n{m['code']}")
        print(f"options: {m['options']}")
        print(f"marked correct: [{m['marked_idx']}] = {m['options'][m['marked_idx']]!r}")
        print(f"actual output : {m['actual']!r}")
        if m["other_match"] is not None:
            print(f"BETTER MATCH  : [{m['other_match']}] = {m['options'][m['other_match']]!r}")
        print()


if __name__ == "__main__":
    main()
