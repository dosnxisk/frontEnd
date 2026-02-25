import "./Sidebar.css";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: " " },
  { id: "programs", label: "Programs", icon: " " },
  { id: "subjects", label: "Subjects", icon: " " },
  { id: "enrollment", label: "Enrollment", icon: " " },
  { id: "reports", label: "Reports", icon: " " },
  { id: "settings", label: "Settings", icon: " " },
];

export default function Sidebar({ active, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">LMN</div>
        <span className="sidebar-logo-text">SYSTEM</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {active === item.id && <span className="nav-indicator" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-info">
            <span className="user-name"> </span>
            
          </div>
        </div>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </aside>
  );
}