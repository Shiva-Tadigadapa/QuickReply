// components/Continuous.tsx
import React from "react";
import styles from "./Slider.module.scss";

interface ContinuousProps {
  value: number;
  max: number;
  step: number;
  handleSize: "Size_24" | "Size_32";
  onChange: (value: number) => void;
}

const Continuous: React.FC<ContinuousProps> = ({
  value,
  max,
  step,
  handleSize,
  onChange,
}) => {
  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  const getTooltipPosition = (value: number) => {
    return `calc(${(value / max) * 100}% - 1.5rem)`;
  };

  return (
    <div className={styles.SliderDiv}>
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
        style={{
          background: `linear-gradient(to right, #47b647 ${value}%, #f2f3f5 ${value}%)`,
        }}
      />
      <div className={styles.tooltip} style={{ left: getTooltipPosition(value) }}>
        {value.toFixed(2)}
      </div>
    </div>
  );
};

export default Continuous;
