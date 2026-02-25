import { useState } from "react";
import { programs } from "../data/programs";
import ProgramDetails from "./programDetails";
import "./ProgramList.css";

export default function programList() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered = programs.filter(p => {
    const matchSearch = p.code.toLowerCase().includes(search.toLowerCase()) || p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    const matchType = filterType === "All" || p.type === filterType;
    return matchSearch && matchStatus && matchType;
  });

  if (selected) return <ProgramDetails program={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="program-list">
      <div className="page-header">
        <div>
          <h1 className="page-title">Program Offerings</h1>
          <p className="page-sub">{programs.length} programs available</p>
        </div>
      </div>

      
      <div className="filter-bar">
        <input
          className="search-input"
          placeholder="🔍 Search by code or name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="filter-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Phased Out">Phased Out</option>
          <option value="Under Review">Under Review</option>
        </select>
        <select className="filter-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
          <option value="All">All Types</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Diploma">Diploma</option>
        </select>
      </div>

      
      <div className="program-grid">
        {filtered.map(p => (
          <div key={p.id} className="program-card" onClick={() => setSelected(p)}>
            <div className="program-card-header">
              <div className="program-code-badge">{p.code}</div>
              <span className={`status-badge ${p.status.toLowerCase().replace(" ", "-")}`}>{p.status}</span>
            </div>
            <div className="program-card-name">{p.name}</div>
            <div className="program-card-meta">
              <span>📋 {p.type}</span>
              <span>⏱ {p.duration}</span>
              <span>📦 {p.totalUnits} units</span>
            </div>
            <div className="program-card-footer">View Details →</div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="empty-state">No programs found.</div>
        )}
      </div>
    </div>
  );
}