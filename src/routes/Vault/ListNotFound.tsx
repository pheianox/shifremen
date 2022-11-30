import { Component } from "solid-js"
import app from "../../app"

const { translate } = app

const ListNotFound: Component = () => {
  return (
    <div class="mt-2  text-sm grid place-items-center">
      <h3 class="text-accent-focus">{translate("list.noResults")}</h3>
    </div>
  )
}

export default ListNotFound
