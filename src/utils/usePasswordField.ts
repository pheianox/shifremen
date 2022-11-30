import { createSignal } from "solid-js"

export function usePasswordField(defaultVaule_ = "", passwordHidden_ = true) {
  const [password, setPassword] = createSignal(defaultVaule_)
  const [passwordHidden, setPasswordHidden] = createSignal(passwordHidden_)
  const togglePasswordHidden = () => setPasswordHidden(x => !x)
  return { password, setPassword, passwordHidden, togglePasswordHidden }
}
