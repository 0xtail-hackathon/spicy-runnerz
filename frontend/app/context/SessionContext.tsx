"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

const SessionContext = createContext<boolean>(false);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isLoggedIn = useIsLoggedIn(); // Dynamic Wallet 상태
    const [loggedIn, setLoggedIn] = useState<boolean>(isLoggedIn);

    useEffect(() => {
        setLoggedIn(isLoggedIn);
    }, [isLoggedIn]);

    return (
        <SessionContext.Provider value={loggedIn}>{children}</SessionContext.Provider>
    );
};

export const useSession = () => useContext(SessionContext);
