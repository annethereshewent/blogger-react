import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import linkifyHtml from 'linkifyjs/lib/linkify-html'
import { Image } from '../../../types/post/Image'
import { Post } from '../../../types/post/Post'
import moment from 'moment'
import { GifElement } from './GifElement'
import { ImageModal } from './ImageModal'
import { useState } from 'react'
import { DashboardService } from '../../../services/DashboardService'
import { User } from '../../../types/user/User'
import { useNavigate } from 'react-router-dom'

interface PostCardProps {
  post: Post
  setPosts: (posts: Post[]) => void
  posts: Post[]
  user?: User
}

export function PostCard({ post, user, setPosts, posts }: PostCardProps) {
  const navigate = useNavigate()
  /*
   * Replaces new lines with br tags and auto links urls.
   * @TODO: sanitization already happens
   * on the backend, optionally add it to client side
   */
  function convertPost(body: string): string {
    if (body != null) {
      let bodyHtml = linkifyHtml(body.replace(/\n/g, '<br/>'), { target: '_blank' })

      if (post.tags != null) {
        for (const tag of post.tags) {
          const tagRegex = new RegExp(`#${tag}\\b`, 'g')
          bodyHtml = bodyHtml.replace(tagRegex, `<a href="/tags/${tag}">#${tag}</a>`)
        }
      }

      return bodyHtml
    }
    return ''
  }

  async function likePost() {
    try {
      const result = await new DashboardService().likePost(post.id)

      const postsCopy = [...posts]

      const i = postsCopy.indexOf(post)

      postsCopy.splice(i, 1, result.data.post)

      setPosts(postsCopy)
    } catch (e: any) {
      console.log(e)
    }
  }

  const [image, setImage] = useState<Image | null>(null)

  return (
    <div id={`post-${post.id}`} className="post-card">
      <div className="post">
        <Avatar src={post.user.avatars.small} className="post-avatar" />
        <div className="post-wrapper">
          <div onClick={() => navigate(`/posts/${post.id}`)}>
            <strong>{post.user.display_name}</strong>
            <span className="post-username">@{post.user.username}</span>
            <span className="post-date">{moment(post.created_at).fromNow()}</span>
            <p className="post-body" dangerouslySetInnerHTML={{ __html: convertPost(post.body) }} />
          </div>
          <div className="gifs">
            {post.gif && (
              <GifElement src={post.gif} originalSrc={post.original_gif_url} key={post.gif} />
            )}
          </div>
          <div className="images">
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
      <div className="post-actions">
        <IconButton className="icon-button">
          <AddCommentRounded />
        </IconButton>
        {post.reply_count > 0 && <span className="reply-count">{post.reply_count}</span>}
        <span className="spacer" />
        <IconButton className="icon-button">
          <ReplyOutlined />
        </IconButton>
        <span className="spacer" />
        <IconButton onClick={likePost}>
          <FavoriteOutlined
            className={
              post.likes.filter((like) => like.username === user?.username).length === 1
                ? 'liked'
                : ''
            }
          />
        </IconButton>
        {post.like_count > 0 && <span className="like-count">{post.like_count}</span>}
      </div>
      <ImageModal image={image} setImage={setImage} />
    </div>
  )
}
