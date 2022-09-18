import { AddCommentRounded, FavoriteOutlined, ReplyOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import linkifyHtml from "linkifyjs/lib/linkify-html";
import { Post } from "../../types/Post";
import { User } from "../../types/User";

interface PostCardProps {
  post: Post,
  user: User
}

export function PostCard({post, user}: PostCardProps) {

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
        <Avatar src={post.avatar} className="post-avatar" />
        <div className="post-wrapper">
          <strong>{user.username}</strong>
          <p
            className="post-body"
            dangerouslySetInnerHTML={{ __html: convertPost(post.body) }}
          />
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