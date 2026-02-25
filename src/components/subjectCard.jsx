import "./SubjectCard.css";

export default function SubjectCard({ subject, onClick }) {
  return (
    <div className="subject-card" onClick={() => onClick(subject)}>
      <div className="subject-card-header">
        <span className="subject-code-badge">{subject.code}</span>
        <span className={`sem-badge ${subject.semester === "1st Semester" ? "sem1" : "sem2"}`}>
          {subject.semester}
        </span>
      </div>
      <div className="subject-card-title">{subject.title}</div>
      <div className="subject-card-meta">
        <span>📦 {subject.units} units</span>
        <span>🎓 {subject.program}</span>
        <span>📅 {subject.year}</span>
      </div>
      <div className="subject-card-prereq">
        <span className="prereq-label">Prerequisite:</span>
        <span className={subject.prerequisites === "None" ? "none-text" : "prereq-text"}>
          {subject.prerequisites}
        </span>
      </div>
      <div className="subject-card-footer">View Details →</div>
    </div>
  );
}