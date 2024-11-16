"use client";

import React, { useState } from "react";

const RunCreateScreen: React.FC = () => {
  const [runName, setRunName] = useState<string>("");
  const maxChars = 24;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRunName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      console.log("Submitted");
    } catch (error) {
      console.error("Error submitting run name: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative min-h-96 h-full flex flex-col items-stretch justify-between mt-10  w-11/12 md:w-8/12 lg:w-1/2"
    >
      <div className="w-full flex flex-col items-center gap-3">
        <label htmlFor="runName" className="text-gray-600 w-full">
          RUN's name
        </label>
        <div className="relative w-full">
          <input
            id="runName"
            type="text"
            value={runName}
            onChange={handleChange}
            placeholder="Enter the name of your RUN"
            maxLength={maxChars}
            pattern="[A-Za-z0-9 _-]{1,24}" // Allow English letters, numbers, spaces, hyphens, and underscores
            className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-1000"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            {runName.length} / {maxChars}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-3">
        <button
          type="submit"
          className="bg-primary-1000 text-white px-6 py-3 rounded-full font-bold w-full text-xl"
        >
          Let’s go!
        </button>
        <p className="text-gray-600 w-full text-center">
          1 km RUN requires staking 2 RUNZ tokens
        </p>
      </div>
    </form>
  );
};

export default RunCreateScreen;
