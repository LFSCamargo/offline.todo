import { FlatList } from 'react-native-gesture-handler';

import { Separator } from './Separator';
import { TodoSwipeable } from './TodoSwipe';

import { useTodos } from '~/store/todos';

type Props = {
  date: Date;
};

export function TodosForDate({ date }: Props) {
  const { todosForDay } = useTodos();

  return (
    <TodoSwipeable.Container>
      <FlatList
        style={{ marginTop: 16 }}
        data={todosForDay(date)}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => <TodoSwipeable.Row todo={item} />}
        keyExtractor={(item) => item.id}
      />
    </TodoSwipeable.Container>
  );
}
