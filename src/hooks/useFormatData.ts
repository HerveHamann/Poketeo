import { Type } from "pokenode-ts";

const useFormatData = () => {
  const toHour = (item: number, timezone: number, localtimezone: number): number => {
    const hour = new Date((item + timezone - localtimezone) * 1000).getHours();
    return hour;
  };

  const toHourAndMinutes = (item: number, timezone: number, localtimezone: number): string => {
    const hour = new Date((item + timezone - localtimezone) * 1000).getHours();
    const minutes = new Date((item + timezone - localtimezone) * 1000).getMinutes();
    const theHour = `${hour} h ${minutes} minutes`;
    return theHour;
  };

  const RoundedValue = (item: number): number => {
    const roundedValue = Math.round(item * 10) / 10;
    return roundedValue;
  };
  const isInRange = (number: number, min: number, max: number) => {
    return number >= min && number <= max;
  };
  const weathertotype = (weatherId: number, temperature: number, pod: string): string => {
    if (isInRange(weatherId, 800, 804)) {
      return pod === "n" && isInRange(weatherId, 800, 804)
        ? temperature > 15
          ? "dark"
          : "ghost"
        : temperature > 25
        ? "fire"
        : "grass";
    }
    if (isInRange(weatherId, 200, 299)) {
      return "electric";
    }
    if (isInRange(weatherId, 300, 531)) {
      return "water";
    }
    if (isInRange(weatherId, 600, 622)) {
      return "ice";
    }
    if (isInRange(weatherId, 771, 781)) {
      return "flying";
    }
    if (isInRange(weatherId, 701, 721) || weatherId === 741) {
      return "poison";
    }
    if (weatherId === 731 || isInRange(weatherId, 751, 762)) {
      return "ground";
    } else return "erreur";
  };

  const getRdmPokemonName = (data: Type) => {
    function getLastPart(url: string) {
      const parts = url.split("/");
      return parts.at(-2);
    }
    const filtereddata = data.pokemon.filter(
      (item) => !item.pokemon.name.match("-") && Number(getLastPart(item.pokemon.url)) < 1015
    );
    const pokemonId = Math.floor(Math.random() * filtereddata.length);
    const pokemonSelected = filtereddata[pokemonId];
    let pokemonName = pokemonSelected.pokemon.name;
    return pokemonName;
  };

  const Tclass = (T: number): string => {
    if (isInRange(RoundedValue(T), -100, 0)) {
      return "Vcold";
    }
    if (isInRange(RoundedValue(T), 0, 10)) {
      return "cold";
    }
    if (isInRange(RoundedValue(T), 10, 20)) {
      return "tempered";
    }
    if (isInRange(RoundedValue(T), 20, 30)) {
      return "hot";
    }
    if (isInRange(RoundedValue(T), 30, 100)) {
      return "Vhot";
    } else return "";
  };
  return { getRdmPokemonName, toHour, toHourAndMinutes, RoundedValue, weathertotype, Tclass };
};

export default useFormatData;
