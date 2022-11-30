import { Component } from "solid-js"
import app from "../../app"

const { translate } = app

const ListEmpty: Component = () => {
  return (
    <div class="w-full h-full grid place-items-center">
      <h3 class="text-accent text-sm">{translate("list.noItems")}</h3>
    </div>
  )
}

export default ListEmpty
