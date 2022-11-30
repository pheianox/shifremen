import EN_DATEFNS_LOCALE from "date-fns/locale/en-US"

const EN_US = {
  flag: "🇺🇸",
  name: "English",
  datefnsLocale: EN_DATEFNS_LOCALE,
  translations: {
    typeHere: "",
    setup: {
      locale: {
        title: "Welcome!",
        text1: "Shifremen allows you to store and manage all your passwords in one place",
        text2: "Select a language and click «Next»",
        next: "Next",
      },
      choose: {
        title: `Vault`,
        descr:
          "Let's create a vault for you by clicking «Next». If you have an export file, you can also import an existing vault",
        import: "Import",
        next: "Next",
        back: "Back",
      },
      import: {
        title: "Import Vault",
        descr: "Select the vault file below. If the vault is encrypted, you will need to enter the security password",
        chooseFile: "select file",
        chooseOtherFile: "select other file",
        import: "import",
        back: "back",
      },
      create: {
        title: "Master Password",
        text1:
          "The master password is the only password you need to remember. Make sure it has sufficient length and reliability",
        text2: "Come up with a password that meets the requirements, and click «Next»",
        reqs: {
          length: (min: string) => `At least ${min} characters long`,
          uppers: "At least 1 uppercase letter",
          lowers: "At least 1 lowercase letter",
          specials: "At least 1 special character",
          digits: "At least 1 digit",
        },
        back: "Back",
        next: "Next",
      },
      finish: {
        title: "Good job!",
        text1: "The program has been successfully configured and you can already use it. Thank you for choosing Shifremen!",
        text2: "After reading, click «Done»",
        done: "Done",
      },
    },
    login: {
      title: "Locked",
      descr: "Enter master password to unlock",
    },
    list: {
      searchPlaceholder: "Search (ctrl + k)",
      draftItemText: "New",
      noItems: "Empty",
      loadMoreItems: "Show more ({{current}}/{{limit}})",
      noResults: "Nothing found",
      loadMoreResults: "More results ({{current}}/{{limit}})",
    },
    modals: {
      cmpm: {
        title: "Change Master Password",
        newPassword: "New password",
        oldPassword: "Old password",
        error: "Old password is incorrect",
        change: "Change",
      },
      cccm: {
        title: "Cancel changes?",
        descr: "Changes will be lost",
        yes: "Yes",
        no: "No",
      },
      cepm: {
        title: "Confirm Master Password",
        descr: "You need to enter master password to export data",
        error: "Incorrect. Try again.",
        export: "Export",
      },
      cipm: {
        title: "Enter Master Password",
        descr: "The vault is encrypted",
        error: "Incorrect. Try again",
        import: "Import",
      },
      crim: {
        title: "Delete item?",
        descr: "It will delete it forever",
        yes: "Yes",
        no: "No",
      },
    },
    sidebar: {
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      service: "Service",
      servicePlaholder: "e.g. Google, Facebook, Wi-Fi",
      username: "Username",
      password: "Password",
      createdAt: "Created",
      updatedAt: "Updated",
      metadata: "Metadata",
    },
    passgen: {
      generate: "Generate",
      mode1: {
        title: "Passowrd",
        length: (chars: string) => `Length ${chars} characters`,
      },
      mode2: {
        title: "Kebab",
        length: (parts: string) => `Length ${parts} parts`,
        separator: "Ayırıcı",
      },
      mode3: {
        title: "Pincode",
        length: (digits: string) => `Length ${digits} digits`,
      },
    },
    settings: {
      title: "Parameters",
      back: "Back",
      theme: {
        title: "Theme",
        descr: "The appereance of the application",
      },
      locale: {
        title: "Language",
        descr: "The language of the user interface",
      },
      timeout: {
        title: "Timeout",
        descr: "The inactivity time before application locks",
        value: (timeout: string) => {
          const ms = +timeout
          const inMinutes = ms >= 60000
          const value = inMinutes ? ms / 60000 : ms / 1000
          const units = inMinutes ? "min" : "sec"
          return `${value} ${units}`
        },
      },
      password: {
        title: "Master Password",
        descr: "You can change the master password if you have any doubts about its reliability",
        change: "Change Master Password",
      },
      export: {
        title: "Export",
        descr:
          "Export data in different formats. We reccomend you to use `AES` for backups, `CSV` for Excel and `JSON` for general purpose",
        export: "Export",
      },
    },
  },
}

export default EN_US
