export type DateProvider = {
  // now(): Promise<number>
  addDays(daysAhead: number): Promise<number>
}