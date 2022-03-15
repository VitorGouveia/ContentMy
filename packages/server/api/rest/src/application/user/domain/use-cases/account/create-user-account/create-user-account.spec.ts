import { userFactory } from "@src/factories/user-factory"
import { UserAlreadyExistsError } from "@user/domain/contracts/create-user"

import { CreateUserAccount } from "./create-user-account-use-case"

const { usersRepository, refreshTokenRepository, hashProvider, tokenProvider, dateProvider } = userFactory()

describe("Create user account", () => {
  it("should be able to create a user account", async () => {
    // arrange
    const createUserAccount = new CreateUserAccount(usersRepository, refreshTokenRepository, hashProvider, tokenProvider, dateProvider)

    // act - sut - system under test
    const sut = await createUserAccount.run({
      name: "test",
      email: "test@test.com",
      password: "123"
    })
    
    // assert
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

  it("should not be able to create user that already exists.", async () => {
    // arrange
    const createUserAccount = new CreateUserAccount(usersRepository, refreshTokenRepository, hashProvider, tokenProvider, dateProvider)

    // act - sut - system under test
    const sut = await createUserAccount.run({
      name: "test",
      email: "test@test.com",
      password: "123"
    })

    // assert
    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(UserAlreadyExistsError.title)
    }
  })
})