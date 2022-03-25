import { User } from "@user/domain/entities/user"

export type UsersRepository = {
  findByEmail(email: string): Promise<User | null>
  findByCPF(cpf: string): Promise<User | null>
  findByPhoneNumber(phoneNumber: string): Promise<User | null>
  store(user: User): Promise<null>

  /**
   * ONLY FOR TESTING PURPOSES
   * do not actually use this.
   * please.
   */
  reset?: () => boolean
}