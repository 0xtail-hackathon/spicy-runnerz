"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ControlBox from "../components/ControlBox";
import ClientMap from "../components/ClientMap";
import GetRunzButton from "../../components/GetRunzButton";

const RunScreen = () => {
    const params = useParams();
    const searchParams = useSearchParams();
    const id = params.id;
    const from = searchParams.get("from") || "create";

    const [status, setStatus] = useState<"ready" | "running" | "pause" | "end">("ready");
    const [runningTime, setRunningTime] = useState(0); // 타이머의 초 단위 상태 관리

    // 타이머 기능
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (status === "running") {
            timer = setInterval(() => {
                setRunningTime((prevTime) => prevTime + 1);
            }, 1000);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [status]);

    // 타이머 시간을 MM:SS로 포맷팅
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    // 버튼 클릭 핸들러
    const handleButtonClick = () => {
        if (status === "ready" || status === "pause") {
            setStatus("running");
        } else if (status === "running") {
            setStatus("end");
        }
    };

    return (
        <div className="relative w-full min-h-full flex flex-col items-center justify-start">
            <ClientMap />
            {from === "join" && status === "end" && (
                <GetRunzButton className="top-40" link="../share" />
            )}
            <ControlBox
                status={status}
                runningTime={status === "running" || status === "pause" ? formatTime(runningTime) : "00:00"}
                onButtonClick={handleButtonClick} // 핸들러 전달
            />
        </div>
    );
};

export default RunScreen;
