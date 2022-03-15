import { userFactory } from "@src/factories/user-factory"

import { UserNotFoundError, InvalidPasswordError } from "@user/domain/contracts/login-user"
import { LoginUserAccount } from "./login-user-account-use-case"

const {
  usersRepository,
  refreshTokenRepository,
  dateProvider,
  hashProvider,
  tokenProvider,
  createUser
} = userFactory()

describe("Login user account", () => {
  beforeAll(async () => {
    usersRepository.reset()
    
    await createUser({
      email: "test@test.com"
    })
  })

  it("should login user with right credentials", async () => {
    const loginUserAccount = new LoginUserAccount(usersRepository, refreshTokenRepository, hashProvider, tokenProvider, dateProvider)

    const sut = await loginUserAccount.run({
      login: "test@test.com",
      password: "123"
    })

    expect(sut.isFailure()).toBe(false)
    expect(sut.isSuccess()).toBe(true)
    
    if(sut.isSuccess()) {
      expect(sut.result.error).toBe(null)
      expect(sut.result.isSuccess).toBe(true)
      expect(sut.result.value.accessToken).toBeTruthy()
      expect(sut.result.value.refreshToken).toBeTruthy()
      expect(sut.result.value.user.name).toBe("test")
    }
  })

  it("should fail to find user with non-existent e-mail", async () => {
    const loginUserAccount = new LoginUserAccount(usersRepository, refreshTokenRepository, hashProvider, tokenProvider, dateProvider)

    const sut = await loginUserAccount.run({
      login: "test@fail.com",
      password: "123"
    })

    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)
    
    if(sut.isFailure()) {
      expect(sut.result.title).toBe(UserNotFoundError.title)
    }
  })

  it("should fail to login user with wrong password", async () => {
    const loginUserAccount = new LoginUserAccount(usersRepository, refreshTokenRepository, hashProvider, tokenProvider, dateProvider)

    const sut = await loginUserAccount.run({
      login: "test@test.com",
      password: "000"
    })
    
    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(InvalidPasswordError.title)
    }
  })
})