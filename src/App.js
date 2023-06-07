import React, { useState } from "react";
import TodoList from "./components/TodoList";
import { contract } from "./ethers";

const App = () => {
  const [todoLists, setTodoLists] = useState([]);

  const handleAddTodoList = async (title) => {
    try {
      await contract.addList(title);
      setTodoLists([...todoLists, { title, todos: [] }]);
    } catch (error) {
      console.log("Error adding todo list:", error);
    }
  };

  const handleEditTodo = async (
    listIndex,
    todoIndex,
    editedTitle,
    editedDescription
  ) => {
    const updatedTodoLists = [...todoLists];
    updatedTodoLists[listIndex].todos[todoIndex].title = editedTitle;
    updatedTodoLists[listIndex].todos[
      todoIndex
    ].description = editedDescription;

    try {
      await contract.updateTodo(
        updatedTodoLists[listIndex].todos[todoIndex].id,
        updatedTodoLists[listIndex].title,
        editedTitle,
        editedDescription
      );
      setTodoLists(updatedTodoLists);
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  return (
    <div className="app">
      <TodoList
        todoLists={todoLists}
        onAddTodoList={handleAddTodoList}
        onEditTodo={handleEditTodo}
      />
    </div>
  );
};

export default App;
