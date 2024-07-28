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
      <Slider
        type="Continuous"
        steps={100}
        handleSize="Size_24"
        onChange={(value) => setContinuousValue(value as number)}
      />

      <Slider
        type="Discreet"
        steps={10}
        handleSize="Size_24"
        onChange={(value) => setDiscreteValue(value as number)}
      />

      <MultiRangeSlider />
    </div>
  );
};

export default App;
