import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { DashboardService } from '../../../services/DashboardService'
import { Post } from '../../../types/post/Post'
import { User } from '../../../types/user/User'
import { DashboardContainer } from '../DashboardContainer'
import { PostModal } from '../posts/PostModal'
import { PostsContainer } from '../posts/PostsContainer'

export function Tags() {
  const [user, setUser] = useState<User>()
  const [openPostModal, setOpenPostModal] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const { tag } = useParams()

  const dashboardService = new DashboardService()

  async function getPosts() {
    fetchPosts(setHasMore)
  }

  useUser(setLoading, setUser, null, false)

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
    getPosts()
  }, [])

  return (
    <div>
      <DashboardContainer user={user} setOpenPostModal={setOpenPostModal} title="Tags">
        <PostsContainer
          posts={posts}
          fetchPosts={fetchPosts}
          hasMore={hasMore}
          setHasMore={setHasMore}
          setPosts={setPosts}
          user={user}
        />
      </DashboardContainer>
      <PostModal
        open={openPostModal}
        avatar={user?.avatars.small}
        setOpen={setOpenPostModal}
        posts={posts}
        setPosts={setPosts}
      />
    </div>
  )
}
