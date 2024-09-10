import { Canvas } from "@react-three/fiber";
import { Block } from "@/components/Block";
import { Game } from "@/store/Game";
import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";

export const GameIn = observer(({ game }: { game: Game }) => {
  const placeBlock = useCallback(
    (e: KeyboardEvent) => {
      if (game.state !== "ingame") return;
      if (e.key === " ") {
        game.placeBlock();
      }
    },
    [game]
  );

  useEffect(() => {
    window.addEventListener("keydown", placeBlock);

    return () => {
      window.removeEventListener("keydown", placeBlock);
    };
  }, [placeBlock]);

  return (
    <div>
      {game.state === "ingame" && (
        <h1
          style={{
            position: "absolute",
            top: window.innerHeight / 2 - 200,
            left: window.innerWidth / 2,
            textAlign: "center",
            zIndex: 2,
          }}
        >
          {game.score}
        </h1>
      )}
      <Canvas orthographic camera={{ position: [3, 3, 3], zoom: 60 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 1, 0]} intensity={0.5} />
        <directionalLight position={[0, 0, 1]} intensity={0.2} />
        {game.targetBlock && <Block block={game.targetBlock} game={game} />}
        {game.blocks.map((b, i) => (
          <Block key={i} block={b} game={game} />
        ))}
      </Canvas>
    </div>
  );
});
