import JSON2CSV from "json-2-csv"
import CryptoJS from "crypto-js"

export type Format = keyof typeof FORMAT

const FORMAT = {
  AES: {
    name: "AES",
    extension: "aes",
    async parse<T>(aes: string, key: string) {
      return JSON.parse(CryptoJS.AES.decrypt(CryptoJS.format.OpenSSL.parse(aes), key).toString(CryptoJS.enc.Utf16)) as T
    },
    async stringify<T>(data: T, key: string) {
      return CryptoJS.AES.encrypt(CryptoJS.enc.Utf16.parse(JSON.stringify(data)), key).toString(CryptoJS.format.OpenSSL) as string
    },
  },
  CSV: {
    name: "CSV",
    extension: "csv",
    async parse<T>(csv: string) {
      return (await JSON2CSV.csv2jsonAsync(csv)) as T[]
    },
    async stringify(data: any[]) {
      return (await JSON2CSV.json2csvAsync(data)) as string
    },
  },
  JSON: {
    name: "JSON",
    extension: "json",
    async parse<T>(json: string) {
      return JSON.parse(json) as T
    },
    async stringify(data: any) {
      return JSON.stringify(data) as string
    },
  },
}

export default FORMAT
