import { useEffect } from "react"


interface GifElementProps {
  src: string
}

export function GifElement({src}: GifElementProps) {
  return (
    <div className="gif-element">
      <video key={src} className="video" style={{ maxWidth: '400px' }} loop muted autoPlay>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}