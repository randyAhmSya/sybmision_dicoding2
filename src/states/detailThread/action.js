import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_VOTE_DETAIL_THREAD: 'TOGGLE_VOTE_DETAIL_THREAD',
  ROLLBACK_VOTE_DETAIL_THREAD: 'ROLLBACK_VOTE_DETAIL_THREAD',
  TOGGLE_VOTE_COMMENT: 'TOGGLE_VOTE_COMMENT',
  ROLLBACK_VOTE_COMMENT: 'ROLLBACK_VOTE_COMMENT'
}

function receiveDetailThreadActionCreator (detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread
    }
  }
}

function clearDetailThreadActionCreator () {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD
  }
}

function addCommentActionCreator (comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment
    }
  }
}

function toggleVoteDetailThreadActionCreator ({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
    payload: {
      userId,
      voteType
    }
  }
}

function rollbackVoteDetailThreadActionCreator ({ upVotesBy, downVotesBy }) {
  return {
    type: ActionType.ROLLBACK_VOTE_DETAIL_THREAD,
    payload: {
      upVotesBy,
      downVotesBy
    }
  }
}

function toggleVoteCommentActionCreator ({ commentId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
      voteType
    }
  }
}

function rollbackVoteCommentActionCreator ({
  commentId,
  upVotesBy,
  downVotesBy
}) {
  return {
    type: ActionType.ROLLBACK_VOTE_COMMENT,
    payload: {
      commentId,
      upVotesBy,
      downVotesBy
    }
  }
}

function asyncReceiveDetailThread (threadId) {
  return async (dispatch) => {
    dispatch(showLoading())
    dispatch(clearDetailThreadActionCreator())
    try {
      const detailThread = await api.getThreadDetail(threadId)
      dispatch(receiveDetailThreadActionCreator(detailThread))
    } catch (error) {
      alert(error.message)
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncAddComment ({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading())
    try {
      const comment = await api.createComment({ threadId, content })
      dispatch(addCommentActionCreator(comment))
      return comment
    } catch (error) {
      alert(error.message)
      throw error
    } finally {
      dispatch(hideLoading())
    }
  }
}

function asyncToggleVoteDetailThread (voteType) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk melakukan voting')
      return
    }

    if (!detailThread) {
      return
    }

    const previousUpVotesBy = [...detailThread.upVotesBy]
    const previousDownVotesBy = [...detailThread.downVotesBy]

    dispatch(
      toggleVoteDetailThreadActionCreator({
        userId: authUser.id,
        voteType
      })
    )

    try {
      if (voteType === 1) {
        await api.upVoteThread(detailThread.id)
      } else if (voteType === -1) {
        await api.downVoteThread(detailThread.id)
      } else {
        await api.neutralizeThreadVote(detailThread.id)
      }
    } catch (error) {
      alert(error.message)
      dispatch(
        rollbackVoteDetailThreadActionCreator({
          upVotesBy: previousUpVotesBy,
          downVotesBy: previousDownVotesBy
        })
      )
    }
  }
}

function asyncToggleVoteComment ({ commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState()
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk melakukan voting')
      return
    }

    if (!detailThread) {
      return
    }

    const targetComment = detailThread.comments.find(
      (comment) => comment.id === commentId
    )
    if (!targetComment) {
      return
    }

    const previousUpVotesBy = [...targetComment.upVotesBy]
    const previousDownVotesBy = [...targetComment.downVotesBy]

    dispatch(
      toggleVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
        voteType
      })
    )

    try {
      if (voteType === 1) {
        await api.upVoteComment({ threadId: detailThread.id, commentId })
      } else if (voteType === -1) {
        await api.downVoteComment({ threadId: detailThread.id, commentId })
      } else {
        await api.neutralizeCommentVote({
          threadId: detailThread.id,
          commentId
        })
      }
    } catch (error) {
      alert(error.message)
      dispatch(
        rollbackVoteCommentActionCreator({
          commentId,
          upVotesBy: previousUpVotesBy,
          downVotesBy: previousDownVotesBy
        })
      )
    }
  }
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
  toggleVoteDetailThreadActionCreator,
  rollbackVoteDetailThreadActionCreator,
  toggleVoteCommentActionCreator,
  rollbackVoteCommentActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteComment
}
