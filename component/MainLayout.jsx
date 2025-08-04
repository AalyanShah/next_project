// component/MainLayout.jsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import { UserDataProvider } from "@/context/userData";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/login", "/signUp"];
  const shouldUseLayout = !noLayoutRoutes.includes(pathname);

  return (
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
  );
}
