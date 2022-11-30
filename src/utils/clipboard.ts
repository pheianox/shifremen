import copy_ from "copy-to-clipboard"

export function copy(text?: string) {
  if (!text) return
  if (text.trim().length <= 0) return
  copy_(text)
}
