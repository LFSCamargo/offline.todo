import { Control, Controller } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AgendaDaySelector } from '~/components/AgendaDaySelector';
import { HeroIcons } from '~/components/HeroIcons';
import { TodosList } from '~/components/TodosList';
import { TodoState } from '~/store/todos';

type Props = {
  control: Control<
    {
      title: string;
    },
    any
  >;
  onSubmit: () => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  todos: TodoState['todos'];
};

export function AgendaTemplate({ selectedDate, setSelectedDate, control, onSubmit, todos }: Props) {
  return (
    <KeyboardAvoidingView
      className="flex flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView className="relative flex flex-1 bg-neutral-100 pt-4">
        <View className="flex flex-row items-center justify-between p-4 px-8">
          <View className="flex flex-col">
            <Text className="text-2xl font-bold">Agenda</Text>
            <Text className="max-w-80">Here you can see your todos across time</Text>
          </View>
          <View className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
            <HeroIcons.Outline.Calendar width={24} height={24} color="white" />
          </View>
        </View>
        <AgendaDaySelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        <View className="mt-8 flex flex-1 px-0 pt-12">
          <TodosList todolist={todos} />
        </View>
      </SafeAreaView>
      <View className="flex flex-row gap-4 bg-neutral-200 p-4">
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
    </KeyboardAvoidingView>
  );
}
