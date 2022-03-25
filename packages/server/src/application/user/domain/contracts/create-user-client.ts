import { Either, Result } from "@core/logic/result"
import { Error } from "@core/domain/error"

import { User } from "@user/domain/entities/user"

/**
 * CREATE USER
 * 
 * if there is not props: PropsNotFoundError
 */

export const UserAlreadyExistsError = new Error({
  title: "UserAlreadyExists",
  code: "0004",
  description: "A user with this e-mail already exists.",
})

export const InvalidEmailError = new Error({
  title: "InvalidEmail",
  code: "0005",
  description: "The input e-mail is invalid."
})

export type CreateUserClientRequest = {
  username: string
  email: string
  password: string
}

export type Success = {
  accessToken: string,
  refreshToken: string,
  user: User
}

// export type CreateUserClientResponse = Either<Failure<PropsNotFoundError, User>, Success<any, User>>
export type CreateUserClientResponse = Either<
  typeof UserAlreadyExistsError
  | typeof InvalidEmailError,
  Result<Success>
>