// context/UserDataProvider.jsx
"use client";

import { createContext, useContext, useState } from "react";

const IsPostContext = createContext();

export function IsPostProvider({ children }) {

    const [isPost, setIsPost] = useState(false);
    const [userPost, setUserPost] = useState(false);
    const [postId, setPostId] = useState(0);

    return (
        <IsPostContext.Provider value={{ isPost, userPost, postId, setIsPost, setUserPost, setPostId }}>
            {children}
        </IsPostContext.Provider>
    );
}

export function useIsPost() {
    return useContext(IsPostContext);
}
