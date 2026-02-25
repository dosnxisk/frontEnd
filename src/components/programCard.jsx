import "./ProgramCard.css";

export default function ProgramCard({ program, onClick }) {
  return (
    <div className="program-card" onClick={() => onClick(program)}>
      <div className="program-card-header">
        <div className="program-code-badge">{program.code}</div>
        <span className={`status-badge ${program.status.toLowerCase().replace(" ", "-")}`}>
          {program.status}
        </span>
      </div>
      <div className="program-card-name">{program.name}</div>
      <div className="program-card-meta">
        <span>📋 {program.type}</span>
        <span>⏱ {program.duration}</span>
        <span>📦 {program.totalUnits} units</span>
      </div>
      <div className="program-card-footer">View Details →</div>
    </div>
  );
}