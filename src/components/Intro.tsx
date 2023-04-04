import React from "react";
import Pokeball from "./Pokeball";
import dracaufeu from "../assets/img/dracaufeu.webp";
const Intro = (): JSX.Element => {
  return (
    <section className="intro-container">
      <div className="ballconainer">
        <div className="ballyaxismove">
          <Pokeball classSet="launch" />
        </div>
        <img className="pokemon" src={dracaufeu} alt="dracaufeu" />
      </div>
      <h1>Votre application météo pokémon</h1>
    </section>
  );
};

export default Intro;
