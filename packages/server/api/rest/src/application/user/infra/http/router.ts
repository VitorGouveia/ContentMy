import express from "express"

import { createUserAccount } from "@user/domain/use-cases/account/create-user-account"
import { loginUserAccount } from "@user/domain/use-cases/account/login-user-account"

import { checkProps } from "@core/infra/http/middlewares/check-props"

const router = express.Router()

router.post(
  "/",
  checkProps(["name", "email", "password"]),
  async (request, response) => {
    await createUserAccount.handle(request, response)
  }
)

router.post(
  "/login",
  checkProps(["login", "password"]),
  async (request, response) => {
    await loginUserAccount.handle(request, response)
  }
)

export default router