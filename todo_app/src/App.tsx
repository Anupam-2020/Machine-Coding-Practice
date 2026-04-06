import { useEffect, useState, type FormEvent } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type FilterType = "All" | "Active" | "Completed";

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState<FilterType>("All");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo === "") return;
    const updatedTodos = [...todos];
    const newTodo: Todo = {
      id: Date.now(),
      text: todo,
      completed: false,
    };
    updatedTodos.push(newTodo);
    setTodos(updatedTodos);
    setTodo("");
  };

  const handleTodoStatus = (id: number) => {
    const updatedTodos = [...todos];

    const index = updatedTodos.findIndex((todo) => todo.id === id);

    updatedTodos[index].completed = !updatedTodos[index].completed;

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (id: number, data: string) => {
    console.log(todos);
    const updatedTodos = [...todos];
    const ind = updatedTodos.findIndex((todo) => todo.id === id);
    updatedTodos[ind].text = data;

    setTodos(updatedTodos);
  }

  const filteredTodos: Todo[] = todos.filter((todo) => {
    if (filter === "Active") return !todo.completed;
    if (filter === "Completed") return todo.completed;
    return true;
  });

  return (
    <div>
      <h2>Todo App</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", width: "80vw", gap: "7px" }}
      >
        <input
          style={{
            width: "60%",
            height: "30px",
            fontSize: "15px",
          }}
          value={todo}
          type="text"
          placeholder="Add todo"
          name="todo"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          type="submit"
          style={todo ? { opacity: 1, cursor: "pointer" } : { opacity: 0.3 }}
        >
          Add
        </button>
      </form>
      <div style={{ display: "flex", gap: "4px", marginTop: "10px" }}>
        <button
          style={{ opacity: filter === "All" ? 1 : 0.6 }}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          style={{ opacity: filter === "Active" ? 1 : 0.6 }}
          onClick={() => setFilter("Active")}
        >
          Active
        </button>
        <button
          style={{ opacity: filter === "Completed" ? 1 : 0.6 }}
          onClick={() => setFilter("Completed")}
        >
          Completed
        </button>
      </div>

      <div>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => {
            return (
              <div key={todo.id}>
                <TodoItem
                  id={todo.id}
                  text={todo.text}
                  status={todo.completed}
                  handleTodoStatus={handleTodoStatus}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              </div>
            );
          })
        ) : (
          <h4>No todos found.</h4>
        )}
      </div>
    </div>
  );
}

export default App;
