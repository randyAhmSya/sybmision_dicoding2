import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThreadInput from './ThreadInput'

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render input fields and button correctly', () => {
    // arrange
    render(<ThreadInput onAddThread={() => {}} />)

    // assert
    expect(screen.getByLabelText('Judul')).toBeInTheDocument()
    expect(screen.getByLabelText('Kategori (opsional)')).toBeInTheDocument()
    expect(screen.getByLabelText('Isi Diskusi')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Publikasikan Diskusi' })
    ).toBeInTheDocument()
  })

  it('should handle title, category, and body typing correctly', async () => {
    // arrange
    render(<ThreadInput onAddThread={() => {}} />)
    const titleInput = screen.getByLabelText('Judul')
    const categoryInput = screen.getByLabelText('Kategori (opsional)')
    const bodyInput = screen.getByLabelText('Isi Diskusi')

    // action
    await userEvent.type(titleInput, 'Diskusi Testing')
    await userEvent.type(categoryInput, 'vitest')
    await userEvent.type(bodyInput, 'Ini adalah isi diskusi testing')

    // assert
    expect(titleInput).toHaveValue('Diskusi Testing')
    expect(categoryInput).toHaveValue('vitest')
    expect(bodyInput).toHaveValue('Ini adalah isi diskusi testing')
  })

  it('should call onAddThread with correct arguments when form is submitted', async () => {
    // arrange
    const mockAddThread = vi.fn()
    render(<ThreadInput onAddThread={mockAddThread} />)
    const titleInput = screen.getByLabelText('Judul')
    const categoryInput = screen.getByLabelText('Kategori (opsional)')
    const bodyInput = screen.getByLabelText('Isi Diskusi')
    const submitButton = screen.getByRole('button', {
      name: 'Publikasikan Diskusi'
    })

    // action
    await userEvent.type(titleInput, 'Diskusi Testing')
    await userEvent.type(categoryInput, 'vitest')
    await userEvent.type(bodyInput, 'Ini adalah isi diskusi testing')
    await userEvent.click(submitButton)

    // assert
    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Diskusi Testing',
      category: 'vitest',
      body: 'Ini adalah isi diskusi testing'
    })
  })

  it('should display alert when title or body is empty', () => {
    // arrange
    window.alert = vi.fn()
    const mockAddThread = vi.fn()
    const { container } = render(<ThreadInput onAddThread={mockAddThread} />)
    const form = container.querySelector('form')

    // action
    fireEvent.submit(form)

    // assert
    expect(window.alert).toHaveBeenCalledWith(
      'Judul dan isi diskusi tidak boleh kosong!'
    )
    expect(mockAddThread).not.toHaveBeenCalled()
  })
})
