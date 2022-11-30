import { Router, Routes, useNavigate } from "@solidjs/router"
import { createEffect, createSignal, onMount, Show } from "solid-js"
import { render } from "solid-js/web"
import { TauriEvent } from "@tauri-apps/api/event"
import { window } from "@tauri-apps/api"
import { For } from "solid-js/web"
import app from "./app"
import "./assets/global.css"
import Splash from "./comps/Splash"
import { createShortcut } from "@solid-primitives/keyboard"

import routes from "./routes"

const DEV_MODE = true
const DEV_PASS = "covid19W!illkillusall2" // KazbekKazbek!123

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = createSignal(true)
  onStart()

  async function onStart() {
    const exists = await app.loadState()
    await window.getCurrent().listen(TauriEvent.WINDOW_CLOSE_REQUESTED, onClose)
    await window.getCurrent().listen(TauriEvent.WINDOW_DESTROYED, onClose)
    setLoading(false)
    if (DEV_MODE) {
      if (exists) {
        if (await app.unlock(DEV_PASS)) {
          navigate("/vault")
        } else {
          console.log("wrong pass")
        }
      } else {
        navigate("/setup")
      }
    } else {
      navigate(exists ? "/login" : "/setup")
    }
  }

  createShortcut(["Control", "l"], app.lock)

  createEffect(() => {
    if (app.locked()) navigate("/login")
  })

  var onClose = (() => {
    let closed = false
    return async () => {
      if (closed) return
      setLoading(true)
      await app.saveState()
      closed = true
      setLoading(false)
      await window.getCurrent().close()
    }
  })()

  // covid19W!illkillusall1
  return (
    <div class="w-full h-full select-none">
      <Show when={loading()}>
        <Splash bg="bg-base-100" />
      </Show>
      {app.Modal()}
      <div class="w-full h-full bg-base-200 flex flex-col transition">
        <Routes>
          <For each={routes}>{Route => <Route />}</For>
        </Routes>
      </div>
    </div>
  )
}

const Root = () => (
  <Router>
    <App />
  </Router>
)

render(Root, document.getElementById("root") as HTMLElement)
