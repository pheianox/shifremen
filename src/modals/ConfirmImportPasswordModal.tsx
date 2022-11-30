import { TbAlertTriangle, TbEye, TbEyeOff } from "solid-icons/tb"
import { usePasswordField } from "../utils/usePasswordField"
import app, { Modal } from "../app"
import { createSignal } from "solid-js"

const { translate } = app

interface Props {
  onMatch: (password: string) => Promise<boolean>
}

const ConfirmImportPasswordModal: Modal<string | null, Props> = props => {
  const { password, passwordHidden, setPassword, togglePasswordHidden } = usePasswordField("")
  const [error, setError] = createSignal<string>()

  function input(password: string) {
    setError(undefined)
    setPassword(password)
  }

  async function match() {
    const password_ = password()
    if (await props.onMatch(password_)) {
      props.onClose(password_)
    } else {
      setError(translate("modals.cipm.error"))
    }
  }

  function cancel() {
    props.onClose(null)
  }

  return (
    <div class="modal modal-open modal-bottom sm:modal-middle z-50 " onclick={cancel}>
      <div class="relative bg-base-100 w-[400px] p-8 rounded-lg flex flex-col gap-4" onclick={evt => evt.stopPropagation()}>
        <h1 class="text-xl font-bold">{translate("modals.cipm.title")}</h1>
        <div class="flex flex-col gap-3">
          <p>{translate("modals.cipm.descr")}</p>
        </div>
        <div class="flex gap-2 relative">
          <input
            type={passwordHidden() ? "password" : "text"}
            placeholder={translate("typeHere")}
            class="input input-sm input-bordered flex-1"
            classList={{ "input-error": !!error() }}
            value={password()}
            oninput={evt => input(evt.currentTarget.value as string)}
            tabindex="2"
          />
          <button class="absolute top-0 right-0 bottom-0 swap btn btn-sm btn-ghost" onclick={togglePasswordHidden} tabindex="2">
            <TbEyeOff size="15" classList={{ hidden: !passwordHidden() }} />
            <TbEye size="15" classList={{ hidden: passwordHidden() }} />
          </button>
        </div>
        <div class="flex justify-between gap-2 mt-2">
          <p class="text-sm text-error flex gap-2 items-center" classList={{ invisible: !error() }}>
            <TbAlertTriangle size="15" />
            {error()}
          </p>
          <button class="btn btn-sm gap-2" onclick={match}>
            {translate("modals.cipm.import")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmImportPasswordModal
