type CreateTokenProps = {
  secret: string
  options: {
    expiresIn: string
  }
}

export type TokenProvider = {
  create(payload: string, props: CreateTokenProps): Promise<string>
  verify(token: string, secret: string): Promise<boolean>
}