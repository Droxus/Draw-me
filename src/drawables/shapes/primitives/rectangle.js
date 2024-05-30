import { Primitive } from '../primitive.js';

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

    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    super.draw(ctx);

    this.drawBorder(ctx);
  }
}
