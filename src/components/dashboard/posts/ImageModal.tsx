import { Modal } from '@mui/material'
import { Image } from '../../../types/post/Image'

interface ImageModalProps {
  image: Image | null
  setImage: (image: Image | null) => void
}

export function ImageModal({ image, setImage }: ImageModalProps) {
  return (
    <Modal
      style={{
        position: 'absolute' as 'absolute',
        top: '25%',
        left: '40%'
      }}
      open={image != null}
      onClose={() => setImage(null)}
    >
      <img alt="large img" src={image?.original || ''} style={{ maxWidth: '700px' }} />
    </Modal>
  )
}
