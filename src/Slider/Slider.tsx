import React, { useState } from 'react';
import styles from './Slider.module.scss';
import MultiRangeSlider from './MultiRangeSlider';

interface SliderProps {
  type: 'Continuous' | 'Range' | 'Discreet';
  steps?: number;
  handleSize: 'Size_24' | 'Size_32';
  onChange?: (value: number | { min: number; max: number }) => void;
}

const Slider: React.FC<SliderProps> = ({ type, steps = 10, handleSize, onChange }) => {
  const [value, setValue] = useState<number>(0);
  const [rangeValues, setRangeValues] = useState<{ min: number; max: number }>({ min: 0, max: 100 });

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onChange?.(newValue); 
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>, thumb: 'min' | 'max') => {
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

  const max = type === 'Discreet' ? steps : 100;
  const step = type === 'Discreet' ? 1 : 0.01;

  return (
    <div className={styles.slider}>
      {type === 'Continuous' && (
        <input
          type="range"
          min="0"
          max={max}
          step={step}
          className={`${styles.handle} ${handleSize === 'Size_32' ? styles.size32 : ''}`}
          onChange={handleSliderChange}
          value={value}
        />
      )}
      {type === 'Range' && (
        
        <MultiRangeSlider
        
        />
      )}
      {type === 'Discreet' && (
        <input
          type="range"
          min="0"
          max={max}
          step={step}
          className={`${styles.handle} ${handleSize === 'Size_32' ? styles.size32 : ''}`}
          onChange={handleSliderChange}
          value={value}
        />
      )}
    </div>
  );
};

export default Slider;
