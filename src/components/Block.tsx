import { Game } from "@/store/Game";
import { GameBlock } from "@/store/GameBlock";
import { useFrame } from "@react-three/fiber";
import { observer } from "mobx-react-lite";

export const Block = observer(
  ({ game, block }: { game: Game; block: GameBlock }) => {
    useFrame(() => {
      if (game.targetBlock === block && block.state === "active") {
        block.moveBlock();
      }
    });

    return (
      <mesh position={[block.position.x, block.position.y, block.position.z]}>
        <boxGeometry
          args={[block.size.width, block.size.height, block.size.depth]}
        />
        <meshStandardMaterial color={block.color} />
      </mesh>
    );
  }
);
