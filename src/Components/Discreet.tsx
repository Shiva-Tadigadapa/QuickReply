// components/Discreet.tsx
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
      <div className={styles.lableHolder}>
        <h3>TIME</h3>
        <h3>MINUTES</h3>
      </div>
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
        {intervals.map((interval) => (
          <div key={interval} className={styles.label}>
            {interval}
          </div>
        ))}
      </div>
      <div className={styles.tooltip} style={{ left: getTooltipPosition(value) }}>
        {intervals[value]}
      </div>
    </div>
  );
};

export default Discreet;
