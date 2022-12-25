import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../../../hooks/useUser'
import { ReplyService } from '../../../services/ReplyService'
import { Post } from '../../../types/post/Post'
import { Reply } from '../../../types/post/Reply'
import { User } from '../../../types/user/User'
import { DashboardContainer } from '../DashboardContainer'
import { PostCard } from './PostCard'
import '../../../styles/dashboard.scss'
import { ReplyCard } from './ReplyCard'
import { Avatar } from '@mui/material'
import { updatePostField } from '../../../util/updatePostField'
import { ReplyField } from './ReplyField'

export function PostReplies() {
  const { postId } = useParams()

  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState<Post>()
  const [replies, setReplies] = useState<Reply[]>([])
  const [body, setBody] = useState('')
  const [emojiNumber, setEmojiNumber] = useState(1)

  const editableDiv = useRef<HTMLDivElement>(null)

  useUser(setLoading, setUser, null, false)

  useEffect(() => {
    getPostReplies()
  }, [postId])

  async function getPostReplies() {
    if (postId != null) {
      setLoading(true)
      try {
        const result = await new ReplyService().getPostReplies(parseInt(postId))

        const { data } = result

        setPost(data.post)
        setReplies(data.replies)
      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
  }

  function handlePostChange(e: React.ChangeEvent<HTMLDivElement>) {
    updatePostField(e, emojiNumber, setEmojiNumber, setBody, editableDiv.current)
  }

  function setOpenPostModal() {}

  return (
    <div id="post-replies">
      {post && (
        <DashboardContainer user={user} title="Thread" setOpenPostModal={setOpenPostModal}>
          <div>
            <PostCard post={post} setPost={setPost} />
            {user && <ReplyField user={user} post={post} />}
          </div>
          {replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
        </DashboardContainer>
      )}
    </div>
  )
}
