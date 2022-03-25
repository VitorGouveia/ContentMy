// type AuthTypes = "oauth" | "web"
// type AuthProvider = "github" | "twitter" | "google"

// import { UsersRepository } from "@framework/repositories/users-repository"
// import { HashProvider } from "@framework/providers/hash-provider"

// class Auth {
//   public type: AuthTypes | null = null

//   constructor(private usersRepository: UsersRepository, private hashProvider: HashProvider) {}

//   public use(type: AuthTypes) {
//     this.type = type

//     return this
//   }

//   public async attempt(email: string, password: string) {
//     const user = await this.usersRepository.findByEmail(email)

//     if(!user) {
//       throw new Error("could not find a user")
//     }
    
//     const passwordsMatch = await this.hashProvider.compare(email, password)
    
//     if(!passwordsMatch) {
//       throw new Error("passwords do not match")
//     }

//     return this
//   }
// }

// const auth = new Auth()
// auth.use("web").attempt("vitor", "123")
// export {
//   auth
// }