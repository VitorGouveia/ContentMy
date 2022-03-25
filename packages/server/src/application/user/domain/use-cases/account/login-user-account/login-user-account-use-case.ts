import { UseCase } from "@core/domain/base/use-case"
import { failure, success, Result } from "@core/logic/result"
import {
  Success,
  LoginUserRequest,
  LoginUserResponse,
  InvalidPasswordError,
  UserNotFoundError
} from "@user/domain/contracts/login-user"

import { RefreshToken } from "@user/domain/entities/refresh-token"

import { UsersRepository } from "@framework/repositories/users-repository"
import { RefreshTokenRepository } from "@framework/repositories/refresh-token-repository"
import { HashProvider } from "@framework/providers/hash-provider"
import { TokenProvider } from "@framework/providers/token-provider"
import { DateProvider } from "@framework/providers/date-provider"

export class LoginUserAccount implements UseCase<LoginUserRequest, LoginUserResponse> {
  constructor(
    private usersRepository: UsersRepository,
    private refreshTokenRepository: RefreshTokenRepository,
    private hashProvider: HashProvider,
    private tokenProvider: TokenProvider,
    private dateProvider: DateProvider
  ) {}

  async run({ login, password }: LoginUserRequest): Promise<LoginUserResponse> {
    let user = await this.usersRepository.findByEmail(login)
    
    if(!user) {
      return failure(UserNotFoundError)
    }

    const passwordsMatch = await this.hashProvider.compare(password, user.password)

    if(!passwordsMatch) {
      return failure(InvalidPasswordError)
    }

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
      user
    }))
  }
}