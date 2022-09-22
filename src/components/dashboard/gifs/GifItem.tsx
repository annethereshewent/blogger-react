
interface GifItemProps {
  gif: string
  setGif: (gif: string) => void
  setOpen: (open: boolean) => void
}


export function GifItem({gif, setGif, setOpen}: GifItemProps) {


  function handleGifClick() {
    setGif(gif)
    setOpen(false)
  }

  return (
    <div className="gif-container" onClick={handleGifClick}>
      <video className="video" style={{ maxWidth: '223px' }} loop muted autoPlay>
        <source src={gif} type="video/mp4" />
      </video>
    </div>
  )
}