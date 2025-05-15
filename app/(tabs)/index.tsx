import { useMemo } from 'react';

import { useAddTodoHookform } from '~/forms';
import { useTodos } from '~/store/todos';
import { HomeTemplate } from '~/templates/home';

export default function HomeScreen() {
  const { addTodo, todosForDay } = useTodos();
  const { control, handleSubmit, reset } = useAddTodoHookform({ title: '' });

  const onSubmit = handleSubmit(async (data) => {
    addTodo(data);
    reset({ title: '' });
  });

  const todos = useMemo(() => todosForDay(new Date()), []);

  return <HomeTemplate handleSubmit={onSubmit} control={control} todos={todos} />;
}
