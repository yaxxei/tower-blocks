import "./App.css";

import { observer } from "mobx-react-lite";

import { useStore } from "@/store/RootStore";
import { GameReady } from "@/components/GameReady";
import { GameOver } from "@/components/GameOver";
import { GameIn } from "@/components/GameIn";

export const App = observer(() => {
  const { game } = useStore();

  return (
    <div className="container">
      {game.state === "pregame" && <GameReady game={game} />}
      <GameIn game={game} />
      {game.state === "endgame" && <GameOver game={game} />}
    </div>
  );
});
