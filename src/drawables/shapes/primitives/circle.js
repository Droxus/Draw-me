import { Primitive } from "../primitive.js";

/**
 *
 * * Class Circle.
 *
 * @class Circle
 * @extends {Primitive}
 *
 * @typedef {Object} Circle
 */

export class Circle extends Primitive {
  constructor(params) {
    super(params);
  }

  draw(ctx) {
    const { x, y } = this.position;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(x, y);

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    this.drawBorder(ctx);
  }

  drawBorder(ctx) {
    if (this.border && Number(this.border.width) > 0) {
      ctx.strokeStyle = this.border.color;
      ctx.lineWidth = this.border.width;
      ctx.setLineDash(this.border.type);
      ctx.stroke();
    }
  }
}
