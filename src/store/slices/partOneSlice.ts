import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, TodoState } from '../../utils/types';

const initialState: TodoState = {
  todos: [],
};

const partOneSlice = createSlice({
  name: 'partOne',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = partOneSlice.actions;

export default partOneSlice.reducer;
