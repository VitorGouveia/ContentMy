import { RefreshTokenRepository } from "@framework/repositories/refresh-token-repository"

import { RefreshToken } from "@user/domain/entities/refresh-token";

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  private refreshTokens: RefreshToken[] = []

  async store(refreshToken: RefreshToken): Promise<null> {
    this.refreshTokens.push(refreshToken)

    return null
  }
}