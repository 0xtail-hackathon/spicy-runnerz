"use client";
import React from "react";
import { jockeyOne } from "@/app/fonts";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

export default function Home() {
    const isLoggedIn = useIsLoggedIn();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 p-4">
            {/* Header Section */}
            <header
                className={`mt-48 ${jockeyOne.className} align-middle text-center text-6xl font-bold text-gray-800`}
            >
                <h1 className="text-6xl font-extrabold mb-8">Hi, Spicy</h1>
                <h2 className="text-6xl font-extrabold mb-8">RUNNERZ!</h2>
            </header>

            {/* Main Section */}
            <main className="flex flex-col items-center justify-center flex-grow">
                {/* Runner Image */}
                <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
                    style={{backgroundColor: '#9feb3d'}}
                >
                    <img src="runner.png" alt="Runner" className="ml-10"
                         style={{width: "200px", height: "100px", transform: "rotate(-5deg)"}}/>
                </div>

                {/* Login Button */}
                <div className="w-full max-w-sm space-y-4">
                    {isLoggedIn ? (
                        <div className="text-center text-green-600 font-semibold">
                            You are logged in!
                        </div>
                    ) : (
                        <button
                            className="w-full bg-gray-200 text-black rounded-lg py-3 flex items-center justify-center gap-2 shadow-md"
                        >
                            <img src="/dynamic.png" alt="Dynamic Logo" className="w-5 h-5"/>
                            <span>Sign in with dynamic.xyz</span>
                        </button>
                    )}
                </div>
            </main>

            {/* Footer Section */}
            <footer className="flex flex-col items-center mt-10 w-full">
                <div className="border rounded-lg p-4 flex flex-col items-center w-full max-w-md">
                    <span className="text-xs font-light text-gray-600 mb-2">
                        Powered by
                    </span>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <img
                                src="/chiliz_bl.png"
                                alt="Chiliz Logo"
                                className="w-6 h-6"
                            />
                            <span className="text-sm font-bold text-black">
                                chiliz
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                src="/dynamic_bl.png"
                                alt="Dynamic Logo"
                                className="w-6 h-6"
                            />
                            <span className="text-sm font-bold text-black">
                                dynamic
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <img
                                src="/biconomy_bl.png"
                                alt="Biconomy Logo"
                                className="w-6 h-6"
                            />
                            <span className="text-sm font-bold text-black">
                                biconomy
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
