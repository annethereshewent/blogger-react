import { Card, CardContent, Modal } from '@mui/material'
import { Post } from '../../../types/post/Post'
import { modalStyleLarge, modalStyleRounded } from '../../../util/modalStyles'
import { CloseButton } from '../../shared/CloseButton'
import { PostField } from './PostField'

interface PostModalProps {
  open: boolean
  setOpen: (open: boolean) => void
  avatar: string | undefined
  posts?: Post[]
  setPosts?: (posts: Post[]) => void
  setShowSnackbar?: (show: boolean) => void
}

export function PostModal({
  open,
  setOpen,
  avatar,
  posts,
  setPosts,
  setShowSnackbar
}: PostModalProps) {
  function onClose() {
    setOpen(false)
  }

  return (
    <Modal onClose={onClose} open={open}>
      <Card id="post-modal" style={{ ...modalStyleLarge, borderRadius: '15px' }}>
        <CloseButton handleClose={onClose} />
        <CardContent>
          <PostField
            avatar={avatar}
            posts={posts}
            setPosts={setPosts}
            setOpen={setOpen}
            setShowSnackbar={setShowSnackbar}
          />
        </CardContent>
      </Card>
    </Modal>
  )
}
