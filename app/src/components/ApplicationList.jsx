import ApplicationCard from './ApplicationCard'

// Shows the filtered list of applications, or a friendly empty state.
export default function ApplicationList({ applications, onEdit, onDelete }) {
  if (applications.length === 0) {
    return <p className="empty">No applications here yet. Add your first one above!</p>
  }

  return (
    <ul className="list">
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          application={app}
          onEdit={() => onEdit(app)}
          onDelete={() => onDelete(app.id)}
        />
      ))}
    </ul>
  )
}
