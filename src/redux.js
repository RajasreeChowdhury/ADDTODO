import { createStore } from "redux";

const initialState = {
  todoLists: []
};

const ADD_TODO_LIST = "ADD_TODO_LIST";
const UPDATE_TODO = "UPDATE_TODO";

export const addTodoList = (title) => ({
  type: ADD_TODO_LIST,
  payload: { title }
});

export const updateTodo = (listIndex, todoIndex, title, description) => ({
  type: UPDATE_TODO,
  payload: { listIndex, todoIndex, title, description }
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_LIST:
      return {
        ...state,
        todoLists: [
          ...state.todoLists,
          { title: action.payload.title, todos: [] }
        ]
      };
    case UPDATE_TODO:
      const { listIndex, todoIndex, title, description } = action.payload;
      const updatedTodoLists = [...state.todoLists];
      updatedTodoLists[listIndex].todos[todoIndex].title = title;
      updatedTodoLists[listIndex].todos[todoIndex].description = description;
      return {
        ...state,
        todoLists: updatedTodoLists
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
