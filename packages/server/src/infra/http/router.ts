import express from "express"

import users from "@user/infra/http/router"

export const router = express.Router()

router.use("/users", users)