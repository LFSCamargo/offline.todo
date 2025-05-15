import dayjs from 'dayjs';

import { useTodos } from '../todos';

describe('[STORE]: TODOS', () => {
  beforeEach(() => {
    useTodos.getState().deleteAllTodos();
  });
  it('should be able to add a todo', () => {
    useTodos.getState().addTodo({
      title: 'New todo',
    });

    const { todos } = useTodos.getState();

    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('New todo');
  });

  it('should be able to remove a todo', () => {
    useTodos.getState().addTodo({
      title: 'New todo',
    });

    const { todos } = useTodos.getState();

    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('New todo');

    useTodos.getState().removeTodo(todos[0].id);

    expect(useTodos.getState().todos).toHaveLength(0);
  });

  it('should be able to mark a todo as completed', () => {
    useTodos.getState().addTodo({
      title: 'New todo',
    });

    const { todos } = useTodos.getState();

    expect(todos).toHaveLength(1);
    expect(todos[0].title).toBe('New todo');

    useTodos.getState().markAsCompleted(todos[0].id);

    const { todos: todosUpdated } = useTodos.getState();

    expect(todosUpdated[0].completed).toBe(true);
  });

  it('should be able to list todos for a specific day', () => {
    const todosMock = [
      {
        title: 'New todo',
        date: dayjs().toDate(),
      },
      {
        title: 'New todo',
        date: dayjs().subtract(1, 'week').toDate(),
      },
    ];

    useTodos.getState().addTodo(todosMock[0], todosMock[0].date);
    useTodos.getState().addTodo(todosMock[1], todosMock[1].date);

    const { todos } = useTodos.getState();

    expect(todos).toHaveLength(2);

    expect(useTodos.getState().todosForDay(todosMock[0].date)).toHaveLength(1);
    expect(useTodos.getState().todosForDay(todosMock[0].date)).toHaveLength(1);
    expect(useTodos.getState().todosForDay(todosMock[1].date)).toHaveLength(1);
  });

  it('should add two todos and remove all of them', () => {
    const todosMock = [
      {
        title: 'New todo',
        date: dayjs().toDate(),
      },
      {
        title: 'New todo',
        date: dayjs().subtract(1, 'week').toDate(),
      },
    ];

    useTodos.getState().addTodo(todosMock[0], todosMock[0].date);
    useTodos.getState().addTodo(todosMock[1], todosMock[1].date);

    const { todos } = useTodos.getState();

    expect(todos).toHaveLength(2);

    useTodos.getState().deleteAllTodos();

    expect(useTodos.getState().todos).toHaveLength(0);
  });
});
