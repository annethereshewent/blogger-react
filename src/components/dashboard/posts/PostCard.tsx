import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import linkifyHtml from 'linkifyjs/lib/linkify-html'
import { Post } from '../../../types/Post'
import moment from 'moment'
import { GifElement } from './GifElement'
import { ImageModal } from './ImageModal'
import { useState } from 'react'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
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
        <IconButton>
          <FavoriteOutlined />
        </IconButton>
      </div>
      <ImageModal image={image} setImage={setImage} />
    </div>
  )
}
