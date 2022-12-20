export function moveCaretToEnd(div: HTMLDivElement) {
  const range = document.createRange()
  range.selectNodeContents(div)
  range.collapse(false)

  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}
