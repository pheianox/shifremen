import { TbBolt, TbCheck, TbCopy, TbEye, TbEyeOff, TbX } from "solid-icons/tb"
import { Component, createSignal, For, onMount, Show } from "solid-js"
import { passwordHidden, togglePasswordHidden } from "./Sidebar"
import app, { DecryptedVault, VaultItem } from "../../app"
import ConfirmCancelChangesModal from "../../modals/ConfirmCancelChangesModal"
import { copy } from "../../utils/clipboard"
import Passgen from "../../comps/Passgen"
import _ from "lodash"

const { translate } = app

export const SidebarEdit: Component<{
  item: VaultItem
  onSave: () => void
  onRemove: () => void
  onDiscard: () => void
}> = props => {
  const [passgenShown, setPassgenShown] = createSignal(!props.item.createdAt)
  const [saving, setSaving] = createSignal(false)
  const [clone, setClone] = createSignal({ ...props.item })
  const serviceFieldBlank = () => clone().service.length <= 0
  const services = () => [...new Set([...(app.state.vault as DecryptedVault).map(x => x.service)])]
  let serviceFieldRef: HTMLInputElement | undefined

  async function save() {
    setSaving(true)
    const updatedItem = { ...clone() }
    const property = updatedItem.createdAt ? "updatedAt" : "createdAt"
    app.saveVaultItem({ ...updatedItem, [property]: new Date().toUTCString() })
    await app.saveState()
    setSaving(false)
    props.onSave()
  }

  function cancel() {
    if (clone().createdAt) {
      props.onDiscard()
    } else {
      app.removeVaultItem(props.item)
      props.onRemove()
    }
  }

  async function preCancel() {
    if (_.isEqual({ ...clone() }, { ...props.item })) {
      cancel()
    } else {
      if (await app.showModal(ConfirmCancelChangesModal, {})) {
        cancel()
      }
    }
  }

  function copy_(prop: keyof VaultItem) {
    return () => copy(String(clone()[prop]))
  }

  function set(prop: keyof VaultItem) {
    return (evt: any) => setClone(clone => ({ ...clone, [prop]: evt.currentTarget.value }))
  }

  onMount(() => serviceFieldRef?.focus())

  return (
    <>
      <div class="mt-6 mb-6 flex justify-start items-center">
        <button
          onclick={save}
          tabindex="4"
          classList={{
            "pointer-events-none opacity-40": serviceFieldBlank(),
            loading: saving(),
          }}
          class="btn btn-sm text-success btn-ghost gap-2"
        >
          <TbCheck size="15" />
          {translate("sidebar.save")}
        </button>
        <button tabindex="4" onclick={preCancel} class="btn btn-sm text-error btn-ghost gap-2">
          <TbX size="15" /> {translate("sidebar.cancel")}
        </button>
      </div>
      <div class="flex-1 flex flex-col gap-2">
        {/* Service */}
        <div>
          <label class="label text-sm">
            {translate("sidebar.service")} {serviceFieldBlank() && "*"}
          </label>
          <div class="flex-1 flex gap-2 ">
            <input
              type="text"
              ref={serviceFieldRef}
              value={clone().service}
              tabindex="1"
              oninput={set("service")}
              list="datalist"
              placeholder={translate("sidebar.serviceTypeHere")}
              class="flex-1 input input-sm input-bordered"
            />
            <datalist id="datalist">
              <For each={services()}>{service => <option>{service}</option>}</For>
            </datalist>
            <button onclick={copy_("service")} class="btn btn-sm btn-ghost" tabindex="2">
              <TbCopy size="15" />
            </button>
          </div>
        </div>
        {/* Username */}
        <div>
          <label class="label text-sm">{translate("sidebar.username")}</label>
          <div class="flex-1 flex gap-2 ">
            <input
              type="text"
              tabindex="1"
              value={clone().username || ""}
              oninput={set("username")}
              class="flex-1 input input-sm input-bordered"
            />
            <button onclick={copy_("username")} class="btn btn-sm btn-ghost" tabindex="2">
              <TbCopy size="15" />
            </button>
          </div>
        </div>
        {/* Password */}
        <div>
          <label class="label text-sm">{translate("sidebar.password")}</label>
          <div class="flex-1 flex gap-2">
            <div class="flex flex-col gap-2 w-full">
              <textarea
                rows="6"
                tabindex="1"
                spellcheck={false}
                class="textarea textarea-bordered flex-1"
                style={passwordHidden() ? "color: transparent;text-shadow: 0 0 10px rgba(0,0,0,0.5);" : ""}
                value={clone().password || ""}
                oninput={set("password")}
              />
              <Show when={passgenShown()}>
                <Passgen onGenerate={output => set("password")({ currentTarget: { value: output } })} />
              </Show>
            </div>
            <div class="flex flex-col">
              <button tabindex="2" class="btn btn-sm btn-ghost" onclick={copy_("password")}>
                <TbCopy size="15" />
              </button>

              <button
                tabindex="2"
                class="btn btn-sm btn-ghost"
                classList={{ "text-error": passgenShown() }}
                onclick={() => setPassgenShown(x => !x)}
              >
                <TbBolt size="15" />
              </button>

              <button tabindex="2" class="swap btn btn-sm btn-ghost" onclick={togglePasswordHidden}>
                <TbEyeOff size="15" classList={{ hidden: !passwordHidden() }} />
                <TbEye size="15" classList={{ hidden: passwordHidden() }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
