import { useState } from "react";

export default function PasswordStrengthChecker({ darkMode = false }) {
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  function getStatus() {
    if (password.length >= 12) return "Strong";
    if (password.length >= 8) return "Medium";
    return "Weak";
  }

  const status = getStatus();

  const message =
    status === "Strong"
      ? "Your password has a strong length."
      : status === "Medium"
        ? "Your password is acceptable, but a longer one would be stronger."
        : "Your password is too short. Use at least 8 characters.";

  function checkPassword(event) {
    event.preventDefault();

    if (!password) {
      setError("Please enter a password.");
      setChecked(false);
      return;
    }

    setError("");
    setChecked(true);
  }

  function clear() {
    setPassword("");
    setChecked(false);
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
        emptyBar: "bg-[#3a3a3a]",
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
        emptyBar: "bg-[#d8d4cb]",
        error: "border-red-600 bg-red-50 text-red-700",
      };

  const statusStyles = {
    Weak: {
      text: "text-red-600",
      bar: "bg-red-600",
      width: "w-1/3",
    },
    Medium: {
      text: "text-amber-600",
      bar: "bg-amber-500",
      width: "w-2/3",
    },
    Strong: {
      text: "text-green-600",
      bar: "bg-green-600",
      width: "w-full",
    },
  };

  const currentStatus = statusStyles[status];

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div
        className={`grid gap-8 border-b pb-10 md:grid-cols-[90px_1fr] md:items-end ${styles.border}`}
      >
        <span className={`font-mono text-sm ${styles.muted}`}>03</span>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#c94a32]">
            Activity 3
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Password Strength Checker
          </h1>
        </div>
      </div>

      <div className="grid gap-10 py-10 md:grid-cols-[0.8fr_1.2fr]">
        <aside>
          <h2 className="mb-3 text-lg font-bold">About this activity</h2>

          <p className={`max-w-sm text-sm leading-6 ${styles.muted}`}>
            Enter a password to evaluate its strength using the number of
            characters it contains.
          </p>

          <div
            className={`mt-6 border-l-2 border-[#c94a32] pl-4 text-sm leading-6 ${styles.muted}`}
          >
            <p>Below 8 characters: Weak</p>
            <p>8–11 characters: Medium</p>
            <p>12 characters or more: Strong</p>
          </div>
        </aside>

        <section
          className={`border-t pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 ${styles.border}`}
        >
          <form onSubmit={checkPassword}>
            <div className="mb-3">
              <label
                htmlFor="password-check"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>

              <input
                id="password-check"
                type="password"
                className={`h-12 w-full border px-4 outline-none transition ${styles.input}`}
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setChecked(false);
                  setError("");
                }}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="mb-6 flex items-center justify-between">
              <p className={`text-xs ${styles.muted}`}>
                Use at least 8 characters
              </p>

              <p className={`font-mono text-xs ${styles.muted}`}>
                {password.length} characters
              </p>
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
                Check password
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

          {checked && (
            <div className={`mt-8 border ${styles.result}`}>
              <div className={`border-b px-5 py-4 ${styles.border}`}>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${styles.muted}`}
                >
                  Strength result
                </p>
              </div>

              <div className="p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className={`text-sm ${styles.muted}`}>
                    Password status
                  </span>

                  <strong className={currentStatus.text}>{status}</strong>
                </div>

                <div
                  className={`mb-5 h-1.5 w-full overflow-hidden ${styles.emptyBar}`}
                >
                  <div
                    className={`h-full transition-all duration-300 ${currentStatus.bar} ${currentStatus.width}`}
                  />
                </div>

                <p className={`text-sm leading-6 ${styles.muted}`}>
                  {message}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}