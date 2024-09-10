import { makeAutoObservable } from "mobx";

export class GameBlock {
  static count = 0;
  index: number = 1;
  size: { width: number; height: number; depth: number };
  position: { x: number; y: number; z: number };
  color: number;
  state: "active" | "stopped" | "missed";
  direction: number;
  speed: number;
  workingPlane: "x" | "z";
  workingSize: "width" | "depth";

  constructor() {
    this.index = GameBlock.count++;
    this.size = { width: 3, height: 1, depth: 3 };
    this.position = { x: 0, y: 0, z: 0 };
    this.color = 0x1000000 + Math.floor(Math.random() * 16777215);
    this.state = "active";
    this.speed = -0.1 - this.index * 0.005;
    this.direction = 1;
    this.workingPlane = this.index % 2 ? "x" : "z";
    this.workingSize = this.index % 2 ? "width" : "depth";

    makeAutoObservable(this);
  }

  moveBlock() {
    this.position[this.workingPlane] += this.speed * this.direction;

    if (
      this.position[this.workingPlane] > 5 ||
      this.position[this.workingPlane] < -5
    ) {
      this.reverseDirection();
    }
  }

  private isBlockAbove(bottomBlock: GameBlock): boolean {
    const workingPlane = this.workingPlane;
    const workingSize = this.workingSize;

    const p1 = bottomBlock.position[workingPlane];
    const s1 = bottomBlock.size[workingSize];
    const p2 = this.position[workingPlane];
    const s2 = this.size[workingSize];

    return p1 < p2 + s2 && p1 + s1 > p2;
  }

  private getIntersectionArea(
    bottomBlock: GameBlock
  ): { start: number; end: number } | null {
    const workingPlane = this.workingPlane;
    const workingSize = this.workingSize;

    const p1 = this.position[workingPlane];
    const s1 = this.size[workingSize];
    const p2 = bottomBlock.position[workingPlane];
    const s2 = bottomBlock.size[workingSize];

    const start = Math.max(p1, p2);
    const end = Math.min(p1 + s1, p2 + s2);

    // x_overlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
    // y_overlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

    return start < end ? { start, end } : null;
  }

  chopBlock(bottomBlock: GameBlock): "stopped" | "missed" {
    console.log(bottomBlock.size);
    console.log(this.size);

    if (!this.isBlockAbove(bottomBlock)) return "missed";

    const area = this.getIntersectionArea(bottomBlock);
    if (!area) return "missed";
    this.size[this.workingSize] = area.end - area.start;
    this.position[this.workingPlane] = area.start - this.size[this.workingSize];
    return "stopped";

    // const x1 = bottomBlock.position[this.workingPlane];
    // const x2 = this.position[this.workingPlane];

    // const w1 = bottomBlock.size[this.workingSize];
    // const w2 = this.size[this.workingSize];

    // const xIntersectionStart = Math.max(x1, x2);
    // const xIntersectionEnd = Math.min(x1 + w1, x2 + w2);

    // if (xIntersectionStart < xIntersectionEnd) {
    //   const intersectionWidth = xIntersectionEnd - xIntersectionStart;

    //   this.position[this.workingPlane] = xIntersectionStart;
    //   this.size[this.workingSize] = intersectionWidth;
    //   return (this.state = "stopped");
    // }
    // return (this.state = "missed");
  }

  reverseDirection() {
    this.direction *= -1;
  }
}
