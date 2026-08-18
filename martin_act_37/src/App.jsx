import { useEffect, useState } from "react";
import LoginAuthentication from "./components/LoginAuthentication";
import StudentGradeEvaluation from "./components/StudentGradeEvaluation";
import PasswordStrengthChecker from "./components/PasswordStrengthChecker";
import ElectricityBillCalculator from "./components/ElectricityBillCalculator";
import EmployeeAttendanceChecker from "./components/EmployeeAttendanceChecker";

const activities = [
  { id: 1, title: "Login Authentication", description: "Validate a username and password, then manage the user's login state." },
  { id: 2, title: "Student Grade Evaluation", description: "Enter a student's score and display the appropriate grade remark." },
  { id: 3, title: "Password Strength Checker", description: "Check a password's length and provide feedback about its strength." },
  { id: 4, title: "Electricity Bill Calculator", description: "Calculate an electricity bill using consumption and tiered rates." },
  { id: 5, title: "Employee Attendance Checker", description: "Determine an employee's attendance status using their arrival time." },
];

const screens = {
  1: LoginAuthentication,
  2: StudentGradeEvaluation,
  3: PasswordStrengthChecker,
  4: ElectricityBillCalculator,
  5: EmployeeAttendanceChecker,
};

function SunIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M6.35 17.65l-1.42 1.42M19.07 4.93l-1.42 1.42"/></svg>;
}

function MoonIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></svg>;
}

export default function App() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
  const Activity = screens[page];

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.style.overflowY = "scroll";
    document.documentElement.style.scrollbarGutter = "stable";
  }, []);

  const colors = darkMode
    ? { page: "bg-[#171717] text-[#ece9e2]", header: "border-[#353535] bg-[#171717]", muted: "text-[#aaa69d]", line: "border-[#353535]", button: "border-[#ece9e2] hover:bg-[#ece9e2] hover:text-[#171717]" }
    : { page: "bg-[#f5f3ee] text-[#252525]", header: "border-[#d8d4cb] bg-[#f5f3ee]", muted: "text-[#69665f]", line: "border-[#d8d4cb]", button: "border-[#252525] hover:bg-[#252525] hover:text-white" };

  const ThemeButton = ({ mobile = false }) => (
    <button type="button" aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} title={darkMode ? "Light mode" : "Dark mode"} className={`${mobile ? "grid lg:hidden" : "hidden lg:grid"} h-10 w-10 shrink-0 place-items-center rounded-full border transition hover:border-[#c94a32] hover:text-[#c94a32] ${colors.line}`} onClick={() => setDarkMode((value) => !value)}>{darkMode ? <SunIcon /> : <MoonIcon />}</button>
  );

  return (
    <div className={`min-h-screen transition-colors duration-200 ${colors.page}`}>
      <header className={`sticky top-0 z-50 border-b transition-colors duration-200 ${colors.header}`}>
        <nav className="mx-auto flex min-h-[81px] max-w-6xl flex-col justify-center gap-4 px-5 py-4 lg:flex-row lg:items-center lg:justify-between" aria-label="Main navigation">
          <div className="flex items-center justify-between gap-4">
            <button className="flex shrink-0 items-center gap-3 text-left" onClick={() => setPage("home")}>
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full font-bold ${darkMode ? "bg-[#ece9e2] text-[#171717]" : "bg-[#252525] text-white"}`}>R</span>
              <span><span className="block font-bold">React Activities</span><span className={`block text-xs ${colors.muted}`}>Five practical exercises</span></span>
            </button>
            <ThemeButton mobile />
          </div>

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex flex-1 gap-1 overflow-x-auto">
              <button className={`w-[72px] shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-semibold ${page === "home" ? "border-[#c94a32] text-[#c94a32]" : `border-transparent ${colors.muted}`}`} onClick={() => setPage("home")}>Home</button>
              {activities.map(({ id }) => <button key={id} className={`w-[96px] shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-semibold ${page === id ? "border-[#c94a32] text-[#c94a32]" : `border-transparent ${colors.muted}`}`} onClick={() => setPage(id)}>Activity {id}</button>)}
            </div>
            <ThemeButton />
          </div>
        </nav>
      </header>

      {page === "home" ? (
        <main className="mx-auto max-w-6xl px-5 py-12 md:py-16">
          <section className={`grid gap-8 border-b pb-12 md:grid-cols-[1.3fr_0.7fr] md:items-end ${colors.line}`}>
            <div><p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#c94a32]">React Exercises</p><h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">Small activities for practicing React fundamentals.</h1></div>
            
          </section>

          <section className="mt-12">
            <div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-bold">Activities</h2><span className={`text-sm ${colors.muted}`}>{activities.length} exercises</span></div>
            <div className={`divide-y border-y ${darkMode ? "divide-[#353535] border-[#353535]" : "divide-[#d8d4cb] border-[#d8d4cb]"}`}>
              {activities.map(({ id, title, description }) => (
                <article key={id} className="group grid gap-4 py-7 md:grid-cols-[70px_1fr_220px] md:items-center">
                  <span className={`font-mono text-sm ${colors.muted}`}>0{id}</span>
                  <div><h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-[#c94a32]">{title}</h3><p className={`max-w-2xl text-sm leading-6 ${colors.muted}`}>{description}</p></div>
                  <button className={`w-full border bg-transparent px-5 py-3 text-sm font-semibold transition ${colors.button}`} onClick={() => setPage(id)}>View activity</button>
                </article>
              ))}
            </div>
          </section>

          <footer className={`mt-10 flex flex-col gap-2 text-sm sm:flex-row sm:justify-between ${colors.muted}`}><span>React Activity Portal</span></footer>
        </main>
      ) : (
        <div className={`min-h-[calc(100vh-81px)] transition-colors duration-200 ${darkMode ? "bg-[#171717] text-[#ece9e2]" : "bg-[#f5f3ee] text-[#252525]"}`}><Activity darkMode={darkMode} /></div>
      )}
    </div>
  );
}
