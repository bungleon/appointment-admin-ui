export class WorkingHours {
  constructor(
    public id: string,
    public timePeriod: TimePeriods,
    public merchantName: string,
    public apiKey: string,
    public startTime: string,
    public finishTime: string,
    public today: string,
    public createDate: string,
    public updateDate: string
  ) {
  }
}

export class WorkingHoursList {
  constructor(
    public code: number,
    public message: string,
    public workingHours: Array<WorkingHours>
  ) {
  }
}

enum TimePeriods {
  MORNING,
  AFTERNOON,
  EVENING,
  NIGHT
}

export namespace TimePeriodFilter {

  export function values() {
    return Object.keys(TimePeriods).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}
