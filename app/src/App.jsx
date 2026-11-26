import { useState, useEffect } from 'react'
import ApplicationForm from './components/ApplicationForm'
import ApplicationList from './components/ApplicationList'
import './App.css'

// The possible statuses an application can be in.
// The filter buttons and the form dropdown both use this list.
export const STATUSES = ['Applied', 'Interviewing', 'Offer', 'Rejected']

// The key our data is saved under in the browser's localStorage.
const STORAGE_KEY = 'job-applications'

// Sample entries shown the very first time the app opens, so the page
// is not empty. Delete them from the UI, or remove the array below to
// start with a completely empty tracker.
const SAMPLE_APPLICATIONS = [
  {
    id: 'sample-1',
    company: 'Example Tech',
    role: 'Frontend Intern',
    link: 'https://example.com/jobs/1',
    status: 'Applied',
    followUp: '2026-12-01',
    createdAt: Date.now(),
  },
  {
    id: 'sample-2',
    company: 'Startup Hub',
    role: 'Junior Web Developer',
    link: '',
    status: 'Interviewing',
    followUp: '2026-11-30',
    createdAt: Date.now(),
  },
]

// Read saved applications from localStorage.
// Runs once when the app first loads.
function loadApplications() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {
    // If the saved data is somehow corrupted, fall through to the samples.
  }
  return SAMPLE_APPLICATIONS
}

export default function App() {
  // The full list of applications (the single source of truth).
  const [applications, setApplications] = useState(loadApplications)

  // Which status the list is filtered by. 'All' means no filtering.
  const [statusFilter, setStatusFilter] = useState('All')

  // The application currently being edited, or null when adding a new one.
  const [editing, setEditing] = useState(null)

  // Every time `applications` changes, save the whole list to localStorage
  // so it survives a page refresh.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
  }, [applications])

  // Called by the form when adding a new application.
  function addApplication(data) {
    const newApplication = {
      ...data,
      id: crypto.randomUUID(), // unique id so we can find it later
      createdAt: Date.now(),
    }
    setApplications([newApplication, ...applications]) // newest on top
  }

  // Called by the form when saving edits to an existing application.
  function updateApplication(id, data) {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, ...data } : app))
    )
    setEditing(null) // close edit mode
  }

  // Delete is permanent: filter keeps every application except this id.
  function deleteApplication(id) {
    if (window.confirm('Delete this application?')) {
      setApplications(applications.filter((app) => app.id !== id))
    }
  }

  // The list actually shown on screen, after applying the status filter.
  const visibleApplications =
    statusFilter === 'All'
      ? applications
      : applications.filter((app) => app.status === statusFilter)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Job Application Tracker</h1>
        <p className="subtitle">
          {applications.length}{' '}
          {applications.length === 1 ? 'application' : 'applications'} tracked
        </p>
      </header>

      <ApplicationForm
        key={editing ? editing.id : 'new'} // reset the form when switching edit target
        initial={editing}
        onAdd={addApplication}
        onUpdate={updateApplication}
        onCancelEdit={() => setEditing(null)}
      />

      {/* Filter buttons: All + one per status */}
      <div className="filters">
        {['All', ...STATUSES].map((status) => (
          <button
            key={status}
            className={statusFilter === status ? 'filter active' : 'filter'}
            onClick={() => setStatusFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      <ApplicationList
        applications={visibleApplications}
        onEdit={setEditing}
        onDelete={deleteApplication}
      />
    </div>
  )
}
