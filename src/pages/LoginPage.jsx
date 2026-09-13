import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaComments } from 'react-icons/fa'
import useInput from '../hooks/useInput'
import { asyncSetAuthUser } from '../states/authUser/action'

function LoginPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authUser)

  const [email, handleEmailChange] = useInput('')
  const [password, handlePasswordChange] = useInput('')

  useEffect(() => {
    if (authUser) {
      navigate('/')
    }
  }, [authUser, navigate])

  async function handleSubmit (event) {
    event.preventDefault()
    try {
      await dispatch(asyncSetAuthUser({ email, password }))
      navigate('/')
    } catch {}
  }

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <div
            className="brand-icon"
            style={{ width: '42px', height: '42px', fontSize: '1.4rem' }}
          >
            <FaComments />
          </div>
          <h1 className="auth-title">Masuk ke Akun</h1>
          <p className="auth-subtitle">
            Selamat datang kembali! Silakan masuk ke akun Dicoding Forum kamu.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="nama@email.com"
              className="form-input"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Minimal 6 karakter"
              className="form-input"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            style={{ marginTop: '8px' }}
          >
            Masuk
          </button>
        </form>

        <div className="auth-footer">
          Belum punya akun?{' '}
          <Link to="/register" className="auth-link">
            Daftar sekarang
          </Link>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link
            to="/"
            style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
