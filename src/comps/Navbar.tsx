import { Component, JSXElement } from "solid-js"
import Logo from "./Logo"

const Navbar: Component<{ children?: JSXElement }> = props => {
  return (
    <div class="navbar bg-neutral text-neutral-content">
      <div class="flex-1">
        <button class="btn btn-ghost normal-case font-normal text-xl gap-2 pointer-events-none">
          <Logo color1="hsl(var(--s))" color2="hsl(var(--a))" />
        </button>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default Navbar
