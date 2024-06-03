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
  static layerIndexCounter = 0;
  #layerIndex = Shape.layerIndexCounter++;
  listeners = new Set();

  constructor() {
    this.id = Shape.#idGenerator.next().value;
    if (this.constructor == Shape) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  addListener(listener) {
    this.listeners.add(listener);
  }
  removeListener(listener) {
    this.listeners.delete(listener);
  }

  fireListeners({ type, ...rest }) {
    this.listeners.forEach((callback) =>
      callback({ type: type || "updated", ...rest }, this)
    );
  }

  isInsideArea(area) {
    return false;
  }

  get type() {
    return this.constructor.name;
  }

  get name() {
    return `${this.constructor.name} ${this.id}`;
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
    this.fireListeners({ type: "updated" }, this);
  }

  copy() {
    const copy = new this.constructor();

    for (const key in this) {
      if (this.hasOwnProperty(key) && !["listeners"].includes(key)) {
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
