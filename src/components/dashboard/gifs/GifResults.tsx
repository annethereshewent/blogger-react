import { GifTenorResult } from "../../../types/GifTenorResult"
import Masonry from "react-responsive-masonry"
import { GifItem } from "./GifItem"


interface GifResultsProps {
  gifResults: GifTenorResult[]
  setGif: (gif: string) => void
  setOpen: (open: boolean) => void
}

export function GifResults({gifResults, setGif, setOpen}: GifResultsProps) {
  return (

    <Masonry columnsCount={3}>
      { gifResults.map(result => {

        const gif = result.media_formats.loopedmp4?.url || result.media_formats.mp4?.url || ''

        return <GifItem
          gif={gif}
          key={gif}
          setGif={setGif}
          setOpen={setOpen}
        />
      })}
    </Masonry>

  )
}