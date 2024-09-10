import styles from "@/styles/GameReady.module.scss";

import { Game } from "@/store/Game";

export function GameReady({ game }: { game: Game }) {
  return (
    <div className={styles.gameReady}>
      <h1>Are you ready?</h1>
      <button onClick={() => game.start()}>Start</button>
    </div>
  );
}
