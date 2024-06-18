import { useParams } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { useEffect, useState } from 'react'
import { User } from '../../../types/user/User'
import { PostService } from '../../../services/PostService'
import { Post } from '../../../types/post/Post'
import { PostReplies } from './PostReplies'

interface PostRepliesContainerParams {
  withParent?: boolean
}

export function PostRepliesContainer({ withParent }: PostRepliesContainerParams) {
  const { postId } = useParams()

  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<Post>()
  const [parent, setParent] = useState<Post>()
  const [replies, setReplies] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useUser(setLoading, setUser, null, false)

  useEffect(() => {
    getPost()
    getPostReplies()

    if (withParent) {
      getParent()
    }
  }, [postId])

  async function getPost() {
    if (postId != null) {
      setLoading(true)
      try {
        const result = await new PostService().getPost(parseInt(postId))

        const { data } = result

        setPost(data.post)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
  }

  async function getParent() {
    if (postId != null) {
      setLoading(true)

      try {
        const result = await new PostService().getParent(parseInt(postId))

        const { data } = result

        setParent(data.post)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
  }

  async function getPostReplies() {
    if (postId != null) {
      setLoading(true)
      try {
        const result = await new PostService().getReplies(parseInt(postId), 'Post', page)
        const { data } = result

        if (data.replies.length) {
          const concatedReplies = replies.concat(data.replies)

          setReplies(concatedReplies)
          setPage(page + 1)
        } else {
          setHasMore(false)
        }
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div>
      {post && (
        <PostReplies
          post={post}
          user={user}
          parent={parent}
          replies={replies}
          setPost={setPost}
          setReplies={setReplies}
          hasMore={hasMore}
          getPostReplies={getPostReplies}
        />
      )}
    </div>
  )
}
