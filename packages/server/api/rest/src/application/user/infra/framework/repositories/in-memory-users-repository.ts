import { UsersRepository } from "@framework/repositories/users-repository"

import { User } from "@user/domain/entities/user"

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    if(!user) {
      return null
    }

    return user
  }

  async store(user: User): Promise<null> {
    this.users.push(user)

    return null
  }
}