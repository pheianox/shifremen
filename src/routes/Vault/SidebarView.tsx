import ConfirmRemoveItemModal from "../../modals/ConfirmRemoveItemModal"
import { TbCopy, TbEye, TbEyeOff, TbPencil, TbTrash } from "solid-icons/tb"
import { passwordHidden, togglePasswordHidden } from "./Sidebar"
import { Component, Show } from "solid-js"
import { copy } from "../../utils/clipboard"
import app, { VaultItem } from "../../app"

const { translate, formatDate } = app

export const SidebarView: Component<{
  item: VaultItem
  onEdit: () => void
  onRemove: () => void
}> = props => {
  function copy_(prop: keyof VaultItem) {
    return () => copy(String(props.item[prop]))
  }

  function edit() {
    props.onEdit()
  }

  async function remove() {
    if (await app.showModal(ConfirmRemoveItemModal, {})) {
      app.removeVaultItem(props.item)
      props.onRemove()
    }
  }

  return (
    <>
      <div class="mt-6 mb-6 flex justify-start items-center">
        <button onclick={edit} class="btn btn-sm text-secondary btn-ghost gap-2">
          <TbPencil size="15" /> {translate("sidebar.edit")}
        </button>
        <button onclick={remove} class="btn btn-sm text-error btn-ghost gap-2">
          <TbTrash size="15" /> {translate("sidebar.delete")}
        </button>
      </div>
      <div class="flex-1 flex flex-col gap-2">
        {/* Service */}
        <div>
          <label class="label text-sm">{translate("sidebar.service")}</label>
          <div class="flex-1 flex gap-2 ">
            <input
              type="text"
              readonly={true}
              value={props.item.service}
              class="flex-1 input input-sm input-bordered focus:outline-none"
            />
            <button onclick={copy_("service")} class="btn btn-sm btn-ghost" tabindex="2">
              <TbCopy size="15" />
            </button>
          </div>
        </div>
        {/* Username */}
        <Show when={props.item.username}>
          <div>
            <label class="label text-sm">{translate("sidebar.username")}</label>
            <div class="flex-1 flex gap-2 ">
              <input
                type="text"
                readonly={true}
                value={props.item.username}
                class="flex-1 input input-sm input-bordered focus:outline-none"
              />
              <button onclick={copy_("username")} class="btn btn-sm btn-ghost" tabindex="2">
                <TbCopy size="15" />
              </button>
            </div>
          </div>
        </Show>
        {/* Password */}
        <Show when={props.item.password}>
          <div>
            <label class="label text-sm">{translate("sidebar.password")}</label>
            <div class="flex-1 flex gap-2">
              <div class="flex flex-col gap-2 w-full">
                <textarea
                  rows="6"
                  tabindex="1"
                  readonly={true}
                  spellcheck={false}
                  class="textarea textarea-bordered flex-1"
                  onmousedown={evt => passwordHidden() && evt.preventDefault()}
                  style={passwordHidden() ? "color: transparent;text-shadow: 0 0 10px rgba(0,0,0,0.5);" : ""}
                  value={passwordHidden() ? "*******" : props.item.password}
                />
              </div>
              <div class="flex flex-col">
                <button tabindex="2" class="btn btn-sm btn-ghost" onclick={copy_("password")}>
                  <TbCopy size="15" />
                </button>
                <button tabindex="2" class="swap btn btn-sm btn-ghost" onclick={togglePasswordHidden}>
                  <TbEyeOff size="15" classList={{ hidden: !passwordHidden() }} />
                  <TbEye size="15" classList={{ hidden: passwordHidden() }} />
                </button>
              </div>
            </div>
          </div>
        </Show>
      </div>
      <div class="collapse collapse-plus">
        <input type="checkbox" class="peer" />
        <div class="collapse-title label text-sm text-left">{translate("sidebar.metadata")}</div>
        <div class="collapse-content">
          <Show when={props.item.createdAt}>
            <div class="text-sm">
              {translate("sidebar.createdAt")}: {formatDate(props.item.createdAt as string)}
            </div>
          </Show>
          <Show when={props.item.updatedAt}>
            <div class="text-sm">
              {translate("sidebar.updatedAt")}: {formatDate(props.item.updatedAt as string)}
            </div>
          </Show>
        </div>
      </div>
    </>
  )
}
