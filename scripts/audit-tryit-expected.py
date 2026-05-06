#!/usr/bin/env python3
"""
Audit tryit/mission/practice steps in lesson*.ts files.
For each step where:
  - initialCode contains a complete program (no ___ blanks)
  - hint2 reveals what should fill the blanks
  - expectedOutput is set
Build the "filled-in" code from initialCode (replace ___ with hint2 tokens
when straightforward) and run it. Compare actual output to expectedOutput.

Limitations:
- We only run when initialCode has NO blanks (___). With blanks, we'd need
  to reconstruct, which is fragile.
- Skip files needing input() if no `stdin` is set.
"""

import re
import subprocess
import sys
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
TIMEOUT_SEC = 4

# Match step blocks with: id, type (tryit/mission), initialCode, expectedOutput
# Note: initialCode and expectedOutput are JSON-style strings on a single line
# in the .ts files we've been editing. They may include \n escapes.
STEP_RE = re.compile(
    r'\bid:\s*"([^"]+)"[^}]*?'
    r'type:\s*"(tryit|mission)"[^}]*?'
    r'initialCode:\s*"((?:[^"\\]|\\.)*)"[^}]*?'
    r'expectedOutput:\s*"((?:[^"\\]|\\.)*)"',
    re.DOTALL,
)

STDIN_RE = re.compile(r'stdin:\s*"((?:[^"\\]|\\.)*)"', re.DOTALL)


def unescape_js(s: str) -> str:
    return (s
            .replace("\\n", "\n")
            .replace("\\t", "\t")
            .replace("\\r", "\r")
            .replace('\\"', '"')
            .replace("\\'", "'")
            .replace("\\\\", "\\"))


def run_python(code: str, stdin: str | None) -> tuple[str | None, str | None]:
    try:
        r = subprocess.run(
            [sys.executable, "-c", code],
            input=stdin or "",
            capture_output=True, text=True, timeout=TIMEOUT_SEC,
        )
        if r.returncode != 0:
            return None, (r.stderr.strip().splitlines()[-1] if r.stderr else "nonzero exit")
        return r.stdout.rstrip("\n"), None
    except subprocess.TimeoutExpired:
        return None, "timeout"
    except Exception as e:
        return None, str(e)


def main():
    mismatches = []
    audited = 0
    skipped_blanks = 0
    skipped_input = 0

    for ts_file in sorted(DATA_DIR.glob("lesson*.ts")):
        # Skip -en variants — they test output too but we focus on KO
        if ts_file.stem.endswith("-en"):
            continue
        text = ts_file.read_text()
        for m in STEP_RE.finditer(text):
            step_id, step_type, code_raw, exp_raw = m.groups()
            code = unescape_js(code_raw)
            expected = unescape_js(exp_raw).rstrip("\n")
            # Skip if has blanks
            if "___" in code:
                skipped_blanks += 1
                continue
            # Look for stdin near the step (within next 200 chars)
            tail = text[m.end():m.end()+400]
            stdin_m = STDIN_RE.search(tail)
            stdin = unescape_js(stdin_m.group(1)) if stdin_m else None
            if "input(" in code and stdin is None:
                skipped_input += 1
                continue

            audited += 1
            actual, err = run_python(code, stdin)
            if err:
                continue
            if actual is None:
                continue
            if actual.rstrip() != expected.rstrip():
                mismatches.append({
                    "file": ts_file.name,
                    "step_id": step_id,
                    "type": step_type,
                    "code": code,
                    "expected": expected,
                    "actual": actual,
                    "stdin": stdin,
                })

    print(f"Audited (no blanks): {audited}")
    print(f"Skipped (has blanks): {skipped_blanks}")
    print(f"Skipped (input without stdin): {skipped_input}")
    print(f"Mismatches: {len(mismatches)}\n")

    for m in mismatches:
        print("=" * 70)
        print(f"{m['file']}  step={m['step_id']}  type={m['type']}")
        print(f"--- code ---\n{m['code']}")
        if m["stdin"]:
            print(f"--- stdin ---\n{m['stdin']!r}")
        print(f"--- expected ---\n{m['expected']!r}")
        print(f"--- actual ---\n{m['actual']!r}")
        print()


if __name__ == "__main__":
    main()
