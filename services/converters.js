export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const unixToLocalTime = (unix, timezone) => {
  let time = new Date((unix + timezone))
    .toISOString()
    .match(/(\d{2}:\d{2})/)[0];

  return time.startsWith("0") ? time.substring(1) : time;
};

export const timeStringToUnix = (timeString) => {
  let time = new Date(timeString);
  return time.getTime();
}

export const weatherCodeToInterpretation = (weatherCode) => {
  const conversionTable = {
    0 :	"Clear sky",
    1 : "Mainly clear",
    2 : "Partly cloudy",
    3 : "Overcast",
    45 : "Fog",
    48 : "Depositing rime fog",
    51 : "Light drizzle",
    53 : "Moderate drizzle",
    55 : "Dense drizzle",
    56 : "Light freezing Drizzle",
    57 : "Dense freezing Drizzle",
    61 : "Slight rain",
    63 : "Moderate rain",
    65 : "Heavy rain",
    66 : "Light Freezing rain",
    67 : "Heavy freezing rain",
    71 : "Slight snow fall",
    73 : "Moderate snow fall",
    75 : "Heavy snow fall",
    77 : "Snow grains",
    80 : "Slight rain showers",
    81 : "Moderate rain showers",
    82 : "Violent rain showers",
    85 : "Slight snow showers",
    86 : "Heavy snow showers",
    95 : "Thunderstorm",
    96 : "Thunderstorm with slight hail",
    99 : "Thunderstorm with heavy hail",
  }

  if (!conversionTable.hasOwnProperty(weatherCode)){
    return "Unspecified weather description"
  }
  return conversionTable[weatherCode];
};
export const weatherCodeToIcon = (weatherCode, isDaytime) => {
  const conversionTable = {
    0 :	"01",
    1 : "02",
    2 : "03",
    3 : "04",
    45 : "50",
    48 : "50",
    51 : "09",
    53 : "09",
    55 : "09",
    56 : "09",
    57 : "09",
    61 : "09",
    63 : "09",
    65 : "09",
    66 : "09",
    67 : "09",
    71 : "13",
    73 : "13",
    75 : "13",
    77 : "13",
    80 : "09",
    81 : "09",
    82 : "09",
    85 : "09",
    86 : "09",
    95 : "11",
    96 : "11",
    99 : "11",
  }

  if (!conversionTable.hasOwnProperty(weatherCode)){
    return ""
  }
  let iconName = conversionTable[weatherCode];
  if(!isDaytime){
    return iconName+="n";
  }
  return iconName+="d";
};