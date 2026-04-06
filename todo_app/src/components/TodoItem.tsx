import { useState } from "react";

type TodoItemProps = {
  id: number;
  text: string;
  status: boolean;
  handleTodoStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
};

function TodoItem({
  id,
  text,
  status,
  handleTodoStatus,
  deleteTodo,
  editTodo
}: TodoItemProps) {
  const [completed, setCompleted] = useState<boolean>(status);
  const [editText, setEditText] = useState<string>(text);
  const [edit, setEdit] = useState<boolean>(false);

  const statusHandler = () => {
    setCompleted(!completed);
    handleTodoStatus(id);
  };

  const deleteTodoHandler = () => {
    deleteTodo(id);
  };

  const editTodoHandler = () => {
    setEdit(true);
  }

  const handleEdit = () => {
    setEdit(false);
    editTodo(id, editText);
  }

  return (
    <div
      key={id}
      style={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        marginBottom: "6px",
        marginTop: "6px",
      }}
    >
      <input
        type="checkbox"
        checked={status}
        onChange={statusHandler}
        style={{ margin: 0 }}
      />
      {!edit ? (<h4
        style={{ textDecoration: status ? "line-through" : "none", margin: 0 }}
        onDoubleClick={editTodoHandler}
      >
        {text}
      </h4>) : (
        <input type="text" value={editText} onBlur={handleEdit} onChange={(e) => setEditText(e.target.value)}/>
      )}
      <button onClick={deleteTodoHandler}>❌</button>
    </div>
  );
}

export default TodoItem;
