/**
 *
 * * Class Border.
 *
 * @class Border
 *
 * @typedef {Object} Border
 * @property {String} color
 * @property {Number} width
 * @property {BorderType} type
 */

export const BorderType = Object.freeze({
  SOLID: [],
  DASH: [5, 15],
  DOT: [1, 5],
  DASH_DOT: [5, 5, 1, 5],
});

export class Border {
  color;
  width;
  type;

  constructor(params = {}) {
    const { color, width, type } = params;

    this.color = color;
    this.width = width;
    this.type = type;
  }

  /**
   * @return {String}
   */
  get color() {
    return this.color;
  }

  /**
   * @return {Number}
   */
  get width() {
    return this.width;
  }

  /**
   * @return {BorderType}
   */
  get type() {
    return this.type;
  }

  /**
   * @param {String} newColor
   */
  set color(newColor) {
    this.color = newColor;
  }

  /**
   * @param {Number} width
   */
  set width(newWidth) {
    this.width = newWidth;
  }

  /**
   * @param {BorderType} newType
   */
  set type(newType) {
    this.type = newType;
  }
}
