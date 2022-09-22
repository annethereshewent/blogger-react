import { Card, CardContent, InputAdornment, Modal, TextField } from "@mui/material"
import { modalStyleXL } from "../../../util/modalStyles"
import { useState } from "react"
import { CloseButton } from "../../shared/CloseButton"
import { SearchOutlined } from "@mui/icons-material"
import { GifTenorService } from "../../../services/GifTenorService"
import { GifTenorResult } from "../../../types/GifTenorResult"
import { GifResults } from "./GifResults"

interface GifComponentProps {
  setGif: (gif: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY || ''

export function GifComponent({setGif, open, setOpen}: GifComponentProps) {
  const [term, setTerm] = useState('')
  const [gifResults, setGifResults] = useState<GifTenorResult[]>([])

  let timeout: NodeJS.Timeout|null = null

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (timeout != null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(async ()=> {
      setTerm(e.target.value)
      const result = await new GifTenorService().searchGifs(e.target.value, 1)

      setGifResults(result.data.results)
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
      <Card className="gif-search-card" style={{...modalStyleXL, overflow: 'scroll', height: '400px' }}>
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
          <GifResults
            gifResults={gifResults}
            setGif={setGif}
            setOpen={setOpen}
          />
        </CardContent>
      </Card>
    </Modal>

  )
}