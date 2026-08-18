import { useState } from "react";

export default function EmployeeAttendanceChecker({ darkMode = false }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function getStatus(value) {
    if (value <= 8) return "On Time";
    if (value <= 8.5) return "Late";
    return "Very Late";
  }

  function formatTime(value) {
    let hour = Math.floor(value);
    let minute = Math.round((value - hour) * 60);

    if (minute === 60) {
      hour += 1;
      minute = 0;
    }

    return `${hour}:${String(minute).padStart(2, "0")} AM`;
  }

  function checkAttendance(event) {
    event.preventDefault();

    const timeValue = Number(time);

    if (!name.trim()) {
      setError("Please enter the employee's name.");
      setResult(null);
      return;
    }

    if (time === "" || timeValue < 0 || timeValue > 12) {
      setError("Please enter a valid time between 0 and 12.");
      setResult(null);
      return;
    }

    setResult({
      name: name.trim(),
      time: timeValue,
      status: getStatus(timeValue),
    });

    setError("");
  }

  function reset() {
    setName("");
    setTime("");
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
        note: "border-[#3a3a3a] bg-[#292929]",
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
        note: "border-[#d8d4cb] bg-[#f5f3ee]",
        error: "border-red-600 bg-red-50 text-red-700",
      };

  const statusColor =
    result?.status === "On Time"
      ? "text-green-600"
      : result?.status === "Late"
        ? "text-amber-600"
        : "text-red-600";

  const statusMessage =
    result?.status === "On Time"
      ? "The employee arrived on time."
      : result?.status === "Late"
        ? "The employee arrived slightly late."
        : "The employee arrived significantly late.";

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div
        className={`grid gap-8 border-b pb-10 md:grid-cols-[90px_1fr] md:items-end ${styles.border}`}
      >
        <span className={`font-mono text-sm ${styles.muted}`}>05</span>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#c94a32]">
            Activity 5
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Employee Attendance Checker
          </h1>
        </div>
      </div>

      <div className="grid gap-10 py-10 md:grid-cols-[0.8fr_1.2fr]">
        <aside>
          <h2 className="mb-3 text-lg font-bold">About this activity</h2>

          <p className={`max-w-sm text-sm leading-6 ${styles.muted}`}>
            Enter the employee's name and arrival time to determine their
            attendance status.
          </p>

          <div
            className={`mt-6 border-l-2 border-[#c94a32] pl-4 text-sm leading-6 ${styles.muted}`}
          >
            <p>8:00 AM or earlier: On Time</p>
            <p>8:01–8:30 AM: Late</p>
            <p>After 8:30 AM: Very Late</p>
          </div>

          <p className={`mt-5 max-w-sm text-xs leading-5 ${styles.muted}`}>
            Use a decimal value for the time. For example, enter 8.25 for 8:15
            AM and 8.5 for 8:30 AM.
          </p>
        </aside>

        <section
          className={`border-t pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 ${styles.border}`}
        >
          <form onSubmit={checkAttendance}>
            <div className="mb-6">
              <label
                htmlFor="employee-name"
                className="mb-2 block text-sm font-semibold"
              >
                Employee name
              </label>

              <input
                id="employee-name"
                type="text"
                className={`h-12 w-full border px-4 outline-none transition ${styles.input}`}
                placeholder="Enter employee name"
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
                htmlFor="time-in"
                className="mb-2 block text-sm font-semibold"
              >
                Time in
              </label>

              <div className="relative">
                <input
                  id="time-in"
                  type="number"
                  min="0"
                  max="12"
                  step="0.01"
                  className={`h-12 w-full border px-4 pr-16 outline-none transition ${styles.input}`}
                  placeholder="Example: 8.25"
                  value={time}
                  onChange={(event) => {
                    setTime(event.target.value);
                    setError("");
                  }}
                  required
                />

                <span
                  className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm ${styles.muted}`}
                >
                  AM
                </span>
              </div>
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
                Check attendance
              </button>

              <button
                type="button"
                className={`border px-6 py-3 font-semibold transition ${styles.secondary}`}
                onClick={reset}
              >
                Reset
              </button>
            </div>
          </form>

          {result && (
            <div className={`mt-8 border ${styles.result}`}>
              <div
                className={`flex items-center justify-between border-b px-5 py-4 ${styles.border}`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${styles.muted}`}
                >
                  Attendance result
                </p>

                <span className={`text-sm font-semibold ${statusColor}`}>
                  {result.status}
                </span>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-3">
                <div>
                  <span className={`text-xs ${styles.muted}`}>
                    Employee name
                  </span>

                  <strong className="mt-1 block">{result.name}</strong>
                </div>

                <div>
                  <span className={`text-xs ${styles.muted}`}>Time in</span>

                  <strong className="mt-1 block">
                    {formatTime(result.time)}
                  </strong>
                </div>

                <div>
                  <span className={`text-xs ${styles.muted}`}>
                    Attendance status
                  </span>

                  <strong className={`mt-1 block ${statusColor}`}>
                    {result.status}
                  </strong>
                </div>
              </div>

              <div className={`m-5 mt-0 border p-4 ${styles.note}`}>
                <p className={`text-sm leading-6 ${styles.muted}`}>
                  {statusMessage}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}