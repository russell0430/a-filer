import React, { useCallback, useEffect } from "react"
export interface KeyBoardOption {
  keyUp?: () => void
  keyDown?: () => void
  keyLeft?: () => void
  keyRight?: () => void
  keyESC?: () => void
  keyBlank?: () => void
}
const useKeyboard = (use: boolean, option: KeyBoardOption) => {
  const handleKeyboardCallback = useCallback(
    function (this: Document, event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowUp": {
          option.keyUp && option.keyUp()
          break
        }
        case "ArrowDown": {
          option.keyDown && option.keyDown()
          break
        }
        case "ArrowLeft": {
          option.keyLeft && option.keyLeft()
          break
        }
        case "ArrowRight": {
          option.keyRight && option.keyRight()
          break
        }
        case "Escape": {
          option.keyESC && option.keyESC()
          break
        }
        case " ": {
          option.keyBlank && option.keyBlank()
          break
        }
        default: {
          console.log("unknown key")
        }
      }
    },
    [option]
  )
  useEffect(() => {
    use && document.addEventListener("keydown", handleKeyboardCallback)
    return () => {
      use && document.removeEventListener("keydown", handleKeyboardCallback)
    }
  }, [handleKeyboardCallback, use])
}

export default useKeyboard
