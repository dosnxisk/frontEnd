import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, NavLink, Navigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

const enrollmentData = [
  { month: 'Jan', enrolled: 400 },
  { month: 'Feb', enrolled: 900 },
  { month: 'Mar', enrolled: 700 },
  { month: 'Apr', enrolled: 1300 },
  { month: 'May', enrolled: 1700 },
];


const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-header">
          <div className="login-logo">
            <div className="dot"></div>
            <span>SASHINGUN</span>
          </div>
          <h1>Welcome!</h1>
          <p></p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="admin@umindanao.edu" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" required />
          </div>

          <button type="submit" className="login-btn">Sign In</button>

          <div className="divider"><span>or login with</span></div>

          <button type="button" className="google-btn">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="google" />
            Google
          </button>

          <div className="login-footer">
            <p>Don't have an account? <a href="#">Create Account</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};


const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const [chatMsg, setChatMsg] = useState('');
  const [chatOpen, setChatOpen] = useState(true);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">

        
        <div className="sidebar-brand">
          <div className="brand-icon">🎓</div>
          <span className="brand-name">SASHINGUN</span>
        </div>

        
        <div className="nav-section-label">Main Menu</div>
        <nav className="nav-menu">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span className="nav-icon"></span> Dashboard
          </NavLink>
          <NavLink to="/students" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span className="nav-icon"></span> Students
          </NavLink>
          <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span className="nav-icon"></span> Courses
          </NavLink>
          <NavLink to="/enrollment" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span className="nav-icon"></span> Enrollment
          </NavLink>
          <NavLink to="/reports" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span className="nav-icon"></span> Reports
          </NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span className="nav-icon"></span> Settings
          </NavLink>
        </nav>

        
        <div style={{ flex: 1 }} />

        <button className="logout-btn" onClick={() => navigate('/')}>
          <span></span> Logout
        </button>
      </aside>

      <main className="main-content">
        {children}

      
        {chatOpen && (
          <div className="chatbot-ui">
            <div className="chat-header">
              <div className="chat-status-dot"></div>
              Enrollment Support
            </div>
            <div className="chat-body">
              <p>Hi! How can I help you today?</p>
            </div>
            <div className="chat-footer">
              <input
                type="text"
                placeholder="Ask AI..."
                value={chatMsg}
                onChange={(e) => setChatMsg(e.target.value)}
              />
              <button className="chat-send-btn" onClick={() => setChatMsg('')}>➤</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const DashboardHome = () => (
  <>
    <div className="top-bar">
      <div className="top-bar-title">
        <h2>Enrollment Overview</h2>
        <p>Welcome , !</p>
      </div>
      <div className="weather-widget">
        <span className="weather-icon"></span>
        <div className="weather-info">
          <span className="weather-location">Tagum City</span>
          <span className="weather-temp">31°C</span>
          <span className="weather-desc">Sunny Day</span>
        </div>
      </div>
    </div>

    <section className="stats-grid">
      <div className="stat-card blue">
        <div className="stat-number">200</div>
        <div className="stat-label">Total Enrolled</div>
      </div>
      <div className="stat-card pink">
        <div className="stat-number">190</div>
        <div className="stat-label">Pending</div>
      </div>
      <div className="stat-card purple">
        <div className="stat-number">42</div>
        <div className="stat-label">Courses</div>
      </div>
    </section>

    <div className="chart-section">
      <div className="chart-header">
        <span className="chart-title">Enrollment Trends</span>
        <span className="chart-badge">2026</span>
      </div>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEnrolled" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#5b5ef4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#5b5ef4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: '0.85rem' }}
              cursor={{ stroke: '#5b5ef4', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="enrolled"
              stroke="#5b5ef4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorEnrolled)"
              dot={{ r: 4, fill: '#5b5ef4', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#5b5ef4', strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </>
);


const PlaceholderPage = ({ title }) => (
  <div style={{ padding: '20px 0' }}>
    <div className="top-bar">
      <div className="top-bar-title">
        <h2>{title}</h2>
        <p></p>
      </div>
    </div>
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '60px',
      textAlign: 'center',
      color: '#9ca3af',
      boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '12px' }}></div>
      <p style={{ fontWeight: 600, fontSize: '1rem', color: '#374151' }}>BROWNOUT </p>
      <p style={{ fontSize: '0.875rem', marginTop: '4px' }}> </p>
    </div>
  </div>
);


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard"  element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
        <Route path="/students"   element={<DashboardLayout><PlaceholderPage title="Students Management" /></DashboardLayout>} />
        <Route path="/courses"    element={<DashboardLayout><PlaceholderPage title="Course " /></DashboardLayout>} />
        <Route path="/enrollment" element={<DashboardLayout><PlaceholderPage title="Enrollment Process" /></DashboardLayout>} />
        <Route path="/reports"    element={<DashboardLayout><PlaceholderPage title="System Reports" /></DashboardLayout>} />
        <Route path="/settings"   element={<DashboardLayout><PlaceholderPage title="Settings" /></DashboardLayout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
