import dayjs from 'dayjs';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { HeroIcons } from './HeroIcons';

import { DateHandlingUtility } from '~/utils/date-handling';

type Props = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

export function AgendaDaySelector({ selectedDate, setSelectedDate }: Props) {
  const [weekStart, setWeekStart] = useState(DateHandlingUtility.getWeekStartByDate(selectedDate));

  const days = DateHandlingUtility.getAllDaysFromWeek(weekStart);

  function changeWeek(type: 'next' | 'previous') {
    if (type === 'next') {
      setWeekStart(DateHandlingUtility.add1Week(weekStart));
      setSelectedDate(DateHandlingUtility.add1Week(selectedDate));
    } else {
      setWeekStart(DateHandlingUtility.subtract1Week(weekStart));
      setSelectedDate(DateHandlingUtility.subtract1Week(selectedDate));
    }
  }

  function goToCurrentWeekAndDate(date: Date) {
    setWeekStart(DateHandlingUtility.getWeekStartByDate(date));
    setSelectedDate(date);
  }

  const isOnCurrentDay = selectedDate.toLocaleDateString() === new Date().toLocaleDateString();

  return (
    <View
      testID="AgendaDaySelector"
      className="relative z-50 flex flex-row items-center justify-between p-4 px-1 pb-8 pt-4">
      <TouchableOpacity testID="previous" className="px-1" onPress={() => changeWeek('previous')}>
        <HeroIcons.Outline.ChevronLeft color="red" />
      </TouchableOpacity>
      {days.map((day) => {
        const isSameDate = selectedDate.toLocaleDateString() === day.date.toLocaleDateString();
        return (
          <TouchableOpacity
            testID={isSameDate ? 'current-day' : `day-${day.weekDay}`}
            key={day.date.toString()}
            onPress={() => setSelectedDate(day.date)}
            className={twMerge(
              'h-12 w-12 items-center justify-center rounded-xl bg-neutral-200',
              isSameDate && 'bg-red-500'
            )}>
            <Text className={twMerge('font-bold', isSameDate && 'text-white')}>
              {' '}
              {dayjs(day.date).format('DD')}{' '}
            </Text>
            <Text className={twMerge('text-xs', isSameDate && 'text-white')}>
              {' '}
              {dayjs(day.date).format('ddd')}{' '}
            </Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity testID="next" className="px-1" onPress={() => changeWeek('next')}>
        <HeroIcons.Outline.ChevronRight color="red" />
      </TouchableOpacity>

      <View className="absolute -bottom-8 left-6 right-7 flex flex-row items-center justify-between">
        <Text className="text-right text-2xl" testID="selected-date">
          {dayjs(selectedDate).format('DD MMMM, YYYY')}
        </Text>
        {!isOnCurrentDay && (
          <TouchableOpacity
            testID="current-date"
            className="-mt-1 rounded-full bg-red-500 p-2"
            onPress={() => goToCurrentWeekAndDate(new Date())}>
            <Text className="text-white">Today</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
