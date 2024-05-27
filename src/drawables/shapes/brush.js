import { Shape } from '../shape.js';

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
  width;

  constructor(params) {
    const { color, width } = params;
    super();
    this.#color = color;
    this.width = width;
    this.#tracePoints = [];
  }

  draw(ctx) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.setLineDash([]);
    ctx.lineWidth = this.width;
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
    return this.tracePoints.find((point) => x == point.x && y == point.y);
  }

  /**
   * @return {Array}
   */
  get tracePoints() {
    return this.#tracePoints;
  }

  get position() {
    return this.tracePoints[0];
  }

  /**
   * @return {string}
   */
  get color() {
    return this.#color;
  }

  /**
   * @return {string}
   */
  set color(value) {
    return (this.#color = value);
  }

  /**
   * @param {Array} newTracePoints
   */
  set tracePoints(newTracePoints) {
    this.#tracePoints = newTracePoints;
  }

  getProperties() {
    return ["width", "color"];
  }
}
