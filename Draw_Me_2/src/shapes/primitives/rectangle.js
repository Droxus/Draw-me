import { Primitive } from "../primitive.js";

/**
 *
 * * Class Rectangle.
 *
 * @class Rectangle
 * @extends {Primitive}
 *
 * @typedef {Object} Rectangle
 */

export class Rectangle extends Primitive {
  constructor(params) {
    super(params);
  }

  draw(ctx) {
    const { x, y } = this.position;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = this.color;

    ctx.translate(x - this.width / 2, y - this.height / 2);
    ctx.rotate(this.rotation);
    ctx.fillRect(0, 0, this.width, this.height);

    this.drawBorder(ctx);
  }
}
