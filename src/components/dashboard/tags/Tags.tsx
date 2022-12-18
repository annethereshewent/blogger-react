import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const { tag } = useParams()

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
    fetchPosts(setHasMore)
  }

  async function fetchPosts(setHasMore: (hasMore: boolean) => void) {
    if (!loading) {
      try {
        if (tag != null) {
          setLoading(true)
          const result = await dashboardService.fetchPostsByTag(tag, page)

          const { data } = result

          setPage(page + 1)

          if (data.posts.length) {
            const concatedPosts = posts.concat(data.posts)

            setPosts(concatedPosts)
          } else {
            setHasMore(false)
          }
        }
      } catch (e: any) {
        // @TODO: add error handling
      } finally {
        setLoading(false)
      }
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
        fetchPosts={fetchPosts}
        hasMore={hasMore}
        setHasMore={setHasMore}
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
