"use client";

import { createContext, useContext, useMemo, ReactNode } from "react";
import { useSession } from "@/lib/auth-client";

type AuthContextType = {
  session: ReturnType<typeof useSession>["data"];
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  const value = useMemo(() => ({ session, isLoading: isPending }), [session, isPending]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
