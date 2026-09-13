import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import { addThreadActionCreator, asyncAddThread } from './action'

const fakeThreadInput = {
  title: 'Judul Baru',
  body: 'Isi thread baru',
  category: 'react'
}

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Judul Baru',
  body: 'Isi thread baru',
  category: 'react',
  createdAt: '2023-01-01T00:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0
}

const fakeErrorResponse = new Error('Ups, gagal membuat thread')

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread
  })

  afterEach(() => {
    api.createThread = api._createThread
    delete api._createThread
  })

  it('should dispatch action correctly when thread creation success', async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeThreadResponse)
    const dispatch = vi.fn()

    // action
    const result = await asyncAddThread(fakeThreadInput)(dispatch)

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(dispatch).toHaveBeenCalledWith(
      addThreadActionCreator(fakeThreadResponse)
    )
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
    expect(result).toEqual(fakeThreadResponse)
  })

  it('should dispatch action, call alert, and throw error when thread creation failed', async () => {
    // arrange
    api.createThread = () => Promise.reject(fakeErrorResponse)
    const dispatch = vi.fn()
    window.alert = vi.fn()

    // action & assert
    await expect(asyncAddThread(fakeThreadInput)(dispatch)).rejects.toThrow(
      fakeErrorResponse
    )
    expect(dispatch).toHaveBeenCalledWith(showLoading())
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
    expect(dispatch).toHaveBeenCalledWith(hideLoading())
  })
})
