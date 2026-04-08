import { useState } from "react";

const data = [
  { id: 1, question: "What is React?", answer: "A UI library" },
  { id: 2, question: "What is Hook?", answer: "Special functions in React" },
  { id: 3, question: "What is State?", answer: "Component memory" },
];


function App() {

  // const [showItem, setShowItem] = useState<number | null>(null); // this is if we want only 1 item to be open at once.
  const [showItems, setShowItems] = useState<number[]>([]); // this is if multiple items need to be open when clicked.

  const handleClick = (index: number) => {
    // setShowItem(prev => prev === index ? null : index);
    setShowItems(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
  };

  return (
    <div className="App">
      {data.map((item) => {
        const isOpen = showItems.includes(item.id);
        return (
          <div
            key={item.id}
            onClick={() => handleClick(item.id)}
            style={{ width: "40%", display: "flex", flexDirection: "column" }}
          >
            <span style={{ border: "1px solid white" }}>{item.question}</span>
            {isOpen && <span>{item.answer}</span>}
          </div>
        );
      })}
    </div>
  );
}

export default App;