import { GifTenorResult } from "../../../types/GifTenorResult"
import Masonry from "react-responsive-masonry"
import { GifItem } from "./GifItem"
import { Gif } from "../../../types/Gif"


interface GifResultsProps {
  gifResults: GifTenorResult[]
  setGif: (gif: Gif) => void
  handleClose: () => void
}

export function GifResults({gifResults, setGif, handleClose}: GifResultsProps) {
  return (

    <Masonry columnsCount={3}>
      { gifResults.map(result => {

        const gif = result.media_formats.loopedmp4?.url || result.media_formats.mp4?.url || ''

        return <GifItem
          gif={gif}
          originalGif={result.media_formats.gif?.url || ''}
          key={gif}
          setGif={setGif}
          handleClose={handleClose}
        />
      })}
    </Masonry>

  )
}