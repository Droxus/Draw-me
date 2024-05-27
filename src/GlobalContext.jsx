import { createContext, useContext, useState } from "react";

import { MODE } from "./constants";

const context = createContext(null);

export function GlobalContext({ children }) {
  const [mode, setMode] = useState(MODE.DRAW);
  const [scene, setScene] = useState(null);
  const [controls, setControls] = useState(null);
  return (
    <context.Provider
      value={{ mode, setMode, scene, setScene, controls, setControls }}
    >
      {children}
    </context.Provider>
  );
}

export function useGlobalContext() {
  return useContext(context);
}
