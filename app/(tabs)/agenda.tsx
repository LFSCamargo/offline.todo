import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { twMerge } from 'tailwind-merge';

import { HeroIcons } from '~/components/HeroIcons';
import { TodosForDate } from '~/components/TodosForDate';
import { useAddTodoHookform } from '~/forms';
import { useTodos } from '~/store/todos';
import { DateHandlingUtility } from '~/utils/date-handling';

export default function Agenda() {
  const { control, handleSubmit, reset } = useAddTodoHookform({ title: '' });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(DateHandlingUtility.getWeekStartByDate(new Date()));

  const days = DateHandlingUtility.getAllDaysFromWeek(weekStart);

  const { addTodo } = useTodos();

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

  const onSubmit = handleSubmit(async (data) => {
    addTodo(data, selectedDate);
    reset({ title: '' });
  });

  const isOnCurrentDay = selectedDate.toLocaleDateString() === new Date().toLocaleDateString();

  return (
    <KeyboardAvoidingView
      className="flex flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView className="flex flex-1 bg-neutral-100 pt-4">
        <View className="flex flex-row items-center justify-between p-4 px-8">
          <View className="flex flex-col">
            <Text className="text-2xl font-bold">Agenda</Text>
            <Text className="max-w-80">Here you can see your todos across time</Text>
          </View>
          <View className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
            <HeroIcons.Outline.Calendar width={24} height={24} color="white" />
          </View>
        </View>
        <View className="relative flex flex-row items-center justify-between p-4 px-1 pb-8 pt-4">
          <TouchableOpacity className="px-1" onPress={() => changeWeek('previous')}>
            <HeroIcons.Outline.ChevronLeft color="red" />
          </TouchableOpacity>
          {days.map((day) => {
            const isSameDate = selectedDate.toLocaleDateString() === day.date.toLocaleDateString();
            return (
              <TouchableOpacity
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
          <TouchableOpacity className="px-1" onPress={() => changeWeek('next')}>
            <HeroIcons.Outline.ChevronRight color="red" />
          </TouchableOpacity>

          <View className="absolute -bottom-8 left-6 right-7 flex flex-row items-center justify-between">
            <Text className="text-right text-2xl">
              {dayjs(selectedDate).format('DD MMMM, YYYY')}
            </Text>
            {!isOnCurrentDay && (
              <TouchableOpacity
                className="-mt-1 rounded-full bg-red-500 p-2"
                onPress={() => goToCurrentWeekAndDate(new Date())}>
                <Text className="text-white">Today</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className="flex flex-1 px-0 pt-6">
          <TodosForDate date={selectedDate} />
        </View>

        <View className="absolute bottom-0 left-0 right-0 flex flex-row gap-4 bg-neutral-200 p-4">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="h-12 flex-1 rounded-xl bg-white px-4"
                placeholder="Add a task"
                placeholderTextColor="#7d7d7d"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
                onSubmitEditing={onSubmit}
              />
            )}
          />

          <TouchableOpacity
            onPress={() => onSubmit()}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
            <HeroIcons.Outline.Plus width={24} height={24} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
