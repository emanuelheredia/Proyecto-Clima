import React, { useState, useEffect } from "react";
import transformCounty from "country-list-js";

const Card = (cityData) => {
	console.log(cityData);
	const [fecha, setfecha] = useState(
		cityData.cityData.dt
			? new Date(cityData.cityData.dt * 1000).toString()
			: null,
	);

	useEffect(() => {
		if (cityData.cityData.dt) {
			setfecha(new Date(cityData.cityData.dt * 1000).toUTCString());
		}
	}, [cityData.cityData]);

	console.log(fecha);
	return (
		<div>
			<h1>
				{" "}
				Ciudad de{" "}
				{cityData.cityData.name ? cityData.cityData.name : null} -{" "}
				{cityData.cityData.sys
					? transformCounty.findByIso2(cityData.cityData.sys.country)
							.name
					: null}
			</h1>
			<h2>
				Temperatura actual:{" "}
				{cityData.cityData.main
					? (cityData.cityData.main.temp - 273.15).toFixed(2)
					: null}
				°C
			</h2>
			<h2>
				Sensación Térmica:{" "}
				{cityData.cityData.main
					? (cityData.cityData.main.feels_like - 273.15).toFixed(2)
					: null}
				°C
			</h2>
			<h2>
				Temperatura Mínima:{" "}
				{cityData.cityData.main
					? (cityData.cityData.main.temp_min - 273.15).toFixed(2)
					: null}
				°C
			</h2>
			<h2>
				Temperatura Máxima:{" "}
				{cityData.cityData.main
					? (cityData.cityData.main.temp_max - 273.15).toFixed(2)
					: null}
				°C
			</h2>
			<h4>Ultima actualización : {fecha}</h4>
			<h2></h2>
			<h2></h2>
			<h2></h2>
			<h2></h2>
		</div>
	);
};

export default Card;
