/**
 *
 * * Abstract Class Shape.
 *
 * @class Shape
 *
 * @typedef {Object} Shape
 * @property {String} id
 * @property {Number} layerIndex
 */

export class Shape {
  #layerIndex;

  constructor() {
    this.id = Shape.#idGenerator.next().value;
    if (this.constructor == Shape) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * @return {number}
   */
  static #idGenerator = (function* () {
    let id = 1;
    const maxId = 10000;
    while (id < maxId) {
      yield "#shape_" + id++;
    }
  })();

  async draw() {
    throw new Error("Method 'draw()' must be implemented.");
  }

  copy() {
    // Create a new instance of the same class
    const copy = new this.constructor();

    // Copy all properties
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        // Perform a deep copy if necessary
        if (typeof this[key] === "object" && this[key] !== null) {
          copy[key] = JSON.parse(JSON.stringify(this[key]));
        } else {
          copy[key] = this[key];
        }
      }
    }

    copy.image = undefined;

    return copy;
  }

  /**
   * @return {string}
   */
  // get id() {
  //   return this.#id;
  // }

  /**
   * @return {number}
   */
  get layerIndex() {
    return this.#layerIndex;
  }

  /**
   * @param {number} newLayerIndex
   */
  set layerIndex(newLayerIndex) {
    this.#layerIndex = newLayerIndex;
  }
}
