import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput'

function CommentInput ({ onAddComment, authUserId }) {
  const [content, handleContentChange, , resetContent] = useInput('')

  function handleSubmit (event) {
    event.preventDefault()
    if (!content.trim()) {
      alert('Komentar tidak boleh kosong!')
      return
    }

    onAddComment(content.trim())
    resetContent()
  }

  if (!authUserId) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: '0.9rem',
            marginBottom: '12px'
          }}
        >
          Silakan masuk terlebih dahulu untuk menulis komentar.
        </p>
        <Link to="/login" className="btn btn-primary">
          Masuk untuk Berkomentar
        </Link>
      </div>
    )
  }

  return (
    <form
      className="card"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
    >
      <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Tulis Komentar</h3>

      <div className="form-group">
        <textarea
          placeholder="Tuliskan tanggapan atau pendapatmu..."
          className="form-input form-textarea"
          style={{ minHeight: '80px' }}
          value={content}
          onChange={handleContentChange}
          required
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-primary">
          Kirim Komentar
        </button>
      </div>
    </form>
  )
}

export default CommentInput
