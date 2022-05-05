import { RefreshToken } from "@user/domain/entities/refresh-token"

export type AuthProvider = {
  generateRefreshToken(refreshToken: RefreshToken): Promise<string>
  generateAccessToken(data: { id: string }): Promise<string>
  // accessToken
  // get user data
}