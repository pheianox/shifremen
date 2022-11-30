import { Component } from "solid-js"
import app from "../../app"
import ChangeMasterPasswordModal from "../../modals/ChangeMasterPasswordModal"

const { translate } = app

const PasswordSection: Component = () => {
  async function change() {
    await app.showModal(ChangeMasterPasswordModal, { onTry: app.changeMasterPassword })
  }

  return (
    <div class="flex flex-col gap-2">
      <h3 class="text-md font-bold">{translate("settings.password.title")}</h3>
      <p>{translate("settings.password.descr")}</p>
      <div class="flex justify-between mt-1">
        <button class="btn btn-sm" onclick={change}>
          {translate("settings.password.change")}
        </button>
      </div>
    </div>
  )
}

export default PasswordSection
