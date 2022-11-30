import { useNavigate } from "@solidjs/router"
import { TbArrowRight } from "solid-icons/tb"
import { Component, For } from "solid-js"
import app, { Locale } from "../../app"
import Logo from "../../comps/Logo"

const { translate } = app

const LocaleSection: Component = () => {
  const navigate = useNavigate()

  function next() {
    navigate(`/setup/vault`)
  }

  return (
    <>
      <div class="w-full h-full flex flex-col gap-6 justify-center">
        <Logo size={70} />
        {/* <h1 class="text-3xl font-bold flex gap-2 items-center">{translate("setup.locale.title")}</h1> */}
        <div class="flex flex-col gap-5">
          <p>{translate("setup.locale.text1")}</p>
          <p>{translate("setup.locale.text2")}</p>
        </div>
        <div class="flex justify-start gap-4 w-full">
          <select class="select select-sm select-bordered" onchange={evt => app.changeLocale(evt.currentTarget.value as Locale)}>
            <For each={Object.entries(app.locales)}>
              {([iso3, { flag, name }]) => (
                <option value={iso3} selected={iso3 === app.state.locale}>
                  {flag}&nbsp;&nbsp;&nbsp;{name}
                </option>
              )}
            </For>
          </select>
          <button class="btn btn-sm gap-2" onclick={next}>
            {translate("setup.locale.next")} <TbArrowRight size="18" />
          </button>
        </div>
      </div>
    </>
  )
}

export default LocaleSection
