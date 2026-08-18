import { useState } from "react";

export default function LoginAuthentication({ darkMode = false }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (username === "admin" && password === "12345") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  }

  function handleLogout() {
    setLoggedIn(false);
    setPassword("");
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
      }
    : {
        muted: "text-[#69665f]",
        border: "border-[#d8d4cb]",
        input:
          "border-[#c9c5bc] bg-[#f5f3ee] text-[#252525] placeholder:text-[#969188] focus:border-[#c94a32]",
        secondary:
          "border-[#252525] text-[#252525] hover:bg-[#252525] hover:text-white",
      };

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div
        className={`grid gap-8 border-b pb-10 md:grid-cols-[90px_1fr] md:items-end ${styles.border}`}
      >
        <span className={`font-mono text-sm ${styles.muted}`}>01</span>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#c94a32]">
            Activity 1
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Login Authentication
          </h1>
        </div>
      </div>

      <div className="grid gap-10 py-10 md:grid-cols-[0.8fr_1.2fr]">
        <aside>
          <h2 className="mb-3 text-lg font-bold">About this activity</h2>

          <p className={`max-w-sm text-sm leading-6 ${styles.muted}`}>
            Enter the sample credentials to test form handling, validation,
            conditional rendering, and login state.
          </p>

          <div
            className={`mt-6 border-l-2 border-[#c94a32] pl-4 text-sm ${styles.muted}`}
          >
            <p className="mb-1">
              Username:{" "}
              <span className="font-mono font-semibold">admin</span>
            </p>

            <p>
              Password:{" "}
              <span className="font-mono font-semibold">12345</span>
            </p>
          </div>
        </aside>

        <section className={`border-t pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 ${styles.border}`}>
          {loggedIn ? (
            <div>
              <div className="mb-8 flex items-center gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-[#dfeade] text-xl font-bold text-[#35613b]">
                  ✓
                </span>

                <div>
                  <p className={`text-sm ${styles.muted}`}>
                    Authentication complete
                  </p>

                  <h2 className="text-2xl font-bold">Login successful</h2>
                </div>
              </div>

              <div className={`mb-8 border-y py-6 ${styles.border}`}>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${styles.muted}`}
                >
                  Signed in as
                </span>

                <p className="mt-2 text-3xl font-bold">{username}</p>
              </div>

              <button
                type="button"
                className={`border px-6 py-3 text-sm font-semibold transition ${styles.secondary}`}
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-semibold"
                >
                  Username
                </label>

                <input
                  id="username"
                  type="text"
                  className={`h-12 w-full border px-4 outline-none transition ${styles.input}`}
                  placeholder="Enter username"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                    setError("");
                  }}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  className={`h-12 w-full border px-4 outline-none transition ${styles.input}`}
                  placeholder="Enter password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  autoComplete="current-password"
                  required
                />
              </div>

              {error && (
                <div
                  className="mb-6 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-sm text-red-700"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full border border-[#c94a32] bg-[#c94a32] px-6 py-3 font-semibold text-white transition hover:bg-[#ad3d29]"
              >
                Log in
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}