import { useNavigate } from "@solidjs/router"
import { TbArrowBack, TbArrowBackUp, TbArrowLeft, TbArrowRight, TbDownload } from "solid-icons/tb"
import { Component } from "solid-js"
import BackupSVG from "../../assets/backup.svg"
import app from "../../app"

const { translate } = app

const VaultSection: Component = () => {
  const navigate = useNavigate()

  function back() {
    navigate(`/setup/locale`)
  }

  function next() {
    navigate(`/setup/vault/create`)
  }

  function file() {
    navigate("/setup/vault/import")
  }

  return (
    <>
      {/* <div class="max-w-sm flex flex-col gap-6"> */}
      <div class="w-full h-full flex flex-col gap-6">
        <img src={BackupSVG} class="w-full" />
        <h1 class="text-3xl font-bold flex gap-2 items-center">{translate("setup.choose.title")}</h1>
        <div class="flex flex-col gap-3">
          <p>{translate("setup.choose.descr")}</p>
        </div>
        <div class="flex justify-between">
          <button class="btn btn-sm gap-2" onclick={next}>
            {translate("setup.choose.next")} <TbArrowRight size="18" />
          </button>

          <span class="flex gap-2">
            <button class="btn btn-sm gap-2 btn-ghost" onclick={file}>
              <TbDownload size="18" />
              {translate("setup.choose.import")}
            </button>
            <button class="btn btn-sm gap-2 btn-ghost" onclick={back}>
              {translate("setup.choose.back")}
              <TbArrowBackUp size="19" />
            </button>
          </span>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default VaultSection
