import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { generateUUID } from '~/utils/uuid';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  date: number;
};

export type TodoState = {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'completed' | 'date'>, date?: Date) => void;
  todosForDay: (day: Date) => Todo[];
  removeTodo: (id: string) => void;
  markAsCompleted: (id: string) => void;
};

export const useTodos = create<TodoState, [['zustand/persist', TodoState]]>(
  persist(
    (set, get) => ({
      todos: [],
      todosForDay(day) {
        const dayStart = new Date(day).setHours(0, 0, 0, 0);
        const dayEnd = new Date(day).setHours(23, 59, 59, 999);

        return get().todos.filter((todo) => {
          return todo.date >= dayStart && todo.date <= dayEnd;
        });
      },
      addTodo(todo, date = new Date()) {
        set({
          todos: [
            ...get().todos,
            {
              ...todo,
              completed: false,
              date: date.getTime(),
              id: generateUUID(),
            },
          ],
        });
      },
      removeTodo(id) {
        set({
          todos: get().todos.filter((todo) => todo.id !== id),
        });
      },
      markAsCompleted(id) {
        set({
          todos: get().todos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          }),
        });
      },
    }),
    { name: 'todos', getStorage: () => AsyncStorage }
  )
);
