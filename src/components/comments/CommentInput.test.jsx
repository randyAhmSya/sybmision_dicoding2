import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import CommentInput from './CommentInput'

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render login prompt when authUserId is null', () => {
    // arrange
    render(
      <MemoryRouter>
        <CommentInput onAddComment={() => {}} authUserId={null} />
      </MemoryRouter>
    )

    // assert
    expect(
      screen.getByText('Silakan masuk terlebih dahulu untuk menulis komentar.')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Masuk untuk Berkomentar' })
    ).toBeInTheDocument()
  })

  it('should render form and button when user is logged in', () => {
    // arrange
    render(
      <MemoryRouter>
        <CommentInput onAddComment={() => {}} authUserId="user-1" />
      </MemoryRouter>
    )

    // assert
    expect(
      screen.getByPlaceholderText('Tuliskan tanggapan atau pendapatmu...')
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Kirim Komentar' })
    ).toBeInTheDocument()
  })

  it('should handle comment typing correctly', async () => {
    // arrange
    render(
      <MemoryRouter>
        <CommentInput onAddComment={() => {}} authUserId="user-1" />
      </MemoryRouter>
    )
    const commentInput = screen.getByPlaceholderText(
      'Tuliskan tanggapan atau pendapatmu...'
    )

    // action
    await userEvent.type(commentInput, 'Ini komentar saya')

    // assert
    expect(commentInput).toHaveValue('Ini komentar saya')
  })

  it('should call onAddComment with trimmed text when form is submitted', async () => {
    // arrange
    const mockAddComment = vi.fn()
    render(
      <MemoryRouter>
        <CommentInput onAddComment={mockAddComment} authUserId="user-1" />
      </MemoryRouter>
    )
    const commentInput = screen.getByPlaceholderText(
      'Tuliskan tanggapan atau pendapatmu...'
    )
    const submitButton = screen.getByRole('button', { name: 'Kirim Komentar' })

    // action
    await userEvent.type(commentInput, '   Komentar valid   ')
    await userEvent.click(submitButton)

    // assert
    expect(mockAddComment).toHaveBeenCalledWith('Komentar valid')
  })

  it('should display alert when comment is empty', () => {
    // arrange
    window.alert = vi.fn()
    const mockAddComment = vi.fn()
    const { container } = render(
      <MemoryRouter>
        <CommentInput onAddComment={mockAddComment} authUserId="user-1" />
      </MemoryRouter>
    )
    const form = container.querySelector('form')

    // action
    fireEvent.submit(form)

    // assert
    expect(window.alert).toHaveBeenCalledWith('Komentar tidak boleh kosong!')
    expect(mockAddComment).not.toHaveBeenCalled()
  })
})
