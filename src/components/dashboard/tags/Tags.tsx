import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DashboardService } from '../../../services/DashboardService'
import { Post } from '../../../types/Post'
import { User } from '../../../types/User'
import { DashboardContainer } from '../DashboardContainer'
import { PostModal } from '../posts/PostModal'

export function Tags() {
  const [user, setUser] = useState<User>()
  const [openPostModal, setOpenPostModal] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)

  const { tag } = useParams()

  const navigate = useNavigate()

  const dashboardService = new DashboardService()

  async function getUser() {
    try {
      setLoading(true)
      const result = await dashboardService.getUserData()
      const { data } = result

      setUser(data.user)
    } catch (e: any) {
      // navigate back to the dashboard if status is 401
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  async function getPosts() {
    try {
      if (tag != null) {
        setLoading(true)
        const result = await dashboardService.fetchPostsByTag(tag)

        const { data } = result

        setPosts(data.posts)
      } else {
        setPosts([])
      }
    } catch (e: any) {
      // @TODO: add error handling
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUser()
    getPosts()
  }, [])

  if (loading || user == null) {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <DashboardContainer
        user={user}
        setOpenPostModal={setOpenPostModal}
        posts={posts}
        setPosts={setPosts}
      />
      <PostModal
        open={openPostModal}
        avatar={user.avatars.small}
        setOpen={setOpenPostModal}
        posts={posts}
        setPosts={setPosts}
      />
    </div>
  )
}
