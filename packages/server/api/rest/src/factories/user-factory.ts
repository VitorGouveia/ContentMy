import { InMemoryUsersRepository } from "@user/infra/framework/repositories/in-memory-users-repository"
import { InMemoryRefreshTokenRepository } from "@user/infra/framework/repositories/in-memory-refresh-token-repository"
import { BcryptHashProvider } from "@user/infra/framework/providers/bcrypt-hash-provider"
import { JWTTokenProvider } from "@user/infra/framework/providers/jwt-token-provider"
import { DayjsDateProvider } from "@user/infra/framework/providers/dayjs-date-provider"

import { CreateUserRequest } from "@user/domain/contracts/create-user"
import { CreateUserProducerRequest } from "@user/domain/contracts/create-user-producer"

// import { CreateUserAccount } from "@user/domain/use-cases/account/create-user-account/create-user-account-use-case"
import { CreateUserProducerAccount } from "@user/domain/use-cases/account/create-user-producer-account/create-user-producer-account-use-case"

type Partial<T> = {
  [P in keyof T]?: T[P];
};

export function userFactory() {
  const usersRepository = new InMemoryUsersRepository()
  const refreshTokenRepository = new InMemoryRefreshTokenRepository()
  const hashProvider = new BcryptHashProvider()
  const tokenProvider = new JWTTokenProvider()
  const dateProvider = new DayjsDateProvider()
  
  return {
    usersRepository,
    refreshTokenRepository,
    hashProvider,
    tokenProvider,
    dateProvider,
    async createUserProducer(overrides?: Partial<CreateUserProducerRequest>) {
      const createUserProducer = new CreateUserProducerAccount(usersRepository, refreshTokenRepository, hashProvider, tokenProvider, dateProvider)

      const sut = await createUserProducer.run({
        fullname: "test",
        email: "test@test.com",
        cpf: "111.111.111-11",
        phoneNumber: "13500131217",
        password: "123",
        ...overrides
      })

      return sut
    },
    async createUser(overrides?: Partial<CreateUserRequest>) {
     const createUserProducer = new CreateUserProducerAccount(usersRepository, refreshTokenRepository, hashProvider, tokenProvider, dateProvider)

      const sut = await createUserProducer.run({
        fullname: "test",
        email: "test@test.com",
        cpf: "111.111.111-11",
        phoneNumber: "13500131217",
        password: "123",
        ...overrides
      })

      return sut
    }
  }
}