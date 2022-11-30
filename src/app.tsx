import { BaseDirectory, exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs"
import { Component, createSignal, JSXElement } from "solid-js"
import { createI18nContext } from "@solid-primitives/i18n"
import { appDataDir, desktopDir } from "@tauri-apps/api/path"
import { createStore } from "solid-js/store"
import { nanoid } from "nanoid"
import { format } from "date-fns"
import locales from "./locales"
import FORMAT, { Format } from "./utils/format"
import { save, open } from "@tauri-apps/api/dialog"
import modals from "./modals"
import IdleJS from "idle-js"
import FuseJS from "fuse.js"

export interface AppState {
  theme: Theme
  locale: Locale
  timeout: Timeout
  vault: Vault
}

export interface VaultItem {
  id: string
  service: string
  username?: string
  password?: string
  createdAt?: string
  updatedAt?: string
}

export type Theme = typeof themes[number]
export type Locale = keyof typeof locales
export type Timeout = typeof timeouts[number]
export type Vault = DecryptedVault | EncryptedVault
export type DecryptedVault = VaultItem[]
export type EncryptedVault = string
export type Modal<R, P = {}> = Component<ModalDefaultProps<R> & P>
export type ModalDefaultProps<R> = { onClose: (response: R) => void }

const FILE_NAME = "state.json"
const VAULT_ITEM_ID_LENGTH = 35

const appDataDirPath = await appDataDir()
const desktopDirPath = await desktopDir()

const stateFileName = `${appDataDirPath}${FILE_NAME}`
const stateFileOpts = { dir: BaseDirectory.AppData }

const themes = ["light", "dark", "fantasy", "winter", "automn", "cmyk", "synthwave", "corporate", "business", "coffee"] as const
const timeouts = [5_000, 10_000, 15_000, 0.5 * 60_000, 1 * 60_000, 2 * 60_000, 3 * 60_000] as const

const [state, setState] = createStore<AppState>({
  theme: "light",
  locale: "az",
  timeout: 120000,
  vault: [],
})
const dictinary = Object.entries(locales).reduce((acc, [iso3, { translations: dict }]) => ({ ...acc, [iso3]: dict }), {})
const [translate, translateActions] = createI18nContext(dictinary, state.locale)
const idleTimer = new IdleJS({ idle: state.timeout, onIdle }).stop()
const [Modal, setModal] = createSignal<JSXElement>(null)
const [locked, setLocked] = createSignal(false)

const memory = {
  masterPassword: null as null | string,
}

async function loadState() {
  try {
    if (!(await exists(stateFileName, stateFileOpts))) return false
    const fileContent = await readTextFile(stateFileName, stateFileOpts)
    const state = JSON.parse(fileContent) as AppState
    if (!checkState(state)) return false
    // inital
    setState(state)
    setLocked(true)
    // apply settings
    changeTheme(state.theme)
    changeLocale(state.locale)
    changeTimeout(state.timeout)
    return true
  } catch (error) {
    console.log("load()", error)
    return false
  }
}

async function saveState() {
  try {
    const appState = await exportState()
    if (appState) {
      const fileContent = JSON.stringify(appState)
      await writeTextFile(stateFileName, fileContent, stateFileOpts)
      return true
    }
    return false
  } catch (error) {
    console.log("save()", error)
    return false
  }
}

async function unlock(masterPassword: string) {
  let success =
    typeof state.vault === "string" //
      ? await decryptVault(masterPassword)
      : masterPassword === memory.masterPassword
  setLocked(!success)
  if (success) {
    idleTimer.start()
  }
  return success
}

function lock() {
  setLocked(true)
  idleTimer.stop()
}

function checkState(state: AppState) {
  return ["theme", "locale", "vault", "timeout"].every(prop => prop in state)
}
function matchMasterPassword(masterPassword: string) {
  return masterPassword === memory.masterPassword
}

function changeTheme(theme: Theme) {
  setState("theme", theme)
  document.documentElement.setAttribute("data-theme", theme)
}
function changeLocale(locale: Locale) {
  setState("locale", locale)
  translateActions.locale(locale)
}
function changeTimeout(timeout: Timeout) {
  setState("timeout", timeout)
  idleTimer.set({ idle: timeout })
}

function changeMasterPassword(oldMasterPassword: string, newMasterPassword: string) {
  if (typeof state.vault === "string") throw new Error("cannot change master password while vault is encrypted")
  if (oldMasterPassword != memory.masterPassword) return false
  initializeVault(state.vault, newMasterPassword)
  return true
}

// sets decrypted vault and saves master password in memory
function initializeVault(vault: DecryptedVault, masterPassword: string) {
  setVaultItems(vault)
  memory.masterPassword = masterPassword
}
// encrypts vault in store, uses master password from memory
async function exportState(masterPassword = memory.masterPassword) {
  try {
    const vault = state.vault
    if (typeof vault === "string") throw new Error("Vault is already encrypted")
    if (!masterPassword) throw new Error("Master password is null. Cannot encrypt vault")
    const vaultEncrypted = await FORMAT.AES.stringify(vault, masterPassword)
    return {
      ...state,
      vault: vaultEncrypted,
    } as AppState
  } catch (error) {
    console.log("encryptVault()", error)
    return null
  }
}
// decrypts vault in store, uses `masterPassword` parameter and then saves
async function decryptVault(masterPassword: string) {
  try {
    const vault = state.vault
    if (typeof vault !== "string") throw new Error("Vault is not encrypted. Cannot decrypt.")
    const decryptedVault = await FORMAT.AES.parse<DecryptedVault>(vault, masterPassword)
    initializeVault(decryptedVault, masterPassword)
    return true
  } catch (error) {
    console.log("decryptVault()", error)
    return false
  }
}
// sets unique vault items
function setVaultItems(items: VaultItem[]) {
  const uniqueItems = items.map(x => ({ ...x, id: nanoid(VAULT_ITEM_ID_LENGTH) }))
  setState("vault", uniqueItems)
}
function findVaultItem(id: string) {
  const vault = state.vault
  if (typeof vault === "string") {
    console.warn("Vault is encrypted")
    return
  }
  return vault.find(item => item.id === id)
}

// adds or updates existing item in vault
function saveVaultItem(item: VaultItem) {
  setState("vault", vault => {
    if (typeof vault === "string") {
      console.warn("Vault is encrypted")
      return vault
    }
    const index = vault.findIndex(x => x.id === item.id)
    if (index === -1) return [item, ...vault]
    return [...vault.slice(0, index), item, ...vault.slice(index + 1)]
  })
}
// removes item from vault
function removeVaultItem(item: VaultItem) {
  setState("vault", vault => {
    if (typeof vault === "string") {
      console.warn("Vault is encrypted")
      return vault
    }
    return [...vault.filter(x => x.id !== item.id)]
  })
}
// adds a draft to vault and returns it
function addDraftToVault(): VaultItem {
  const item = { id: nanoid(VAULT_ITEM_ID_LENGTH), service: "" }
  saveVaultItem(item)
  return item
}
async function searchVault(query: string, props: (keyof VaultItem)[] = ["service", "username"]) {
  const vault = state.vault
  if (typeof vault === "string") {
    console.warn("Cannot search encrypted vault")
    return []
  }
  return new FuseJS(vault, { keys: props }).search(query).map(result => result.item)
}
async function exportVault(masterPassword: string, format: Format) {
  try {
    const vault = state.vault
    if (typeof vault === "string") throw new Error("Cannot export encrypted vault")
    const data = await FORMAT[format].stringify(vault, masterPassword)
    const path = await openSaveDialog("vault", FORMAT[format].extension)
    if (!path) return null
    if (!data) throw new Error("Data is null")
    await writeTextFile(path, data)
    return true
  } catch (error) {
    console.log("exportVault()", error)
    return false
  }
}
async function importVault(data: string, format: Format) {
  return {
    async finish(masterPassword: string) {
      try {
        const vault = (await FORMAT[format].parse(data, masterPassword)) as DecryptedVault
        initializeVault(vault, masterPassword)
        return true
      } catch (error) {
        console.log("importVault()", error)
        return false
      }
    },
  }
}

async function createVault(masterPassword: string) {
  initializeVault([], masterPassword)
}

async function openSaveDialog(fileName = "untitled", fileExtension = "txt") {
  idleTimer.stop()
  const defaultPath = `${desktopDirPath}${fileName}.${fileExtension}`
  const path = await save({ defaultPath })
  idleTimer.start()
  return path
}
async function openOpenDialog(extensions: string[], name = extensions.join(" "), multiple = false) {
  idleTimer.stop()
  const path = await open({
    multiple,
    defaultPath: desktopDirPath,
    filters: [{ name, extensions }],
  })
  idleTimer.start()
  return path
}

function onIdle() {
  lock()
}

function formatDate(utc: string) {
  return format(Date.parse(utc), "dd MMMM yyyy", {
    locale: locales[state.locale].datefnsLocale,
  })
}
function showModal<T extends typeof modals[number]>(Modal: T, props: Omit<Parameters<T>[0], "onClose">) {
  return new Promise<Parameters<Parameters<T>[0]["onClose"]>[0]>(resolve =>
    setModal(
      // @ts-ignore
      Modal({
        ...(props || {}),
        onClose(response) {
          setModal(null)
          resolve(response)
        },
      })
    )
  )
}

export default {
  state,
  loadState,
  saveState,

  lock,
  unlock,
  locked,

  changeTheme,
  changeLocale,
  changeTimeout,
  changeMasterPassword,

  initializeVault,
  saveVaultItem,
  removeVaultItem,
  addDraftToVault,
  findVaultItem,
  searchVault,
  createVault,
  importVault,
  exportVault,

  Modal,
  themes,
  locales,
  timeouts,
  translate,
  formatDate,
  showModal,
  openSaveDialog,
  openOpenDialog,
  matchMasterPassword,
}
