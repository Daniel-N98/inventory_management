"use client";
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface NavBarState {
  userRole: string;
}

export interface NavBarContextType {
  contextValue: NavBarState;
  setContextValue: Dispatch<SetStateAction<NavBarState>>;
}

export const NavBarContext = createContext<NavBarContextType | undefined>(undefined);

export function NavBarProvider({ children }: { children: ReactNode }) {
  const [contextValue, setContextValue] = useState<NavBarState>({ userRole: "" });

  return (
    <NavBarContext.Provider value={{ contextValue, setContextValue }}>
      {children}
    </NavBarContext.Provider>
  );
}