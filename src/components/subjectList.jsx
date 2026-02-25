import { useState } from "react";
import { subjects } from "../data/subjects";
import "./subjectList.css";

export default function subjectList() {
  const [search, setSearch] = useState("");
  const [filterSem, setFilterSem] = useState("All");
  const [filterPrereq, setFilterPrereq] = useState("All");
  const [filterProgram, setFilterProgram] = useState("All");
  const [selected, setSelected] = useState(null);

  const programs = [...new Set(subjects.map(s => s.program))];

  const filtered = subjects.filter(s => {
    const matchSearch = s.code.toLowerCase().includes(search.toLowerCase()) || s.title.toLowerCase().includes(search.toLowerCase());
    const matchSem = filterSem === "All" || s.semester === filterSem;
    const matchPrereq = filterPrereq === "All" || (filterPrereq === "With" ? s.prerequisites !== "None" : s.prerequisites === "None");
    const matchProgram = filterProgram === "All" || s.program === filterProgram;
    return matchSearch && matchSem && matchPrereq && matchProgram;
  });

  return (
    <div className="subject-list">
      <div className="page-header">
        <div>
          <h1 className="page-title">Subject </h1>
          <p className="page-sub">{subjects.length} subjects available</p>
        </div>
      </div>

      
      <div className="filter-bar">
        <input className="search-input" placeholder="🔍 Search by code or title..." value={search} onChange={e => setSearch(e.target.value)} />
        <select className="filter-select" value={filterSem} onChange={e => setFilterSem(e.target.value)}>
          <option value="All">All Semesters</option>
          <option value="1st Semester">1st Semester</option>
          <option value="2nd Semester">2nd Semester</option>
        </select>
        <select className="filter-select" value={filterPrereq} onChange={e => setFilterPrereq(e.target.value)}>
          <option value="All">All Subjects</option>
          <option value="With">With Prerequisites</option>
          <option value="Without">Without Prerequisites</option>
        </select>
        <select className="filter-select" value={filterProgram} onChange={e => setFilterProgram(e.target.value)}>
          <option value="All">All Programs</option>
          {programs.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>


      <div className="subject-table-wrapper">
        <table className="subject-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Title</th>
              <th>Units</th>
              <th>Semester</th>
              <th>Program</th>
              <th>Prerequisites</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} onClick={() => setSelected(s)} className="subject-row">
                <td><span className="subject-code-badge">{s.code}</span></td>
                <td className="subject-title-cell">{s.title}</td>
                <td><span className="units-badge">{s.units}</span></td>
                <td><span className={`sem-tag ${s.semester === "1st Semester" ? "sem1" : "sem2"}`}>{s.semester}</span></td>
                <td><span className="program-tag">{s.program}</span></td>
                <td>{s.prerequisites === "None" ? <span className="none-tag">None</span> : <span className="prereq-tag">{s.prerequisites}</span>}</td>
                <td><button className="view-btn">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="empty-state">No subjects found.</div>}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="subject-code-badge">{selected.code}</span>
                <h2 className="modal-title">{selected.title}</h2>
              </div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-field"><label>Units</label><span>{selected.units}</span></div>
                <div className="modal-field"><label>Semester</label><span>{selected.semester}</span></div>
                <div className="modal-field"><label>Program</label><span>{selected.program}</span></div>
                <div className="modal-field"><label>Year Level</label><span>{selected.year}</span></div>
                <div className="modal-field"><label>Prerequisites</label><span>{selected.prerequisites}</span></div>
                <div className="modal-field"><label>Co-requisites</label><span>{selected.corequisites}</span></div>
              </div>
              <div className="modal-field full">
                <label>Description</label>
                <p>{selected.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}