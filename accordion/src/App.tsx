import { useState } from "react";

const data = [
  { id: 1, question: "What is React?", answer: "A UI library" },
  { id: 2, question: "What is Hook?", answer: "Special functions in React" },
  { id: 3, question: "What is State?", answer: "Component memory" },
];

function App() {
  const [showItem, setShowItem] = useState<number | null>(null); // this is if we want only 1 item to be open at once.
  // const [showItems, setShowItems] = useState<number[]>([]); // this is if multiple items need to be open when clicked.


  const handleClick = (index: number | null) => {
    setShowItem(prev => prev === index ? null : index);
    // setShowItems((prev) =>
    //   prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    // );
  };

  return (
    <div className="App">
      {data.map((item) => {
        // const isOpen = showItems.includes(item.id);
        const isOpen = showItem === item.id;
        return (
          <div
            key={item.id}
            // onClick={() => handleClick(item.id)}
            onMouseEnter={() => handleClick(item.id)}
            onMouseLeave={() => handleClick(null)}
            style={{ width: "40%", display: "flex", flexDirection: "column" }}
          >
            <div style={{ border: "1px solid white" }}>{item.question}</div>
            <div
              style={{
                maxHeight: isOpen ? '200px' : '0px',
                overflow: 'hidden',
                transition: "all 0.3s ease",
                padding: isOpen ? '10px' : '0px'
              }}
            >{item.answer}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
