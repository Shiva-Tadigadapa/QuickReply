import React, { useEffect, useRef } from 'react';
import './MultiRangeSlider.scss';

const MultiRangeSlider: React.FC = () => {
  const inputLeft = useRef<HTMLInputElement>(null);
  const inputRight = useRef<HTMLInputElement>(null);
  const thumbLeft = useRef<HTMLDivElement>(null);
  const thumbRight = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const setLeftValue = () => {
    if (inputLeft.current && inputRight.current && thumbLeft.current && range.current) {
      const min = parseInt(inputLeft.current.min);
      const max = parseInt(inputLeft.current.max);

      inputLeft.current.value = Math.min(parseInt(inputLeft.current.value), parseInt(inputRight.current.value) - 1).toString();
      const percent = ((parseInt(inputLeft.current.value) - min) / (max - min)) * 100;

      thumbLeft.current.style.left = `${percent}%`;
      range.current.style.left = `${percent}%`;
    }
  };

  const setRightValue = () => {
    if (inputLeft.current && inputRight.current && thumbRight.current && range.current) {
      const min = parseInt(inputRight.current.min);
      const max = parseInt(inputRight.current.max);

      inputRight.current.value = Math.max(parseInt(inputRight.current.value), parseInt(inputLeft.current.value) + 1).toString();
      const percent = ((parseInt(inputRight.current.value) - min) / (max - min)) * 100;

      thumbRight.current.style.right = `${100 - percent}%`;
      range.current.style.right = `${100 - percent}%`;
    }
  };

  useEffect(() => {
    setLeftValue();
    setRightValue();
  }, []);

  useEffect(() => {
    if (inputLeft.current) {
      inputLeft.current.addEventListener('input', setLeftValue);
      inputLeft.current.addEventListener('mouseover', () => thumbLeft.current?.classList.add('hover'));
      inputLeft.current.addEventListener('mouseout', () => thumbLeft.current?.classList.remove('hover'));
      inputLeft.current.addEventListener('mousedown', () => thumbLeft.current?.classList.add('active'));
      inputLeft.current.addEventListener('mouseup', () => thumbLeft.current?.classList.remove('active'));
    }

    if (inputRight.current) {
      inputRight.current.addEventListener('input', setRightValue);
      inputRight.current.addEventListener('mouseover', () => thumbRight.current?.classList.add('hover'));
      inputRight.current.addEventListener('mouseout', () => thumbRight.current?.classList.remove('hover'));
      inputRight.current.addEventListener('mousedown', () => thumbRight.current?.classList.add('active'));
      inputRight.current.addEventListener('mouseup', () => thumbRight.current?.classList.remove('active'));
    }
  }, []);

  return (
    <div className="middle">
      <div className="multi-range-slider">
        <input type="range" id="input-left" min="0" max="100" defaultValue="25" ref={inputLeft} />
        <input type="range" id="input-right" min="0" max="100" defaultValue="75" ref={inputRight} />

        <div className="slider">
          <div className="track"></div>
          <div className="range" ref={range}></div>
          <div className="thumb left" ref={thumbLeft}></div>
          <div className="thumb right" ref={thumbRight}></div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
