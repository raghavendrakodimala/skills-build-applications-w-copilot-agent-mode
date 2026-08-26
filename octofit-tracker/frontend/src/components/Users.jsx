import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { EmptyState, ErrorState } from './Activities.jsx'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { const controller = new AbortController(); fetchCollection(usersEndpoint, controller.signal).then(setUsers).catch((reason) => { if (reason.name !== 'AbortError') setError(reason.message) }); return () => controller.abort() }, [])
  return <section className="data-view"><div className="eyebrow">THE ROSTER</div><h1>Athletes</h1><p className="intro">Meet the people putting in the work.</p>{error ? <ErrorState message={error} /> : <div className="roster-list">{users.map((user) => <article className="roster-row" key={user._id}><span className="avatar">{user.name?.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span><div><h2>{user.name}</h2><p>{user.email}</p></div><span className="grade">Grade {user.grade || '—'}</span></article>)}{!users.length && !error && <EmptyState text="No athletes found." />}</div>}</section>
}