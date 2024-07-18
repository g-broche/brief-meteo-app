import styles from "./ErrorScreen.module.css";

export const ErrorScreen = ({ errorMessage, retryTimer }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.message}>{errorMessage}</h1>
      <p className={styles.countdown}>Attempting to collect data again in {retryTimer}s.</p>
    </div>
  );
};
