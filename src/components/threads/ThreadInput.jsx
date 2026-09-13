import useInput from '../../hooks/useInput'

function ThreadInput ({ onAddThread }) {
  const [title, handleTitleChange, , resetTitle] = useInput('')
  const [category, handleCategoryChange, , resetCategory] = useInput('')
  const [body, handleBodyChange, , resetBody] = useInput('')

  function handleSubmit (event) {
    event.preventDefault()
    if (!title.trim() || !body.trim()) {
      alert('Judul dan isi diskusi tidak boleh kosong!')
      return
    }

    onAddThread({
      title: title.trim(),
      category: category.trim(),
      body: body.trim()
    })

    resetTitle()
    resetCategory()
    resetBody()
  }

  return (
    <form
      className="card"
      onSubmit={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
    >
      <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
        Buat Diskusi Baru
      </h3>

      <div className="form-group">
        <label htmlFor="title" className="form-label">
          Judul
        </label>
        <input
          id="title"
          type="text"
          placeholder="Apa yang ingin kamu diskusikan?"
          className="form-input"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category" className="form-label">
          Kategori (opsional)
        </label>
        <input
          id="category"
          type="text"
          placeholder="contoh: react, redux, web"
          className="form-input"
          value={category}
          onChange={handleCategoryChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="body" className="form-label">
          Isi Diskusi
        </label>
        <textarea
          id="body"
          placeholder="Tuliskan detail pertanyaan atau topik diskusimu..."
          className="form-input form-textarea"
          value={body}
          onChange={handleBodyChange}
          required
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn btn-primary">
          Publikasikan Diskusi
        </button>
      </div>
    </form>
  )
}

export default ThreadInput
