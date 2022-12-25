import twemoji from 'twemoji'
import { moveCaretAtEmoji } from './moveCaret'

export function updatePostField(
  e: React.ChangeEvent<HTMLDivElement>,
  emojiNumber: number,
  setEmojiNumber: (emojiNumber: number) => void,
  setPost: (post: string) => void,
  editableDiv: HTMLDivElement | null
) {
  // this will match all emojis and prevent false matches like numbers or # * (which \p${Emoji}` matches)
  const emojiRegex = /(?=\p{Emoji})(?!\p{Number})(?!\*)(?!#)/u
  if (emojiRegex.test(e.currentTarget.innerText)) {
    if (editableDiv != null) {
      twemoji.parse(editableDiv, {
        folder: 'svg',
        ext: '.svg',
        className: `emoji emoji-${emojiNumber}`
      })
      moveCaretAtEmoji(editableDiv, `emoji-${emojiNumber}`)
      setEmojiNumber(emojiNumber + 1)
    }
  }
  setPost(e.currentTarget.innerHTML || '')
}
