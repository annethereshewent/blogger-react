import { Gif } from '../../../types/post/Gif'

interface GifItemProps {
  gif: string
  originalGif: string
  setGif: (gif: Gif) => void
  handleClose: () => void
}

export function GifItem({ gif, originalGif, setGif, handleClose }: GifItemProps) {
  function handleGifClick() {
    setGif({
      src: gif,
      original_src: originalGif
    })
    handleClose()
  }

  return (
    <div className="gif-container" onClick={handleGifClick}>
      <video className="video" style={{ maxWidth: '223px' }} loop muted autoPlay>
        <source src={gif} type="video/mp4" />
      </video>
    </div>
  )
}
