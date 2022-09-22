import { Menu, MenuItem } from "@mui/material"
import { useRef, useState } from "react"

interface GifElementProps {
  src: string
  originalSrc: string
}

export function GifElement({src, originalSrc}: GifElementProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setPlaying] = useState(true)
  const [menuOpen, setMenu] = useState(false)


  function handleClick() {
    if (videoRef != null) {
      if (isPlaying) {
        videoRef.current?.pause()
      } else {
        videoRef.current?.play()
      }

      setPlaying(!isPlaying)
    }
  }

  function openMenu(e: React.MouseEvent<HTMLVideoElement>) {
    e.preventDefault()
    setMenu(true)
  }

  function closeMenu(e: React.FocusEvent<HTMLInputElement>) {
    setMenu(false)
  }

  function getGifUrl() {
    navigator.clipboard.writeText(originalSrc)

    setMenu(false)
  }

  return (
    <div
      className="gif-element"
      onClick={handleClick}
    >
      <video
        key={src}
        ref={videoRef}
        onContextMenu={openMenu}
        className="video"
        style={{ maxWidth: '400px' }}
        loop
        muted
        autoPlay
      >
        <source src={src} type="video/mp4" />
      </video>
      <Menu
        open={menuOpen}
        onBlur={closeMenu}
        anchorEl={videoRef.current}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={getGifUrl}>Copy GIF url</MenuItem>
      </Menu>
    </div>
  )
}