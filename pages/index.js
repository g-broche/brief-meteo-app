import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { Search } from "../components/Search";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import { weatherCodeToInterpretation, weatherCodeToIcon } from "../services/converters";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [time, setTime] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");

  useEffect(() =>{
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() =>{
    if(time){
      console.log(time.getTime());
    }
    
  }, [time])

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setWeatherData({ ...data });
    };
    getData();
  }, [triggerFetch]);

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return time && weatherData && !weatherData.message ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={weatherData.country}
        description={weatherCodeToInterpretation(weatherData.current.weather_code)}
        iconName={weatherCodeToIcon(weatherData.current.weather_code)}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime unixTime={time.getTime()} weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.message ? (
    <ErrorScreen errorMessage="City not found, try again!">
      <Search
        onFocus={(e) => (e.target.value = "")}
        onChange={(e) => setCityInput(e.target.value)}
        onKeyDown={(e) => e.keyCode === 13 && setTriggerFetch(!triggerFetch)}
      />
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
