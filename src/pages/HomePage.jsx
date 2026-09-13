import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { asyncPopulateUsersAndThreads } from '../states/shared/action'
import { asyncReceiveLeaderboards } from '../states/leaderboards/action'
import {
  asyncToggleVoteThread,
  asyncAddThread
} from '../states/threads/action'
import {
  setFilterCategoryActionCreator,
  clearFilterCategoryActionCreator
} from '../states/filterCategory/action'
import ThreadList from '../components/threads/ThreadList'
import ThreadInput from '../components/threads/ThreadInput'

function HomePage () {
  const dispatch = useDispatch()
  const threads = useSelector((state) => state.threads)
  const users = useSelector((state) => state.users)
  const filterCategory = useSelector((state) => state.filterCategory)
  const authUser = useSelector((state) => state.authUser)

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads())
    dispatch(asyncReceiveLeaderboards())
  }, [dispatch])

  const categories = Array.from(
    new Set(threads.map((thread) => thread.category).filter(Boolean))
  )

  const filteredThreads = filterCategory
    ? threads.filter((thread) => thread.category === filterCategory)
    : threads

  function handleCategoryClick (category) {
    if (filterCategory === category) {
      dispatch(clearFilterCategoryActionCreator())
    } else {
      dispatch(setFilterCategoryActionCreator(category))
    }
  }

  function handleUpVote (threadId) {
    dispatch(asyncToggleVoteThread({ threadId, voteType: 1 }))
  }

  function handleDownVote (threadId) {
    dispatch(asyncToggleVoteThread({ threadId, voteType: -1 }))
  }

  function handleNeutralVote (threadId) {
    dispatch(asyncToggleVoteThread({ threadId, voteType: 0 }))
  }

  function handleAddThread (data) {
    dispatch(asyncAddThread(data))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card" style={{ padding: '14px 18px' }}>
        <div className="category-filter-section">
          <button
            type="button"
            className={`category-chip ${filterCategory === '' ? 'active' : ''}`}
            onClick={() => dispatch(clearFilterCategoryActionCreator())}
          >
            Semua Diskusi
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`category-chip ${filterCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              #{category}
            </button>
          ))}
        </div>
      </div>

      {authUser ? (
        <ThreadInput onAddThread={handleAddThread} />
      ) : (
        <div
          className="card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px'
          }}
        >
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>
              Punya pertanyaan atau topik menarik?
            </h3>
            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)'
              }}
            >
              Masuk untuk membuat diskusi baru dan berinteraksi dengan
              komunitas.
            </p>
          </div>
          <Link to="/login" className="btn btn-primary">
            <FaPlus />
            <span>Buat Diskusi</span>
          </Link>
        </div>
      )}

      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}
        >
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
            {filterCategory ? `Kategori #${filterCategory}` : 'Diskusi Terbaru'}
          </h2>
          <span
            style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}
          >
            {filteredThreads.length} diskusi
          </span>
        </div>

        <ThreadList
          threads={filteredThreads}
          users={users}
          authUserId={authUser ? authUser.id : null}
          onUpVote={handleUpVote}
          onDownVote={handleDownVote}
          onNeutralVote={handleNeutralVote}
        />
      </div>
    </div>
  )
}

export default HomePage
