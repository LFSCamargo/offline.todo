import { Dimensions, Text, View, FlatList } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { Separator } from './Separator';
import { TodoSwipeableRow } from './TodoSwipeableRow';

import { NoTodos, NoTodosForDate } from '~/assets';
import { TodoState } from '~/store/todos';

const screenHeight = Dimensions.get('screen').height;

type Props = {
  isInbox?: boolean;
  todolist: TodoState['todos'];
};

export function TodosList({ todolist, isInbox = false }: Props) {
  return (
    <GestureHandlerRootView>
      <FlatList
        style={{ marginTop: isInbox ? 16 : 40 }}
        data={todolist}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <TodoSwipeableRow todo={item} />}
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
    </GestureHandlerRootView>
  );
}
