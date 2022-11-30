import { TbAsterisk, TbKey, TbLockSquare, TbUser } from "solid-icons/tb"
import { Component, Show } from "solid-js"
import app, { VaultItem } from "../../app"

const { translate } = app

export const ITEM_ACITVE_CLASS = "border-neutral"
export const ITEM_INACTIVE_CLASS = "border-transparent"
export const ITEM_ICON_SIZE = 30
export const ITEM_CONTROL_ICONS_SIZE = 18

const ListItem: Component<{ item: VaultItem }> = props => {
  const draft = !props.item.createdAt
  return (
    <button
      id={props.item.id}
      data-select-item
      data-item-id={props.item.id}
      class={`flex w-full justify-between p-4 border-l-4 rounded-lg select-none cursor-pointer hover:bg-base-200 transition-all duration-100 ${ITEM_INACTIVE_CLASS}`}
      tabindex="0"
    >
      {draft ? (
        <>
          <div class="flex gap-6 items-center">
            <div class="grid place-items-center">
              <TbAsterisk size={ITEM_ICON_SIZE} />
            </div>
            {translate("list.draftItemText")}
          </div>
        </>
      ) : (
        <>
          <div class="flex gap-6 items-center">
            <div class="grid place-items-center">
              <TbLockSquare size={ITEM_ICON_SIZE} />
            </div>
            <Show when={props.item.username} fallback={props.item.service}>
              <span class="flex-1 flex flex-col items-start justify-center gap-1">
                <span class="whitespace-nowrap truncate">{props.item.service}</span>
                <span class="text-sm text-accent-focus whitespace-nowrap truncate">{props.item.username}</span>
              </span>
            </Show>
          </div>
          <div>
            <Show when={props.item.username}>
              <button class="btn btn-ghost" data-copy-username data-item-id={props.item.id}>
                <TbUser size={ITEM_CONTROL_ICONS_SIZE} />
              </button>
            </Show>
            <Show when={props.item.password}>
              <button class="btn btn-ghost" data-copy-password data-item-id={props.item.id}>
                <TbKey size={ITEM_CONTROL_ICONS_SIZE} />
              </button>
            </Show>
          </div>
        </>
      )}
    </button>
  )
}

export default ListItem
