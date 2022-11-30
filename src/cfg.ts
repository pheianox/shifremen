export const MASTER_PASSWORD_MINIMAL_LENGTH = 15

export const MATER_PASSWORD_REQUIREMENTS = [
  {
    name: ["setup.create.reqs.length", MASTER_PASSWORD_MINIMAL_LENGTH],
    test: (password: string) => password.length >= MASTER_PASSWORD_MINIMAL_LENGTH,
  },
  {
    name: ["setup.create.reqs.lowers"],
    test: (password: string) => password.toUpperCase() != password,
  },
  {
    name: ["setup.create.reqs.uppers"],
    test: (password: string) => password.toLowerCase() != password,
  },
  {
    name: ["setup.create.reqs.specials"],
    test: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g.test(password),
  },
  {
    name: ["setup.create.reqs.digits"],
    test: (password: string) => /[0-9]/g.test(password),
  },
]
