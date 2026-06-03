import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";

const navItems = [
  { to: "/users", label: "Users" },
  { to: "/teams", label: "Teams" },
  { to: "/activities", label: "Activities" },
  { to: "/leaderboard", label: "Leaderboard" },
  { to: "/workouts", label: "Workouts" }
];

function App() {
  return (
    <main className="container py-4">
      <header className="mb-4">
        <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
        <p className="text-secondary mb-0">React 19 presentation tier powered by routed API views.</p>
      </header>

      <nav className="nav nav-pills gap-2 mb-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link border border-secondary-subtle"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  );
}

export default App;
