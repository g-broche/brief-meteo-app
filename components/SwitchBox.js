import styles from "./SwitchBox.module.css";

const SwitchBox = ({ onClick, systemUsed }) => {
  return (
    <div className={styles.wrapper}>
      <p
        className={styles.switch}
        style={{ color: systemUsed == "metric" ? "green" : "black" }}
        onClick={onClick}
      >
        Metric System
      </p>
      <p
        className={styles.switch}
        style={{ color: systemUsed == "metric" ? "black" : "green" }}
        onClick={onClick}
      >
        Imperial System
      </p>
    </div>
  );
};

export default SwitchBox;