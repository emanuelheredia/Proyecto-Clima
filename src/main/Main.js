import React from "react";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import config from "../config/config";

const Main = () => {
	const [inputCity, setInputCity] = useState("");
	const [resData, setResData] = useState("");
	const [cityData, setCityData] = useState("");

	const saveWord = (e) => {
		setInputCity(e.target.value);
	};

	useEffect(() => {
		if (inputCity.length > 2) {
			fetch(
				"https://api.openweathermap.org/data/2.5/weather?q=" +
					inputCity +
					"&appid=" +
					config.keyOpenWather,
			)
				.then((response) => response.json())
				.then((res) => setResData(res));
		}
	}, [inputCity]);

	useEffect(() => {
		if (resData && resData.message !== "city not found") {
			setCityData(resData);
		}
	}, [resData]);

	return (
		<div>
			{" "}
			<div className="container border mt-3 d-flex flex-column w-50">
				<input type="text" onChange={(e) => saveWord(e)} />
				<Card cityData={cityData} />
			</div>
		</div>
	);
};

export default Main;
