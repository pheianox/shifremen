import { useNavigate } from "@solidjs/router"
import { Component } from "solid-js"
import app from "../../app"

const { translate } = app

const FinishSection: Component = () => {
  const navigate = useNavigate()

  function done() {
    navigate("/vault")
  }

  return (
    <div class="relative max-w-sm flex flex-col gap-5">
      <h1 class="text-3xl font-bold">{translate("setup.finish.title")}</h1>
      <div class="flex flex-col gap-3">
        <p>{translate("setup.finish.text1")}</p>
        <p>{translate("setup.finish.text2")}</p>
      </div>
      <div>
        <button class="btn btn-sm" onclick={done}>
          {translate("setup.finish.done")}
        </button>
      </div>
    </div>
  )
}

export default FinishSection
