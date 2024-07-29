import React from "react";
import styles from "./Slider.module.scss";

interface DiscreetProps {
  value: number;
  max: number;
  step: number;
  handleSize: "Size_24" | "Size_32";
  intervals: number[];
  onChange: (value: number) => void;
}

const Discreet: React.FC<DiscreetProps> = ({
  value,
  max,
  step,
  handleSize,
  intervals,
  onChange,
}) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const gradient = (value: number) => {
    const percentage = (value / max) * 100;
    return `linear-gradient(to right, #47b647 ${percentage}%, #f2f3f5 ${percentage}%)`;
  };

  const getTooltipPosition = (value: number) => {
    return `calc(${(value / max) * 100}% - 1.5rem)`;
  };

  return (
    <div className={styles.Discreet}>
      <h2 className="lable">Discreet Input Slider</h2>
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        className={`${styles.handle} ${handleSize === "Size_32" ? styles.size32 : ""}`}
        onChange={handleSliderChange}
        value={value}
        style={{ background: gradient(value) }}
      />
      <div className={styles.labels}>
        {intervals.map((interval, index) => (
          <div key={index} className={styles.label}>
            {interval.toFixed(0)}
          </div>
        ))}
      </div>
      <div
        className={styles.tooltip}
        style={{ left: getTooltipPosition(value) }}
      >
        {value.toFixed(0)}
      </div>
    </div>
  );
};

export default Discreet;
