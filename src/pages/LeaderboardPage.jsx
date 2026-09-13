import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FaTrophy, FaFire } from 'react-icons/fa'
import { asyncReceiveLeaderboards } from '../states/leaderboards/action'

function LeaderboardPage () {
  const dispatch = useDispatch()
  const leaderboards = useSelector((state) => state.leaderboards)

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards())
  }, [dispatch])

  const maxScore =
    leaderboards.length > 0
      ? Math.max(...leaderboards.map((item) => item.score), 1)
      : 100

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div
        className="card"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '24px'
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#FEF3C7',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}
        >
          <FaTrophy />
        </div>
        <div>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800 }}>
            Klasemen Pengguna Aktif
          </h1>
          <p
            style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)' }}
          >
            Daftar kontributor dengan interaksi dan skor tertinggi dalam
            komunitas Dicoding Forum.
          </p>
        </div>
      </div>

      <div className="leaderboard-list">
        {leaderboards.length === 0 ? (
          <div className="empty-state">
            <p>Memuat data klasemen...</p>
          </div>
        ) : (
          leaderboards.map(({ user, score }, index) => {
            const percentage = Math.round((score / maxScore) * 100)
            const isTop1 = index === 0
            const isTop2 = index === 1
            const isTop3 = index === 2

            return (
              <div
                key={user.id}
                className="card"
                style={{
                  padding: '16px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  borderColor: isTop1
                    ? '#FDE68A'
                    : isTop2
                      ? '#E5E7EB'
                      : isTop3
                        ? '#FED7AA'
                        : 'var(--color-border)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div className="leaderboard-user">
                    <div
                      className={`rank-badge ${isTop1 ? 'rank-1' : isTop2 ? 'rank-2' : isTop3 ? 'rank-3' : ''}`}
                    >
                      {index + 1}
                    </div>
                    <img
                      src={user.avatar}
                      alt={user.name}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid var(--color-border)'
                      }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {user.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--color-text-muted)'
                        }}
                      >
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <div className="score-badge">
                    <FaFire style={{ color: '#EF4444' }} />
                    <span>{score} poin</span>
                  </div>
                </div>

                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'var(--color-bg-hover)',
                    borderRadius: '999px',
                    overflow: 'hidden'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${percentage}%`,
                      backgroundColor: isTop1
                        ? '#F59E0B'
                        : 'var(--color-primary)',
                      borderRadius: '999px',
                      transition: 'width 0.4s ease'
                    }}
                  />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default LeaderboardPage
