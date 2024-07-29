import React, { useState } from "react";
import styles from "./MainSlider.module.scss";
import Continuous from "../Components/Continuous";
import Discreet from "../Components/Discreet";
import { DoubleScrollBar } from "../Components/MultiRangeSlider";

interface SliderProps {
  type: "Continuous" | "Range" | "Discreet";
  steps?: number;
  handleSize: "Size_24" | "Size_32";
  onChange?: (value: number | { min: number; max: number }) => void;
}

const Slider: React.FC<SliderProps> = ({
  type,
  steps = 10,
  handleSize,
  onChange,
}) => {
  const [value, setValue] = useState<number>(0);
  const [rangeValues, setRangeValues] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });

  const cappedSteps = Math.min(steps, 10);

  const handleValueChange = (newValue: number) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    thumb: "min" | "max"
  ) => {
    const newValue = Number(event.target.value);
    setRangeValues((prevRangeValues) => {
      const newRangeValues = { ...prevRangeValues, [thumb]: newValue };

      if (newRangeValues.min < newRangeValues.max) {
        onChange?.(newRangeValues);
        return newRangeValues;
      } else {
        return prevRangeValues;
      }
    });
  };

  const generateIntervals = (steps: number) => {
    return Array.from({ length: steps }, (_, index) => index);
  };

  const max = type === "Discreet" ? cappedSteps : 100;
  const step = type === "Discreet" ? 1 : 0.01;
  const intervals = type === "Discreet" ? generateIntervals(cappedSteps) : [];

  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
      <h1 className={styles.quickreply}>QuckReply.ai Assignment</h1>
      <a
        href="https://github.com/Shiva-Tadigadapa/quickreply"
        target="_blank"
        className={styles.link}
        >
        Github-link
      </a>
        </div>

      <div className={styles.slider}>
        {type === "Continuous" && (
          <Continuous
            value={value}
            max={100}
            step={step}
            handleSize={handleSize}
            onChange={handleValueChange}
          />
        )}
        {type === "Range" && (
          <DoubleScrollBar
            min={0}
            max={100}
            step={0}
            className={styles.rangeSlider}
            onChange={(from, to) => onChange?.({ min: from, max: to })}
            handleSize={handleSize === "Size_24" ? 24 : 32} // Convert to numeric value
          />
        )}
        {type === "Discreet" && (
          <Discreet
            value={value}
            max={max}
            step={step}
            handleSize={handleSize}
            intervals={intervals}
            onChange={handleValueChange}
          />
        )}
      </div>
    </div>
  );
};

export default Slider;
