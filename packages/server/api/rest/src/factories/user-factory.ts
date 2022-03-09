import { InMemoryUsersRepository } from "@user/infra/framework/repositories/in-memory-users-repository"

const usersRepostory = new InMemoryUsersRepository()

export function userFactory() {
  return {
    usersRepostory
  }
}