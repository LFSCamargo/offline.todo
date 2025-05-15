import dayjs from 'dayjs';

export enum WeekDays {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export const DateHandlingUtility = {
  getWeekStartByDate(date: Date): Date {
    return dayjs(date).startOf('week').toDate();
  },
  add1Week(date: Date): Date {
    return dayjs(date).add(1, 'week').toDate();
  },
  subtract1Week(date: Date): Date {
    return dayjs(date).subtract(1, 'week').toDate();
  },

  getAllDaysFromWeek(weekStart: Date): {
    date: Date;
    weekDay: number;
  }[] {
    const weekDays = [0, 1, 2, 3, 4, 5, 6];

    return weekDays.map((day) => {
      const dayDate = dayjs(weekStart).add(day, 'day');
      return {
        date: dayDate.toDate(),
        weekDay: dayDate.day(),
      };
    });
  },
};
