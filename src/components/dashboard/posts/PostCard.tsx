import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from "@mui/icons-material"
import { Avatar, IconButton } from "@mui/material"
import linkifyHtml from "linkifyjs/lib/linkify-html"
import { Post } from "../../../types/Post"
import moment from 'moment'
import { GifElement } from "./GifElement"

interface PostCardProps {
  post: Post,
}

export function PostCard({post}: PostCardProps) {
  /*
  * Replaces new lines with br tags and auto links urls.
  * @TODO: sanitization already happens
  * on the backend, optionally add it to client side
  */
   function convertPost(body: string): string {

    return linkifyHtml(body.replace(/\n/g, "<br/>"), { target: '_blank' })
  }

  return (
    <div className="post-card">
      <div className="post">
        <Avatar src={post.user.avatars.small} className="post-avatar" />
        <div className="post-wrapper">
          <strong>{post.user.username}</strong>
          <span className="post-date">{ moment(post.created_at).fromNow() }</span>
          <p
            className="post-body"
            dangerouslySetInnerHTML={{ __html: convertPost(post.body) }}
          />
          <div className="gifs">
            { post.gif &&
              <GifElement src={post.gif} originalSrc={post.original_gif_url} key={post.gif} />
            }
          </div>
        </div>

      </div>
      <div className="post-actions">
        <IconButton className="icon-button">
          <AddCommentRounded />
        </IconButton>
        <IconButton className="icon-button">
          < ReplyOutlined />
        </IconButton>
        <IconButton >
          <FavoriteOutlined />
        </IconButton>
      </div>
    </div>
  )
}