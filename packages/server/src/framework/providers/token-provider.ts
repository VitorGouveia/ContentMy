export type CreateTokenProps = {
  secret: string
  options: {
    expiresIn: string
  }
}

export type TokenProvider = {
  create<T extends object>(payload: T, props: CreateTokenProps): Promise<string>
  verify<T extends string>(token: string, secret: string): Promise<T>
}