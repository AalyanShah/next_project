// context/UserDataProvider.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserDataContext = createContext();

export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, []);

  console.log("UserDataProvider rendered with userData:", userData);

  return (
    <UserDataContext.Provider value={{ userData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  return useContext(UserDataContext);
}
