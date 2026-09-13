import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import {
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment
} from './action'

const fakeDetailThreadResponse = {
  id: 'thread-1',
  title: 'Thread 1',
  body: 'Isi thread 1',
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

const fakeCommentResponse = {
  id: 'comment-1',
  content: 'Komentar bagus',
  createdAt: '2023-01-01T01:00:00.000Z',
  owner: {
    id: 'user-2',
    name: 'Jane Doe',
    avatar: 'https://generated-image-url.jpg'
  },
  upVotesBy: [],
  downVotesBy: []
}

const fakeErrorResponse = new Error('Ups, terjadi kesalahan')

describe('detailThread action thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail
    api._createComment = api.createComment
  })

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail
    api.createComment = api._createComment
    delete api._getThreadDetail
    delete api._createComment
  })

  describe('asyncReceiveDetailThread thunk', () => {
    it('should dispatch action correctly when fetching detail thread success', async () => {
      // arrange
      api.getThreadDetail = () => Promise.resolve(fakeDetailThreadResponse)
      const dispatch = vi.fn()

      // action
      await asyncReceiveDetailThread('thread-1')(dispatch)

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading())
      expect(dispatch).toHaveBeenCalledWith(clearDetailThreadActionCreator())
      expect(dispatch).toHaveBeenCalledWith(
        receiveDetailThreadActionCreator(fakeDetailThreadResponse)
      )
      expect(dispatch).toHaveBeenCalledWith(hideLoading())
    })

    it('should dispatch action and call alert when fetching detail thread failed', async () => {
      // arrange
      api.getThreadDetail = () => Promise.reject(fakeErrorResponse)
      const dispatch = vi.fn()
      window.alert = vi.fn()

      // action
      await asyncReceiveDetailThread('thread-1')(dispatch)

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading())
      expect(dispatch).toHaveBeenCalledWith(clearDetailThreadActionCreator())
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
      expect(dispatch).toHaveBeenCalledWith(hideLoading())
    })
  })

  describe('asyncAddComment thunk', () => {
    it('should dispatch action correctly when adding comment success', async () => {
      // arrange
      api.createComment = () => Promise.resolve(fakeCommentResponse)
      const dispatch = vi.fn()

      // action
      const result = await asyncAddComment({
        threadId: 'thread-1',
        content: 'Komentar bagus'
      })(dispatch)

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading())
      expect(dispatch).toHaveBeenCalledWith(
        addCommentActionCreator(fakeCommentResponse)
      )
      expect(dispatch).toHaveBeenCalledWith(hideLoading())
      expect(result).toEqual(fakeCommentResponse)
    })

    it('should dispatch action, call alert, and throw error when adding comment failed', async () => {
      // arrange
      api.createComment = () => Promise.reject(fakeErrorResponse)
      const dispatch = vi.fn()
      window.alert = vi.fn()

      // action & assert
      await expect(
        asyncAddComment({ threadId: 'thread-1', content: 'Komentar bagus' })(
          dispatch
        )
      ).rejects.toThrow(fakeErrorResponse)
      expect(dispatch).toHaveBeenCalledWith(showLoading())
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
      expect(dispatch).toHaveBeenCalledWith(hideLoading())
    })
  })
})
