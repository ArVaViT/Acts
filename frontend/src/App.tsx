import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import HomePage from './pages/Home/HomePage'
import Dashboard from './pages/Dashboard/Dashboard'
import CourseDetail from './pages/Course/CourseDetail'
import ModuleView from './pages/Course/ModuleView'
import Header from './components/layout/Header'
import { authService } from './services/auth'
import type { User } from './types'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUser = async () => {
      if (authService.isAuthenticated()) {
        try {
          const currentUser = await authService.getCurrentUser()
          setUser(currentUser)
        } catch (error) {
          authService.logout()
        }
      }
      setLoading(false)
    }
    loadUser()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Загрузка...</div>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header user={user} setUser={setUser} />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard user={user} />
                </PrivateRoute>
              }
            />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/:courseId/modules/:moduleId" element={<ModuleView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App

