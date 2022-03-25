import { DateProvider } from "@framework/providers/date-provider"

import dayjs from "dayjs"

export class DayjsDateProvider implements DateProvider {
  private day = dayjs()

  async addDays(daysAhead: number): Promise<number> {
    return this.day.add(daysAhead, "day").unix()
  }
}