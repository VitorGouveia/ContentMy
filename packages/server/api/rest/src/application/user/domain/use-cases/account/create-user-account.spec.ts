import { CreateUserAccount } from "./create-user-account"
import { PropsNotFoundError, UserAlreadyExistsError } from "@user/domain/contracts/create-user"
import { userFactory } from "@src/factories/user-factory"

const { usersRepostory } = userFactory()

describe("Create user account", () => {
  it("should be able to create a user account", async () => {
    // arrange
    const createUserAccount = new CreateUserAccount(usersRepostory)

    // act - sut - system under test
    const sut = await createUserAccount.run({
      name: "test",
      email: "test@test.com"
    })
    
    // assert
    expect(sut.isFailure()).toBe(false)
    expect(sut.isSuccess()).toBe(true)

    if(sut.isSuccess()) {
      expect(sut.result.error).toBe(null)
      expect(sut.result.isSuccess).toBe(true)
      expect(sut.result.value.name).toBe("test")
    }
  })

  it("should not be able to create user that already exists.", async () => {
    // arrange
    const createUserAccount = new CreateUserAccount(usersRepostory)

    // act - sut - system under test
    const sut = await createUserAccount.run({
      name: "test",
      email: "test@test.com"
    })

    // assert
    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(UserAlreadyExistsError.title)
    }
  })

  it("should not be able to create a user without providing the name prop", async () => {
    // arrange
    const createUserAccount = new CreateUserAccount(usersRepostory)

    // act - sut - system under test
    const sut = await createUserAccount.run({} as any)

    // assert
    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(PropsNotFoundError.title)
    }
  })
})