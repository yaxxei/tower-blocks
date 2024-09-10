import React, { createContext, ReactNode } from "react";
import { Game } from "./Game";
import { useContext } from "react";

class RootStore {
  game: Game;

  constructor() {
    this.game = new Game();
  }
}

const rootStore = new RootStore();
const RootStoreContext = createContext(rootStore);

export const useStore = () => useContext(RootStoreContext);

export function RootStoreContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return React.createElement(
    RootStoreContext.Provider,
    { value: rootStore },
    children
  );
}
