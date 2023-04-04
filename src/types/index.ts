import { Name } from "pokenode-ts";

export type optionType = { name: string; country: string; lat: number; lon: number };

export type forecastType = {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  timezone: number;
  list: [
    {
      dt: number;
      sys: {
        pod: string;
      };
      main: {
        feels_like: number;
        humidity: number;
        preasure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
      };
      weather: [{ id: number; main: string; icon: string; description: string }];
      wind: {
        speed: number;
        gust: number;
        deg: number;
      };
      clouds: {
        all: number;
      };
      rain: {
        "3h": number | null;
      };
      snow: {
        "3h": number | null;
      };

      pop: number;
      visibility: number;
    }
  ];
};

export type detailedDataType = {
  dt: number;
  sys: {
    pod: string;
  };
  main: {
    feels_like: number;
    humidity: number;
    preasure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: [{ id: number; main: string; icon: string; description: string }];
  wind: {
    speed: number;
    gust: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  pop: number;
  visibility: number;
  rain: {
    "3h": number | null;
  };
  snow: {
    "3h": number | null;
  };
};

export type pokemontype = {
  name: string;
  names: Name[];
};
