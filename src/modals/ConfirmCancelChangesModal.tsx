import app, { Modal } from "../app"

const { translate } = app

const ConfirmCancelChangesModal: Modal<boolean> = props => {
  function yes() {
    props.onClose(true)
  }
  function no() {
    props.onClose(false)
  }
  return (
    <div class="modal modal-open modal-bottom sm:modal-middle z-50">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{translate("modals.cccm.title")}</h3>
        <p class="py-4">{translate("modals.cccm.descr")}</p>
        <div class="modal-action">
          <button onclick={yes} class="btn">
            {translate("modals.cccm.yes")}
          </button>
          <button onclick={no} class="btn">
            {translate("modals.cccm.no")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmCancelChangesModal
