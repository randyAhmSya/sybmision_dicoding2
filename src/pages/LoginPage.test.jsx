import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import LoginPage from './LoginPage'
import * as authAction from '../states/authUser/action'

function renderWithProviders (ui, { preloadedState = { authUser: null } } = {}) {
  const testStore = configureStore({
    reducer: {
      authUser: (state = preloadedState.authUser) => state
    }
  })

  return render(
    <Provider store={testStore}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  )
}

describe('LoginPage component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render login form elements correctly', () => {
    // arrange
    renderWithProviders(<LoginPage />)

    // assert
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument()
  })

  it('should handle email and password typing correctly', async () => {
    // arrange
    renderWithProviders(<LoginPage />)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    // action
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'secretpassword')

    // assert
    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('secretpassword')
  })

  it('should call asyncSetAuthUser when form is submitted', async () => {
    // arrange
    const mockAsyncSetAuthUser = vi
      .spyOn(authAction, 'asyncSetAuthUser')
      .mockImplementation(() => () => Promise.resolve())
    renderWithProviders(<LoginPage />)
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Masuk' })

    // action
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'secretpassword')
    await userEvent.click(submitButton)

    // assert
    expect(mockAsyncSetAuthUser).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'secretpassword'
    })

    mockAsyncSetAuthUser.mockRestore()
  })
})
