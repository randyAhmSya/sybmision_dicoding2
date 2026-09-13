import { ActionType } from './action'

function detailThreadReducer (detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread
    case ActionType.CLEAR_DETAIL_THREAD:
      return null
    case ActionType.ADD_COMMENT:
      if (!detailThread) {
        return detailThread
      }
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments]
      }
    case ActionType.TOGGLE_VOTE_DETAIL_THREAD: {
      if (!detailThread) {
        return detailThread
      }
      const { userId, voteType } = action.payload
      const hasUpVoted = detailThread.upVotesBy.includes(userId)
      const hasDownVoted = detailThread.downVotesBy.includes(userId)

      let newUpVotesBy = [...detailThread.upVotesBy]
      let newDownVotesBy = [...detailThread.downVotesBy]

      if (voteType === 1) {
        if (!hasUpVoted) {
          newUpVotesBy.push(userId)
        }
        newDownVotesBy = newDownVotesBy.filter((id) => id !== userId)
      } else if (voteType === -1) {
        if (!hasDownVoted) {
          newDownVotesBy.push(userId)
        }
        newUpVotesBy = newUpVotesBy.filter((id) => id !== userId)
      } else {
        newUpVotesBy = newUpVotesBy.filter((id) => id !== userId)
        newDownVotesBy = newDownVotesBy.filter((id) => id !== userId)
      }

      return {
        ...detailThread,
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy
      }
    }
    case ActionType.ROLLBACK_VOTE_DETAIL_THREAD:
      if (!detailThread) {
        return detailThread
      }
      return {
        ...detailThread,
        upVotesBy: action.payload.upVotesBy,
        downVotesBy: action.payload.downVotesBy
      }
    case ActionType.TOGGLE_VOTE_COMMENT: {
      if (!detailThread) {
        return detailThread
      }
      const { commentId, userId, voteType } = action.payload
      const updatedComments = detailThread.comments.map((comment) => {
        if (comment.id === commentId) {
          const hasUpVoted = comment.upVotesBy.includes(userId)
          const hasDownVoted = comment.downVotesBy.includes(userId)

          let newUpVotesBy = [...comment.upVotesBy]
          let newDownVotesBy = [...comment.downVotesBy]

          if (voteType === 1) {
            if (!hasUpVoted) {
              newUpVotesBy.push(userId)
            }
            newDownVotesBy = newDownVotesBy.filter((id) => id !== userId)
          } else if (voteType === -1) {
            if (!hasDownVoted) {
              newDownVotesBy.push(userId)
            }
            newUpVotesBy = newUpVotesBy.filter((id) => id !== userId)
          } else {
            newUpVotesBy = newUpVotesBy.filter((id) => id !== userId)
            newDownVotesBy = newDownVotesBy.filter((id) => id !== userId)
          }

          return {
            ...comment,
            upVotesBy: newUpVotesBy,
            downVotesBy: newDownVotesBy
          }
        }
        return comment
      })

      return {
        ...detailThread,
        comments: updatedComments
      }
    }
    case ActionType.ROLLBACK_VOTE_COMMENT: {
      if (!detailThread) {
        return detailThread
      }
      const { commentId, upVotesBy, downVotesBy } = action.payload
      const restoredComments = detailThread.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            upVotesBy,
            downVotesBy
          }
        }
        return comment
      })

      return {
        ...detailThread,
        comments: restoredComments
      }
    }
    default:
      return detailThread
  }
}

export default detailThreadReducer
