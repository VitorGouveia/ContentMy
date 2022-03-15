import { Either, Result } from "@core/logic/result"
import { Error } from "@core/domain/error"

import { User } from "@user/domain/entities/user"

/**
 * LOGIN USER
 * 
 * could not find a user with login: UserNotFoundError
 * passwords don't match: InvalidPassword
 */


export const UserNotFoundError = new Error({
  title: "UserNotFound",
  code: "0006",
  description: "Could not find a user."
})

export const InvalidPasswordError = new Error({
  title: "InvalidPassword",
  code: "0007",
  description: "The entered password is not valid."
})

export type LoginUserRequest = {
  login: string
  password: string
}

export type Success = {
  accessToken: string
  refreshToken: string
  user: User
}

export type LoginUserResponse = Either<
  typeof UserNotFoundError
  | typeof InvalidPasswordError,
  Result<Success>
>