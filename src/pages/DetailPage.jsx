import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import parse from 'html-react-parser'
import { FaArrowLeft } from 'react-icons/fa'
import {
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteComment
} from '../states/detailThread/action'
import VoteButtons from '../components/common/VoteButtons'
import CommentInput from '../components/comments/CommentInput'
import CommentList from '../components/comments/CommentList'
import { postedAt } from '../utils/date'

function DetailPage () {
  const { id } = useParams()
  const dispatch = useDispatch()
  const detailThread = useSelector((state) => state.detailThread)
  const authUser = useSelector((state) => state.authUser)

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id))
  }, [id, dispatch])

  if (!detailThread) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Memuat diskusi...</p>
      </div>
    )
  }

  function handleThreadUpVote () {
    dispatch(asyncToggleVoteDetailThread(1))
  }

  function handleThreadDownVote () {
    dispatch(asyncToggleVoteDetailThread(-1))
  }

  function handleThreadNeutralVote () {
    dispatch(asyncToggleVoteDetailThread(0))
  }

  function handleCommentUpVote (commentId) {
    dispatch(asyncToggleVoteComment({ commentId, voteType: 1 }))
  }

  function handleCommentDownVote (commentId) {
    dispatch(asyncToggleVoteComment({ commentId, voteType: -1 }))
  }

  function handleCommentNeutralVote (commentId) {
    dispatch(asyncToggleVoteComment({ commentId, voteType: 0 }))
  }

  function handleAddComment (content) {
    dispatch(asyncAddComment({ threadId: id, content }))
  }

  const authorName = detailThread.owner
    ? detailThread.owner.name
    : 'Pengguna Anonim'
  const authorAvatar = detailThread.owner
    ? detailThread.owner.avatar
    : 'https://ui-avatars.com/api/?name=User'

  return (
    <div className="detail-thread-container">
      <Link
        to="/"
        className="btn btn-outline"
        style={{ width: 'fit-content', padding: '8px 14px' }}
      >
        <FaArrowLeft />
        <span>Kembali ke Diskusi</span>
      </Link>

      <article
        className="card"
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      >
        <div className="thread-header">
          <div className="thread-author">
            <img
              src={authorAvatar}
              alt={authorName}
              className="author-avatar"
            />
            <div>
              <span className="author-name">{authorName}</span>
              <span
                style={{ margin: '0 6px', color: 'var(--color-text-muted)' }}
              >
                •
              </span>
              <time className="thread-time">
                {postedAt(detailThread.createdAt)}
              </time>
            </div>
          </div>

          {detailThread.category && (
            <span className="thread-category-badge">
              #{detailThread.category}
            </span>
          )}
        </div>

        <h1 style={{ fontSize: '1.45rem', fontWeight: 800, lineHeight: 1.3 }}>
          {detailThread.title}
        </h1>

        <div className="detail-body">{parse(detailThread.body)}</div>

        <div className="thread-footer">
          <VoteButtons
            upVotesBy={detailThread.upVotesBy}
            downVotesBy={detailThread.downVotesBy}
            authUserId={authUser ? authUser.id : null}
            onUpVote={handleThreadUpVote}
            onDownVote={handleThreadDownVote}
            onNeutralVote={handleThreadNeutralVote}
          />
        </div>
      </article>

      {/* Comment Form */}
      <CommentInput
        onAddComment={handleAddComment}
        authUserId={authUser ? authUser.id : null}
      />

      {/* Comments List */}
      <CommentList
        comments={detailThread.comments}
        authUserId={authUser ? authUser.id : null}
        onUpVote={handleCommentUpVote}
        onDownVote={handleCommentDownVote}
        onNeutralVote={handleCommentNeutralVote}
      />
    </div>
  )
}

export default DetailPage
