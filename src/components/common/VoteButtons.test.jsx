import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VoteButtons from './VoteButtons'

describe('VoteButtons component', () => {
  afterEach(() => {
    cleanup()
  })

  it('should render vote counts correctly', () => {
    // arrange
    render(
      <VoteButtons
        upVotesBy={['user-1', 'user-2']}
        downVotesBy={['user-3']}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={() => {}}
        onNeutralVote={() => {}}
      />
    )

    // assert
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('should trigger onUpVote when upvote button clicked by logged in user', async () => {
    // arrange
    const mockUpVote = vi.fn()
    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={mockUpVote}
        onDownVote={() => {}}
        onNeutralVote={() => {}}
      />
    )
    const upvoteButton = screen.getByRole('button', { name: 'Upvote' })

    // action
    await userEvent.click(upvoteButton)

    // assert
    expect(mockUpVote).toHaveBeenCalled()
  })

  it('should trigger onDownVote when downvote button clicked by logged in user', async () => {
    // arrange
    const mockDownVote = vi.fn()
    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={mockDownVote}
        onNeutralVote={() => {}}
      />
    )
    const downvoteButton = screen.getByRole('button', { name: 'Downvote' })

    // action
    await userEvent.click(downvoteButton)

    // assert
    expect(mockDownVote).toHaveBeenCalled()
  })

  it('should trigger onNeutralVote when upvoted button clicked again', async () => {
    // arrange
    const mockNeutralVote = vi.fn()
    render(
      <VoteButtons
        upVotesBy={['user-1']}
        downVotesBy={[]}
        authUserId="user-1"
        onUpVote={() => {}}
        onDownVote={() => {}}
        onNeutralVote={mockNeutralVote}
      />
    )
    const upvoteButton = screen.getByRole('button', { name: 'Upvote' })

    // action
    await userEvent.click(upvoteButton)

    // assert
    expect(mockNeutralVote).toHaveBeenCalled()
  })

  it('should display alert when clicked by unauthenticated user', async () => {
    // arrange
    window.alert = vi.fn()
    render(
      <VoteButtons
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId={null}
        onUpVote={() => {}}
        onDownVote={() => {}}
        onNeutralVote={() => {}}
      />
    )
    const upvoteButton = screen.getByRole('button', { name: 'Upvote' })

    // action
    await userEvent.click(upvoteButton)

    // assert
    expect(window.alert).toHaveBeenCalledWith(
      'Silakan login terlebih dahulu untuk melakukan vote'
    )
  })
})
