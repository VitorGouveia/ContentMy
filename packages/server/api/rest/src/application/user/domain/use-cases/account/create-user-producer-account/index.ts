import { CreateUserProducerAccountController } from "./create-user-producer-account-controller"
import { CreateUserProducerAccount } from "./create-user-producer-account-use-case"

import {
  usersRepository,
  refreshTokenRepository,
  hashProvider,
  tokenProvider,
  dateProvider
} from "@user/infra/framework"

const createUserProducerAccoutnUseCase = new CreateUserProducerAccount(
  usersRepository,
  refreshTokenRepository,
  hashProvider,
  tokenProvider,
  dateProvider
)

export const createUserProducerAccount = new CreateUserProducerAccountController(
  createUserProducerAccoutnUseCase
)