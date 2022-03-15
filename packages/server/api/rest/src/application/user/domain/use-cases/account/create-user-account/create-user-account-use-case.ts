import { UseCase } from "@core/domain/base/use-case"
import { Result, success, failure } from "@core/logic/result"
import {
  CreateUserRequest,
  CreateUserResponse,
  UserAlreadyExistsError,
  InvalidEmailError,
  Success
} from "@user/domain/contracts/create-user"

import { User } from "@user/domain/entities/user"
import { RefreshToken } from "@user/domain/entities/refresh-token"

import { UsersRepository } from "@framework/repositories/users-repository"
import { RefreshTokenRepository } from "@framework/repositories/refresh-token-repository"
import { HashProvider } from "@framework/providers/hash-provider"
import { TokenProvider } from "@framework/providers/token-provider"
import { DateProvider } from "@framework/providers/date-provider"

export class CreateUserAccount implements UseCase<CreateUserRequest, CreateUserResponse> {
  constructor(
    private usersRepository: UsersRepository,
    private refreshTokenRepository: RefreshTokenRepository,
    private hashProvider: HashProvider,
    private tokenProvider: TokenProvider,
    private dateProvider: DateProvider
  ) {}

  async run({ name, email, password }: CreateUserRequest): Promise<CreateUserResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if(userAlreadyExists) {
      return failure(UserAlreadyExistsError)
    }

    const hashedPassword = await this.hashProvider.hash(password)

    const validEmail = User.validateEmail({
      email
    })

    if(!validEmail) {
      return failure(InvalidEmailError)
    }

    const user = User.create({
      name,
      email,
      password: hashedPassword
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
      accessToken,
      refreshToken,
      user: {
        ...user,
        password: ""
      }
    }))
  }
}