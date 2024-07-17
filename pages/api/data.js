import getConfig from "./config";

export default async function handler(req, res) {
  const apiOrigin = "https://api.open-meteo.com";
  const apiEndpoint = "/v1/forecast";
  const config = await getConfig();
  const {cityLatitude, cityLongitude, cityName, countryName} = config;

  const options ="&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&minutely_15=visibility&daily=sunrise,sunset&timezone=auto"

  const requestUrl = `${apiOrigin}${apiEndpoint}?latitude=${cityLatitude}&longitude=${cityLongitude}${options}`

  const getWeatherData = await fetch(requestUrl);
  const data = await getWeatherData.json();
  
  data.city = cityName;
  data.country = countryName;
  data.datetime = Date.now();
  res.status(200).json(data);
}
