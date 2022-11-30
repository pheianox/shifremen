import { Component } from "solid-js"
import Spinner from "./Spinner"

const Splash: Component<{ bg: string }> = props => {
  return (
    <div class="absolute top-0 left-0 bottom-0 text-center right-0 grid place-items-center z-50" classList={{ [props.bg]: true }}>
      <div class="flex flex-col gap-4 items-center transition-all">
        <Spinner size="100px" />
      </div>
    </div>
  )
}

export default Splash
