import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection(activitiesEndpoint, controller.signal).then(setActivities).catch((reason) => {
      if (reason.name !== 'AbortError') setError(reason.message)
    })
    return () => controller.abort()
  }, [])

  return <DataView eyebrow="TRAINING LOG" title="Activities" subtitle="Every session adds up." error={error}>
    <div className="table-wrap"><table><thead><tr><th>Athlete</th><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th></tr></thead><tbody>
      {activities.map((activity) => <tr key={activity._id}><td>{activity.userId?.name || activity.user?.name || activity.userId || 'Unknown athlete'}</td><td><span className="activity-mark">{activity.type}</span></td><td>{activity.durationMinutes} min</td><td>{activity.distanceMiles ? `${activity.distanceMiles} mi` : '—'}</td><td className="points">+{activity.points}</td></tr>)}
    </tbody></table>{!activities.length && !error && <EmptyState text="No activities logged yet." />}</div>
  </DataView>
}

function DataView({ eyebrow, title, subtitle, error, children }) {
  return <section className="data-view"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="intro">{subtitle}</p>{error ? <ErrorState message={error} /> : children}</section>
}
export function EmptyState({ text }) { return <p className="empty-state">{text}</p> }
export function ErrorState({ message }) { return <p className="error-state">{message}. Check that the API is running on port 8000.</p> }