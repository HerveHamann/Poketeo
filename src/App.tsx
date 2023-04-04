import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Intro from "./components/Intro";
import NewSearchBtn from "./components/NewSearchBtn";
import Result from "./components/Result";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

function App() {
  const {
    userInput,
    city,
    cityOption,
    forecast,
    InputChange,
    onOptionSelect,
    onSubmit,
    setForecast,
    setUserInput,
    setCity,
  } = useForecast();

  const cityName: string | undefined = city?.name;
  return (
    <div>
      <Header />
      {forecast ? (
        <div>
          <Result cityName={cityName} data={forecast} />{" "}
          <NewSearchBtn setForecast={setForecast} setUserInput={setUserInput} setCity={setCity} />
        </div>
      ) : (
        <div>
          <Intro />
          <Search
            userInput={userInput}
            cityOption={cityOption}
            InputChange={InputChange}
            onOptionSelect={onOptionSelect}
            onSubmit={onSubmit}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
