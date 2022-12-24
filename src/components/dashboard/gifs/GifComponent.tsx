import {
  Card,
  CardContent,
  CircularProgress,
  InputAdornment,
  Modal,
  TextField
} from '@mui/material'
import { modalStyleXL } from '../../../util/modalStyles'
import { useState } from 'react'
import { CloseButton } from '../../shared/CloseButton'
import { SearchOutlined } from '@mui/icons-material'
import { GifTenorService } from '../../../services/GifTenorService'
import { GifTenorResult } from '../../../types/post/GifTenorResult'
import { GifResults } from './GifResults'
import { Gif } from '../../../types/post/Gif'

interface GifComponentProps {
  setGif: (gif: Gif) => void
  open: boolean
  setOpen: (open: boolean) => void
}

export function GifComponent({ setGif, open, setOpen }: GifComponentProps) {
  const [gifResults, setGifResults] = useState<GifTenorResult[]>([])
  const [loading, setLoading] = useState(false)

  let timeout: NodeJS.Timeout | null = null

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (timeout != null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(async () => {
      try {
        setGifResults([])

        if (e.target.value !== '') {
          setLoading(true)
          const result = await new GifTenorService().searchGifs(e.target.value, 1)

          setGifResults(result.data.results)
        }
      } catch (e) {
        // @TODO
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  function handleClose() {
    setGifResults([])
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={handleClose}>
      {/* prettier-ignore */}
      <Card
        className="gif-search-card"
        style={{ ...modalStyleXL, overflow: 'scroll', height: '400px', width: '700px' }}
      >
        <CardContent>
          <CloseButton handleClose={() => setOpen(false)} />
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
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress style={{ textAlign: 'center' }} color="secondary" />
            </div>
          )}
          <GifResults gifResults={gifResults} setGif={setGif} handleClose={handleClose} />
        </CardContent>
      </Card>
    </Modal>
  )
}
