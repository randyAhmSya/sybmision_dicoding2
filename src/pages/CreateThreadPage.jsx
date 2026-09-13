import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { asyncAddThread } from '../states/threads/action'
import ThreadInput from '../components/threads/ThreadInput'

function CreateThreadPage () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const authUser = useSelector((state) => state.authUser)

  useEffect(() => {
    if (!authUser) {
      navigate('/login')
    }
  }, [authUser, navigate])

  async function handleAddThread (data) {
    try {
      await dispatch(asyncAddThread(data))
      navigate('/')
    } catch {}
  }

  if (!authUser) {
    return null
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ThreadInput onAddThread={handleAddThread} />
    </div>
  )
}

export default CreateThreadPage
