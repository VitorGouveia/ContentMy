import { Response } from "express"
import { Controller, RequestBody } from "@core/domain/base/controller"

import { LoginUserRequest } from "@user/domain/contracts/login-user"
import { LoginUserAccount } from "./login-user-account-use-case"

export class LoginUserAccountController implements Controller<RequestBody<LoginUserRequest>, Response> {
  constructor(private loginUserAccount: LoginUserAccount) {}

  async handle(request: RequestBody<LoginUserRequest>, response: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
    const { login, password } = request.body

    try {
      const loginUserAccount = await this.loginUserAccount.run({
        login,
        password
      })

      if(loginUserAccount.isFailure()) {
        return response.status(400).json({
          error: loginUserAccount.result
        })
      }

      return response.status(200).json(loginUserAccount.result.value)
    } catch (error) {
      throw error
    }
  }
}