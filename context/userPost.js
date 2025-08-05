// context/UserDataProvider.jsx
"use client";

import { createContext, useContext, useState } from "react";

const IsPostContext = createContext();

export function IsPostProvider({ children }) {

    const [userPost, setUserPost] = useState(false);
    const [postId, setPostId] = useState(0);

    return (
        <IsPostContext.Provider value={{ userPost, postId, setUserPost, setPostId }}>
            {children}
        </IsPostContext.Provider>
    );
}

export function usePost() {
    return useContext(IsPostContext);
}
