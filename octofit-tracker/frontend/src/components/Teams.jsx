import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { EmptyState, ErrorState } from './Activities.jsx'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchCollection(teamsEndpoint, controller.signal).then(setTeams).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <section className="data-view"><div className="eyebrow">YOUR CREW</div><h1>Teams</h1><p className="intro">Better together, by design.</p>{error ? <ErrorState message={error} /> : <div className="card-grid">{teams.map((team) => <article className="info-card" key={team._id}><span className="card-kicker">TEAM</span><h2>{team.name}</h2><p>{team.motto || 'Keep moving forward.'}</p><div className="card-meta"><span>Captain</span><strong>{team.captainId?.name || team.captain?.name || team.captainId || '—'}</strong><span>{team.memberIds?.length || team.members?.length || 0} members</span></div></article>)}{!teams.length && !error && <EmptyState text="No teams have been created yet." />}</div>}</section>
}