import { Response } from "express"
import { Controller, RequestBody } from "@core/domain/base/controller"

import { CreateUserRequest } from "@user/domain/contracts/create-user"
import { CreateUserAccount } from "./create-user-account-use-case"

export class CreateUserAccountController implements Controller<RequestBody<CreateUserRequest>, Response> {
  constructor(private createUserAccount: CreateUserAccount) {}

  async handle(request: RequestBody<CreateUserRequest>, response: Response): Promise<Response> {
    // check if props exist
    const { name, email, password } = request.body

    try {
      const createUserAccount = await this.createUserAccount.run({
        name,
        email,
        password
      })

      if(createUserAccount.isFailure()) {
        return response.status(400).json({
          error: createUserAccount.result
        })
      }

      return response.status(200).json(createUserAccount.result.value)
    } catch (error) {
      throw error
    }
  }
}