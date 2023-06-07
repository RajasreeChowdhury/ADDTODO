import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodoList } from "../redux";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../config";

const AddTodoList = ({ onAddTodoList }) => {
  const [title, setTitle] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddTodoList = async () => {
    if (title.trim() === "") {
      return;
    }

    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.infura.io/v3/ead6f743890143bc854d55f832026fbb"
      );
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      await contract.addList(title);

      onAddTodoList(title);

      setTitle("");
    } catch (error) {
      console.log("Error adding todo list:", error);
    }
  };

  return (
    <div className="add-todo-list">
      <input
        type="text"
        placeholder="Add Todo List"
        value={title}
        onChange={handleTitleChange}
      />
      <button onClick={handleAddTodoList}>+</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  onAddTodoList: (title) => dispatch(addTodoList(title))
});

export default connect(null, mapDispatchToProps)(AddTodoList);
