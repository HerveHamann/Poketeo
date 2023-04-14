import React, { useState, useEffect } from "react";
import { detailedDataType, pokemontype } from "../types";
import { PokemonClient } from "pokenode-ts";
import useFormatData from "../hooks/useFormatData";
import windarrow from "../assets/img/windarrow.svg";
type Props = {
  selectedData: detailedDataType | null;
  pokemonName: string;
  selectedType: pokemontype | null;
};

const DetailedResult = ({ selectedData, pokemonName, selectedType }: Props): JSX.Element => {
  const [pokemonNameInFrench, setPokemonNameInFrench] = useState<string>("");
  const [pokemonSprit, setPokemonSprit] = useState<string | null | undefined>();
  const [animateCompontent, setAnimateCompontent] = useState<string>("");
  const { RoundedValue } = useFormatData();

  useEffect(() => {
    if (pokemonName !== "") {
      (async () => {
        const api = new PokemonClient();

        await api
          .getPokemonSpeciesByName(pokemonName)
          .then((data) => setPokemonNameInFrench(data.names[4].name))
          .catch((error) => console.log(error));
        await api
          .getPokemonByName(pokemonName)
          .then((data) => setPokemonSprit(data.sprites.other?.["official-artwork"].front_default))
          .catch((error) => console.log(error));
      })();
    }
  }, [pokemonName]);
  useEffect(() => {
    setAnimateCompontent("animate");
    setTimeout(() => {
      setAnimateCompontent("");
    }, 1500);
  }, [pokemonName]);
  return (
    <section className={`detailedresult-container ${selectedType?.name} ${animateCompontent}`}>
      {selectedData && selectedType && (
        <div>
          <div className="time-info "> Informations détaillées : </div>
          <div className="detail-info ">
            <div className={selectedType.name}>
              <p> Le temps :</p>
              <span>Type : {selectedData.weather[0].description}</span>
              <span>Couverture Nuageuse : {selectedData.clouds.all} %</span>
              <span> Humidité : {selectedData.main.humidity} % </span>
              <span>
                {selectedData.visibility < 1000 ? `Visibilité égale à : ${selectedData.visibility / 1000}km` : ""}
              </span>
            </div>
            <div className={selectedType.name}>
              <p>Température :</p>
              <span>Réelle : {RoundedValue(selectedData.main.temp)} °C</span>
              <span>Ressentie : {RoundedValue(selectedData.main.feels_like)} °C</span>
              <span>
                {selectedData.main.temp_min !== selectedData.main.temp
                  ? ` Minimale : ${RoundedValue(selectedData.main.temp_min)} ° C`
                  : ""}
              </span>
              <span>
                {selectedData.main.temp_max !== selectedData.main.temp
                  ? `Maximale : ${selectedData.main.temp_max} ° C`
                  : ""}
              </span>
            </div>
            <div className={selectedType.name}>
              <p>Vent :</p>
              <span> Vitesse moyenne : {RoundedValue(selectedData.wind.speed * 3.6)} km/h</span>
              <span> Vitesse maximum : {RoundedValue(selectedData.wind.gust * 3.6)} km/h</span>
              <span>
                {" "}
                Direction :
                <img
                  className="wind-direction"
                  style={{ rotate: `${selectedData.wind.deg}deg` }}
                  src={windarrow}
                  alt="Sens du vent"
                />
              </span>
            </div>
            <div className={selectedType.name}>
              <p>Précipitations :</p>
              <span>Risque : {RoundedValue(selectedData.pop * 100)} % </span>
              <span> {selectedData.rain ? `Pluie à venir : ${selectedData.rain["3h"]}mm` : ""} </span>
              <span> {selectedData.snow ? `Neige à venir  : ${selectedData.snow["3h"]}mm` : ""} </span>
            </div>
          </div>
          <div className="pokemon-card">
            <div className={`pokemon-info ${selectedType.name}`}>
              <p>
                Le temps de type {selectedData.weather[0].description} avec une tempéréture de{" "}
                {RoundedValue(selectedData.main.temp)} °C sera idéal pour sortir avec {pokemonNameInFrench} ou vos
                autres pokémon de type {selectedType.names[3].name} .
                <br />
                {RoundedValue(selectedData.wind.speed * 3.6) > 80 && `Attention au risque de vent violent.`}
                <br />
                {selectedData.visibility < 1000 && `Attention à la visibilité réduite.`}
                <br />
                {selectedData.pop * 100 > 50 && `Attention au risque de précipitation.`}
              </p>
            </div>
            {pokemonSprit && <img className={selectedType.name} src={pokemonSprit} alt={pokemonNameInFrench} />}
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailedResult;
