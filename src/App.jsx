import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";
import ProgramList from "./components/programList";
import SubjectList from "./components/subjectList";
import { EnrollmentPage, ReportsPage, SettingsPage } from "./components/placeHolder";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  const renderPage = () => {
    switch (activePage) {
      case "dashboard": return <Dashboard />;
      case "programs": return <ProgramList />;
      case "subjects": return <SubjectList />;
      case "enrollment": return <EnrollmentPage />;
      case "reports": return <ReportsPage />;
      case "settings": return <SettingsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        active={activePage}
        onNavigate={setActivePage}
        onLogout={() => setIsLoggedIn(false)}
      />
      <main className="app-main">
        {renderPage()}
      </main>
    </div>
  );
}