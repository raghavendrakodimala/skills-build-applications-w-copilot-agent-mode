import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { EmptyState, ErrorState } from './Activities.jsx'

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchCollection(leaderboardEndpoint, controller.signal).then(setLeaders).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <section className="data-view"><div className="eyebrow">SEASON SCOREBOARD</div><h1>Leaderboard</h1><p className="intro">Small wins. Serious momentum.</p>{error ? <ErrorState message={error} /> : <div className="leader-list">{leaders.map((leader, index) => <div className={`leader-row rank-${index + 1}`} key={leader.userId || leader._id || index}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span className="leader-name">{leader.name || leader.user?.name || 'Unknown athlete'}</span><span className="leader-activities">{leader.activities || leader.activityCount || 0} sessions</span><strong>{leader.points || 0}<small> pts</small></strong></div>)}{!leaders.length && !error && <EmptyState text="No scores yet. Be the first to move." />}</div>}</section>
}