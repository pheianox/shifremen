import { TbArrowLeft } from "solid-icons/tb"
import { Component } from "solid-js"
import app from "../../app"
import Navbar from "../../comps/Navbar"
import ExportSection from "./ExportSection"
import LocaleSection from "./LocaleSection"
import PasswordSection from "./PasswordSection"
import ThemeSection from "./ThemeSection"
import TimeoutSection from "./TimeoutSection"

const { translate } = app

const Layout: Component = () => {
  function back() {
    history.back()
  }
  return (
    <>
      <Navbar>
        <button class="btn btn-ghost gap-2" onclick={back}>
          <TbArrowLeft size="20" />
          {translate("settings.back")}
        </button>
      </Navbar>
      <div class="h-full w-full grid place-items-center scrollbar-thin">
        <div class="w-[500px] bg-base-100 py-6 px-8 pb-10 rounded-lg flex flex-col gap-6">
          <h2 class="text-2xl my-2 relative">{translate("settings.title")}</h2>
          <LocaleSection />
          <ThemeSection />
          <TimeoutSection />
          <PasswordSection />
          <ExportSection />
        </div>
      </div>
    </>
  )
}

export default Layout
