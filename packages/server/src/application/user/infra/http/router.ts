import express from "express"

import { loginUserAccount } from "@user/domain/use-cases/account/login-user-account"

import { checkProps } from "@core/infra/http/middlewares/check-props"

const router = express.Router()

router.post(
  "/login",
  checkProps(["login", "password"]),
  async (request, response) => {
    await loginUserAccount.handle(request, response)
  }
)

export default router