import dayjs from 'dayjs';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
