import { Primitive } from "../primitive.js";

/**
 *
 * * Class Triangle.
 *
 * @class Triangle
 * @extends {Primitive}
 *
 * @typedef {Object} Triangle
 */

export class Triangle extends Primitive {
  constructor(params) {
    super(params);
  }

  draw(ctx) {
    const { x, y } = this.position;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = this.color;

    ctx.translate(x, y);
    ctx.rotate(this.rotation);

    const sideLength =
      Math.sqrt(this.height ** 2 + this.width ** 2) / Math.sqrt(2);

    const x1 = -sideLength / 2;
    const y1 = this.height / 2;
    const x2 = sideLength / 2;
    const y2 = this.height / 2;
    const x3 = 0;
    const y3 = -this.height / 2;

    // const x1 = 0;
    // const y1 = this.height;
    // const x2 = sideLength;
    // const y2 = this.height;
    // const x3 = sideLength / 2;
    // const y3 = 0;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();

    this.drawBorder(ctx);
  }

  drawBorder(ctx) {
    if (this.border) {
      ctx.strokeStyle = this.border.color;
      ctx.lineWidth = this.border.width;
      ctx.setLineDash(this.border.type);
      ctx.stroke();
    }
  }
}
