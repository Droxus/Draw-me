import { Primitive } from '../primitive.js';

/**
 *
 * * Class Line.
 *
 * @class Line
 * @extends {Primitive}
 *
 * @typedef {Object} Line
 * @property {Point} endPoint
 */

export class Line extends Primitive {
  endPoint;
  thickness = 1;

  constructor(position, endPoint, params) {
    super(params);
    this.position = position;
    this.endPoint = endPoint;
  }

  draw(ctx) {
    const centerX = (this.position.x + this.endPoint.x) / 2;
    const centerY = (this.position.y + this.endPoint.y) / 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotation);
    ctx.translate(-centerX, -centerY);

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.stroke();
    ctx.closePath();
    super.draw(ctx);
  }

  set startPoint(value) {
    this.position = value;
  }

  get startPoint() {
    return this.position;
  }

  getProperties() {
    return ["startPoint", "endPoint", "thickness", "rotation", "color"];
  }
}
