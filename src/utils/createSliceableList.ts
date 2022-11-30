import { createSignal } from "solid-js"

export function createSliceableList<T>(items = [] as T[], initialSize_ = 15, loadSize_ = 20) {
  const [all, set] = createSignal(items)
  const [cursor, setCursor] = createSignal(initialSize_)
  const slice = () => all().slice(0, cursor())
  const loadable = () => slice().length < all().length

  function load() {
    const current = cursor() + loadSize_
    const total = all().length
    setCursor(current <= total ? current : total)
  }

  function unload() {
    setCursor(initialSize_)
  }

  return { slice, all, load, unload, loadable, set }
}
