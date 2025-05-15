import { Control, Controller } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HeroIcons } from '~/components/HeroIcons';
import { TodosForDate } from '~/components/TodosList';
import { TodoState } from '~/store/todos';

type HomeTemplateProps = {
  control: Control<
    {
      title: string;
    },
    any
  >;
  handleSubmit: () => void;
  todos: TodoState['todos'];
};

export function HomeTemplate({ control, handleSubmit }: HomeTemplateProps) {
  return (
    <KeyboardAvoidingView
      className="flex flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SafeAreaView className="flex flex-1 bg-neutral-100 px-0 pt-4">
        <View className="flex flex-row items-center justify-between p-4 px-8">
          <View className="flex flex-col">
            <Text className="text-2xl font-bold">Inbox</Text>
            <Text className="">All todos for today are listed here</Text>
          </View>
          <View className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
            <Text className="text-white">LF</Text>
          </View>
        </View>
        <TodosForDate date={new Date()} isInbox />
      </SafeAreaView>
      <View className="bottom-0 left-0 right-0 flex flex-row gap-4 bg-neutral-200 p-4">
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
            />
          )}
        />

        <TouchableOpacity
          onPress={() => handleSubmit()}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500">
          <HeroIcons.Outline.Plus width={24} height={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
