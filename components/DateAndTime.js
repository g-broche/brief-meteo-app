import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ unixTime, weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(unixTime)}, ${getTime(
          unitSystem,
          unixTime,
          weatherData.utc_offset_seconds*1000,
          true
        )} ${getAMPM(unitSystem, unixTime, weatherData.utc_offset_seconds*1000)}`}
      </h2>
    </div>
  );
};
