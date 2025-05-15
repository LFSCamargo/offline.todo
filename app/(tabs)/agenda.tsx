import { useMemo, useState } from 'react';

import { useAddTodoHookform } from '~/forms';
import { useTodos } from '~/store/todos';
import { AgendaTemplate } from '~/templates/agenda';

export default function AgendaScreen() {
  const { control, handleSubmit, reset } = useAddTodoHookform({ title: '' });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { addTodo, todosForDay } = useTodos();

  const onSubmit = handleSubmit(async (data) => {
    addTodo(data, selectedDate);
    reset({ title: '' });
  });

  const todos = useMemo(() => {
    return todosForDay(selectedDate);
  }, [selectedDate]);

  return (
    <AgendaTemplate
      control={control}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      onSubmit={onSubmit}
      todos={todos}
    />
  );
}
