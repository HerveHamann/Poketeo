import React, { ChangeEvent } from "react";
import { optionType } from "../types";

type Props = {
  userInput: string;
  cityOption: [];
  InputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  onSubmit: () => void;
};

const Search = ({ userInput, cityOption, InputChange, onOptionSelect, onSubmit }: Props): JSX.Element => {
  return (
    <section className="container-search">
      <p>Recherchez le temps qu'il fait dans votre arène : </p>
      <div className="search">
        <input
          placeholder="Votre Arène"
          type="text"
          value={userInput}
          onChange={InputChange}
          className="imput-search"
        />
        {cityOption.length === 0 ? (
          ""
        ) : (
          <ul>
            {" "}
            {cityOption.map((option: optionType, index: number) => (
              <li key={option.name + `-` + index}>
                <button onClick={() => onOptionSelect(option)}>
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="border">
          <button onClick={onSubmit}>Rechercher</button>
        </div>
      </div>
    </section>
  );
};

export default Search;
