import { showLoading, hideLoading } from 'react-redux-loading-bar'
import api from '../../utils/api'
import {
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser
} from './action'

const fakeLoginInput = {
  email: 'john@example.com',
  password: 'password123'
}

const fakeToken = 'fake-access-token'

const fakeAuthUserResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg'
}

const fakeErrorResponse = new Error('Email atau password salah')

describe('authUser action thunk', () => {
  beforeEach(() => {
    api._login = api.login
    api._putAccessToken = api.putAccessToken
    api._getOwnProfile = api.getOwnProfile
  })

  afterEach(() => {
    api.login = api._login
    api.putAccessToken = api._putAccessToken
    api.getOwnProfile = api._getOwnProfile
    delete api._login
    delete api._putAccessToken
    delete api._getOwnProfile
  })

  describe('asyncSetAuthUser thunk', () => {
    it('should dispatch action correctly when login success', async () => {
      // arrange
      api.login = () => Promise.resolve(fakeToken)
      api.putAccessToken = vi.fn()
      api.getOwnProfile = () => Promise.resolve(fakeAuthUserResponse)
      const dispatch = vi.fn()

      // action
      const result = await asyncSetAuthUser(fakeLoginInput)(dispatch)

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading())
      expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken)
      expect(dispatch).toHaveBeenCalledWith(
        setAuthUserActionCreator(fakeAuthUserResponse)
      )
      expect(dispatch).toHaveBeenCalledWith(hideLoading())
      expect(result).toEqual(fakeAuthUserResponse)
    })

    it('should dispatch action, call alert, and throw error when login failed', async () => {
      // arrange
      api.login = () => Promise.reject(fakeErrorResponse)
      const dispatch = vi.fn()
      window.alert = vi.fn()

      // action & assert
      await expect(asyncSetAuthUser(fakeLoginInput)(dispatch)).rejects.toThrow(
        fakeErrorResponse
      )
      expect(dispatch).toHaveBeenCalledWith(showLoading())
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message)
      expect(dispatch).toHaveBeenCalledWith(hideLoading())
    })
  })

  describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch action and remove access token correctly', () => {
      // arrange
      api.putAccessToken = vi.fn()
      const dispatch = vi.fn()

      // action
      asyncUnsetAuthUser()(dispatch)

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading())
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator())
      expect(api.putAccessToken).toHaveBeenCalledWith('')
      expect(dispatch).toHaveBeenCalledWith(hideLoading())
    })
  })
})
