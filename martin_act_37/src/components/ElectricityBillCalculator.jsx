import { useState } from "react";

export default function ElectricityBillCalculator({ darkMode = false }) {
  const [name, setName] = useState("");
  const [kwh, setKwh] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  function getRate(consumption) {
    if (consumption <= 100) return 10;
    if (consumption <= 300) return 15;
    return 20;
  }

  function getUsageStatus(consumption) {
    if (consumption <= 100) return "Low usage";
    if (consumption <= 300) return "Normal usage";
    return "High usage";
  }

  function calculate(event) {
    event.preventDefault();

    const consumption = Number(kwh);

    if (!name.trim()) {
      setError("Please enter the customer's name.");
      setResult(null);
      return;
    }

    if (kwh === "" || consumption < 0) {
      setError("Please enter a valid electricity consumption.");
      setResult(null);
      return;
    }

    const rate = getRate(consumption);

    setResult({
      name: name.trim(),
      consumption,
      rate,
      total: consumption * rate,
      usageStatus: getUsageStatus(consumption),
    });

    setError("");
  }

  function clear() {
    setName("");
    setKwh("");
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
        total: "border-[#3a3a3a] bg-[#292929]",
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
        total: "border-[#d8d4cb] bg-[#f5f3ee]",
        error: "border-red-600 bg-red-50 text-red-700",
      };

  const usageColor =
    result?.usageStatus === "High usage"
      ? "text-red-600"
      : result?.usageStatus === "Normal usage"
        ? "text-amber-600"
        : "text-green-600";

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:py-16">
      <div
        className={`grid gap-8 border-b pb-10 md:grid-cols-[90px_1fr] md:items-end ${styles.border}`}
      >
        <span className={`font-mono text-sm ${styles.muted}`}>04</span>

        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#c94a32]">
            Activity 4
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Electricity Bill Calculator
          </h1>
        </div>
      </div>

      <div className="grid gap-10 py-10 md:grid-cols-[0.8fr_1.2fr]">
        <aside>
          <h2 className="mb-3 text-lg font-bold">About this activity</h2>

          <p className={`max-w-sm text-sm leading-6 ${styles.muted}`}>
            Enter the customer's name and electricity consumption to calculate
            the total bill using the corresponding rate.
          </p>

          <div
            className={`mt-6 border-l-2 border-[#c94a32] pl-4 text-sm leading-6 ${styles.muted}`}
          >
            <p>0–100 kWh: ₱10 per kWh</p>
            <p>101–300 kWh: ₱15 per kWh</p>
            <p>Above 300 kWh: ₱20 per kWh</p>
          </div>
        </aside>

        <section
          className={`border-t pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0 ${styles.border}`}
        >
          <form onSubmit={calculate}>
            <div className="mb-6">
              <label
                htmlFor="customer-name"
                className="mb-2 block text-sm font-semibold"
              >
                Customer name
              </label>

              <input
                id="customer-name"
                type="text"
                className={`h-12 w-full border px-4 outline-none transition ${styles.input}`}
                placeholder="Enter customer name"
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
                htmlFor="electricity-consumption"
                className="mb-2 block text-sm font-semibold"
              >
                Electricity consumption
              </label>

              <div className="relative">
                <input
                  id="electricity-consumption"
                  type="number"
                  min="0"
                  step="0.01"
                  className={`h-12 w-full border px-4 pr-16 outline-none transition ${styles.input}`}
                  placeholder="Enter consumption"
                  value={kwh}
                  onChange={(event) => {
                    setKwh(event.target.value);
                    setError("");
                  }}
                  required
                />

                <span
                  className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm ${styles.muted}`}
                >
                  kWh
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
                Calculate bill
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
              <div
                className={`flex items-center justify-between border-b px-5 py-4 ${styles.border}`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${styles.muted}`}
                >
                  Bill summary
                </p>

                <span className={`text-sm font-semibold ${usageColor}`}>
                  {result.usageStatus}
                </span>
              </div>

              <div className="grid gap-5 p-5 sm:grid-cols-3">
                <div>
                  <span className={`text-xs ${styles.muted}`}>
                    Customer name
                  </span>

                  <strong className="mt-1 block">{result.name}</strong>
                </div>

                <div>
                  <span className={`text-xs ${styles.muted}`}>
                    Consumption
                  </span>

                  <strong className="mt-1 block">
                    {result.consumption.toLocaleString()} kWh
                  </strong>
                </div>

                <div>
                  <span className={`text-xs ${styles.muted}`}>
                    Applied rate
                  </span>

                  <strong className="mt-1 block">
                    ₱{result.rate} per kWh
                  </strong>
                </div>
              </div>

              <div className={`m-5 mt-0 border p-5 ${styles.total}`}>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${styles.muted}`}
                >
                  Total bill
                </span>

                <p className="mt-2 text-3xl font-bold text-[#c94a32]">
                  ₱
                  {result.total.toLocaleString("en-PH", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}