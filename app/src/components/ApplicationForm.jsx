import { useState } from 'react'
import { STATUSES } from '../App'

// The form used for both adding a new application and editing an existing one.
// - `initial` is null when adding, or the application object when editing.
// - `onAdd` / `onUpdate` / `onCancelEdit` are callbacks passed down from App.
export default function ApplicationForm({ initial, onAdd, onUpdate, onCancelEdit }) {
  // One piece of state per input (controlled components).
  const [company, setCompany] = useState(initial?.company ?? '')
  const [role, setRole] = useState(initial?.role ?? '')
  const [link, setLink] = useState(initial?.link ?? '')
  const [status, setStatus] = useState(initial?.status ?? STATUSES[0])
  const [followUp, setFollowUp] = useState(initial?.followUp ?? '')

  function handleSubmit(event) {
    event.preventDefault() // stop the browser from reloading the page

    // Basic validation: company and role are required.
    if (!company.trim() || !role.trim()) return

    const data = {
      company: company.trim(),
      role: role.trim(),
      link: link.trim(),
      status,
      followUp,
    }

    if (initial) {
      onUpdate(initial.id, data)
    } else {
      onAdd(data)
      // Clear the fields so the form is ready for the next entry.
      setCompany('')
      setRole('')
      setLink('')
      setStatus(STATUSES[0])
      setFollowUp('')
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>{initial ? 'Edit application' : 'Add application'}</h2>

      <div className="form-grid">
        <label>
          Company *
          {/* dir="auto" lets Arabic text display right-to-left automatically */}
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="e.g. Google"
            dir="auto"
            required
          />
        </label>

        <label>
          Role *
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Frontend Intern"
            dir="auto"
            required
          />
        </label>

        <label>
          Job link
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://..."
          />
        </label>

        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label>
          Follow-up date
          <input
            type="date"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="primary">
          {initial ? 'Save changes' : 'Add'}
        </button>
        {initial && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}
