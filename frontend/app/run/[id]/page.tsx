"use client";

import React from "react";
import { useParams, useSearchParams } from "next/navigation";
import ControlBox from "../components/ControlBox";
import ClientMap from "../components/ClientMap";
import GetRunzButton from "../../components/GetRunzButton";

const RunScreen = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id;
  const from = searchParams.get("from") || "create";

  const status: "ready" | "running" | "pause" | "end" = "end";

  return (
    <div className="relative w-full min-h-full flex flex-col items-center justify-start">
      <ClientMap />
      {from === "join" && status === "end" && (
        <GetRunzButton className="top-40" link="../share" />
      )}
      <ControlBox status={status} runningTime="00:00" />
    </div>
  );
};

export default RunScreen;
