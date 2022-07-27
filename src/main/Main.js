import React from "react";
import { useEffect, useState } from "react";
import Card from "../card/Card";
import config from "../config/config";
import transformCounty from "country-list-js";

const Main = () => {
	const [inputCity, setInputCity] = useState("");
	const [inputCountry, setInputCountry] = useState("");
	const [resData, setResData] = useState("");
	const [cityData, setCityData] = useState("");
	const [codCountry, setCodCountry] = useState("");

	const saveWord = (e) => {
		setInputCity(e.target.value);
	};
	const saveWordCountry = (e) => {
		setInputCountry(
			e.target.value
				.split(" ")
				.map((word) => capitalizarPrimeraLetra(word)),
		);
	};

	function capitalizarPrimeraLetra(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	useEffect(() => {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=" +
				inputCity +
				"," +
				codCountry.toLowerCase() +
				"&appid=" +
				config.keyOpenWather,
		)
			.then((response) => response.json())
			.then((res) => setResData(res));
	}, [inputCity, codCountry]);

	useEffect(() => {
		if (resData && resData.message !== "city not found") {
			setCityData(resData);
		}
	}, [resData]);

	useEffect(() => {
		if (inputCountry.length != 0) {
			let cod = transformCounty.findByName(inputCountry);
			if (cod) {
				setCodCountry(cod.code.iso2);
			} else {
				setCodCountry("");
			}
		}
	}, [inputCountry, inputCity]);

	return (
		<div>
			{" "}
			<div className="container  mt-3 d-flex flex-column w-50">
				<input
					className="bg-white p-3 border border-white rounded mb-5"
					type="text"
					placeholder="Enter city name "
					onChange={(e) => saveWord(e)}
				/>
				<input
					className="bg-white p-3 border border-white rounded mb-5"
					type="text"
					placeholder="Enter the country name for a more specific search (optional)"
					onChange={(e) => saveWordCountry(e)}
				/>

				{resData.message === "city not found" ||
				resData.message === "Nothing to geocode" ||
				inputCity.length < 2 ? (
					"No se encontraron resultados"
				) : (
					<Card cityData={cityData} />
				)}
			</div>
		</div>
	);
};

export default Main;
