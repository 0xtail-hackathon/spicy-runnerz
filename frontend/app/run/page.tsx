import React from "react";
import ControlBox from "./components/ControlBox";
import ClientMap from "./components/ClientMap";

const StartScreen = () => {
  return (
    <div className="relative w-full min-h-full flex flex-col items-center justify-start">
      <ClientMap />
      <ControlBox status="ready" runningTime="00:00" />
    </div>
  );
};

export default StartScreen;
