import express from "express"

export type Controller<Request, Response> = {
  handle(request: Request, response: Response): Promise<Response>
}

export type RequestBody<T extends object> = express.Request<{}, {}, T>