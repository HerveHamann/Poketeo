import { useState, useEffect, ChangeEvent } from "react";
import { optionType, forecastType } from "../types";

const useForecast = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [cityOption, setCityOption] = useState<[]>([]);
  const [forecast, setForecast] = useState<forecastType | null>(null);
  const searchOptions = (value: string) => {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value},&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setCityOption(data))
      .catch((error) => console.error(error));
  };

  const InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    if (value === "") {
      setCityOption([]);
      return;
    }

    value.match(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    )
      ? searchOptions(value)
      : setUserInput("Lettres uniquement!");
  };
  const getForecast = (city: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&lang=fr&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    )
      .then((res) => res.json())

      .then((data) => {
        const forecastData = { ...data.city, list: data.list.slice(0, 16) };
        setForecast(forecastData);
      })
      .catch((error) => console.error(error));
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };
  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setUserInput(`${city.name}, ${city.country}`);
      setCityOption([]);
    }
  }, [city]);

  return {
    userInput,
    cityOption,
    city,
    forecast,
    InputChange,
    onOptionSelect,
    onSubmit,
    setForecast,
    setUserInput,
    setCity,
  };
};
export default useForecast;
