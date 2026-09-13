import { ActionType } from './action'

function threadsReducer (threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads]
    case ActionType.TOGGLE_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          const { userId, voteType } = action.payload
          const hasUpVoted = thread.upVotesBy.includes(userId)
          const hasDownVoted = thread.downVotesBy.includes(userId)

          let newUpVotesBy = [...thread.upVotesBy]
          let newDownVotesBy = [...thread.downVotesBy]

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
            ...thread,
            upVotesBy: newUpVotesBy,
            downVotesBy: newDownVotesBy
          }
        }
        return thread
      })
    case ActionType.ROLLBACK_VOTE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: action.payload.upVotesBy,
            downVotesBy: action.payload.downVotesBy
          }
        }
        return thread
      })
    default:
      return threads
  }
}

export default threadsReducer
