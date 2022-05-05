import crypto from "crypto"

export abstract class Entity {
  public id: string

  constructor(id?: string) {
    this.id = id ?? crypto.randomUUID()
  }
}