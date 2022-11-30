import { Component, For } from "solid-js"
import app, { Timeout } from "../../app"

const { translate } = app

const TimeoutSection: Component = () => {
  return (
    <div class="flex flex-col gap-2">
      <h3 class="text-md font-bold">{translate("settings.timeout.title")}</h3>
      <p>{translate("settings.timeout.descr")}</p>
      <select
        class="select select-sm select-bordered font-normal"
        onchange={evt => app.changeTimeout(+evt.currentTarget.value as Timeout)}
      >
        <For each={app.timeouts}>
          {timeout => (
            <option value={timeout} selected={timeout === app.state.timeout}>
              {/* @ts-ignore */}
              {translate("settings.timeout.value", timeout.toString())}
            </option>
          )}
        </For>
      </select>
    </div>
  )
}

export default TimeoutSection
