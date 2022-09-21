import { GiphyFetch } from "@giphy/js-fetch-api"
import { Grid } from "@giphy/react-components"
import { Card, CardContent, CardHeader, Modal } from "@mui/material"
import { modalStyleLarge } from "../../../util/modalStyles"
import { IGif } from '@giphy/js-types'
import { SyntheticEvent } from "react"


interface GifComponentProps {
  gifs: IGif[],
  setGifs: (gifs: IGif[]) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export function GifComponent({gifs, setGifs, open, setOpen}: GifComponentProps) {
  const gf = new GiphyFetch('X8gfWYGdfGPrltWvnXDmoV4UUi5NeTxL')

  function fetchGifs(offset: number) {
    return gf.trending({ offset, limit: 10 })
  }

  function parseGif(gif: IGif, e: SyntheticEvent<HTMLElement, Event>) {
    e.preventDefault()

    const currentGifs = [...gifs]

    currentGifs.push(gif)

    setGifs(currentGifs)
  }


  function handleClose() {
    setOpen(false)
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card style={{...modalStyleLarge, overflow: 'scroll', height: '400px' }}>
        <CardHeader>
          <div>Hello World! TBD</div>
        </CardHeader>
        <CardContent>
          <Grid
            width={500}
            columns={3}
            fetchGifs={fetchGifs}
            onGifClick={parseGif}
          />
        </CardContent>
      </Card>
    </Modal>

  )
}