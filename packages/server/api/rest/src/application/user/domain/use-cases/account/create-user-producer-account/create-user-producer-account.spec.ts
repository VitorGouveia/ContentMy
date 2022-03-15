import { userFactory } from "@src/factories/user-factory"

import {
  UserWithEmailAlreadyExistsError, UserWithCPFAlreadyExistsError, UserWithPhoneNumberAlreadyExistsError,
  InvalidEmailError, InvalidCPFError, InvalidPhoneNumberError 
} from "@user/domain/contracts/create-user-producer"
import { CreateUserProducerAccount } from "./create-user-producer-account-use-case"

const {
  usersRepository,
  refreshTokenRepository,
  hashProvider,
  tokenProvider,
  dateProvider,
  createUserProducer
} = userFactory()

const createUserProducerAccount = new CreateUserProducerAccount(
  usersRepository,
  refreshTokenRepository,
  hashProvider,
  tokenProvider,
  dateProvider
)

describe("Create user producer account", () => {
  it("should create a user producer account", async () => {
    const sut = await createUserProducerAccount.run({
      fullname: "test",
      email: "test@test.com",
      cpf: "111.111.000-10",
      password: "123",
      phoneNumber: "13500131217"
    })

    expect(sut.isFailure()).toBe(false)
    expect(sut.isSuccess()).toBe(true)

    if(sut.isSuccess()) {
      expect(sut.result.error).toBe(null)
      expect(sut.result.isSuccess).toBe(true)

      expect(sut.result.value.accessToken).toBeTruthy()
      expect(sut.result.value.refreshToken).toBeTruthy()

      expect(sut.result.value.user.name).toBe("test")
      expect(sut.result.value.user.email).toBe("test@test.com")
      expect(sut.result.value.user.cpf).toBe("111.111.000-10")
      expect(sut.result.value.user.phoneNumber).toBe("13500131217")
    }
  })
  
  it("should not create a user producer account if user with e-mail already exists", async () => {
    await createUserProducer({
      email: "test@test.com"
    })

    const sut = await createUserProducerAccount.run({
      fullname: "test",
      email: "test@test.com",
      cpf: "111.111.000-10",
      password: "123",
      phoneNumber: "13500131217"
    })

    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(UserWithEmailAlreadyExistsError.title)
    }
  })

  it("should not create a user producer account if user with CPF already exists", async () => {
    await createUserProducer({
      cpf: "111.111.000-10"
    })

    const sut = await createUserProducerAccount.run({
      fullname: "test",
      email: "test@test.com",
      cpf: "111.111.000-10",
      password: "123",
      phoneNumber: "13500131217"
    })

    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(UserWithCPFAlreadyExistsError.title)
    }
  })

  it("should not create a user producer account if user with phoneNumber already exists", async () => {
    await createUserProducer({
      phoneNumber: "13500131217"
    })

    const sut = await createUserProducerAccount.run({
      fullname: "test",
      email: "test@test.com",
      cpf: "111.111.000-10",
      password: "123",
      phoneNumber: "13500131217"
    })

    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(UserWithPhoneNumberAlreadyExistsError.title)
    }
  })
  
  it("should not create a user producer account if the input e-mail is invalid", async () => {
    const sut = await createUserProducer({
      email: "test"
    })

    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(InvalidEmailError.title)
    }
  })

  it("should not create a user producer account if the input cpf is invalid", async () => {
    const sut = await createUserProducer({
      cpf: "111 000 111 10"
    })

    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(InvalidCPFError.title)
    }
  })

  it("should not create a user producer account if the input phoneNumber is invalid", async () => {
    const sut = await createUserProducer({
      phoneNumber: "3201472389464982137482304832"
    })

    expect(sut.isFailure()).toBe(true)
    expect(sut.isSuccess()).toBe(false)

    if(sut.isFailure()) {
      expect(sut.result.title).toBe(InvalidPhoneNumberError.title)
    }
  })

  afterEach(() => {
    usersRepository.reset()
  })
})