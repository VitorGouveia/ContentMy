import { UseCase } from "@core/domain/base/use-case"
import { Result, success, failure } from "@core/logic/result"

import {
  CreateUserProducerRequest,
  CreateUserProducerResponse,
  Success,
  UserWithCPFAlreadyExistsError,
  UserWithEmailAlreadyExistsError,
  UserWithPhoneNumberAlreadyExistsError,
  InvalidCPFError,
  InvalidPhoneNumberError,
  InvalidEmailError
} from "@user/domain/contracts/create-user-producer"

import { User } from "@user/domain/entities/user"
import { RefreshToken } from "@user/domain/entities/refresh-token"

import { UsersRepository } from "@framework/repositories/users-repository"
import { RefreshTokenRepository } from "@framework/repositories/refresh-token-repository"
import { HashProvider } from "@framework/providers/hash-provider"
import { TokenProvider } from "@framework/providers/token-provider"
import { DateProvider } from "@framework/providers/date-provider"

export class CreateUserProducerAccount implements UseCase<CreateUserProducerRequest, CreateUserProducerResponse> {
  constructor(
    private usersRepository: UsersRepository,
    private refreshTokenRepository: RefreshTokenRepository,
    private hashProvider: HashProvider,
    private tokenProvider: TokenProvider,
    private dateProvider: DateProvider
  ) {}

  async run({ fullname, email, cpf, phoneNumber, password }: CreateUserProducerRequest): Promise<CreateUserProducerResponse> {
    const isEmailValid = User.validateEmail({
      email
    })

    if(!isEmailValid) {
      return failure(InvalidEmailError)
    }

    const isCPFValid = User.validateCPF({
      cpf
    })

    if(!isCPFValid) {
      return failure(InvalidCPFError)
    }

    const isPhoneNumberValid = User.validatePhoneNumber({
      phoneNumber
    })

    if(!isPhoneNumberValid) {
      return failure(InvalidPhoneNumberError)
    }

    const userWithCPFAlreadyExists = await this.usersRepository.findByCPF(cpf)

    if(userWithCPFAlreadyExists) {
      return failure(UserWithCPFAlreadyExistsError)
    }
    
    const userWithPhoneNumberAlreadyExists = await this.usersRepository.findByCPF(phoneNumber)
    
    if(userWithPhoneNumberAlreadyExists) {
      return failure(UserWithPhoneNumberAlreadyExistsError)
    }

    const userWithEmailAlreadyExists = await this.usersRepository.findByEmail(email)

    if(userWithEmailAlreadyExists) {
      return failure(UserWithEmailAlreadyExistsError)
    }

    const hashedPassword = await this.hashProvider.hash(password)

    const user = User.create({
      name: fullname,
      email,
      password: hashedPassword
    })

    user.setAdditionalInfo({
      cpf,
      phoneNumber
    })

    await this.usersRepository.store(user)

    const accessToken = await this.tokenProvider.create<{ id: string }>({ id: user.id }, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      options: {
        expiresIn: "5m"
      }
    })

    const expiresIn = await this.dateProvider.addDays(3)

    const refreshTokenEntity = RefreshToken.create({
      userId: user.id,
      expiresIn: expiresIn
    })

    await this.refreshTokenRepository.store(refreshTokenEntity)

    const refreshToken = await this.tokenProvider.create<RefreshToken>({ ...refreshTokenEntity }, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      options: {
        expiresIn: "3d"
      }
    })

    return success(Result.ok<Success>({
      user,
      accessToken,
      refreshToken
    }))
  }
}