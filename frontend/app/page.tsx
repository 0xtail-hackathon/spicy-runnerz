import React from "react";
import Footer from "@/app/components/Footer";
import dummyData from "@/data/recommendations.json";
import Header from "./components/Header";

interface Recommendation {
  name: string;
  calories: number;
  speed: number;
  image: string;
}

const HomeScreen: React.FC = () => {
  const recommendations: Recommendation[] = dummyData;

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-10">
      <Header lines={["RUN", "NEAR YOU"]} />

      <main className="mt-10 w-11/12 md:w-8/12 lg:w-1/2">
        <div className="w-full bg-white shadow-md rounded-lg p-4 border">
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={recommendation.image}
                    alt="map"
                    className="w-70 h-70 mr-4"
                  />
                  <div className="text-gray-500">
                    <p className="text-xs">Recommended</p>
                    <p className="text-gray-800 text-base font-semibold">
                      {recommendation.name}
                    </p>
                    <p className="text-xs">
                      {recommendation.calories} kcal • {recommendation.speed}{" "}
                      km/hr
                    </p>
                  </div>
                </div>
                <div>
                  <button className="text-gray-600">&gt;</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="mt-4">
        <p className="text-sm text-gray-800">
          Increasing the RUNN search radius
          <a href="#" className="text-blue-600 ml-1">
            Adjust
          </a>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default HomeScreen;
