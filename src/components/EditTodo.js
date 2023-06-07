import React from "react";
import { connect } from "react-redux";
import { updateTodo } from "../redux";
import { contract } from "../ethers";

const EditTodo = ({ todo, onSave, onTitleChange, onDescriptionChange }) => {
  const handleSaveClick = async () => {
    try {
      await contract.updateTodo(
        todo.id,
        todo.list,
        todo.title.trim(),
        todo.description.trim()
      );
      onSave(todo.title.trim(), todo.description.trim());
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  return (
    <div className="edit-todo">
      <input
        type="text"
        value={todo.title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <input
        type="text"
        value={todo.description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      <button onClick={handleSaveClick}>Save</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onSave: (title, description) => dispatch(updateTodo(title, description))
});

export default connect(null, mapDispatchToProps)(EditTodo);
