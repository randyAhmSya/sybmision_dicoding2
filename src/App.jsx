import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { asyncPreloadProcess } from './states/isPreload/action'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import LeaderboardPage from './pages/LeaderboardPage'
import CreateThreadPage from './pages/CreateThreadPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App () {
  const isPreload = useSelector((state) => state.isPreload)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  if (isPreload) {
    return (
      <div className="loading-center" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
        <p style={{ fontWeight: 600 }}>Memuat Dicoding Forum...</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/"
        element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        }
      />
      <Route
        path="/threads/:id"
        element={
          <AppLayout>
            <DetailPage />
          </AppLayout>
        }
      />
      <Route
        path="/leaderboards"
        element={
          <AppLayout>
            <LeaderboardPage />
          </AppLayout>
        }
      />
      <Route
        path="/new"
        element={
          <AppLayout>
            <CreateThreadPage />
          </AppLayout>
        }
      />
      <Route
        path="*"
        element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        }
      />
    </Routes>
  )
}

export default App
