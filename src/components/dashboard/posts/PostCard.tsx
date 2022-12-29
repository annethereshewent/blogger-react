import { Avatar } from '@mui/material'
import { Image } from '../../../types/post/Image'
import { Post } from '../../../types/post/Post'
import moment from 'moment'
import { GifElement } from './GifElement'
import { User } from '../../../types/user/User'
import { useNavigate } from 'react-router-dom'
import { convertPost } from '../../../util/convertPost'
import { useRef } from 'react'
import { PostCardActions } from './PostCardActions'

interface PostCardProps {
  post: Post
  setPosts?: (posts: Post[]) => void
  setPost?: (post: Post) => void
  posts?: Post[]
  user?: User
  setImage: (image: Image | null) => void
  setReplyable: (post: Post) => void
  setOpen?: (open: boolean) => void
}

export function PostCard({
  post,
  user,
  setPosts,
  setPost,
  posts,
  setImage,
  setReplyable,
  setOpen
}: PostCardProps) {
  const navigate = useNavigate()
  const imagesRef = useRef<HTMLDivElement>(null)
  const gifRef = useRef<HTMLDivElement>(null)

  function checkNavigate(e: React.MouseEvent<HTMLDivElement>) {
    const element = e.target as HTMLElement

    if (!['img', 'video'].includes(element.tagName.toLowerCase())) {
      navigate(`/posts/${post.id}`)
    }
  }

  return (
    <div className="post-card">
      <div className="post">
        <Avatar src={post.user.avatars.small} className="post-avatar" />
        <div onClick={checkNavigate} className="post-wrapper">
          <div>
            <strong>{post.user.display_name}</strong>
            <span className="post-username">@{post.user.username}</span>
            <span className="post-date">{moment(post.created_at).fromNow()}</span>
            <p className="post-body" dangerouslySetInnerHTML={{ __html: convertPost(post) }} />
          </div>
          <div ref={gifRef} className="gifs">
            {post.gif && (
              <GifElement src={post.gif} originalSrc={post.original_gif_url} key={post.gif} />
            )}
          </div>
          <div ref={imagesRef} className="images">
            {post.images.map((image) => (
              <img
                alt="alt text"
                key={image.preview}
                src={image.preview}
                style={{ width: '45%' }}
                onClick={() => setImage(image)}
              />
            ))}
          </div>
        </div>
      </div>
      <PostCardActions
        user={user}
        post={post}
        setPost={setPost}
        setPosts={setPosts}
        posts={posts}
        setReplyable={setReplyable}
        setOpen={setOpen}
      />
    </div>
  )
}
