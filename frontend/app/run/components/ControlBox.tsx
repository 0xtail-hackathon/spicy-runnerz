import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Next.js의 useRouter 훅 가져오기
import { jockeyOne } from "@/app/fonts";

interface ControlBoxProps {
  status: "ready" | "running" | "pause" | "end";
  runningTime: string;
  onButtonClick: () => void;
}

const ControlBox: React.FC<ControlBoxProps> = ({
  status,
  runningTime,
  onButtonClick,
}) => {
  const playIcon = "/icons/play.svg";
  const pauseIcon = "/icons/pause.svg";
  const endIcon = "/icons/end.svg";
  const router = useRouter(); // useRouter 초기화

  let buttonIcon = playIcon;
  let buttonText = "START";

  if (status === "running" || status === "pause") {
    buttonIcon = pauseIcon;
    buttonText = runningTime;
  } else if (status === "end") {
    buttonIcon = endIcon;
    buttonText = "END";
  }

  const handleButtonClick = () => {
    if (status === "end") {
      router.push("/stake"); // 버튼 클릭 시 경로로 이동
    } else {
      onButtonClick(); // 다른 상태에서는 부모 컴포넌트의 핸들러 실행
    }
  };

  return (
    <div className="fixed bottom-24 flex flex-col items-center bg-white shadow-md rounded-lg w-9/12 md:w-8/12 lg:w-1/2 p-6 pt-16 mt-10 h-52">
      <div className="absolute -top-10">
        <button
          className="w-20 h-20 bg-primary-1000 rounded-full flex items-center justify-center mb-5"
          onClick={handleButtonClick} // 버튼 클릭 이벤트 처리
        >
          <Image src={buttonIcon} alt="Control Icon" width={24} height={24} />
        </button>
      </div>
      <h2
        className={`${jockeyOne.className} text-5xl font-bold text-gray-900 mb-5`}
      >
        {buttonText}
      </h2>
      <div className="w-full flex justify-around">
        <div className="text-center basis-1/3 border-r">
          <p className="text-xs font-medium text-gray-500">Avr Pace</p>
          <p className="text-2xl font-bold text-gray-900">0'00"</p>
        </div>
        <div className="text-center basis-1/3 border-r">
          <p className="text-xs font-medium text-gray-500">Remaining</p>
          <p className="text-2xl font-bold text-gray-900">10 km</p>
        </div>
        <div className="text-center basis-1/3">
          <p className="text-xs font-medium text-gray-500">Distance</p>
          <p className="text-2xl font-bold text-gray-900">0 km</p>
        </div>
      </div>
    </div>
  );
};

export default ControlBox;
