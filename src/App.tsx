import React, { useState } from "react";
import Slider from "./Slider/Slider";
import MultiRangeSlider from "./Slider/MultiRangeSlider";
import "./App.css";

const App: React.FC = () => {
  const [continuousValue, setContinuousValue] = useState<number>(50);
  const [discreteValue, setDiscreteValue] = useState<number>(2);
  const [rangeValues, setRangeValues] = useState<{ min: number; max: number }>({
    min: 25,
    max: 75,
  });

  return (
    <div className="App">
      <h2>Continuous Slider (Single)</h2>
      <Slider
        type="Continuous"
        steps={100}
        handleSize="Size_24"
        onChange={(value) => setContinuousValue(value as number)}
      />
      <div>Selected Value: {continuousValue}</div>

      <h2>Discrete Slider (Single)</h2>
      <Slider
        type="Discreet"
        steps={10}
        handleSize="Size_24"
        onChange={(value) => setDiscreteValue(value as number)}
      />
      <div>Selected Value: {discreteValue}</div>
    
      <MultiRangeSlider />
    </div>
  );
};

export default App;
