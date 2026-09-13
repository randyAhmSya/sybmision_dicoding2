import threadsReducer from './reducer'
import { ActionType } from './action'

describe('threadsReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = []
    const action = { type: 'UNKNOWN' }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState).toEqual(initialState)
  })

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = []
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Satu',
            body: 'Isi Thread Satu',
            category: 'general',
            createdAt: '2023-01-01T00:00:00.000Z',
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          }
        ]
      }
    }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState).toEqual(action.payload.threads)
  })

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        body: 'Isi Thread Satu',
        category: 'general',
        createdAt: '2023-01-01T00:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ]
    const newThread = {
      id: 'thread-2',
      title: 'Thread Baru',
      body: 'Isi Thread Baru',
      category: 'redux',
      createdAt: '2023-01-02T00:00:00.000Z',
      ownerId: 'user-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0
    }
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread
      }
    }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState).toEqual([newThread, ...initialState])
  })

  it('should handle UPVOTE_THREAD (TOGGLE_VOTE_THREAD with voteType: 1)', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        upVotesBy: [],
        downVotesBy: ['user-1']
      }
    ]
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 1
      }
    }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState[0].upVotesBy).toContain('user-1')
    expect(nextState[0].downVotesBy).not.toContain('user-1')
  })

  it('should handle DOWNVOTE_THREAD (TOGGLE_VOTE_THREAD with voteType: -1)', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        upVotesBy: ['user-1'],
        downVotesBy: []
      }
    ]
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: -1
      }
    }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState[0].downVotesBy).toContain('user-1')
    expect(nextState[0].upVotesBy).not.toContain('user-1')
  })

  it('should handle NEUTRAL_VOTE_THREAD (TOGGLE_VOTE_THREAD with voteType: 0)', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        upVotesBy: ['user-1'],
        downVotesBy: []
      }
    ]
    const action = {
      type: ActionType.TOGGLE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-1',
        voteType: 0
      }
    }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState[0].upVotesBy).not.toContain('user-1')
    expect(nextState[0].downVotesBy).not.toContain('user-1')
  })

  it('should return threads with restored votes when given by ROLLBACK_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Satu',
        upVotesBy: ['user-1'],
        downVotesBy: []
      }
    ]
    const action = {
      type: ActionType.ROLLBACK_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        upVotesBy: [],
        downVotesBy: ['user-2']
      }
    }

    // action
    const nextState = threadsReducer(initialState, action)

    // assert
    expect(nextState[0].upVotesBy).toEqual([])
    expect(nextState[0].downVotesBy).toEqual(['user-2'])
  })
})
