import { useEffect, useState } from "react";
import Nadbar from "./nadbar/Nadbar";
import "./App.css";

function App() {
	const [inputWord, setinputWord] = useState("");

	const saveWord = (e) => {
		setinputWord(e.target.value);
	};

	useEffect(() => {}, [inputWord]);
	let city = "cordoba";

	fetch(
		"https://api.openweathermap.org/data/2.5/weather?q=" +
			city +
			"&appid=c1930c893b3ded3d64d9de4d2ea80452",
	)
		.then((response) => response.json())
		.then((res) => console.log(res));

	return (
		<div className="App">
			<Nadbar />
			<div className="container border mt-3 d-flex flex-column w-auto">
				<input type="text" onChange={(e) => saveWord(e)} />
				<button type="submit" className="">
					Cargar Tarea
				</button>
			</div>
			<h2>{inputWord}</h2>
		</div>
	);
}

export default App;
