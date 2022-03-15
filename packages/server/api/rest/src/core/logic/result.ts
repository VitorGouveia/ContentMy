import { Error } from "../domain/error"

export class Failure<L, A> {
  readonly result: L

  constructor(result: L) {
    this.result = result
  }

  isFailure(): this is Failure<L, A> {
    return true
  }

  isSuccess(): this is Success<L, A> {
    return false
  }
}

export class Success<L, A> {
  readonly result: A

  constructor(result: A) {
    this.result = result
  }

  isFailure(): this is Failure<L, A> {
    return false
  }

  isSuccess(): this is Success<L, A> {
    return true
  }
}

type ResultProps<T> = {
  success: boolean
  error: Error | null
  value: T | null
}

export class Result<T> {
  public readonly isSuccess: boolean
  public readonly error: Error
  private _value: T

  constructor({ success, error, value }: ResultProps<T>) {
    if(success && error) {
      throw new Error({
        title: "InvalidOperation",
        code: "0001",
        description: "A result cannot be successful and contain an error."
      })
    }
    
    if(!success && !error) {
      throw new Error({
        title: "InvalidOperation",
        code: "0002",
        description: "A failing result needs to contain an error message."
      })
    }

    this.isSuccess = success
    this.error = error!
    this._value = value!
  }

  get value() {
    return this._value
  }

  static ok<U>(value: U | null): Result<U> {
    return new Result<U>({
      success: true,
      error: null,
      value
    });
  }

  static fail<U>(error: Error): Result<U> {
    // return new Result<U>(false, error);
    return new Result<U>({
      success: false,
      error,
      value: null
    });
  }
}

export type Either<L, A> = Failure<L, A> | Success<L, A>

export const failure = <L, A>(l: L): Either<L, A> => {
  return new Failure<L, A>(l)
}

export const success = <L, A>(a: A): Either<L, A> => {
  return new Success<L, A>(a)
}