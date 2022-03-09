import { Either, Result } from "@core/logic/result"
import { Error } from "@core/domain/error"

import { User } from "@user/domain/entities/user"

/**
 * CREATE USER
 * 
 * if there is not props: PropsNotFoundError
 */

export const PropsNotFoundError = new Error({
  title: "PropsNotFound",
  code: "0003",
  description: "You are missing the following props:",
})

export const UserAlreadyExistsError = new Error({
  title: "UserAlreadyExists",
  code: "0004",
  description: "A user with this e-mail already exists.",
})

export type CreateUserRequest = {
  name: string
  email: string
}

// export type CreateUserResponse = Either<Failure<PropsNotFoundError, User>, Success<any, User>>
export type CreateUserResponse = Either<
  typeof PropsNotFoundError,
  Result<User>
>