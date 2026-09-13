import { Link } from 'react-router-dom'
import parse from 'html-react-parser'
import { FaRegComment } from 'react-icons/fa'
import VoteButtons from '../common/VoteButtons'
import { postedAt } from '../../utils/date'

function ThreadItem ({
  thread,
  user,
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralVote
}) {
  const authorName = user ? user.name : 'Pengguna Anonim'
  const authorAvatar = user
    ? user.avatar
    : 'https://ui-avatars.com/api/?name=User'

  return (
    <article className="thread-item">
      <div className="thread-header">
        <div className="thread-author">
          <img src={authorAvatar} alt={authorName} className="author-avatar" />
          <div>
            <span className="author-name">{authorName}</span>
            <span style={{ margin: '0 6px', color: 'var(--color-text-muted)' }}>
              •
            </span>
            <time className="thread-time">{postedAt(thread.createdAt)}</time>
          </div>
        </div>

        {thread.category && (
          <span className="thread-category-badge">#{thread.category}</span>
        )}
      </div>

      <Link to={`/threads/${thread.id}`} className="thread-title">
        {thread.title}
      </Link>

      <div className="thread-body">{parse(thread.body)}</div>

      <div className="thread-footer">
        <div className="thread-actions">
          <VoteButtons
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            authUserId={authUserId}
            onUpVote={() => onUpVote(thread.id)}
            onDownVote={() => onDownVote(thread.id)}
            onNeutralVote={() => onNeutralVote(thread.id)}
          />

          <Link to={`/threads/${thread.id}`} className="comment-count-btn">
            <FaRegComment />
            <span>{thread.totalComments} komentar</span>
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ThreadItem
