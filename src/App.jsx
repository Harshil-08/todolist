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
			setTodos([...todos, { task: inputValue, isCompleted: false }]);
			console.log(todos)
			setInputValue("");
		}
	}
	const handleClick = (index) => {
		setTodos((prevTodos) => {
			const updatedTodos = [...prevTodos];
			updatedTodos[index].isCompleted = !updatedTodos[index].isCompleted;
			return updatedTodos;
		});
	};

	function handleDelete(index) {
		const updatedTodos = todos.filter((_, i) => i !== index);
		setTodos(updatedTodos);
	}

	return (
		<div className="flex flex-col justify-center items-center mt-64">
			<form className="flex justify-center items-center w-full">
				<input
					className="w-1/2 p-2 outline-none rounded-full border-2 border-zinc-300 hover:drop-shadow-xl"
					type="text"
					value={inputValue}
					placeholder="Enter your text here"
					onChange={handleChange}
				/>
				<button
					type="submit"
					className="w-32 p-2 border-2 rounded-xl font-semibold text-white bg-gray-500"
					onClick={handleSubmit}
				>
					Submit
				</button>
			</form>
			<ul className="w-1/2 gap-x-4 flex flex-col">
				{todos.map((todo, index) => (
					<div className="flex justify-between" key={index}>
						<li
							className={`p-2 ${todo.isCompleted ? "line-through" : ""}`}
							onClick={() => handleClick(index)}
						>
							{todo}
						</li>
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
	);
}

export default App;
