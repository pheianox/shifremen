import { useNavigate, useParams } from "@solidjs/router"
import { Component, createEffect, createSignal, Show } from "solid-js"
import app, { VaultItem } from "../../app"
import { usePasswordField } from "../../utils/usePasswordField"
import { updateActiveListItem } from "./List"
import { SidebarEdit } from "./SidebarEdit"
import { SidebarView } from "./SidebarView"

export const { passwordHidden, togglePasswordHidden } = usePasswordField("")

const Sidebar: Component = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [editing, setEditing] = createSignal(false)
  const [item, setItem] = createSignal(undefined as unknown as VaultItem)

  createEffect(() => {
    const id = params.id
    if (!id) return close()

    updateActiveListItem(id)

    const fetchedItem = app.findVaultItem(id)
    if (!fetchedItem) return close()

    setItem(fetchedItem)
    setEditing(!fetchedItem.createdAt)
  })

  function onEdit() {
    setEditing(true)
  }

  async function onSave() {
    setEditing(false)
  }

  async function onRemove() {
    close()
  }

  function onDiscard() {
    setEditing(false)
  }

  function close() {
    navigate("/vault")
  }

  return (
    <div class="min-w-[500px] max-w-[500px] p-4 h-full flex flex-col bg-base-100">
      <Show when={item && item()} fallback={null}>
        {editing() ? (
          <SidebarEdit item={item()} onSave={onSave} onDiscard={onDiscard} onRemove={onRemove} />
        ) : (
          <SidebarView item={item()} onEdit={onEdit} onRemove={onRemove} />
        )}
      </Show>
    </div>
  )
}

export default Sidebar
