import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
  ROLLBACK_VOTE_THREAD: 'ROLLBACK_VOTE_THREAD'
}

function receiveThreadsActionCreator (threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads
    }
  }
}

function addThreadActionCreator (thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread
    }
  }
}

function toggleVoteThreadActionCreator ({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      voteType
    }
  }
}

function rollbackVoteThreadActionCreator ({ threadId, upVotesBy, downVotesBy }) {
  return {
    type: ActionType.ROLLBACK_VOTE_THREAD,
    payload: {
      threadId,
      upVotesBy,
      downVotesBy
    }
  }
}

function asyncAddThread ({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const thread = await api.createThread({ title, body, category })
      dispatch(addThreadActionCreator(thread))
      return thread
    } catch (error) {
      alert(error.message)
      throw error
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncToggleVoteThread ({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState()
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk melakukan voting')
      return
    }

    const currentThread = threads.find((thread) => thread.id === threadId)
    if (!currentThread) {
      return
    }

    const previousUpVotesBy = [...currentThread.upVotesBy]
    const previousDownVotesBy = [...currentThread.downVotesBy]

    dispatch(
      toggleVoteThreadActionCreator({
        threadId,
        userId: authUser.id,
        voteType
      })
    )

    try {
      if (voteType === 1) {
        await api.upVoteThread(threadId)
      } else if (voteType === -1) {
        await api.downVoteThread(threadId)
      } else {
        await api.neutralizeThreadVote(threadId)
      }
    } catch (error) {
      alert(error.message)
      dispatch(
        rollbackVoteThreadActionCreator({
          threadId,
          upVotesBy: previousUpVotesBy,
          downVotesBy: previousDownVotesBy
        })
      )
    }
  }
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  rollbackVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleVoteThread
}
