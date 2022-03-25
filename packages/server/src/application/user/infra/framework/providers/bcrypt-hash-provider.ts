import { HashProvider } from "@framework/providers/hash-provider"

import bcrypt from "bcrypt"

export class BcryptHashProvider implements HashProvider {
  private crypt: typeof bcrypt = bcrypt
  private defaultSalt = this.crypt.genSaltSync()

  async compare(data: string, hashed: string): Promise<boolean> {
    return await this.crypt.compare(data, hashed)
  }

  async hash(data: string): Promise<string> {
    return await this.crypt.hash(data, this.defaultSalt)
  }
}