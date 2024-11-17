"use client";

import React, { useRef } from "react";
import useRunStore from "@/app/store/useRunStore";
import { useRouter } from "next/navigation";

const RunCreateScreen: React.FC = () => {
  const router = useRouter();
  const { setRunName } = useRunStore();
  const maxChars = 24;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (inputRef.current) {
        const enteredName = inputRef.current.value;
        setRunName(enteredName);
        console.log("Submitted: ", enteredName);
        router.push("/run/0");
      }
    } catch (error) {
      console.error("Error submitting run name: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative min-h-96 h-full flex flex-col items-stretch justify-between mt-10 w-11/12 md:w-8/12 lg:w-1/2"
    >
      <div className="w-full flex flex-col items-center gap-3">
        <label htmlFor="runName" className="text-gray-600 w-full">
          RUN's name
        </label>
        <div className="relative w-full">
          <input
            id="runName"
            type="text"
            ref={inputRef}
            placeholder="Enter the name of your RUN"
            maxLength={maxChars}
            // pattern="[A-Za-z0-9 _-]{1,24}"
            className="p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-1000"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
            {inputRef.current?.value.length || 0} / {maxChars}
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
