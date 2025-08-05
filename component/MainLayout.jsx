// component/MainLayout.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { UserDataProvider } from "@/context/userData";
import { IsPostProvider } from "@/context/isPost";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/login", "/signUp"];
  const shouldUseLayout = !noLayoutRoutes.includes(pathname);

  return (
    <Provider store={store}>
      <IsPostProvider>
        <UserDataProvider>
          {shouldUseLayout ? (
            <div className="main-layout">
              <Navbar />
              {children}
            </div>
          ) : (
            <div className="no-layout p-[40px]">{children}</div>
          )}
        </UserDataProvider>
      </IsPostProvider>
    </Provider>
  );
}
