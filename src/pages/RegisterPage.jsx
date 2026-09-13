import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaComments } from 'react-icons/fa'
import useInput from '../hooks/useInput'
import { asyncRegisterUser } from '../states/users/action'

function RegisterPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authUser)

  const [name, handleNameChange] = useInput('')
  const [email, handleEmailChange] = useInput('')
  const [password, handlePasswordChange] = useInput('')

  useEffect(() => {
    if (authUser) {
      navigate('/')
    }
  }, [authUser, navigate])

  async function handleSubmit (event) {
    event.preventDefault()

    if (password.length < 6) {
      alert('Password harus memiliki minimal 6 karakter!')
      return
    }

    try {
      await dispatch(asyncRegisterUser({ name, email, password }))
      alert('Pendaftaran akun berhasil! Silakan masuk dengan akun barumu.')
      navigate('/login')
    } catch {
      // Error is alerted in thunk
    }
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
          <h1 className="auth-title">Daftar Akun Baru</h1>
          <p className="auth-subtitle">
            Buat akun untuk bergabung dan berdiskusi di Dicoding Forum.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        >
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Nama Lengkap
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nama kamu"
              className="form-input"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>

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
            Daftar Sekarang
          </button>
        </form>

        <div className="auth-footer">
          Sudah punya akun?{' '}
          <Link to="/login" className="auth-link">
            Masuk di sini
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

export default RegisterPage
