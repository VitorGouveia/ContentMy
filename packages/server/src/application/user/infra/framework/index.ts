import { InMemoryUsersRepository } from "@user/infra/framework/repositories/in-memory-users-repository"
import { InMemoryRefreshTokenRepository } from "@user/infra/framework/repositories/in-memory-refresh-token-repository"
import { BcryptHashProvider } from "@user/infra/framework/providers/bcrypt-hash-provider"
import { JWTTokenProvider } from "@user/infra/framework/providers/jwt-token-provider"
import { DayjsDateProvider } from "@user/infra/framework/providers/dayjs-date-provider"

const usersRepository = new InMemoryUsersRepository()
const refreshTokenRepository = new InMemoryRefreshTokenRepository()

const hashProvider = new BcryptHashProvider()
const tokenProvider = new JWTTokenProvider()
const dateProvider = new DayjsDateProvider()

export {
  usersRepository,
  refreshTokenRepository,
  hashProvider,
  tokenProvider,
  dateProvider
}