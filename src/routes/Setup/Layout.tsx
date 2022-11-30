import { Outlet } from "@solidjs/router"
import { Component } from "solid-js"
import SetupBgSVG from "../../assets/setup-bg.svg"

const Layout: Component = () => {
  return (
    <div class="w-full h-full grid place-items-center relative ">
      <div class="max-w-[350px] h-[400px] transition ">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
