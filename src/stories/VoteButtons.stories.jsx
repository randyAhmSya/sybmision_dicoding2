import VoteButtons from '../components/common/VoteButtons'

export default {
  title: 'Components/VoteButtons',
  component: VoteButtons,
  tags: ['autodocs'],
  argTypes: {
    onUpVote: { action: 'onUpVote' },
    onDownVote: { action: 'onDownVote' },
    onNeutralVote: { action: 'onNeutralVote' }
  }
}

export const Default = {
  args: {
    upVotesBy: [],
    downVotesBy: [],
    authUserId: 'user-1'
  }
}

export const Upvoted = {
  args: {
    upVotesBy: ['user-1'],
    downVotesBy: [],
    authUserId: 'user-1'
  }
}

export const Downvoted = {
  args: {
    upVotesBy: [],
    downVotesBy: ['user-1'],
    authUserId: 'user-1'
  }
}

export const ManyVotes = {
  args: {
    upVotesBy: ['user-2', 'user-3', 'user-4'],
    downVotesBy: ['user-5'],
    authUserId: 'user-1'
  }
}
