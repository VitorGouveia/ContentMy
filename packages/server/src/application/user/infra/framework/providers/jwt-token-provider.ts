import { TokenProvider, CreateTokenProps } from "@framework/providers/token-provider"

import jsonwebtoken from "jsonwebtoken"

export class JWTTokenProvider implements TokenProvider {
  private token = jsonwebtoken

  async create<T extends object>(payload: T, props: CreateTokenProps): Promise<string> {
    return this.token.sign(payload, props.secret, {
      expiresIn: props.options.expiresIn
    })
  }

  async verify<T extends string>(token: string, secret: string): Promise<T> {
    const jwt = this.token.verify(token, secret)

    return jwt as T
  }
}