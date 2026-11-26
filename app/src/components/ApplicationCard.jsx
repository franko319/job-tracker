// One card in the list: the details of a single application
// plus its Edit and Delete buttons.
export default function ApplicationCard({ application, onEdit, onDelete }) {
  const { company, role, link, status, followUp } = application

  // Turn the stored "2026-12-01" string into something nicer to read.
  const followUpText = followUp
    ? new Date(followUp + 'T00:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : null

  return (
    <li className="card">
      <div className="card-main">
        <strong dir="auto">{company}</strong>
        <span className="role" dir="auto">
          {role}
        </span>
        {link && (
          <a href={link} target="_blank" rel="noreferrer">
            View job posting
          </a>
        )}
      </div>

      <div className="card-side">
        {/* The class name changes with the status, so each status gets its own color */}
        <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
        {followUpText && <span className="follow-up">Follow up: {followUpText}</span>}
        <div className="card-actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete} className="danger">
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}
