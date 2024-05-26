import { Shape } from "../shape.js";

/**
 *
 * * Class Brush.
 *
 * @class Brush
 * @extends {Shape}
 *
 * @typedef {Object} Brush
 * @property {Array} tracePoints
 * @property {String} color
 */

export class Brush extends Shape {
  #tracePoints;
  #color;

  constructor(color) {
    super();
    this.#color = color;
    this.#tracePoints = [];
  }

  draw(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.strokeStyle = this.color;

    ctx.beginPath();
    for (let i = 1; i < this.#tracePoints.length; i++) {
      const prevTracePoint = this.#tracePoints[i - 1];
      const { x, y } = this.#tracePoints[i];
      const [prevX, prevY] = [prevTracePoint.x, prevTracePoint.y];

      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.closePath();
  }

  /**
   * @param {Point} point
   */
  addTracePoint(point) {
    this.#tracePoints.push(point);
  }

  isPoint({ x, y }) {
    return tracePoints.find(({ _x, _y }) => x == _x && y == _y);
  }

  /**
   * @return {Array}
   */
  get tracePoints() {
    return this.#tracePoints;
  }

  /**
   * @return {string}
   */
  get color() {
    return this.#color;
  }

  /**
   * @param {Array} newTracePoints
   */
  set tracePoints(newTracePoints) {
    this.#tracePoints = newTracePoints;
  }
}
