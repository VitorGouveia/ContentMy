import { LoginUserAccount } from "./login-user-account-use-case"
import { LoginUserAccountController } from "./login-user-account-controller"

import {
  usersRepository,
  refreshTokenRepository,
  hashProvider,
  tokenProvider,
  dateProvider
} from "@user/infra/framework"

const loginUserAccountUseCase = new LoginUserAccount(
  usersRepository,
  refreshTokenRepository,
  hashProvider,
  tokenProvider,
  dateProvider
)

export const loginUserAccount = new LoginUserAccountController(loginUserAccountUseCase)