import { Entity } from "@core/domain/entity"

type UserProps = {
  name: string
  email: string
}

export class User extends Entity {
  public name!: string
  public email!: string

  private constructor(props: UserProps, id?: string) {
    super(id)
    Object.assign(this, props)
  }

  public static create(props: UserProps, id?: string) {
    const user = new User(props, id)

    return user
  }
}