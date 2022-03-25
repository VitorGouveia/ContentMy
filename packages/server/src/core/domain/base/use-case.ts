export type UseCase<Request, Response> = {
  run(props: Request): Promise<Response>
}