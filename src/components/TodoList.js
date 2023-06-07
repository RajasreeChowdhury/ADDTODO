import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
import AddTodoList from "./AddTodoList";
import { addTodoList } from "../redux";

const TodoList = ({ todoLists, onAddTodoList, onEditTodo }) => {
  return (
    <div className="todo-lists">
      {todoLists.map((todoList, listIndex) => (
        <div key={listIndex} className="todo-list">
          <h3>{todoList.title}</h3>
          {todoList.todos.map((todo, todoIndex) => (
            <Todo
              key={todoIndex}
              listIndex={listIndex}
              todoIndex={todoIndex}
              todo={todo}
              onEditTodo={onEditTodo}
            />
          ))}
          <AddTodoList onAddTodoList={onAddTodoList} />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  todoLists: state.todoLists
});

const mapDispatchToProps = (dispatch) => ({
  onAddTodoList: (title) => dispatch(addTodoList(title))
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
