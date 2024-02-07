import { Input } from "postcss";
import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue === null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, isCompleted: false }]);
      setInputValue("");
    }
  }

  const handleClick = (index) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo, i) => {
        if (i === index) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      });
    });
  };

  function handleDelete(index) {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos)
  }

  return (
    <>
      <p className="mt-36 font-extrabold text-3xl md:text-6xl flex justify-center">Apna Todolist</p>
      <div className="flex flex-col justify-center items-center p-6 text-sm md:text-lg ">
        <form className="flex justify-center items-center w-full">
          <input
            className="md:w-1/2 p-2 outline-none rounded-full border-2 border-zinc-300 hover:drop-shadow-lg"
            type="text"
            value={inputValue}
            placeholder="Enter your text here"
            onChange={handleChange}
          />
          <button
            type="submit"
            className=" p-2 border-2 rounded-xl font-semibold text-white bg-gray-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        <ul className="md:w-1/2 w-[300px] gap-x-4 flex flex-col">
          {todos.map((todo, index) => (
            <div className="flex justify-between items-center"
            >
              <div className="flex gap-2 w-5/6 text-wrap">
              <input type="checkbox"
                className=""
                onClick={() => handleClick(index)}
                checked={todo.isCompleted}
                key={index}
              ></input>
              
              <li
                className={` ${todo.isCompleted ? "line-through" : ""} select-none overflow-y-auto`}
              >
                {todo.text}
              </li>
              </div>
              <button
                className="p-2 text-white bg-red-500 rounded-xl font-semibold mt-2"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
