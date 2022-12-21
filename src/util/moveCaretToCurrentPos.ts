export function moveCaretToCurrentPos(div: HTMLDivElement, callback: () => void) {
  // const currentPos = getCaretCharacterOffsetWithin(div)
  // const range = document.createRange()
  // range.selectNodeContents(div)
  // range.collapse(false)

  let sel = window.getSelection()
  let endOffset = getCaretPosition(div)

  console.log(endOffset)

  callback()

  let range = window.getSelection()?.getRangeAt(0)

  if (range != null) {
    let caretRange = range.cloneRange()
    caretRange.selectNodeContents(div)

    caretRange.setStart(caretRange.startContainer, endOffset - 1)
    caretRange.setEnd(caretRange.endContainer, endOffset)

    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(caretRange)
  }
}

function getCaretPosition(editableDiv: HTMLDivElement) {
  let caretPos = 0,
    sel,
    range

  sel = window.getSelection()
  if (sel?.rangeCount) {
    range = sel.getRangeAt(0)
    if (range.commonAncestorContainer.parentNode == editableDiv) {
      caretPos = range.endOffset
    }
  }
  return caretPos
}
