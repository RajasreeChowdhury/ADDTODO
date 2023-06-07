import React, { useState } from "react";
import EditTodo from "./EditTodo";
import { connect } from "react-redux";
import { updateTodo } from "../redux";
import { contract } from "../ethers";

const Todo = ({ listIndex, todoIndex, todo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await contract.updateTodo(
        todo.id,
        todo.list,
        editedTitle.trim(),
        editedDescription.trim()
      );
      onEditTodo(
        listIndex,
        todoIndex,
        editedTitle.trim(),
        editedDescription.trim()
      );
      setIsEditing(false);
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  if (isEditing) {
    return (
      <div className="todo">
        <EditTodo
          todo={todo}
          onSave={handleSaveClick}
          onTitleChange={setEditedTitle}
          onDescriptionChange={setEditedDescription}
        />
      </div>
    );
  }

  return (
    <div className="todo">
      <span>{todo.title}</span>
      <span>{todo.description}</span>
      <button onClick={handleEditClick}>Edit</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onEditTodo: (listIndex, todoIndex, title, description) =>
    dispatch(updateTodo(listIndex, todoIndex, title, description))
});

export default connect(null, mapDispatchToProps)(Todo);
