import { Response } from "express"
import {Controller, RequestBody  } from "@core/domain/base/controller"

import { CreateUserProducerRequest } from "@user/domain/contracts/create-user-producer"
import { CreateUserProducerAccount } from "./create-user-producer-account-use-case"

export class CreateUserProducerAccountController implements Controller<RequestBody<CreateUserProducerRequest>, Response> {
  constructor(private createUserProducerAccount: CreateUserProducerAccount) {}

  async handle(request: RequestBody<CreateUserProducerRequest>, response: Response<any, Record<string, any>>): Promise<Response<any, Record<string, any>>> {
    const { fullname, email, cpf, phoneNumber, password } = request.body

    try {
      const createUserProducerAccount = await this.createUserProducerAccount.run({
        fullname,
        email,
        cpf,
        phoneNumber,
        password
      })

      if(createUserProducerAccount.isFailure()) {
        return response.status(400).json({
          error: createUserProducerAccount.result
        })
      }

      return response.status(200).json(createUserProducerAccount.result.value)
    } catch (error) {
      throw error
    }
  }
}