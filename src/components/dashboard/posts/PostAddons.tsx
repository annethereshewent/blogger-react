import { EmojiEmotionsOutlined, GifOutlined, ImageOutlined, YouTube } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useRef, useState } from 'react'
import { GifComponent } from '../gifs/GifComponent'
import { Gif } from '../../../types/Gif'

interface PostAddonsProps {
  setGif: (gif: Gif) => void
}

export function PostAddons({ setGif }: PostAddonsProps) {
  const [open, setOpen] = useState(false)
  const [previewImg, setImg] = useState('')
  const inputFileRef = useRef<HTMLInputElement>(null)

  function openFileUpload() {
    inputFileRef?.current?.focus()
    inputFileRef?.current?.click()
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files != null) {
      const file = e.target.files[0]

      const url = URL.createObjectURL(file)

      setImg(url)
    }
  }

  return (
    <div>
      <div className="post-addons">
        <IconButton className="item" onClick={() => openFileUpload()}>
          <ImageOutlined />
        </IconButton>
        <IconButton className="item" onClick={() => setOpen(true)}>
          <GifOutlined />
        </IconButton>
        <IconButton className="item">
          <YouTube />
        </IconButton>
        <IconButton className="item">
          <EmojiEmotionsOutlined />
        </IconButton>
        <input
          type="file"
          style={{ display: 'none ' }}
          ref={inputFileRef}
          accept=".jpg, .jpeg, .png, .bmp"
          onChange={handleFileChange}
        />
      </div>
      <GifComponent setGif={setGif} open={open} setOpen={setOpen} />
      <img src={previewImg} />
    </div>
  )
}
