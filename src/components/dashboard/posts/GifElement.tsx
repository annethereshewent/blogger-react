import { useRef, useState } from "react"

interface GifElementProps {
  src: string
}

export function GifElement({src}: GifElementProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setPlaying] = useState(true)


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

  return (
    <div className="gif-element" onClick={handleClick}>
      <video
        key={src}
        ref={videoRef}
        onContextMenu={(e: React.MouseEvent<HTMLVideoElement>) => e.preventDefault()}
        className="video"
        style={{ maxWidth: '400px' }}
        loop
        muted
        autoPlay
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}