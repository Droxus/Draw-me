/**
 * * Class Scene.
 *
 * @class Scene
 *
 * @typedef {Object} Scene
 * @property {String} id
 * @property {String} color
 * @property {Shape} shapes
 */

export class Scene {
  #shapes = [];
  #color = "#ffffff";
  listeners = new Set();

  constructor(canvas) {
    this.id = "#scene_" + Scene.#idGenerator.next().value;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.resize = this.resize.bind(this);
    this.resizeObserver = new ResizeObserver(this.resize);
    this.resizeObserver.observe(this.canvas.parentElement);
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

  destroy() {
    this.clear();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  resize() {
    this.canvas.style.width = this.canvas.width =
      this.canvas.parentElement.clientWidth;
    this.canvas.style.height = this.canvas.height =
      this.canvas.parentElement.clientHeight;
    this.update();
  }

  /**
   * @return {string}
   */

  static #idGenerator = (function* () {
    let id = 1;
    const maxId = 10000;
    while (id < maxId) {
      yield "#shape_" + id++;
    }
  })();

  /**
   * @param {Shape} newShape
   */
  add(...newShapes) {
    this.#shapes.push(...newShapes);
    this.fireListeners({ type: "added", key: "shapes", shapes: newShapes });
  }

  /**
   * @param {Number} id
   */
  remove(...oldShapes) {
    let removed = [];
    this.#shapes = this.#shapes.filter((shape) => {
      if (oldShapes.some((oldShape) => oldShape.id == shape.id)) {
        removed.push(shape);
        return false;
      }
      return true;
    });
    if (removed.length < 1) return;
    this.fireListeners(
      { type: "removed", key: "shapes", shapes: removed },
      this
    );
  }

  /**
   * @param {Object} position
   * @returns {Array}
   */
  find(position) {
    return this.shapes
      .slice()
      .reverse()
      .filter((shape) => shape.isPoint(position, this.ctx));
  }

  /**
   * @param {string} id shape id
   * @returns {Shape | null}
   */
  findById(id) {
    return this.shapes.find((shape) => shape.id == id);
  }

  async update() {
    this.clear();
    this.ctx.save();
    this.setBackgroundColor(this.#color);
    for (const shape of this.shapes) {
      await shape.draw(this.ctx);
    }
    this.ctx.restore();
    this.fireListeners({
      type: "updated",
      key: "shapes",
      shapes: this.#shapes,
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  selectArea(area) {
    const { x, y, width, height } = area;
    this.update();

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([2, 5]);
    this.ctx.translate(0, 0);
    this.ctx.rotate(0);
    this.ctx.strokeRect(x, y, width, height);
  }

  /**
   * @param {Object} area
   * @return {Object}
   */
  copyArea(area) {
    const shapesToCopy = this.#shapes.filter((shape) => {
      const isInside = shape.isInsideArea(area);
      return isInside;
    });

    const copiedShapes = shapesToCopy.map((shape) => shape.copy());

    return copiedShapes;
  }

  /**
   * @param {Object} area
   * @param {Point} position
   */
  pasteArea(copiedShapes, position) {
    copiedShapes.forEach((shape) => {
      shape.id += "_copy" + String(Scene.#idGenerator.next().value);
      this.#shapes.push(shape);
    });

    this.update();
  }

  /**
   * @param {string} fileName
   */
  export(fileName) {
    const image = this.canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const element = document.createElement("a");

    element.setAttribute("href", image);
    element.setAttribute("download", fileName);

    element.click();
  }

  setBackgroundColor(color) {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * @return {number}
   */
  get shapesNumber() {
    return this.#shapes.length;
  }

  /**
   * @return {string}
   */
  get color() {
    return this.#color;
  }

  /**
   * @return {Array}
   */
  get shapes() {
    return this.#shapes.slice().sort((a, b) => a.layerIndex - b.layerIndex);
  }

  /**
   * @param {string} value
   */
  set color(value) {
    this.#color = value;
  }

  get name() {
    return "Scene";
  }

  getProperties() {
    return ["color"];
  }
}
