import ConfirmExportPasswordModal from "../../modals/ConfirmExportPasswordModal"
import { TbAlertTriangle } from "solid-icons/tb"
import { Component, createSignal, For } from "solid-js"
import FORMAT, { Format } from "../../utils/format"
import app from "../../app"

const { translate } = app

const ExportSection: Component = () => {
  const [format, setFormat] = createSignal<Format>("JSON")
  const [errorMessage, setErrorMessage] = createSignal<string>()

  async function process() {
    setErrorMessage(undefined)
    const masterPassword = await app.showModal(ConfirmExportPasswordModal, {
      onMatch: async password => app.matchMasterPassword(password),
    })
    if (!masterPassword) return
    const success = await app.exportVault(masterPassword, format())
    setErrorMessage(success === false ? "Something went wrong" : undefined)
  }

  return (
    <div class="flex flex-col gap-2">
      <h3 class="text-md font-bold">{translate("settings.export.title")}</h3>
      <p>{translate("settings.export.descr")}</p>
      <div class="flex justify-between mt-1">
        <div class="input-group">
          <select
            class="select select-sm select-bordered font-normal"
            onchange={evt => setFormat(evt.currentTarget.value as Format)}
          >
            <For each={Object.keys(FORMAT)}>
              {format_ => (
                <option value={format_} selected={format_ === format()}>
                  {format_}
                </option>
              )}
            </For>
          </select>
          <button class="btn btn-sm" onclick={process}>
            {translate("settings.export.export")}
          </button>
        </div>
        <p class="text-sm text-error flex gap-2 items-center" classList={{ invisible: !errorMessage() }}>
          <TbAlertTriangle size="15" />
          {errorMessage()}
        </p>
      </div>
    </div>
  )
}

export default ExportSection
