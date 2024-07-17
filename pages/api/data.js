import getConfig from "./config";

export default async function handler(req, res) {
  const apiOrigin = "https://api.open-meteo.com";
  const apiEndpoint = "/v1/forecast";
  const config = await getConfig();
  const {cityLatitude, cityLongitude, cityName} = config;

  const options ="&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code"

  const requestUrl = `${apiOrigin}${apiEndpoint}?latitude=${cityLatitude}&longitude=${cityLongitude}${options}`
  const getWeatherData = await fetch(requestUrl);
  const data = await getWeatherData.json();
  
  data.city = cityName;
  console.log(data)
  res.status(200).json(data);
}
