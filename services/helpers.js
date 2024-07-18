import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getCurrentVisibility = (weatherData) => {
  let timeIndex = null;
  const currentTime = weatherData.current.time;
  //find the time index interval corresponding to the current time
  for (let index = 0; index < weatherData.hourly.time.length - 1; index++) {
    const thisIterationTime = weatherData.hourly.time[index];
    const nextIterationTime = weatherData.hourly.time[index+1];
    if(thisIterationTime <= currentTime && currentTime < nextIterationTime){
      timeIndex = index;
      break;
    }
  }
  const visibility = weatherData.hourly.visibility[timeIndex];
  return visibility;
}

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, currentTime, timezone) => {
  const time = unitSystem == "metric" ? unixToLocalTime(currentTime, timezone) : timeTo12HourFormat(unixToLocalTime(currentTime, timezone));
  return time;
}


export const getAMPM = (unitSystem, currentTime, timezone) => {
  if (unitSystem !== "imperial"){
    return "";
  }
  const AMPMIndicator = unixToLocalTime(currentTime, timezone).split(":")[0] >= 12 ? "PM" : "AM";
  return AMPMIndicator;

}


export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(weatherData.datetime);
  const dayOfWeek = date.getDay();
  return weekday[dayOfWeek];
};
