import { GifTenorResult } from "../../../types/GifTenorResult"
import Masonry from "react-responsive-masonry"
import { GifItem } from "./GifItem"


interface GifResultsProps {
  gifResults: GifTenorResult[]
  setGif: (gif: string) => void
  handleClose: () => void
}

export function GifResults({gifResults, setGif, handleClose}: GifResultsProps) {
  return (

    <Masonry columnsCount={3}>
      { gifResults.map(result => {

        const gif = result.media_formats.loopedmp4?.url || result.media_formats.mp4?.url || ''

        return <GifItem
          gif={gif}
          key={gif}
          setGif={setGif}
          handleClose={handleClose}
        />
      })}
    </Masonry>

  )
}