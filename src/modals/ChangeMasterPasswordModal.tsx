import { TbAlertTriangle, TbCheck, TbEye, TbEyeOff, TbX } from "solid-icons/tb"
import { createSignal, For } from "solid-js"
import app, { Modal } from "../app"
import { MATER_PASSWORD_REQUIREMENTS } from "../cfg"

const { translate } = app

interface Props {
  onTry: (oldPassword: string, newPassword: string) => boolean
}

const ChangeMasterPasswordModal: Modal<true | null, Props> = props => {
  const [passwordsHidden, setPasswordsHidden] = createSignal(true)
  const [oldPassword, setOldPassword] = createSignal("")
  const [newPassword, setNewPassword] = createSignal("")
  const [error, setError] = createSignal<string>()
  const valid = () => MATER_PASSWORD_REQUIREMENTS.every(req => req.test(newPassword()))

  function onInput() {
    setError(undefined)
  }

  function togglePasswordsHidden() {
    setPasswordsHidden(x => !x)
  }

  async function match() {
    const oldPassword_ = oldPassword()
    const newPassword_ = newPassword()
    if (props.onTry(oldPassword_, newPassword_)) {
      props.onClose(true)
    } else {
      setError(translate("modals.cmpm.error"))
    }
  }

  function cancel() {
    props.onClose(null)
  }

  return (
    <div class="modal modal-open modal-bottom sm:modal-middle z-50 " onclick={cancel}>
      <div class="relative bg-base-100 w-[400px] p-8 rounded-lg flex flex-col gap-4" onclick={evt => evt.stopPropagation()}>
        <h1 class="text-xl font-bold">{translate("modals.cmpm.title")}</h1>
        <div>
          <label for="newpass" class="label font-bold text-sm">
            {translate("modals.cmpm.newPassword")}
          </label>
          <div class="flex gap-2 relative">
            <input
              id="newpass"
              type={passwordsHidden() ? "password" : "text"}
              placeholder={translate("typeHere")}
              class="input input-sm input-bordered flex-1"
              value={newPassword()}
              oninput={evt => {
                setNewPassword(evt.currentTarget.value as string)
                onInput()
              }}
              tabindex="2"
            />
            <button
              class="absolute top-0 right-0 bottom-0 swap btn btn-sm btn-ghost"
              onclick={togglePasswordsHidden}
              tabindex="2"
            >
              <TbEyeOff size="15" classList={{ hidden: !passwordsHidden() }} />
              <TbEye size="15" classList={{ hidden: passwordsHidden() }} />
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <For each={MATER_PASSWORD_REQUIREMENTS}>
            {({ name, test }) => (
              <div class="flex gap-2 items-center transition" classList={{ "opacity-50": test(newPassword()) }}>
                <label class="swap pointer-events-none">
                  <input tabIndex="-1" type="checkbox" checked={!test(newPassword())} />
                  <div class="swap-on">
                    <TbX size="15" class="stroke-error" />{" "}
                  </div>
                  <div class="swap-off">
                    <TbCheck size="15" class="stroke-success" />
                  </div>
                </label>
                {/* @ts-ignore */}
                <span class="text-sm">{translate(...name)}</span>
              </div>
            )}
          </For>
        </div>
        <div>
          <label for="oldpass" class="label font-bold text-sm pt-0">
            {translate("modals.cmpm.oldPassword")}
          </label>
          <div class="flex gap-2 relative">
            <input
              id="oldpass"
              type={passwordsHidden() ? "password" : "text"}
              placeholder={translate("typeHere")}
              class="input input-sm input-bordered flex-1"
              classList={{ "input-error": !!error() }}
              value={oldPassword()}
              oninput={evt => {
                setOldPassword(evt.currentTarget.value as string)
                onInput()
              }}
              tabindex="2"
            />
            <button
              class="absolute top-0 right-0 bottom-0 swap btn btn-sm btn-ghost"
              onclick={togglePasswordsHidden}
              tabindex="2"
            >
              <TbEyeOff size="15" classList={{ hidden: !passwordsHidden() }} />
              <TbEye size="15" classList={{ hidden: passwordsHidden() }} />
            </button>
          </div>
        </div>
        <div class="flex justify-between gap-2 mt-2">
          <p class="text-sm text-error flex gap-2 items-center" classList={{ invisible: !error() }}>
            <TbAlertTriangle size="15" />
            {error()}
          </p>
          <button
            class="btn btn-sm gap-2"
            onclick={match}
            classList={{
              "opacity-100": valid(),
              "pointer-events-none opacity-20": !valid(),
            }}
          >
            {translate("modals.cmpm.change")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChangeMasterPasswordModal
