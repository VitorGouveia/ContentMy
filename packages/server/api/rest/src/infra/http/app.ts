import "reflect-metadata"
import express from "express"
import helmet from "helmet"
import hpp from "hpp"
import rateLimit, { MemoryStore } from 'express-rate-limit'
// import "express-async-errors"

import { router } from "./router"

const app = express()

app.use(express.json())
app.use(helmet())
app.use(hpp())
app.use(rateLimit({
  windowMs: 1000 * 60, // 1 minute
  max: 20,
  standardHeaders: false,
  legacyHeaders: false,
  handler: (_: express.Request, response: express.Response) => {
    return response.status(429).json({
      error: {
        title: "TooManyRequests",
        description: 'Too many requests from this IP, please try again after an hour.',
        code: "1000"
      }
    })
  },
  store: new MemoryStore()
}))
app.use(router)

app.disable("x-powered-by")

export { app }