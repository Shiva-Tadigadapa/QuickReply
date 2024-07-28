// Slider.tsx
import React, { useState } from "react";
import styles from "./MainSlider.module.scss";
import Continuous from "../Components/Continuous";
import Discreet from "../Components/Discreet";
import {DoubleScrollBar} from "./MultiRangeSlider";

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

  const max = type === "Discreet" ? steps : 100;
  const step = type === "Discreet" ? 1 : 0.01;

  const intervals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  return (
    <div className={styles.slider}>
      {type === "Continuous" && (
        <Continuous
          value={value}
          max={max}
          step={step}
          handleSize={handleSize}
          onChange={handleValueChange}
        />
      )}
      {type === "Range" && (
        <DoubleScrollBar min={0} max={100} step={0}        // Add props for MultiRangeSlider if needed
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
  );
};

export default Slider;
