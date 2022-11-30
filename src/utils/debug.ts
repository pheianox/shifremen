import { nanoid } from "nanoid"
import { faker } from "@faker-js/faker"
import { VaultItem } from "../app"

export function sleep(s = 3) {
  return new Promise(resolve => setTimeout(resolve, s * 1000))
}

export function fakeItems(count = 200): VaultItem[] {
  return Array(count)
    .fill(0)
    .map(() => ({
      id: nanoid(),
      service: faker.animal.cat(),
      username: faker.internet.userName(),
      password: faker.internet.password(30),
      createdAt: faker.date.recent(10).toUTCString(),
    }))
}
