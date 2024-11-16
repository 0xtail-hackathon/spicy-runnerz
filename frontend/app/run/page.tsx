import React from "react";
import ControlBox from "./components/ControlBox";
import ClientMap from "./components/ClientMap";

const RunScreen = () => {
  const status: "ready" | "running" | "pause" | "end" = "ready";

  return (
    <div className="relative w-full min-h-full flex flex-col items-center justify-start">
      <ClientMap />
      {status === "end" && (
        <button className="fixed top-32 bg-gray-800 text-white py-4 px-6 rounded-full shadow-md z-10 flex items-center justify-between w-10/12 max-w-lg">
          Get your RUNZ 🎉
          <span className="ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </button>
      )}
      <ControlBox status={status} runningTime="00:00" />
    </div>
  );
};

export default RunScreen;
