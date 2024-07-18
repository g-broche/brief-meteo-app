import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import { weatherCodeToInterpretation, weatherCodeToIcon } from "../services/converters";

import styles from "../styles/Home.module.css";

export const App = () => {
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [weatherData, setWeatherData] = useState();
  const [previousTime, setPreviousTime] = useState();
  const [time, setTime] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");
  const [mustAttemptNewFetch, setMustAttemptNewFetch] = useState(false);
  const [countdownToNewAttempt, setCountdownToNewAttempt] = useState(null);

  const fetchRetryDelay = 30;

  //clock used to display the time
  useEffect(() =>{
    const interval = setInterval(() => {
      const currentTime = new Date();
      setTime(currentTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  //compares time to the time of the previous clock tick and trigger fetch on hour change
  useEffect(() =>{
    if(!time && !previousTime){
      return
    }
    if(time && previousTime && (time.getHours() !== previousTime.getHours())){
      setTriggerFetch(!triggerFetch);
    }
    setPreviousTime(time);
  }, [time])

  //fetching from api on trigger change
  useEffect(() => {
    setMustAttemptNewFetch(false);
    const getData = async () => {
      const res = await fetch("api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      const isfetchSuccess = data.error? false : true;
      setMustAttemptNewFetch(!isfetchSuccess);
      setWeatherData({ ...data });
    };
    getData();
  }, [triggerFetch]);

  //attempts new fetch
  useEffect(() => {
    if(!mustAttemptNewFetch){
      return;
    }
    setCountdownToNewAttempt(fetchRetryDelay);
  }, [mustAttemptNewFetch])

  //countdown to fetch retry
  useEffect(() => {
    console.log(countdownToNewAttempt);
    if(countdownToNewAttempt === null){
      console.log("null case");
      return;
    }
    if(countdownToNewAttempt === 0){
      setTriggerFetch(!triggerFetch);
      return;
    }
    const interval = setInterval(() => {
      setCountdownToNewAttempt(countdownToNewAttempt-1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownToNewAttempt])

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return time && weatherData && !weatherData.error ? (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.city}
        country={weatherData.country}
        description={weatherCodeToInterpretation(weatherData.current.weather_code)}
        iconName={weatherCodeToIcon(weatherData.current.weather_code, weatherData.current.is_day)}
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
  ) : weatherData && weatherData.error ? (
    <ErrorScreen errorMessage="Error occured while getting weather informations" retryTimer={countdownToNewAttempt}>
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
