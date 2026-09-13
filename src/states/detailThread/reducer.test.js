import detailThreadReducer from './reducer'
import { ActionType } from './action'

describe('detailThreadReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null
    const action = { type: 'UNKNOWN' }

    // action
    const nextState = detailThreadReducer(initialState, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it('should return the detailThread when given by RECEIVE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = null
    const action = {
      type: ActionType.RECEIVE_DETAIL_THREAD,
      payload: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Satu',
          body: 'Isi Thread Satu',
          category: 'react',
          createdAt: '2023-01-01T00:00:00.000Z',
          owner: {
            id: 'user-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg'
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: []
        }
      }
    }

    // action
    const nextState = detailThreadReducer(initialState, action)

    // assert
    expect(nextState).toEqual(action.payload.detailThread)
  })

  it('should return null when given by CLEAR_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Satu',
      comments: []
    }
    const action = {
      type: ActionType.CLEAR_DETAIL_THREAD
    }

    // action
    const nextState = detailThreadReducer(initialState, action)

    // assert
    expect(nextState).toBeNull()
  })

  it('should return detailThread with the new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Satu',
      comments: []
    }
    const newComment = {
      id: 'comment-1',
      content: 'Ini komentar baru',
      createdAt: '2023-01-01T01:00:00.000Z',
      upVotesBy: [],
      downVotesBy: [],
      owner: {
        id: 'user-2',
        name: 'Jane Doe',
        avatar: 'https://generated-image-url.jpg'
      }
    }
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment
      }
    }

    // action
    const nextState = detailThreadReducer(initialState, action)

    // assert
    expect(nextState.comments).toEqual([newComment])
  })

  it('should handle UPVOTE_DETAIL_THREAD (TOGGLE_VOTE_DETAIL_THREAD with voteType: 1)', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Satu',
      upVotesBy: [],
      downVotesBy: ['user-1'],
      comments: []
    }
    const action = {
      type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'user-1',
        voteType: 1
      }
    }

    // action
    const nextState = detailThreadReducer(initialState, action)

    // assert
    expect(nextState.upVotesBy).toContain('user-1')
    expect(nextState.downVotesBy).not.toContain('user-1')
  })

  it('should handle DOWNVOTE_DETAIL_THREAD (TOGGLE_VOTE_DETAIL_THREAD with voteType: -1)', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Satu',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      comments: []
    }
    const action = {
      type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'user-1',
        voteType: -1
      }
    }

    // action
    const nextState = detailThreadReducer(initialState, action)

    // assert
    expect(nextState.downVotesBy).toContain('user-1')
    expect(nextState.upVotesBy).not.toContain('user-1')
  })

  it('should handle NEUTRAL_VOTE_DETAIL_THREAD (TOGGLE_VOTE_DETAIL_THREAD with voteType: 0)', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Satu',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      comments: []
    }
    const action = {
      type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
      payload: {
        userId: 'user-1',
        voteType: 0
      }
    }

    // action
    const nextState = detailThreadReducer(initialState, action)

    // assert
    expect(nextState.upVotesBy).not.toContain('user-1')
    expect(nextState.downVotesBy).not.toContain('user-1')
  })

  it('should return detailThread with restored votes when given by ROLLBACK_VOTE_DETAIL_THREAD action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Satu',
      upVotesBy: ['user-1'],
      downVotesBy: [],
      comments: []
    }
    const action = {
      type: ActionType.ROLLBACK_VOTE_DETAIL_THREAD,
      payload: {
        upVotesBy: [],
        downVotesBy: ['user-2']
      }
    }

    // action
    const nextState = detailThreadReducer(initialState, action)

    // assert
    expect(nextState.upVotesBy).toEqual([])
    expect(nextState.downVotesBy).toEqual(['user-2'])
  })
})
