import { TbArrowLeft, TbArrowRight, TbCheck, TbEye, TbEyeOff, TbX } from "solid-icons/tb"
import { Component, createSignal, For, Show } from "solid-js"
import { usePasswordField } from "../../utils/usePasswordField"
import { useNavigate } from "@solidjs/router"
import { data } from "./VaultImportSection"
import Splash from "../../comps/Splash"
import app from "../../app"
import { MATER_PASSWORD_REQUIREMENTS } from "../../cfg"

const { translate } = app

const VaultCreateSection: Component = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = createSignal(false)
  const { password, passwordHidden, setPassword, togglePasswordHidden } = usePasswordField("")

  const valid = () => MATER_PASSWORD_REQUIREMENTS.every(req => req.test(password()))

  async function next() {
    setLoading(true)
    if (data.importer) {
      await data.importer.finish(password())
    } else {
      app.initializeVault([], password())
    }
    navigate("/setup/finish")
    setLoading(false)
  }

  function back() {
    navigate("/setup/vault")
  }

  return (
    <>
      {/* <div class="max-w-sm flex flex-col gap-5"> */}
      <div class="w-full h-full flex flex-col gap-6">
        <h1 class="text-2xl font-bold">{translate("setup.create.title")}</h1>
        <div class="relative flex flex-col gap-6">
          <Show when={loading()}>
            <Splash bg="bg-base-100" />
          </Show>
          <div class="flex flex-col gap-3">
            <p>{translate("setup.create.text1")}</p>
          </div>
          <div class="flex gap-2">
            <input
              tabindex="2"
              type={passwordHidden() ? "password" : "text"}
              placeholder={translate("type-here")}
              class="input input-sm input-bordered w-full max-w-xs"
              value={password()}
              oninput={e => setPassword(e.currentTarget.value)}
            />
            <button tabindex="2" class="swap btn btn-sm btn-ghost" onclick={togglePasswordHidden}>
              <TbEyeOff size="15" classList={{ hidden: !passwordHidden() }} />
              <TbEye size="15" classList={{ hidden: passwordHidden() }} />
            </button>
          </div>
          <div class="flex flex-col gap-2">
            <For each={MATER_PASSWORD_REQUIREMENTS}>
              {({ name, test }) => (
                <div class="flex gap-2 items-center transition" classList={{ "opacity-50": test(password()) }}>
                  <label class="swap pointer-events-none">
                    <input tabIndex="-1" type="checkbox" checked={!test(password())} />
                    <div class="swap-on">
                      <TbX size="15" class="stroke-error" />{" "}
                    </div>
                    <div class="swap-off">
                      <TbCheck size="15" class="stroke-success" />
                    </div>
                  </label>
                  <span class="text-sm" classList={{ "line-through": test(password()) }}>
                    {/* @ts-ignore */}
                    {translate(...name)}
                  </span>
                </div>
              )}
            </For>
          </div>
          <div class="flex justify-between gap-2 items-center">
            <button class="btn btn-sm btn-ghost gap-2" onclick={back}>
              <TbArrowLeft size="18" />
              {translate("setup.create.back")}
            </button>
            <button
              class="btn btn-sm gap-2"
              classList={{
                "opacity-100": valid(),
                "pointer-events-none opacity-20": !valid(),
              }}
              onclick={next}
            >
              {translate("setup.create.next")}
              <TbArrowRight size="18" />
            </button>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default VaultCreateSection
