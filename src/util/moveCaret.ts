export function moveCaretToEnd(div: HTMLDivElement) {
  const range = document.createRange()
  range.selectNodeContents(div)
  range.collapse(false)

  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}

export function moveCaretAtEmoji(div: HTMLDivElement, emojiClass: string) {
  const range = document.createRange()
  const element = document.getElementsByClassName(emojiClass)[0]

  range.selectNodeContents(div)

  if (element.nextSibling != null) {
    range.setStart(element.nextSibling, 0)
    range.setEnd(element.nextSibling, 0)
  } else if (element.parentNode != null) {
    range.selectNodeContents(element.parentNode)
  }

  range.collapse(false)

  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}
