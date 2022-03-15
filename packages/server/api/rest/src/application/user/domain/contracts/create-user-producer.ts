import { Either, Result } from "@core/logic/result"
import { Error } from "@core/domain/error"

import { User } from "@user/domain/entities/user"

/**
 * CREATE USER
 * 
 * if there is not props: PropsNotFoundError
 */

export const UserWithEmailAlreadyExistsError = new Error({
  title: "UserAlreadyExists",
  code: "0004",
  description: "A user with this e-mail already exists.",
})

export const UserWithPhoneNumberAlreadyExistsError = new Error({
  title: "UserAlreadyExists",
  code: "0012",
  description: "A user with this phoneNumber already exists.",
})

export const UserWithCPFAlreadyExistsError = new Error({
  title: "UserAlreadyExists",
  code: "0012",
  description: "A user with this CPF already exists.",
})

export const InvalidEmailError = new Error({
  title: "InvalidEmail",
  code: "0005",
  description: "The input e-mail is invalid."
})

export const InvalidCPFError = new Error({
  title: "InvalidEmail",
  code: "0005",
  description: "The input CPF is invalid."
})

export const InvalidPhoneNumberError = new Error({
  title: "InvalidEmail",
  code: "0005",
  description: "The input phone number is invalid."
})

/**
 * @TODO: check if phone nunber actually exists
 * @TODO: check if CPF is valid (needs birth-date to check in with receita federal)
 */

export type CreateUserProducerRequest = {
  fullname: string
  phoneNumber: string
  cpf: string
  email: string
  password: string
}

export type Success = {
  accessToken: string,
  refreshToken: string,
  user: User
}

// export type CreateUserProducerResponse = Either<Failure<PropsNotFoundError, User>, Success<any, User>>
export type CreateUserProducerResponse = Either<
  typeof UserWithEmailAlreadyExistsError
  | typeof UserWithPhoneNumberAlreadyExistsError
  | typeof UserWithCPFAlreadyExistsError
  | typeof InvalidCPFError
  | typeof InvalidPhoneNumberError
  | typeof InvalidEmailError,
  Result<Success>
>