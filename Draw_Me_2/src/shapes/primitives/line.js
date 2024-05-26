import { Primitive } from "../primitive.js";

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

  constructor(position, endPoint, params) {
    super(params);
    this.position = position;
    this.endPoint = endPoint;
  }

  draw(ctx) {
    const centerX = (this.position.x + this.endPoint.x) / 2;
    const centerY = (this.position.y + this.endPoint.y) / 2;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    this.width = Math.abs(this.endPoint.x - this.position.x);
    this.height = Math.abs(this.endPoint.y - this.position.y);

    ctx.translate(centerX, centerY);
    ctx.rotate(this.rotation);
    ctx.translate(-centerX, -centerY);

    ctx.strokeStyle = this.color;
    // ctx.lineWidth = this.border.width;
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.endPoint.x, this.endPoint.y);
    ctx.stroke();
    ctx.closePath();
  }

  /**
   * @return {Point}
   */
  get position() {
    return this.position;
  }

  /**
   * @return {Point}
   */
  get endPoint() {
    return this.endPoint;
  }

  /**
   * @param {Point} newposition
   */
  set position(newposition) {
    this.position = newposition;
  }

  /**
   * @param {Point} newEndPoint
   */
  set endPoint(newEndPoint) {
    this.endPoint = newEndPoint;
  }
}
