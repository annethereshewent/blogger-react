
interface GifItemProps {
  gif: string
  setGif: (gif: string) => void
  handleClose: () => void
}


export function GifItem({gif, setGif, handleClose}: GifItemProps) {


  function handleGifClick() {
    setGif(gif)
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