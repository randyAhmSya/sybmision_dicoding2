import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaTrophy, FaFire, FaTags } from 'react-icons/fa'
import {
  setFilterCategoryActionCreator,
  clearFilterCategoryActionCreator
} from '../../states/filterCategory/action'

function RightSidebar () {
  const dispatch = useDispatch()
  const threads = useSelector((state) => state.threads)
  const leaderboards = useSelector((state) => state.leaderboards)
  const filterCategory = useSelector((state) => state.filterCategory)

  // Extract unique categories
  const categories = Array.from(
    new Set(threads.map((thread) => thread.category).filter(Boolean))
  )

  const topUsers = leaderboards.slice(0, 5)

  function handleCategoryClick (category) {
    if (filterCategory === category) {
      dispatch(clearFilterCategoryActionCreator())
    } else {
      dispatch(setFilterCategoryActionCreator(category))
    }
  }

  return (
    <aside className="right-sidebar">
      {/* Kategori Populer */}
      <div className="card">
        <h3
          style={{
            fontSize: '0.95rem',
            fontWeight: 700,
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FaTags style={{ color: 'var(--color-text-secondary)' }} />
          <span>Kategori Populer</span>
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            type="button"
            className={`category-chip ${filterCategory === '' ? 'active' : ''}`}
            onClick={() => dispatch(clearFilterCategoryActionCreator())}
          >
            #Semua
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

      {/* Top 5 Klasemen Pengguna */}
      <div className="card">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '14px'
          }}
        >
          <h3
            style={{
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FaTrophy style={{ color: '#F59E0B' }} />
            <span>Top Pengguna</span>
          </h3>
          <Link
            to="/leaderboards"
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-text-secondary)'
            }}
          >
            Lihat Semua
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {topUsers.length === 0 ? (
            <p
              style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}
            >
              Belum ada data peringkat.
            </p>
          ) : (
            topUsers.map(({ user, score }, index) => (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 0',
                  borderBottom:
                    index < topUsers.length - 1
                      ? '1px solid var(--color-border)'
                      : 'none'
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      width: '20px',
                      color:
                        index === 0
                          ? '#D97706'
                          : index === 1
                            ? '#4B5563'
                            : index === 2
                              ? '#EA580C'
                              : 'var(--color-text-muted)'
                    }}
                  >
                    #{index + 1}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {user.name}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                >
                  <FaFire style={{ color: '#EF4444', fontSize: '0.8rem' }} />
                  <span>{score}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  )
}

export default RightSidebar
