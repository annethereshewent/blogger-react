export interface GifTenorResult {
  media_formats: GifTenorMediaFormat
}

interface GifTenorMediaFormat {
  mp4: GifTenorFile
  gif: GifTenorFile
}

interface GifTenorFile {
  url: string
}