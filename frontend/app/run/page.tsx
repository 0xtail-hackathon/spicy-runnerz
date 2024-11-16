import React from "react";
import ControlBox from "./components/ControlBox";
import ClientMap from "./components/ClientMap";
import GetRunzButton from "../components/GetRunzButton";

const RunScreen = () => {
  const from: "join" | "create" = "join";
  const status: "ready" | "running" | "pause" | "end" = "end";

  return (
    <div className="relative w-full min-h-full flex flex-col items-center justify-start">
      <ClientMap />
      {from === "join" && status === "end" && (
        <GetRunzButton top="32" link="share" />
      )}
      <ControlBox status={status} runningTime="00:00" />
    </div>
  );
};

export default RunScreen;
