import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData)}, ${getTime(
          unitSystem,
          weatherData.datetime,
          weatherData.utc_offset_seconds*1000
        )} ${getAMPM(unitSystem, weatherData.datetime, weatherData.utc_offset_seconds*1000)}`}
      </h2>
    </div>
  );
};
