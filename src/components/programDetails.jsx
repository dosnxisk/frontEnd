import { subjects } from "../data/subjects";
import "./programDetails.css";

export default function programDetails({ program, onBack }) {
  const programSubjects = subjects.filter(s => s.program === program.code);

  return (
    <div className="program-details">
      <button className="back-btn" onClick={onBack}>← Back to Programs</button>

      <div className="details-header">
        <div className="details-code-badge">{program.code}</div>
        <div>
          <h1 className="details-title">{program.name}</h1>
          <div className="details-meta-row">
            <span>📋 {program.type}</span>
            <span>⏱ {program.duration}</span>
            <span>📦 {program.totalUnits} units</span>
            <span className={`status-badge ${program.status.toLowerCase().replace(" ", "-")}`}>{program.status}</span>
          </div>
        </div>
      </div>

      <div className="details-desc">{program.description}</div>

      <h3 className="section-title">Subjects by Year Level</h3>
      {program.yearLevels.map(year => {
        const yearSubs = programSubjects.filter(s => s.year === year);
        return (
          <div key={year} className="year-section">
            <div className="year-label">{year}</div>
            {yearSubs.length > 0 ? (
              <div className="year-subjects">
                {yearSubs.map(s => (
                  <div key={s.id} className="year-subject-item">
                    <span className="subject-code-sm">{s.code}</span>
                    <span className="subject-title-sm">{s.title}</span>
                    <span className="subject-units-sm">{s.units} units</span>
                    <span className="semester-tag">{s.semester}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-subjects">   </div>
            )}
          </div>
        );
      })}
    </div>
  );
}