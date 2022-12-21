import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import linkifyHtml from 'linkifyjs/lib/linkify-html'
import { Post } from '../../../types/Post'
import moment from 'moment'
import { GifElement } from './GifElement'
import { ImageModal } from './ImageModal'
import { useState } from 'react'
import { DashboardService } from '../../../services/DashboardService'
import { User } from '../../../types/User'

interface PostCardProps {
  post: Post
  setPosts: (posts: Post[]) => void
  posts: Post[]
  user: User
}

export function PostCard({ post, user, setPosts, posts }: PostCardProps) {
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

  const [image, setImage] = useState<string | null>(null)

  return (
    <div id={`post-${post.id}`} className="post-card">
      <div className="post">
        <Avatar src={post.user.avatars.small} className="post-avatar" />
        <div className="post-wrapper">
          <strong>{post.user.username}</strong>
          <span className="post-date">{moment(post.created_at).fromNow()}</span>
          <p className="post-body" dangerouslySetInnerHTML={{ __html: convertPost(post.body) }} />
          <div className="gifs">
            {post.gif && (
              <GifElement src={post.gif} originalSrc={post.original_gif_url} key={post.gif} />
            )}
          </div>
          <div className="images">
            {post.images.map((image) => (
              <img
                alt="alt text"
                key={image}
                src={image}
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
        <IconButton className="icon-button">
          <ReplyOutlined />
        </IconButton>
        <IconButton onClick={likePost}>
          <FavoriteOutlined
            className={
              post.likes.filter((like) => like.username === user.username).length === 1
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
