import { EmojiEmotionsOutlined, GifOutlined, ImageOutlined, YouTube } from "@mui/icons-material";
import { IconButton } from "@mui/material";


export function PostAddons() {
  return (
    <div className="post-addons">
      <IconButton className="item">
        <ImageOutlined />
      </IconButton>
      <IconButton className="item">
        <GifOutlined />
      </IconButton>
      <IconButton className="item">
        <YouTube />
      </IconButton>
      <IconButton className="item">
        <EmojiEmotionsOutlined />
      </IconButton>
    </div>
  )
}