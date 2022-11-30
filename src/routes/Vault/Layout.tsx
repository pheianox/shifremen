import { Link, Outlet, useNavigate } from "@solidjs/router"
import { TbPlus, TbSettings } from "solid-icons/tb"
import { Component, ErrorBoundary, Show } from "solid-js"
import List, { listContainerRef, setSearchQuery } from "./List"
import app, { DecryptedVault } from "../../app"
import Navbar from "../../comps/Navbar"
import Error from "../../comps/Error"
import Logo from "../../comps/Logo"

const Layout: Component = () => {
  const navigate = useNavigate()
  const noDrafts = () => (app.state.vault as DecryptedVault).every(x => x.createdAt)

  function createDraft() {
    const draft = app.addDraftToVault()
    navigate(`/vault/${draft.id}`)
    setSearchQuery("")
    listContainerRef?.parentElement?.scroll({ top: 0 })
  }

  return (
    <>
      <ErrorBoundary fallback={Error}>
        <Navbar>
          <Show when={noDrafts()}>
            <button class="btn btn-ghost" onclick={createDraft}>
              <TbPlus size="20" />
            </button>
          </Show>
          <Link href="/settings" class="btn btn-ghost">
            <TbSettings size="20" />
          </Link>
        </Navbar>
      </ErrorBoundary>
      <div class="h-full w-full flex-1 flex overflow-hidden">
        <ErrorBoundary fallback={Error}>
          <List />
        </ErrorBoundary>
        <ErrorBoundary fallback={Error}>
          <Outlet />
        </ErrorBoundary>
        <div class="flex-1 grid place-items-center">
          <div class="opacity-0 compact:opacity-50 compact:hover:opacity-100 transition duration-300">
            <Logo size={50} color1="hsl(var(--a))" color2="hsl(var(--af))" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout
