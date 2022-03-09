import { UseCase } from "@core/domain/base/use-case"
import { Result, success, failure } from "@core/logic/result"
import { CreateUserRequest, CreateUserResponse, PropsNotFoundError,UserAlreadyExistsError } from "@user/domain/contracts/create-user"

import { User } from "@user/domain/entities/user"
import { InMemoryUsersRepository } from "@user/infra/framework/repositories/in-memory-users-repository"

export class CreateUserAccount implements UseCase<CreateUserRequest, CreateUserResponse> {
  constructor(private usersRepostory: InMemoryUsersRepository) {}

  async run({ name, email }: CreateUserRequest): Promise<CreateUserResponse> {
    let missingProps = []

    if(!name) {
      missingProps.push("name")
    }
    
    if(!email) {
      missingProps.push("email")
    }

    if(missingProps.length !== 0) {
      const error = PropsNotFoundError.setDescription(`You are missing the following props: ${missingProps.join(" ")}`)
      
      return failure(error)
    }

    const userAlreadyExists = await this.usersRepostory.findByEmail(email)

    if(userAlreadyExists) {
      return failure(UserAlreadyExistsError)
    }

    const user = User.create({
      name,
      email
    })

    await this.usersRepostory.store(user)
    
    return success(Result.ok(user))
  }
}