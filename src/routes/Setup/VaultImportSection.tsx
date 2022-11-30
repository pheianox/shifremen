import { useNavigate } from "@solidjs/router"
import { readTextFile } from "@tauri-apps/api/fs"
import { TbArrowBackUp, TbArrowLeft, TbDownload, TbFileDownload, TbFileText } from "solid-icons/tb"
import { Component, createSignal, Show } from "solid-js"
import app from "../../app"
import Splash from "../../comps/Splash"
import ConfirmImportPasswordModal from "../../modals/ConfirmImportPasswordModal"
import FORMAT, { Format } from "../../utils/format"
import GearsSvg from "../../assets/gears.svg"
import { sleep } from "../../utils/debug"
const { translate } = app

export const data = {
  importer: null as null | Awaited<ReturnType<typeof app["importVault"]>>,
}

const VaultImportSection: Component = () => {
  data.importer = null

  const navigate = useNavigate()
  const [loading, setLoading] = createSignal(false)

  const allowedExtensions = Object.values(FORMAT).map(fmt => fmt.extension)
  const [filePath, setFilePath] = createSignal<string>()
  const [fileContent, setFileContent] = createSignal<string>()
  const fileFormat = () => fileName()?.split(".").pop()?.toUpperCase() as Format | undefined
  const fileName = () => filePath()?.replace(/^.*[\\\/]/, "")

  async function process() {
    const format = fileFormat()
    const content = fileContent()
    if (!(format && content)) return
    const importer = await app.importVault(content, format)
    if (format === "AES") {
      if (
        await app.showModal(ConfirmImportPasswordModal, {
          onMatch: importer.finish,
        })
      ) {
        navigate("/vault")
      }
    } else {
      // save instance for next step
      data.importer = importer
      navigate("/setup/vault/create")
    }
  }

  async function choose() {
    try {
      const path = await app.openOpenDialog(allowedExtensions)
      if (!path || Array.isArray(path)) return
      setLoading(true)
      setFilePath(path)
      await sleep(1)
      const c = await readTextFile(path)
      setFileContent(c)
    } finally {
      setLoading(false)
    }
  }

  function back() {
    navigate(`/setup/vault`)
  }

  return (
    <>
      <div class="w-full h-full flex flex-col gap-6">
        <Show when={loading()}>
          <Splash bg="bg-base-100" />
        </Show>

        <h1 class="text-3xl font-bold flex gap-2 items-center">{translate("setup.import.title")}</h1>

        <div class="flex flex-col gap-3">
          <p>{translate("setup.import.descr")}</p>
        </div>
        <button class="btn btn-sm btn-ghost gap-2" onclick={choose}>
          <TbFileDownload size="18" />
          {translate(fileName() ? "setup.import.chooseOtherFile" : "setup.import.chooseFile")}
        </button>

        <Show when={fileName()}>
          <div class="flex gap-3">
            <div class="grid place-items-center">
              <TbFileText size="50" class="stroke-[1.5px]" />
            </div>
            <div>
              <p class="font-bold">{fileName()}</p>
              <div class="flex justify-between items-center">
                <p class="text-sm">{fileFormat()}</p>
              </div>
            </div>
          </div>
        </Show>

        <div class="flex justify-between">
          <Show when={fileName()}>
            <button class="btn btn-sm gap-2" onclick={process}>
              {translate("setup.import.import")} <TbDownload size="18" />
            </button>
          </Show>

          <button class="btn btn-sm btn-ghost gap-2" onclick={back}>
            <TbArrowLeft size="18" />
            {translate("setup.import.back")}
          </button>
        </div>
      </div>
    </>
  )
}

export default VaultImportSection
