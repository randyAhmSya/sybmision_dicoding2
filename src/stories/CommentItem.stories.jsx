import CommentItem from '../components/comments/CommentItem'

export default {
  title: 'Components/CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
  argTypes: {
    onUpVote: { action: 'onUpVote' },
    onDownVote: { action: 'onDownVote' },
    onNeutralVote: { action: 'onNeutralVote' }
  }
}

export const Default = {
  args: {
    comment: {
      id: 'comment-1',
      content: 'Ini adalah contoh komentar pada sebuah thread diskusi.',
      createdAt: '2023-01-01T10:00:00.000Z',
      upVotesBy: ['user-2'],
      downVotesBy: [],
      owner: {
        id: 'user-2',
        name: 'Jane Doe',
        avatar: 'https://ui-avatars.com/api/?name=Jane+Doe'
      }
    },
    authUserId: 'user-1'
  }
}

export const UpvotedByAuthUser = {
  args: {
    comment: {
      id: 'comment-2',
      content: 'Komentar yang sangat bermanfaat dan informatif!',
      createdAt: '2023-01-02T12:30:00.000Z',
      upVotesBy: ['user-1', 'user-2', 'user-3'],
      downVotesBy: [],
      owner: {
        id: 'user-3',
        name: 'Alex Smith',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Smith'
      }
    },
    authUserId: 'user-1'
  }
}

export const AnonymousAuthor = {
  args: {
    comment: {
      id: 'comment-3',
      content: 'Komentar dari pengguna tanpa avatar atau profil terdaftar.',
      createdAt: '2023-01-03T15:45:00.000Z',
      upVotesBy: [],
      downVotesBy: ['user-4'],
      owner: null
    },
    authUserId: 'user-1'
  }
}
