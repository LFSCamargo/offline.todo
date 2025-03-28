import { Dimensions, Image, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { Separator } from './Separator';
import { TodoSwipeable } from './TodoSwipeable';

import { NoTodos, NoTodosForDate } from '~/assets';
import { useTodos } from '~/store/todos';

const screenHeight = Dimensions.get('screen').height;

type Props = {
  date: Date;
  isInbox?: boolean;
};

export function TodosForDate({ date, isInbox = false }: Props) {
  const { todosForDay } = useTodos();

  return (
    <TodoSwipeable.Container>
      <FlatList
        style={{ marginTop: 16 }}
        data={todosForDay(date)}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <TodoSwipeable.Row todo={item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <View
            style={{
              height: screenHeight * 0.55,
            }}
            className="flex items-center justify-center">
            <Animated.Image
              resizeMode="cover"
              source={isInbox ? NoTodos : NoTodosForDate}
              className="scale-120 h-44 w-48 opacity-80"
            />
            <Text className="mt-2 w-80 text-center text-xl font-medium tracking-tight text-neutral-600">
              {isInbox ? "You're all caught up for today, just chill" : 'No todos for this date'}
            </Text>
          </View>
        )}
      />
    </TodoSwipeable.Container>
  );
}
