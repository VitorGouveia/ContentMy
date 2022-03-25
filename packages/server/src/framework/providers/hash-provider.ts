export type HashProvider = {
  hash(data: string): Promise<string>
  compare(data: string, hashed: string): Promise<boolean>
}