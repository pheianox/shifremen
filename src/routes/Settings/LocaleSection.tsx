import { Component, For } from "solid-js"
import app, { Locale } from "../../app"

const { translate } = app

const LocaleSection: Component = () => {
  return (
    <section class="flex flex-col gap-2">
      <h3 class="text-md font-bold">{translate("settings.locale.title")}</h3>
      <p>{translate("settings.locale.descr")}</p>
      <select
        class="select select-sm select-bordered font-normal"
        onchange={evt => app.changeLocale(evt.currentTarget.value as Locale)}
      >
        <For each={Object.entries(app.locales)}>
          {([iso3, { flag, name }]) => (
            <option value={iso3} selected={iso3 === app.state.locale}>
              {flag}&nbsp;&nbsp;&nbsp;{name}
            </option>
          )}
        </For>
      </select>
    </section>
  )
}

export default LocaleSection
