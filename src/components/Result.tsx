import React, { useState, useEffect } from "react";
import { forecastType, detailedDataType, pokemontype } from "../types";
import Pokeball from "./Pokeball";
import arrowleft from "../assets/img/arrowleft.svg";
import arrowright from "../assets/img/arrowright.svg";
import DetailedResult from "./DetailedResult";
import { PokemonClient } from "pokenode-ts";
import useFormatData from "../hooks/useFormatData";
import useViewport from "../hooks/useViewport";

type Props = {
  cityName: string | undefined;
  data: forecastType;
};
const Result = ({ data, cityName }: Props): JSX.Element => {
  const [index, setIndex] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<pokemontype | null>(null);
  const [pokemonName, setPokemonName] = useState<string>("");
  const [selectedData, setSelectedData] = useState<detailedDataType | null>(null);
  const [nbCard, setNbCard] = useState<number>(5);
  const slicedData = data.list.slice(index, index + nbCard);
  const localtimezone: number = new Date().getTimezoneOffset() * -60;
  const { toHour, toHourAndMinutes, RoundedValue, weathertotype, getRdmPokemonName, Tclass } = useFormatData();
  const { width } = useViewport();

  useEffect(() => {
    if (width > 700) {
      setNbCard(5);
    }
    if (width < 700) {
      setNbCard(3);
    }
    if (width < 450) {
      setNbCard(2);
    }
  }, [width]);

  const OnCardSelect = (item: detailedDataType) => {
    (async () => {
      const api = new PokemonClient();
      await api
        .getTypeByName(weathertotype(item.weather[0].id, item.main.temp, item.sys.pod))
        .then((data) => {
          setPokemonName(getRdmPokemonName(data));
          setSelectedType(data);
        })
        .catch((error) => console.error(error));
    })();
    setSelectedData({ ...item });
  };

  return (
    <section className="result-container">
      <div className="general-info">
        Votre arène :<span className={Tclass(RoundedValue(data.list[0].main.temp))}> {cityName}</span>
        <br />
        Température actuelle :
        <span className={Tclass(RoundedValue(data.list[0].main.temp))}> {RoundedValue(data.list[0].main.temp)}°C </span>
        <br />
        Levé du soleil :{" "}
        <span className="sunrise">{toHourAndMinutes(data.sunrise, data.timezone, localtimezone)} </span>
        <br />
        Couché du soleil :{" "}
        <span className="sunset">{toHourAndMinutes(data.sunset, data.timezone, localtimezone)} </span>
      </div>

      <div className={`titleday ${Tclass(RoundedValue(slicedData[0].main.temp))}`}>
        {(slicedData[0].dt + data.timezone) * 1000 < new Date().setUTCHours(24, 0, 0)
          ? "Aujourd'hui"
          : (slicedData[0].dt + data.timezone) * 1000 > new Date().setUTCHours(24, 0, 0) &&
            (slicedData[0].dt + data.timezone) * 1000 < new Date().setUTCHours(48, 0, 0)
          ? "Demain"
          : "Après demain"}
      </div>
      <div className="list-container">
        <div className="button-container">
          <button className={index === 0 ? "hidden" : "previous"} onClick={() => setIndex(index - 1)}>
            <img src={arrowleft} alt="flèche gauche" />
          </button>
        </div>
        {slicedData.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              OnCardSelect(item);
            }}
            className={item.sys.pod === "n" ? "night card" : "card"}
          >
            <div className="hour-container">A {toHour(item.dt, data.timezone, localtimezone)} Heures : </div>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <div className="description">{item.weather[0].description}</div>
            <div className="T-container">{RoundedValue(item.main.temp)} °C</div>
            <Pokeball classSet={selectedData?.dt === item.dt ? "launch" : "stir"} />
          </div>
        ))}
        <div className="button-container">
          <button
            className={index + 4 === data.list.length - 1 ? "hidden" : "next"}
            onClick={() => setIndex(index + 1)}
          >
            <img src={arrowright} alt="flèche droite" />
          </button>
        </div>
        {selectedData && (
          <DetailedResult selectedType={selectedType} selectedData={selectedData} pokemonName={pokemonName} />
        )}
      </div>
    </section>
  );
};

export default Result;
