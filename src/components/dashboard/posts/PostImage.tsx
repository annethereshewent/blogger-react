import { CloseOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'

interface PostImageProps {
  image: string
  setImages: (images: string[]) => void
  images: string[]
}

export function PostImage({ image, setImages, images }: PostImageProps) {
  function removeImage() {
    const i = images.indexOf(image)

    const imagesCopy = [...images]

    imagesCopy.splice(i, 1)

    setImages(imagesCopy)
  }
  return (
    <div className="new-image">
      <IconButton className="close-button" onClick={removeImage}>
        <CloseOutlined />
      </IconButton>
      <img alt="alt text" src={image} style={{ width: '45%' }} />
    </div>
  )
}
