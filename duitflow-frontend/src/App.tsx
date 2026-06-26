import { Routes, Route } from 'react-router-dom'

import './App.css'

import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
// import Settings from './pages/Settings/Settings'

import { Sidebar } from './components/Sidebar/Sidebar'

function App() {
  return (
    <div className="app">
      <Sidebar />

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default App