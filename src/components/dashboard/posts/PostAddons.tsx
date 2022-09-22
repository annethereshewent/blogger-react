import { EmojiEmotionsOutlined, GifOutlined, ImageOutlined, YouTube } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useState } from "react"
import { IGif } from '@giphy/js-types'
import { GifComponent } from "../gifs/GifComponent"
import { Gif } from "../../../types/Gif"

interface PostAddonsProps {
  setGif: (gif: Gif) => void
}

export function PostAddons({setGif}: PostAddonsProps) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className="post-addons">
        <IconButton className="item">
          <ImageOutlined />
        </IconButton>
        <IconButton
          className="item"
          onClick={() => setOpen(true)}
        >
          <GifOutlined />
        </IconButton>
        <IconButton className="item">
          <YouTube />
        </IconButton>
        <IconButton className="item">
          <EmojiEmotionsOutlined />
        </IconButton>
      </div>
      <GifComponent
        setGif={setGif}
        open={open}
        setOpen={setOpen}
      />
    </div>
  )
}