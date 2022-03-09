import { User } from "@user/domain/entities/user"

export type UsersRepository = {
  findByEmail(email: string): Promise<User | null>
  store(user: User): Promise<null>
}