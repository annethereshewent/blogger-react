import { useState, useEffect } from 'react'
import { User } from '../../types/User'
import { DashboardService } from '../../services/DashboardService'
import { useNavigate } from 'react-router-dom'
import { ConfirmationModal } from './ConfirmationModal'
import { AvatarModal } from './avatar/AvatarModal'
import '../../styles/dashboard.scss'
import { DashboardContainer } from './DashboardContainer'
import { PostModal } from './posts/PostModal'
import { Post } from '../../types/Post'

const CODE_NOT_CONFIRMED = 100

export function Dashboard() {
  const [user, setUser] = useState<User>()
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const [openPostModal, setOpenPostModal] = useState(false)
  const [openAvatar, setOpenAvatar] = useState(false)
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const navigate = useNavigate()

  const dashboardService = new DashboardService()

  async function getPosts() {
    fetchPosts(setHasMore)
  }

  async function fetchPosts(setHasMore: (hasMore: boolean) => void) {
    if (!loading) {
      try {
        setLoading(true)
        const result = await dashboardService.fetchPosts(page)

        const { data } = result

        if (data.posts.length) {
          const concatedPosts = posts.concat(data.posts)

          setPage(page + 1)
          setPosts(concatedPosts)
        } else {
          setHasMore(false)
        }
      } catch (e: any) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
  }

  async function getUser() {
    try {
      setLoading(true)
      const result = await dashboardService.getUserData()
      const { data } = result

      setUser(data.user)
    } catch (e: any) {
      // navigate back to the dashboard if status is 401
      if (e.response.status === 401) {
        localStorage.removeItem('apiToken')
        navigate('/')
      }
      if (e.response?.status === 400 && e.response?.data?.code === CODE_NOT_CONFIRMED) {
        setUser(e.response?.data?.user)
        setOpenConfirmation(true)
      }
    } finally {
      setLoading(false)
    }
  }

  async function checkAvatarDialog() {
    if (user != null) {
      if (!user?.avatar_dialog) {
        try {
          await dashboardService.hideAvatarDialog()
          setOpenAvatar(true)
        } catch (e: any) {
          // @TODO: add error handling
        }
      }
    }
  }

  useEffect(() => {
    getUser()
    getPosts()
  }, [])

  useEffect(() => {
    checkAvatarDialog()
  }, [user])

  return (
    <div>
      <DashboardContainer
        user={user}
        setOpenPostModal={setOpenPostModal}
        posts={posts}
        setPosts={setPosts}
        fetchPosts={fetchPosts}
        hasMore={hasMore}
        setHasMore={setHasMore}
      />
      <ConfirmationModal user={user} open={openConfirmation} setOpen={setOpenConfirmation} />
      <AvatarModal open={openAvatar} setOpen={setOpenAvatar} setUser={setUser} />
      <PostModal
        open={openPostModal}
        avatar={user?.avatars?.small}
        setOpen={setOpenPostModal}
        posts={posts}
        setPosts={setPosts}
      />
    </div>
  )
}
