import React, { useState, useEffect, useRef } from "react";
import "./MultiRangeSlider.scss";

interface DoubleScrollBarProps {
  min: number;
  max: number;
  step: number;
  className?: string;
  onChange?: (from: number, to: number) => void;
}

export const DoubleScrollBar: React.FC<DoubleScrollBarProps> = ({
  min,
  max,
  step,
  className,
  onChange,
}) => {
  const [inputFrom, setInputFrom] = useState(min);
  const [inputTo, setInputTo] = useState(max);
  const sliderRef = useRef<HTMLSpanElement | null>(null);
  const thumbFromRef = useRef<HTMLDivElement | null>(null);
  const thumbToRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sliderRef.current === null) return;

    // Ensure inputFrom is less than inputTo
    if (inputFrom > inputTo) {
      setInputFrom(inputTo);
    }

    // Ensure inputTo is not less than inputFrom
    if (inputTo < inputFrom) {
      setInputTo(inputFrom);
    }

    // Update slider position
    const rangeWidth = ((inputTo - inputFrom) / (max - min)) * 100;
    const leftPosition = ((inputFrom - min) / (max - min)) * 100;

    sliderRef.current.style.left = `${leftPosition}%`;
    sliderRef.current.style.width = `${rangeWidth}%`;

    if (thumbFromRef.current) {
      thumbFromRef.current.style.left = `${leftPosition}%`;
    }

    if (thumbToRef.current) {
      thumbToRef.current.style.left = `${leftPosition + rangeWidth}%`;
    }

    if (onChange) {
      onChange(inputFrom, inputTo);
    }
  }, [inputFrom, inputTo, min, max, onChange]);

  return (
    <div className={` rangedContainer`}>
      <h2 className="lable">Ranged Input Slider</h2>
      <div>
        <div className="range-slider">
          <span className="range-selected" ref={sliderRef}></span>
        </div>
        <div className="range-input">
          <input
            type="range"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value > inputTo) {
                setInputFrom(inputTo);
              } else {
                setInputFrom(value);
              }
            }}
            min={min}
            max={max}
            step={step}
            value={inputFrom}
            onInput={(e) => setInputFrom(parseFloat(e.currentTarget.value))}
          />
          <input
            type="range"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              if (value < inputFrom) {
                setInputTo(inputFrom);
              } else {
                setInputTo(value);
              }
            }}
            min={min}
            max={max}
            step={step}
            value={inputTo}
            onInput={(e) => setInputTo(parseFloat(e.currentTarget.value))}
          />
          {/* Tooltips */}
          <div className="tooltip left" ref={thumbFromRef}>
            {inputFrom}
          </div>
          <div className="tooltip right" ref={thumbToRef}>
            {inputTo}
          </div>
        </div>
      </div>
    </div>
  );
};
