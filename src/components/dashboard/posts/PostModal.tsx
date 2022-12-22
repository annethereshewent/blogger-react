import { Card, CardContent, Modal } from '@mui/material'
import { Post } from '../../../types/post/Post'
import { modalStyleRounded } from '../../../util/modalStyles'
import { CloseButton } from '../../shared/CloseButton'
import { PostField } from './PostField'

interface PostModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  avatar: string | undefined
  posts: Post[]
  setPosts: (posts: Post[]) => void
}

export function PostModal({ open, setOpen, avatar, posts, setPosts }: PostModalProps) {
  function onClose() {
    setOpen(false)
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card id="post-modal" style={modalStyleRounded}>
        <CloseButton handleClose={onClose} />
        <CardContent>
          <PostField avatar={avatar} posts={posts} setPosts={setPosts} />
        </CardContent>
      </Card>
    </Modal>
  )
}
