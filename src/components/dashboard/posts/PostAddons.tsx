import { EmojiEmotionsOutlined, GifOutlined, ImageOutlined, YouTube } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Gif, Grid } from "@giphy/react-components"
import { GiphyFetch } from "@giphy/js-fetch-api"
import { SyntheticEvent, useState } from "react"
import { IGif } from '@giphy/js-types'
import { GifComponent } from "./GifComponent"

interface PostAddonsProps {
  gifs: IGif[]
  setGifs: (gifs: IGif[]) => void
}

export function PostAddons({gifs, setGifs}: PostAddonsProps) {
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
        gifs={gifs}
        setGifs={setGifs}
        open={open}
        setOpen={setOpen}
      />
    </div>
  )
}