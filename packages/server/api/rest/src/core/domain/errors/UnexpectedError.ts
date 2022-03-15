import { Error } from "../error"

class UnexpectedError extends Error {
  constructor() {
    super({
      title: "UnexpectedError",
      description: "This error was unexpected",
      code: "0000"
    })
  }
}

export default new UnexpectedError()