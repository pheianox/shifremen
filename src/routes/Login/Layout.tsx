import { usePasswordField } from "../../utils/usePasswordField"
import { Component, createSignal } from "solid-js"
import { TbEye, TbEyeOff, TbLock } from "solid-icons/tb"
import { useNavigate } from "@solidjs/router"
import { debounce } from "lodash"
import app from "../../app"

const { translate } = app

const Layout: Component = () => {
  const navigate = useNavigate()
  const { password, passwordHidden, setPassword, togglePasswordHidden } = usePasswordField("")
  const passwordEntered = () => password().length > 0
  const [error, setError] = createSignal(false)
  const attemptDebounced = debounce(attempt, 500)

  async function attempt() {
    if (passwordEntered()) {
      try {
        const intial = typeof app.state.vault === "string"
        if (!(await app.unlock(password()))) {
          throw new Error("Incorrect password")
        }
        if (intial) {
          navigate("/vault")
        } else {
          history.back()
        }
      } catch (error) {
        console.log("login(()", error)
        setError(true)
      }
    }
  }

  function input(password: string) {
    setError(false)
    setPassword(password)
    attemptDebounced()
  }

  return (
    <div class="absolute top-0 left-0 bottom-0 right-0 grid place-items-center transition duration-100">
      <div class="rounded-md flex flex-col gap-4 select-none">
        <div
          class="rounded grid place-items-center rounded-lg transition"
          classList={{ "text-primary": passwordEntered(), "text-red-400": error() }}
        >
          <TbLock size="100" class="stroke-1" />
        </div>
        <h3 class="text-center text-sm">{translate("login.title")}</h3>
        <div class="flex gap-2 relative">
          <input
            type={passwordHidden() ? "password" : "text"}
            placeholder={translate("typeHere")}
            class="input input-sm input-bordered max-w-64"
            value={password()}
            oninput={e => input(e.currentTarget.value)}
            tabindex="2"
          />
          <button class="absolute top-0 right-0 bottom-0 swap btn btn-sm btn-ghost" onclick={togglePasswordHidden} tabindex="2">
            <TbEyeOff size="15" classList={{ hidden: !passwordHidden() }} />
            <TbEye size="15" classList={{ hidden: passwordHidden() }} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Layout
