import { GiphyFetch } from "@giphy/js-fetch-api"
import { Grid } from "@giphy/react-components"
import { Card, CardContent, InputAdornment, Modal, TextField } from "@mui/material"
import { modalStyleLarge } from "../../../util/modalStyles"
import { IGif } from '@giphy/js-types'
import { SyntheticEvent, useState } from "react"
import { CloseButton } from "../../shared/CloseButton"
import { SearchOutlined } from "@mui/icons-material"
import { GifTenorService } from "../../../services/GifTenorService"
import { GifTenorResult } from "../../../types/GifTenorResult"

interface GifComponentProps {
  gifs: IGif[],
  setGifs: (gifs: IGif[]) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY || ''

export function GifComponent({gifs, setGifs, open, setOpen}: GifComponentProps) {
  const gf = new GiphyFetch(GIPHY_API_KEY)

  const [term, setTerm] = useState('')

  let timeout: NodeJS.Timeout|null = null

  function fetchGifs(offset: number) {
    return gf.search(term, { offset, limit: 20, type: 'videos' })
  }

  function parseGif(gif: IGif, e: SyntheticEvent<HTMLElement, Event>) {
    e.preventDefault()

    const currentGifs = [...gifs]

    currentGifs.push(gif)

    setGifs(currentGifs)
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (timeout != null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(async ()=> {
      setTerm(e.target.value)
      const result = await new GifTenorService().searchGifs(e.target.value, 1)

      console.log(result.data.results.map((media: GifTenorResult) => media.media_formats.mp4.url))
    }, 500)
  }


  function handleClose() {
    setOpen(false)
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Card className="gif-search-card" style={{...modalStyleLarge, overflow: 'scroll', height: '400px' }}>
        <CardContent>
          <CloseButton handleClose={() => setOpen(false)}/>
          <TextField
            className="gif-search-field"
            placeholder="Search GIFS"
            onChange={handleTextChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              )
            }}
          />
          <Grid
            width={500}
            columns={3}
            fetchGifs={fetchGifs}
            key={term}
            onGifClick={parseGif}
          />
        </CardContent>
      </Card>
    </Modal>

  )
}