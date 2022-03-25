import { Entity } from "@core/domain/entity"

type RefreshTokenProps = {
  userId: string
  expiresIn: number

  createdAt: Date
  updatedAt: Date
}

export class RefreshToken extends Entity {
  public userId!: string
  public expiresIn!: number

  public createdAt!: Date
  public updatedAt!: Date

  private constructor(props: RefreshTokenProps) {
    super()
    Object.assign(this, props)
  }

  public static create(props: { userId: string, expiresIn: number }) {
    const refreshToken = new RefreshToken({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return refreshToken
  }
}