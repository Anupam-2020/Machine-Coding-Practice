import { useEffect, useState } from "react";
import "./App.css";
import { useDebounce } from "./useDebounce";

type User = {
  id: number;
  name: string;
  email: string;
};

function App() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<User[]>([]);
  const debouncedValue = useDebounce(query, 300);
  const [loading, setLoading] = useState(false);

  const showResults = debouncedValue.length > 2;

  useEffect(() => {
    if (!debouncedValue || debouncedValue.length < 3) return;
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        const resp = await fetch(
          `https://jsonplaceholder.typicode.com/users?name_like=${debouncedValue}`,
          { signal: controller.signal },
        );
        const data = await resp.json();
        setResults(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [debouncedValue]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Debounced Search</h2>
      <input
        style={{
          width: "60%",
          height: "30px",
          fontSize: "20px",
          marginTop: "10px",
        }}
        placeholder="enter name..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading ? <h2>Loading...</h2> : showResults && results.map(user => <h3>{user.name}</h3>)}
    </div>
  );
}

export default App;