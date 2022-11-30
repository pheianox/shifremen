import AZ_AZ from "./az-az"
import EN_US from "./en-us"
import RU_RU from "./ru-ru"

export type Locale = keyof typeof locales

const locales = {
  az: AZ_AZ,
  en: EN_US,
  ru: RU_RU,
} as const

export default locales
