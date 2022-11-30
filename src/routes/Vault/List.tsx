import { createShortcut } from "@solid-primitives/keyboard"
import { useNavigate } from "@solidjs/router"
import { TbLoader } from "solid-icons/tb"
import { Component, createEffect, createSignal, For, onMount, Show } from "solid-js"
import { createSliceableList } from "../../utils/createSliceableList"
import app, { DecryptedVault, VaultItem } from "../../app"
import { copy } from "../../utils/clipboard"
import ListItem, { ITEM_ACITVE_CLASS, ITEM_INACTIVE_CLASS } from "./ListItem"
import _ from "lodash"
import ListNotFound from "./ListNotFound"
import ListEmpty from "./ListEmpty"

const { translate } = app

export let listContainerRef: HTMLUListElement | undefined
export let listSearchInputRef: HTMLInputElement | undefined
let lastActiveItemId: string | undefined
export const [searchQuery, setSearchQuery] = createSignal("")
const vaultItems = createSliceableList(app.state.vault as DecryptedVault, 100, 100)
const searchResults = createSliceableList([] as VaultItem[], 5, 5)

const List: Component = () => {
  const navigate = useNavigate()
  const setQueryDebounced = _.debounce(setSearchQuery, 650)

  onMount(() => {
    listSearchInputRef?.focus()
  })

  createShortcut(["Control", "k"], () => {
    listSearchInputRef?.focus()
  })

  createEffect(() => {
    app.searchVault(searchQuery()).then(results => {
      searchResults.set(results)
      updateActiveListItem()
    })
  })

  createEffect(() => {
    vaultItems.set(app.state.vault as DecryptedVault)
  })

  function click(evt: Event) {
    for (const eventTarget of [...evt.composedPath()]) {
      if (!(eventTarget instanceof Element)) continue
      if (eventTarget.tagName !== "BUTTON") continue

      const itemId = eventTarget.getAttribute("data-item-id")
      if (!itemId) continue
      const item = app.findVaultItem(itemId)
      if (!item) continue

      if (eventTarget.hasAttribute("data-select-item")) {
        return navigate(`/vault/${itemId}`, { replace: true })
      }
      if (eventTarget.hasAttribute("data-copy-username")) {
        return copy(item.username)
      }
      if (eventTarget.hasAttribute("data-copy-password")) {
        return copy(item.password)
      }
    }
  }

  return (
    <div class="min-w-[500px] max-w-[500px] px-4 pb-4 bg-base-100 scrollbar-thin">
      <div class="relative sticky z-10 top-0 left-0 px-8 pt-10 pb-6 right-0 flex flex-col bg-base-100">
        <input
          type="search"
          ref={listSearchInputRef}
          value={searchQuery()}
          spellcheck={false}
          class="w-full input input-bordered input-sm"
          placeholder={translate("list.searchPlaceholder")}
          oninput={event => setQueryDebounced(event.currentTarget.value)}
        />
      </div>
      <Show when={vaultItems.all().length > 0} fallback={<ListEmpty />}>
        <ul ref={listContainerRef} onclick={evt => click(evt)}>
          {searchQuery().length <= 0 ? (
            <>
              <For each={vaultItems.slice()}>{item => <ListItem item={item} />}</For>
              <Show when={vaultItems.loadable()}>
                <div class="flex mt-2">
                  <button class="btn btn-ghost gap-2 w-full" onclick={vaultItems.load}>
                    <TbLoader size="20" />{" "}
                    {translate("list.loadMoreItems", {
                      current: vaultItems.slice().length.toString(),
                      limit: vaultItems.all().length.toString(),
                    })}
                  </button>
                </div>
              </Show>
            </>
          ) : (
            <>
              <For each={searchResults.slice()} fallback={<ListNotFound />}>
                {item => <ListItem item={item} />}
              </For>
              <Show when={searchResults.loadable()}>
                <div class="flex mt-2">
                  <button class="btn btn-ghost gap-2 w-full" onclick={searchResults.load}>
                    <TbLoader size="20" />{" "}
                    {translate("vault.loadMoreResults", {
                      current: searchResults.slice().length.toString(),
                      limit: searchResults.all().length.toString(),
                    })}
                  </button>
                </div>
              </Show>
            </>
          )}
        </ul>
      </Show>
    </div>
  )
}

export function updateActiveListItem(activeId = lastActiveItemId) {
  if (!activeId) return
  for (const child of [...(listContainerRef?.children || [])]) {
    console.log(child.tagName)
    if (child.tagName === "BUTTON") {
      const active = child.id === activeId
      child.classList[active ? "add" : "remove"](ITEM_ACITVE_CLASS)
      child.classList[active ? "remove" : "add"](ITEM_INACTIVE_CLASS)
    }
  }
  lastActiveItemId = activeId
}

export default List
