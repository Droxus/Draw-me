/**
 *
 * * Class Point.
 *
 * @class Point
 *
 * @typedef {Object} Point
 * @property {Number} x
 * @property {Number} y
 * @property {String} color
 */

export class Point {
  x;
  y;
  #color;

  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  /**
   * @return {Object}
   */
  get coordinates() {
    return { x: this.x, y: this.y };
  }

  /**
   * @return {string}
   */
  get color() {
    return this.#color;
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  set coordinates({ x, y }) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {string} color
   */
  set color(newColor) {
    this.#color = newColor;
  }
}
