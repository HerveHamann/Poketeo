import React from "react";
import { forecastType, optionType } from "../types";

type Props = {
  setForecast: React.Dispatch<React.SetStateAction<forecastType | null>>;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<optionType | null>>;
};
const NewSearchBtn = ({ setForecast, setUserInput, setCity }: Props) => {
  const resetOptions = () => {
    setForecast(null);
    setUserInput("");
    setCity(null);
  };
  return (
    <div className="reset-container">
      <button
        onClick={() => {
          resetOptions();
        }}
      >
        Nouvelle Recherche
      </button>
    </div>
  );
};

export default NewSearchBtn;
