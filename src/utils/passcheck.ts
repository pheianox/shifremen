import { usePasswordField } from "./usePasswordField"

const MASTER_PASSWORD_MINIMAL_LENGTH = 12
const MATER_PASSWORD_REQUIREMENTS = [
  {
    name: ["setup.create.reqs.length", MASTER_PASSWORD_MINIMAL_LENGTH],
    validator: (password: string) => password.length >= MASTER_PASSWORD_MINIMAL_LENGTH,
  },
  { name: ["setup.create.reqs.lowers"], validator: (password: string) => password.toUpperCase() != password },
  { name: ["setup.create.reqs.uppers"], validator: (password: string) => password.toLowerCase() != password },
  {
    name: ["setup.create.reqs.specials"],
    validator: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g.test(password),
  },
  { name: ["setup.create.reqs.digits"], validator: (password: string) => /[0-9]/g.test(password) },
]
