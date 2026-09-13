import ThreadItem from './ThreadItem'

function ThreadList ({
  threads = [],
  users = [],
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralVote
}) {
  if (threads.length === 0) {
    return (
      <div className="empty-state">
        <p>Tidak ada diskusi yang ditemukan dalam kategori ini.</p>
      </div>
    )
  }

  // Create a map for quick user lookup
  const userMap = users.reduce((acc, user) => {
    acc[user.id] = user
    return acc
  }, {})

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          thread={thread}
          user={userMap[thread.ownerId]}
          authUserId={authUserId}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          onNeutralVote={onNeutralVote}
        />
      ))}
    </div>
  )
}

export default ThreadList
