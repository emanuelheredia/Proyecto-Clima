import React, { useState, useEffect } from "react";
import transformCounty from "country-list-js";
import "./card.css";

const Card = (cityData) => {
	console.log(cityData);
	const [fecha, setfecha] = useState(
		cityData.cityData.dt
			? new Date(cityData.cityData.dt * 1000).toLocaleTimeString()
			: null,
	);

	useEffect(() => {
		if (cityData.cityData.dt) {
			setfecha(
				new Date(cityData.cityData.dt * 1000).toLocaleTimeString(),
			);
		}
	}, [cityData.cityData]);

	console.log(fecha);
	return (
		<div className="backGroundCard rounded shadow p-3">
			<div className="d-flex justify-content-md-between mb-3 ">
				<div className="w-25 d-flex flex-column h-auto justify-content-center">
					<h4 className="mb-4 mt-3">
						Ciudad de{" "}
						{cityData.cityData.name ? cityData.cityData.name : null}
					</h4>
					<h4>
						{cityData.cityData.sys
							? transformCounty.findByIso2(
									cityData.cityData.sys.country,
							  ).name
							: null}
					</h4>
				</div>
				<div className="d-flex align-items-center w-25 justify-content-center">
					{cityData.cityData.weather ? (
						<img
							src={
								"https://openweathermap.org/img/w/" +
								cityData.cityData.weather[0].icon +
								".png"
							}
							className="w-100"
						></img>
					) : null}
				</div>
				<div className="d-flex flex-column align-items-start justify-content-between py-4">
					<h4>
						Temperatura actual:{" "}
						{cityData.cityData.main
							? (cityData.cityData.main.temp - 273.15).toFixed(2)
							: null}
						°C
					</h4>
					<h4>
						Sensación Térmica:{" "}
						{cityData.cityData.main
							? (
									cityData.cityData.main.feels_like - 273.15
							  ).toFixed(2)
							: null}
						°C
					</h4>
					<h4>
						Temperatura Mínima:{" "}
						{cityData.cityData.main
							? (
									cityData.cityData.main.temp_min - 273.15
							  ).toFixed(2)
							: null}
						°C
					</h4>
					<h4>
						Temperatura Máxima:{" "}
						{cityData.cityData.main
							? (
									cityData.cityData.main.temp_max - 273.15
							  ).toFixed(2)
							: null}
						°C
					</h4>
				</div>
			</div>
			<h5 className="pt-3">Ultima actualización : {fecha} hs</h5>
		</div>
	);
};

export default Card;
