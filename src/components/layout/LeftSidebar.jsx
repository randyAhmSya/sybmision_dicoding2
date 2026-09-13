import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  FaComments,
  FaHome,
  FaTrophy,
  FaSignInAlt,
  FaSignOutAlt,
  FaPlus
} from 'react-icons/fa'
import { asyncUnsetAuthUser } from '../../states/authUser/action'

function LeftSidebar () {
  const location = useLocation()
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authUser)

  function handleLogout () {
    dispatch(asyncUnsetAuthUser())
  }

  return (
    <aside className="left-sidebar">
      <div className="card">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <FaComments />
          </div>
          <span>Dicoding Forum</span>
        </Link>
      </div>

      <div className="card">
        <nav className="nav-menu">
          <Link
            to="/"
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            <FaHome />
            <span>Beranda</span>
          </Link>

          <Link
            to="/leaderboards"
            className={`nav-item ${location.pathname === '/leaderboards' ? 'active' : ''}`}
          >
            <FaTrophy />
            <span>Leaderboards</span>
          </Link>

          {authUser && (
            <Link
              to="/new"
              className={`nav-item ${location.pathname === '/new' ? 'active' : ''}`}
            >
              <FaPlus />
              <span>Buat Diskusi</span>
            </Link>
          )}
        </nav>
      </div>

      <div className="card">
        {authUser ? (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div className="user-profile-widget">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="user-avatar"
              />
              <div className="user-info">
                <span className="user-name">{authUser.name}</span>
                <span className="user-email">{authUser.email}</span>
              </div>
            </div>
            <button
              type="button"
              className="btn btn-outline btn-full btn-danger"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              <span>Keluar</span>
            </button>
          </div>
        ) : (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)'
              }}
            >
              Masuk untuk bergabung dalam diskusi dan memberikan vote.
            </p>
            <Link to="/login" className="btn btn-primary btn-full">
              <FaSignInAlt />
              <span>Masuk</span>
            </Link>
            <Link to="/register" className="btn btn-outline btn-full">
              <span>Daftar Akun</span>
            </Link>
          </div>
        )}
      </div>
    </aside>
  )
}

export default LeftSidebar
