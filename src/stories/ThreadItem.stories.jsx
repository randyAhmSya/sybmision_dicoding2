import { MemoryRouter } from 'react-router-dom'
import ThreadItem from '../components/threads/ThreadItem'

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ],
  argTypes: {
    onUpVote: { action: 'onUpVote' },
    onDownVote: { action: 'onDownVote' },
    onNeutralVote: { action: 'onNeutralVote' }
  }
}

export const Default = {
  args: {
    thread: {
      id: 'thread-1',
      title: 'Bagaimana cara belajar React dan Redux secara efektif?',
      body: 'Halo teman-teman, ada rekomendasi roadmap atau tips untuk menguasai React dan Redux dari dasar hingga tingkat lanjut?',
      category: 'react',
      createdAt: '2023-01-01T08:00:00.000Z',
      upVotesBy: ['user-2'],
      downVotesBy: [],
      totalComments: 5
    },
    user: {
      id: 'user-2',
      name: 'Budi Santoso',
      avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso'
    },
    authUserId: 'user-1'
  }
}

export const WithoutCategory = {
  args: {
    thread: {
      id: 'thread-2',
      title: 'Diskusi santai seputar dunia kerja software engineer',
      body: 'Mari berbagi pengalaman mengenai work-life balance dan tips menghadapi tech interview.',
      category: '',
      createdAt: '2023-01-02T10:00:00.000Z',
      upVotesBy: ['user-1', 'user-2'],
      downVotesBy: [],
      totalComments: 12
    },
    user: {
      id: 'user-3',
      name: 'Siti Rahma',
      avatar: 'https://ui-avatars.com/api/?name=Siti+Rahma'
    },
    authUserId: 'user-1'
  }
}
