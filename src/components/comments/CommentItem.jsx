import parse from 'html-react-parser'
import VoteButtons from '../common/VoteButtons'
import { postedAt } from '../../utils/date'

function CommentItem ({
  comment,
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralVote
}) {
  const authorName = comment.owner ? comment.owner.name : 'Pengguna Anonim'
  const authorAvatar = comment.owner
    ? comment.owner.avatar
    : 'https://ui-avatars.com/api/?name=User'

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img
            src={authorAvatar}
            alt={authorName}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '1px solid var(--color-border)'
            }}
          />
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>
            {authorName}
          </span>
          <span
            style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}
          >
            •
          </span>
          <span
            style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}
          >
            {postedAt(comment.createdAt)}
          </span>
        </div>

        <VoteButtons
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
          authUserId={authUserId}
          onUpVote={() => onUpVote(comment.id)}
          onDownVote={() => onDownVote(comment.id)}
          onNeutralVote={() => onNeutralVote(comment.id)}
        />
      </div>

      <div className="comment-content">{parse(comment.content)}</div>
    </div>
  )
}

export default CommentItem
