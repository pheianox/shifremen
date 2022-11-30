import { TbBolt } from "solid-icons/tb"
import { Component, createSignal, For } from "solid-js"
import { createStore } from "solid-js/store"
import LIST_7K from "../assets/eef.8k.sm.json"
import _ from "lodash"
import app from "../app"

const { translate } = app

const modes = [
  {
    name: "passgen.mode1.title",
    state: createStore({
      length: 15,
      hasDigits: true,
      hasSpecials: true,
      hasLowercase: true,
      hasUppercase: true,
    }),
    generate() {
      const [state] = this.state

      let charset = ""
      if (state.hasDigits) charset += "0123456789"
      if (state.hasLowercase) charset += "abcdefghijklmnopqrstuvwxyz"
      if (state.hasUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      if (state.hasSpecials) charset += "!#$%&()*+,-./:;=<>?@[]^_{|}~"

      let password = ""
      for (let i = 0; i < state.length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)]
      }

      return password
    },
    component() {
      const [state, setState_] = this.state
      const [isAlphabetAlmostEmpty, setAlphabetAlmostEmpty] = createSignal(false)

      function setState(key: string, value: any) {
        setState_(key as unknown as any, value)
        const binarySum = +state.hasDigits + +state.hasLowercase + +state.hasUppercase + +state.hasSpecials
        setAlphabetAlmostEmpty(binarySum === 1)
      }

      return (
        <div class="flex flex-col gap-2">
          <div class="input-group gap-4">
            <input
              min="8"
              max="128"
              type="range"
              class="w-full"
              value={state.length}
              oninput={evt => setState("length", +evt.currentTarget.value)}
            />
          </div>
          {/* @ts-ignore */}

          <div>{translate("passgen.mode1.length", state.length.toString())}</div>
          <ul class="w-full flex justify-between select-none">
            <label class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                disabled={isAlphabetAlmostEmpty() && state.hasDigits}
                checked={state.hasDigits}
                onchange={evt => setState("hasDigits", evt.currentTarget.checked)}
              />
              <span class="label-text">0-9</span>
            </label>
            <label class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                disabled={isAlphabetAlmostEmpty() && state.hasUppercase}
                checked={state.hasUppercase}
                onchange={evt => setState("hasUppercase", evt.currentTarget.checked)}
              />
              <span class="label-text">A-Z</span>
            </label>
            <label class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                disabled={isAlphabetAlmostEmpty() && state.hasLowercase}
                checked={state.hasLowercase}
                onchange={evt => setState("hasLowercase", evt.currentTarget.checked)}
              />
              <span class="label-text">a-z</span>
            </label>
            <label class="flex gap-2 items-center">
              <input
                type="checkbox"
                class="checkbox checkbox-sm"
                disabled={isAlphabetAlmostEmpty() && state.hasSpecials}
                checked={state.hasSpecials}
                onchange={evt => setState("hasSpecials", evt.currentTarget.checked)}
              />
              <span class="label-text">#-%</span>
            </label>
          </ul>
        </div>
      )
    },
  },
  {
    name: "passgen.mode2.title",
    state: createStore({ length: 4, separator: "-" }),
    generate() {
      const [state] = this.state
      let passphrase = ""
      for (let i = 0; i < state.length; i++) {
        const phrase = LIST_7K[Math.floor(Math.random() * LIST_7K.length)]
        if (i > 0) passphrase += state.separator + _.random(0, 10) + state.separator
        passphrase += phrase
      }
      return passphrase
    },
    component() {
      const [config, setConfig] = this.state
      return (
        <div class="flex flex-col gap-4">
          <div class="input-group gap-4">
            <input
              min="3"
              max="12"
              type="range"
              class="w-full"
              value={config.length}
              oninput={evt => setConfig("length", +evt.currentTarget.value)}
            />
          </div>
          <div class="flex justify-between items-center">
            {/* @ts-ignore */}
            <span>{translate("passgen.mode2.length", config.length.toString())}</span>
            <label class="flex items-center gap-2">
              {translate("passgen.mode2.separator")}
              <input
                type="input"
                class="input input-bordered input-xs w-10"
                maxlength={1}
                minlength={1}
                value={config.separator}
                oninput={evt => setConfig("separator", evt.currentTarget.value)}
              />
            </label>
          </div>
        </div>
      )
    },
  },
  {
    name: "passgen.mode3.title",
    state: createStore({
      length: 4,
    }),
    generate() {
      const [state] = this.state
      const charset = "0123456789"
      let pincode = ""
      for (let i = 0; i < state.length; i++) {
        pincode += charset[Math.floor(Math.random() * charset.length)]
      }
      return pincode
    },
    component() {
      const [state, setState] = this.state
      return (
        <div class="flex flex-col gap-4">
          <div class="input-group gap-4">
            <input
              min="4"
              max="24"
              type="range"
              class="w-full"
              value={state.length}
              oninput={evt => setState("length", +evt.currentTarget.value)}
            />
          </div>
          <label class="flex gap-2 justify-between">
            {/* @ts-ignore */}
            <span>{translate("passgen.mode3.length", state.length.toString())}</span>
          </label>
        </div>
      )
    },
  },
]

const Passgen: Component<{ onGenerate: (result: string) => void }> = props => {
  const [mode, setMode] = createSignal(modes[0])
  return (
    <div class="flex flex-col gap-4 min-w-[300px] w-full p-4 rounded">
      <div class="flex flex-row input-group">
        <select
          onchange={evt => setMode(modes.find(mod => mod.name == evt.currentTarget.value) as NonNullable<any>)}
          class="flex-1 select select-bordered select-sm"
        >
          <For each={modes}>{mod => <option value={mod.name}>{translate(mod.name)}</option>}</For>
        </select>
        <button onclick={() => props.onGenerate(mode().generate())} class="flex-1 btn btn-sm gap-2">
          <TbBolt size="14" /> {translate("passgen.generate")}
        </button>
      </div>
      {mode().component()}
    </div>
  )
}

export default Passgen
