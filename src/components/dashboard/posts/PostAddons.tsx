import { EmojiEmotionsOutlined, GifOutlined, ImageOutlined, YouTube } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useRef, useState } from 'react'
import { GifComponent } from '../gifs/GifComponent'
import { Gif } from '../../../types/Gif'
import EmojiPicker, {
  EmojiClickData,
  Theme,
  EmojiStyle,
  SkinTonePickerLocation
} from 'emoji-picker-react'

interface PostAddonsProps {
  setGif: (gif: Gif) => void
  setImages: (images: string[]) => void
  images: string[]
  files: File[]
  setFiles: (files: File[]) => void
  post: string
  setPost: (post: string) => void
}

export function PostAddons({
  setGif,
  setImages,
  images,
  files,
  setFiles,
  post,
  setPost
}: PostAddonsProps) {
  const [open, setOpen] = useState(false)
  const [openEmoji, setOpenEmoji] = useState(false)
  const inputFileRef = useRef<HTMLInputElement>(null)

  function openFileUpload() {
    inputFileRef?.current?.focus()
    inputFileRef?.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files != null) {
      const file = e.target.files[0]

      const url = URL.createObjectURL(file)

      const newImages = [...images]

      newImages.push(url)

      const newFiles = [...files]

      newFiles.push(file)

      if (newImages.length <= 4) {
        setImages(newImages)
        setFiles(newFiles)
      }
    }
  }

  function handleEmojiClick(e: EmojiClickData) {
    setPost(post + e.emoji)
    setOpenEmoji(false)
  }

  return (
    <div>
      <div className="post-addons">
        <Tooltip TransitionProps={{ timeout: 1500 }} title="image">
          <IconButton className="item" onClick={() => openFileUpload()}>
            <ImageOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionProps={{ timeout: 1500 }} title="gif">
          <IconButton className="item" onClick={() => setOpen(true)}>
            <GifOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionProps={{ timeout: 1500 }} title="youtube">
          <IconButton className="item">
            <YouTube />
          </IconButton>
        </Tooltip>
        <Tooltip TransitionProps={{ timeout: 1500 }} title="emoji">
          <IconButton className="item" onClick={() => setOpenEmoji(true)}>
            <EmojiEmotionsOutlined />
          </IconButton>
        </Tooltip>
        <input
          type="file"
          style={{ display: 'none ' }}
          ref={inputFileRef}
          accept=".jpg, .jpeg, .png, .bmp"
          onChange={handleFileChange}
        />
      </div>
      <GifComponent setGif={setGif} open={open} setOpen={setOpen} />
      {openEmoji && (
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          theme={Theme.DARK}
          emojiStyle={EmojiStyle.NATIVE}
          skinTonePickerLocation={SkinTonePickerLocation.SEARCH}
          skinTonesDisabled={false}
        />
      )}
    </div>
  )
}
