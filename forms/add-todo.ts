import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const addTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Task too long'),
});

type AddTodo = z.infer<typeof addTodoSchema>;

export function useAddTodoHookform(initialValues: AddTodo) {
  return useForm({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      ...initialValues,
    },
    reValidateMode: 'onBlur',
  });
}
