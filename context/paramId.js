// // context/UserDataProvider.jsx
// "use client";

// import { createContext, useContext, useState } from "react";

// const ParamIdContext = createContext();

// export function IsPostProvider({ children }) {

//     const [isPost, setIsPost] = useState(false);
//     const [userPost, setUserPost] = useState(false);

//     return (
//         <ParamIdContext.Provider value={{ isPost, userPost, setIsPost, setUserPost }}>
//             {children}
//         </ParamIdContext.Provider>
//     );
// }

// export function useIsPost() {
//     return useContext(ParamIdContext);
// }
