"use client"
import React, { useState } from "react";
import { jockeyOne } from "@/app/fonts";
import {DynamicWidget} from "@dynamic-labs/sdk-react-core";

export default function Home() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <header
                className={`mt-10 ${jockeyOne.className} align-middle text-center text-6xl font-bold text-gray-800`}
            >
                <h1 className="text-6xl font-extrabold mb-8">Spicy</h1>
                <h2 className="text-6xl font-extrabold mb-8">RUNNERZ!</h2>
            </header>
            <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-8"
                style={{backgroundColor: '#9feb3d'}}
            >
                <img src="runner.png" alt="Runner" className="ml-10"
                     style={{width: "200px", height: "100px", transform: "rotate(-5deg)"}}/>
            </div>

            <div className="w-full max-w-sm space-y-4">
                <DynamicWidget
                    innerButtonComponent={
                        <div className="flex items-center gap-2">
                            <img
                                src="/dynamic.png"
                                alt="Dynamic Logo"
                                className="w-6 h-6"
                            />
                            <span>Sign in with Dynamic</span>
                        </div>
                    }
                    buttonContainerClassName="w-full bg-gray-200 rounded-lg py-2 px-4 mb-4 flex justify-center items-center"
                    buttonClassName="flex items-center gap-2"
                />

                <div className="flex items-center justify-center w-full text-gray-500 my-4">
                    <hr className="w-1/2"/>
                    <span className="px-2">or</span>
                    <hr className="w-1/2"/>
                </div>

                <div className="w-full max-w-sm space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-lg py-2 px-4"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border border-gray-300 rounded-lg py-2 px-4"
                        />
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-3 cursor-pointer text-gray-500"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="h-4 w-4 text-blue-600"/>
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="text-blue-500">Forgot password?</a>
                    </div>

                    <button className="w-full bg-gray-400 text-white rounded-lg py-2 mt-4">
                        Sign in
                    </button>

                    <div className="text-center text-sm mt-4">
                        Don’t have an account? <a href="#" className="text-blue-500">Sign Up</a>
                    </div>
                </div>
            </div>
            <footer className="flex items-center justify-center gap-4 mt-10 border-t pt-4 w-full max-w-sm">
                <div className="flex items-center gap-2 border rounded-lg px-4 py-2">
                    <img
                        src="/chiliz.png"
                        alt="Chiliz Logo"
                        className="w-6 h-6"
                    />
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-light leading-none text-gray-600">Powered by</span>
                        <span className="text-lg font-bold text-black">chiliz</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 border rounded-lg px-4 py-2">
                    <img
                        src="/dynamic.png"
                        alt="Dynamic Logo"
                        className="w-6 h-6"
                    />
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-light leading-none text-gray-600">Powered by</span>
                        <span className="text-lg font-bold text-black">dynamic</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
