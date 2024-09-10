import styles from "@/styles/GameOver.module.scss";

import { Game } from "@/store/Game";

export function GameOver({ game }: { game: Game }) {
  return (
    <div className={styles.gameOver}>
      <h1>Game Over</h1>
      <h1>Your score: {game.score}</h1>
    </div>
  );
}
