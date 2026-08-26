import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="topbar">
          <NavLink className="brand" to="/">
            <img src="/octofitapp-small.png" alt="OctoFit logo" />
            <span>OctoFit <em>Tracker</em></span>
          </NavLink>
          <nav className="main-nav" aria-label="Primary navigation">
            <NavLink to="/activities">Activities</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
            <NavLink to="/teams">Teams</NavLink>
            <NavLink to="/users">Athletes</NavLink>
            <NavLink to="/workouts">Workouts</NavLink>
          </nav>
          <span className="status-dot">Live API</span>
        </header>
        <main className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <section className="home-view">
      <div className="eyebrow">OCTOFIT / COMMAND CENTER</div>
      <h1>Move with purpose.</h1>
      <p className="intro">A clear view of your team&apos;s momentum, one session at a time.</p>
      <div className="home-grid">
        <NavLink className="feature-tile feature-tile--green" to="/activities">
          <span className="tile-number">01</span><strong>Log activity</strong><span>Track today&apos;s effort →</span>
        </NavLink>
        <NavLink className="feature-tile feature-tile--yellow" to="/leaderboard">
          <span className="tile-number">02</span><strong>See the climb</strong><span>Open the leaderboard →</span>
        </NavLink>
        <NavLink className="feature-tile feature-tile--coral" to="/workouts">
          <span className="tile-number">03</span><strong>Find your next</strong><span>Browse workouts →</span>
        </NavLink>
      </div>
    </section>
  )
}

export default App
