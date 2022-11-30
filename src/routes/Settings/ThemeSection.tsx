import { Component, For } from "solid-js"
import app, { Theme } from "../../app"
import _ from "lodash"

const { translate } = app

const ThemeSection: Component = () => {
  return (
    <div class="flex flex-col gap-2">
      <h3 class="text-md font-bold">{translate("settings.theme.title")}</h3>
      <p>{translate("settings.theme.descr")}</p>
      <select
        class="select select-sm select-bordered font-normal"
        onchange={evt => app.changeTheme(evt.currentTarget.value as Theme)}
      >
        <For each={app.themes}>
          {theme => (
            <option value={theme} selected={theme === app.state.theme}>
              {_.capitalize(theme)}
            </option>
          )}
        </For>
      </select>
    </div>
  )
}

export default ThemeSection
