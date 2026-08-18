import { useState } from "react";

export default function StudentGradeEvaluation({ darkMode = false }) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function getRemark(value) {
    if (value >= 90) return "Excellent";
    if (value >= 85) return "Very Good";
    if (value >= 80) return "Good";
    if (value >= 75) return "Passed";
    return "Failed";
  }

  function evaluate(event) {
    event.preventDefault();

    const value = Number(score);

    if (!name.trim()) {
      setError("Please enter the student's name.");
      setResult(null);
      return;
    }

    if (score === "" || value < 0 || value > 100) {
      setError("Please enter a score between 0 and 100.");
      setResult(null);
      return;
    }

    setResult({
      name: name.trim(),
      score: value,
      remark: getRemark(value),
    });

    setError("");
  }

  function clear() {
    setName("");
    setScore("");
    setResult(null);
    setError("");
  }

  const styles = darkMode
    ? {
        muted: "text-[#aaa69d]",
        border: "border-[#3a3a3a]",
        input:
          "border-[#4a4a4a] bg-[#242424] text-[#ece9e2] placeholder:text-[#77736c] focus:border-[#c94a32]",
        secondary:
          "border-[#ece9e2] text-[#ece9e2] hover:bg-[#ece9e2] hover:text-[#171717]",
        result: "border-[#3a3a3a] bg-[#202020]",
        error: "border-red-500 bg-[#351e1e] text-red-300",
      }
    : {
        muted: "text-[#69665f]",
        border: "border-[#d8d4cb]",
        input:
          "border-[#c9c5bc] bg-[#f5f3ee] text-[#252525] placeholder:text-[#969188] focus:border-[#c94a32]",
        secondary:
          "border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white",
        result: "border-[#d8d4cb] bg-[#eeece6]",
        error: "border-red-600 bg-red-50 text-red-700",
      };

  const remarkColor =
    result?.remark === "Failed"
      ? "text-red-600"
      : result?.remark === "Passed"
        ? "text-amber-600"
        : "text-green-600";

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div
        className={`grid gap-8 border-b pb-10 md:grid-cols-[90px_1fr] md:items-end ${styles.border}`}
      >
        <span className={`font-mono text-sm ${styles.muted}`}>02</span>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#c94a32]">
            Activity 2
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Student Grade Evaluation
          </h1>
        </div>
      </div>

      <div className="grid gap-10 py-10 md:grid-cols-[0.8fr_1.2fr]">
        <aside>
          <h2 className="mb-3 text-lg font-bold">About this activity</h2>

          <p className={`max-w-sm text-sm leading-6 ${styles.muted}`}>
            Enter a student's name and score to calculate the corresponding
            grade remark.
          </p>

          <div
            className={`mt-6 border-l-2 border-[#c94a32] pl-4 text-sm leading-6 ${styles.muted}`}
          >
            <p>90–100: Excellent</p>
            <p>85–89: Very Good</p>
            <p>80–84: Good</p>
            <p>75–79: Passed</p>
            <p>Below 75: Failed</p>
          </div>
        </aside>

        <section
          className={`border-t pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 ${styles.border}`}
        >
          <form onSubmit={evaluate}>
            <div className="mb-6">
              <label
                htmlFor="student-name"
                className="mb-2 block text-sm font-semibold"
              >
                Student name
              </label>

              <input
                id="student-name"
                type="text"
                className={`h-12 w-full border px-4 outline-none transition ${styles.input}`}
                placeholder="Enter student name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setError("");
                }}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="student-score"
                className="mb-2 block text-sm font-semibold"
              >
                Score
              </label>

              <input
                id="student-score"
                type="number"
                min="0"
                max="100"
                className={`h-12 w-full border px-4 outline-none transition ${styles.input}`}
                placeholder="Enter score from 0 to 100"
                value={score}
                onChange={(event) => {
                  setScore(event.target.value);
                  setError("");
                }}
                required
              />
            </div>

            {error && (
              <div
                className={`mb-6 border-l-2 px-4 py-3 text-sm ${styles.error}`}
                role="alert"
              >
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                type="submit"
                className="border border-[#c94a32] bg-[#c94a32] px-6 py-3 font-semibold text-white transition hover:bg-[#ad3d29]"
              >
                Evaluate
              </button>

              <button
                type="button"
                className={`border px-6 py-3 font-semibold transition ${styles.secondary}`}
                onClick={clear}
              >
                Clear
              </button>
            </div>
          </form>

          {result && (
            <div className={`mt-8 border ${styles.result}`}>
              <div className={`border-b px-5 py-4 ${styles.border}`}>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${styles.muted}`}
                >
                  Evaluation result
                </p>
              </div>

              <div className="grid gap-6 p-5 sm:grid-cols-3">
                <div>
                  <span className={`text-xs ${styles.muted}`}>
                    Student name
                  </span>

                  <strong className="mt-1 block">{result.name}</strong>
                </div>

                <div>
                  <span className={`text-xs ${styles.muted}`}>Score</span>

                  <strong className="mt-1 block">{result.score}</strong>
                </div>

                <div>
                  <span className={`text-xs ${styles.muted}`}>Remark</span>

                  <strong className={`mt-1 block ${remarkColor}`}>
                    {result.remark}
                  </strong>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}