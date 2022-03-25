import { RefreshToken } from "@user/domain/entities/refresh-token"

export type RefreshTokenRepository = {
  store(refreshToken: RefreshToken): Promise<null>
}