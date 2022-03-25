import { NextFunction, Request, Response } from "express";

export function checkProps(props: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const propsArray = Object.keys(request.body)

    const propsMatch = JSON.stringify(propsArray) === JSON.stringify(props)

    if(!propsMatch) {
      return response.status(400).json({
        error: {
          title: "MissingProps",
          message: `The required props for request are: ${props.join(", ")}`
        }
      })
    }

    propsArray.forEach((entry) => {
      if(!props.includes(entry)) {
        return response.status(400).json({
          error: {
            title: "InvalidProps",
            message: `The prop: '${entry}' is invalid.`
          }
        })
      }

      return
    })

    return next()
  }
}