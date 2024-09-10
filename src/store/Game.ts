import { makeAutoObservable } from "mobx";
import { GameBlock } from "@/store/GameBlock";

export class Game {
  blocks: GameBlock[] = [];
  state: GameState;
  score: number;

  targetBlock: GameBlock | null = null;

  constructor() {
    this.state = "pregame";
    this.score = 0;
    this.blocks.push(new GameBlock());

    makeAutoObservable(this);
  }

  start() {
    this.state = "ingame";
    this.score = 0;
    this.targetBlock = new GameBlock();
    this.blocks.forEach((b) => b.position.y--);
  }

  placeBlock() {
    if (!this.targetBlock) return;

    let blockState = this.targetBlock.chopBlock(
      this.blocks[this.blocks.length - 1]
    );
    if (blockState === "stopped") {
      this.addBlock();

      this.addNewTargetBlock();
    } else if (blockState === "missed") {
      this.end();
    }
  }

  addNewTargetBlock() {
    this.targetBlock = new GameBlock();
    const prevBlock = this.blocks[this.blocks.length - 1];
    this.targetBlock.size[this.targetBlock.workingSize] =
      prevBlock.size[prevBlock.workingSize];
  }
  addBlock() {
    this.blocks.push(this.targetBlock!);
    this.blocks.forEach((b) => b.position.y--);
    this.score++;
  }

  end() {
    this.state = "endgame";
    this.targetBlock = null;
  }
}

type GameState = "pregame" | "ingame" | "endgame";
