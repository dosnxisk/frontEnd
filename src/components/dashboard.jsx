import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { programs } from "../data/programs";
import { subjects } from "../data/subjects";
import "./dashboard.css";

const semesterData = [
  { name: "1st Sem", subjects: subjects.filter(s => s.semester === "1st Semester").length },
  { name: "2nd Sem", subjects: subjects.filter(s => s.semester === "2nd Semester").length },
];

const statusData = [
  { name: "Active", value: programs.filter(p => p.status === "Active").length },
  { name: "Phased Out", value: programs.filter(p => p.status === "Phased Out").length },
  { name: "Under Review", value: programs.filter(p => p.status === "Under Review").length },
];

const enrollmentTrend = [
  { month: "Aug", enrolled: 320 },
  { month: "Sep", enrolled: 480 },
  { month: "Oct", enrolled: 390 },
  { month: "Nov", enrolled: 520 },
  { month: "Dec", enrolled: 280 },
  { month: "Jan", enrolled: 610 },
];

const COLORS = ["#6366f1", "#ec4899", "#f59e0b"];

const weatherData = {
  city: "Tagum City",
  temp: "29°C",
  condition: "Partly Cloudy",
  humidity: "72%",
  icon: "⛅",
};

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your assistant. Ask me about programs or subjects!" }
  ]);
  const [input, setInput] = useState("");

  const username = localStorage.getItem("username") || "Lhorie";
  const withPrereqs = subjects.filter(s => s.prerequisites !== "None").length;
  const recentPrograms = programs.slice(-3).reverse();

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    let botReply = "I can help with program and subject queries. Try asking 'how many programs?' or 'list active programs'.";

    const q = input.toLowerCase();
    if (q.includes("how many programs") || q.includes("total programs")) {
      botReply = `There are ${programs.length} programs in total.`;
    } else if (q.includes("active programs")) {
      botReply = `There are ${programs.filter(p => p.status === "Active").length} active programs: ${programs.filter(p => p.status === "Active").map(p => p.code).join(", ")}.`;
    } else if (q.includes("how many subjects") || q.includes("total subjects")) {
      botReply = `There are ${subjects.length} subjects in total.`;
    } else if (q.includes("prerequisite")) {
      botReply = `${withPrereqs} subjects have prerequisites.`;
    }

    setMessages(prev => [...prev, userMsg, { from: "bot", text: botReply }]);
    setInput("");
  };

  return (
    <div className="dashboard">
      
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-sub">Welcome back, {username}!</p>
        </div>
        <div className="weather-widget">
          <span className="weather-icon">{weatherData.icon}</span>
          <div>
            <div className="weather-temp">{weatherData.temp} — {weatherData.city}</div>
            <div className="weather-cond">{weatherData.condition} · Humidity: {weatherData.humidity}</div>
          </div>
        </div>
      </div>

      <div className="stat-cards">
        <div className="stat-card indigo">
          <div className="stat-icon"> </div>
          <div className="stat-value">{programs.length}</div>
          <div className="stat-label">Total Programs</div>
        </div>
        <div className="stat-card pink">
          <div className="stat-icon"> </div>
          <div className="stat-value">{subjects.length}</div>
          <div className="stat-label">Total Subjects</div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon"> </div>
          <div className="stat-value">{programs.filter(p => p.status === "Active").length}</div>
          <div className="stat-label">Active Programs</div>
        </div>
        <div className="stat-card amber">
          <div className="stat-icon"> </div>
          <div className="stat-value">{withPrereqs}</div>
          <div className="stat-label">Subjects w/ Prerequisites</div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h3 className="chart-title">Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={enrollmentTrend}>
              <XAxis dataKey="month" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8, color: "white" }} />
              <Line type="monotone" dataKey="enrolled" stroke="#6366f1" strokeWidth={3} dot={{ fill: "#6366f1", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Subjects per Semester</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={semesterData}>
              <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8, color: "white" }} />
              <Bar dataKey="subjects" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">Program Status</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {statusData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#1e293b", border: "none", borderRadius: 8, color: "white" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-section">
        <h3 className="chart-title">Recently Added Programs</h3>
        <div className="recent-list">
          {recentPrograms.map(p => (
            <div key={p.id} className="recent-item">
              <div className="recent-code">{p.code}</div>
              <div className="recent-info">
                <div className="recent-name">{p.name}</div>
                <div className="recent-meta">{p.type} · {p.duration} · {p.totalUnits} units</div>
              </div>
              <span className={`status-badge ${p.status.toLowerCase().replace(" ", "-")}`}>{p.status}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="chat-fab" onClick={() => setChatOpen(!chatOpen)}>💬</button>
      {chatOpen && (
        <div className="chatbot">
          <div className="chatbot-header">
            <span>🤖 LMN Bot</span>
            <button onClick={() => setChatOpen(false)}>✕</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}>{msg.text}</div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}