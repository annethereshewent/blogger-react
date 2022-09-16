import { Post } from "../../types/Post"
import linkifyHtml from 'linkify-html'
import { Avatar, IconButton } from "@mui/material"
import { ReplyOutlined, FavoriteOutlined, AddCommentRounded } from '@mui/icons-material'

interface PostsContainerProps {
  posts: Post[]
}

export function PostsContainer({ posts }: PostsContainerProps) {


  /*
  * Replaces new lines with br tags and auto links urls.
  * @TODO: sanitization already happens
  * on the backend, optionally add it to client side
  */
  function convertPost(body: string): string {

    return linkifyHtml(body.replace(/\n/g, "<br/>"), { target: '_blank' })
  }

  return (
    <div id="posts-container">
      { posts.map(post => {
        return (
          <div className="post-card">
            <div className="post">
              <Avatar src={post.avatar} className="post-avatar" />
              <p
                 className="post-body"
                 key={post.id}
                 dangerouslySetInnerHTML={{ __html: convertPost(post.body) }}
              />
            </div>
            <div className="post-actions">
              <IconButton className="icon-button">
                <AddCommentRounded />
              </IconButton>
              <IconButton className="icon-button">
                < ReplyOutlined />
              </IconButton>
              <IconButton className="icon-button">
                <FavoriteOutlined />
              </IconButton>
            </div>
          </div>
        )
      })}
    </div>
  )
}