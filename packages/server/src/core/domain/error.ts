type ErrorProps = {
  title: string
  code: string
  description: string
  /** link to the error documentation */
  documentation?: string
}

export class Error {
  public readonly title: string
  public readonly code: string
  public description: string
  /** link to the error documentation */
  public readonly documentation?: string

  constructor({title, code, description}: ErrorProps) {
    this.title = title
    this.code = code
    this.description = description
  }

  public setDescription(newDescription: string) {
    this.description = newDescription

    return this
  }
} 