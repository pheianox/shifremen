import app, { Modal } from "../app"

const { translate } = app

const ConfirmRemoveItemModal: Modal<boolean> = props => {
  function yes() {
    props.onClose(true)
  }
  function no() {
    props.onClose(false)
  }
  return (
    <div class="modal modal-open modal-bottom sm:modal-middle z-50">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{translate("modals.crim.title")}</h3>
        <p class="py-4">{translate("modals.crim.descr")}</p>
        <div class="modal-action">
          <button onclick={yes} class="btn">
            {translate("modals.crim.yes")}
          </button>
          <button onclick={no} class="btn">
            {translate("modals.crim.no")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmRemoveItemModal
