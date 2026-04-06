import { useState } from "react";

type TodoItemProps = {
  id: number;
  text: string;
  status: boolean;
  handleTodoStatus: (id: number) => void;
  deleteTodo: (id: number) => void;
};

function TodoItem({
  id,
  text,
  status,
  handleTodoStatus,
  deleteTodo,
}: TodoItemProps) {
  const [completed, setCompleted] = useState<boolean>(status);

  const statusHandler = () => {
    setCompleted(!completed);
    handleTodoStatus(id);
  };

  const deleteTodoHandler = () => {
    deleteTodo(id);
  };

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
      <h4
        style={{ textDecoration: status ? "line-through" : "none", margin: 0 }}
      >
        {text}
      </h4>
      <button onClick={deleteTodoHandler}>❌</button>
    </div>
  );
}

export default TodoItem;
