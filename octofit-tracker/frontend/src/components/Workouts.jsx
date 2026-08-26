import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { EmptyState, ErrorState } from './Activities.jsx'

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchCollection(workoutsEndpoint, controller.signal).then(setWorkouts).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <section className="data-view"><div className="eyebrow">THE LIBRARY</div><h1>Workouts</h1><p className="intro">A good plan makes showing up easier.</p>{error ? <ErrorState message={error} /> : <div className="card-grid workout-grid">{workouts.map((workout) => <article className="info-card" key={workout._id}><div className="workout-top"><span className="difficulty">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.title}</h2><p>{workout.description}</p><div className="card-meta"><span>Focus</span><strong>{workout.activityType}</strong></div></article>)}{!workouts.length && !error && <EmptyState text="No workouts available." />}</div>}</section>
}