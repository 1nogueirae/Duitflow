import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import './App.css'

import Home from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

import { Sidebar } from './components/Sidebar/Sidebar'


function App() {
  const location = useLocation()
  const navigate = useNavigate()

  const sidebarLocations = ['/home', '/dashboard']
  const showSidebar = sidebarLocations.includes(location.pathname)
  const authLocations = ['/login', '/register']
  const isAuthRoute = authLocations.includes(location.pathname)

  const isLoggedIn = Boolean(localStorage.getItem('token'))

  useEffect(() => {
    if (!isLoggedIn && !isAuthRoute) {
      navigate('/login', { replace: true })
    }

    if (isLoggedIn && isAuthRoute) {
      navigate('/home', { replace: true })
    }
  }, [isAuthRoute, isLoggedIn, location.pathname, navigate])

  if (isAuthRoute) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <div className="app">
      {showSidebar && <Sidebar />}

      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default App