import "./SubjectDetails.css";

export default function SubjectDetails({ subject, onBack }) {
  if (!subject) return null;

  return (
    <div className="subject-details">
      <button className="back-btn" onClick={onBack}>← Back to Subjects</button>

      <div className="details-header">
        <div className="details-code-badge">{subject.code}</div>
        <div>
          <h1 className="details-title">{subject.title}</h1>
          <div className="details-meta-row">
            <span className="sem-tag">{subject.semester}</span>
            <span className="program-tag">{subject.program}</span>
            <span className="year-tag">{subject.year}</span>
          </div>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <div className="detail-label">Units / Credits</div>
          <div className="detail-value">{subject.units}</div>
        </div>
        <div className="detail-card">
          <div className="detail-label">Semester Offered</div>
          <div className="detail-value">{subject.semester}</div>
        </div>
        <div className="detail-card">
          <div className="detail-label">Program</div>
          <div className="detail-value">{subject.program}</div>
        </div>
        <div className="detail-card">
          <div className="detail-label">Year Level</div>
          <div className="detail-value">{subject.year}</div>
        </div>
        <div className="detail-card">
          <div className="detail-label">Pre-requisites</div>
          <div className={`detail-value ${subject.prerequisites === "None" ? "none-val" : "prereq-val"}`}>
            {subject.prerequisites}
          </div>
        </div>
        <div className="detail-card">
          <div className="detail-label">Co-requisites</div>
          <div className={`detail-value ${subject.corequisites === "None" ? "none-val" : "prereq-val"}`}>
            {subject.corequisites}
          </div>
        </div>
      </div>

      <div className="desc-card">
        <div className="detail-label">Description</div>
        <p className="desc-text">{subject.description}</p>
      </div>
    </div>
  );
}