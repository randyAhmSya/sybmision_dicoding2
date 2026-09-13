import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown
} from 'react-icons/fa'

function VoteButtons ({
  upVotesBy = [],
  downVotesBy = [],
  authUserId,
  onUpVote,
  onDownVote,
  onNeutralVote
}) {
  const isUpvoted = authUserId ? upVotesBy.includes(authUserId) : false
  const isDownvoted = authUserId ? downVotesBy.includes(authUserId) : false

  function handleUpVoteClick (event) {
    event.stopPropagation()
    if (!authUserId) {
      alert('Silakan login terlebih dahulu untuk melakukan vote')
      return
    }

    if (isUpvoted) {
      onNeutralVote()
    } else {
      onUpVote()
    }
  }

  function handleDownVoteClick (event) {
    event.stopPropagation()
    if (!authUserId) {
      alert('Silakan login terlebih dahulu untuk melakukan vote')
      return
    }

    if (isDownvoted) {
      onNeutralVote()
    } else {
      onDownVote()
    }
  }

  return (
    <div className="vote-buttons-container">
      <button
        type="button"
        className={`vote-btn ${isUpvoted ? 'upvoted' : ''}`}
        onClick={handleUpVoteClick}
        aria-label="Upvote"
      >
        {isUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
        <span>{upVotesBy.length}</span>
      </button>

      <button
        type="button"
        className={`vote-btn ${isDownvoted ? 'downvoted' : ''}`}
        onClick={handleDownVoteClick}
        aria-label="Downvote"
      >
        {isDownvoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  )
}

export default VoteButtons
