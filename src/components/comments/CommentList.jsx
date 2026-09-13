import CommentItem from './CommentItem'

function CommentList ({
  comments = [],
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralVote
}) {
  return (
    <div className="comments-section">
      <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
        Komentar ({comments.length})
      </h3>

      {comments.length === 0 ? (
        <div className="empty-state" style={{ padding: '24px' }}>
          <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              authUserId={authUserId}
              onUpVote={onUpVote}
              onDownVote={onDownVote}
              onNeutralVote={onNeutralVote}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentList
