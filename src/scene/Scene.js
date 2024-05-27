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
    this.id = this.#generateId().next().value;

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
    this.resize = this.resize.bind(this);
    window.addEventListener("resize", this.resize);
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
    window.removeEventListener("resize", this.resize);
  }

  resize(entries) {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
    this.update();
  }

  /**
   * @return {string}
   */
  *#generateId() {
    const maxId = 10000;
    let id = 1;

    while (id < maxId) {
      yield "#shape_" + id++;
    }
  }

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
    return this.#shapes
      .slice()
      .sort((a, b) => b.layerIndex - a.layerIndex)
      .filter((shape) => shape.isPoint(position));
  }

  async update() {
    // console.log(this.#shapes);
    this.clear();
    this.ctx.save();
    // this.#shapes.forEach(async function (shape) {
    //   await shape.draw(this.ctx);
    // });
    this.setBackgroundColor(this.#color);
    for (const shape of this.#shapes
      .slice()
      .sort((a, b) => a.layerIndex - b.layerIndex)) {
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
    const { x, y, width, height } = area;

    const shapesToCopy = this.#shapes.filter((shape) => {
      // const shapeX = shape.position.x;
      // const shapeY = shape.position.y;
      // const shapeWidth = shape.width;
      // const shapeHeight = shape.height;

      const isInside = shape.isInsideArea(area);
      return isInside;
      // return (
      //   shapeX >= x &&
      //   shapeX + shapeWidth <= x + width &&
      //   shapeY >= y &&
      //   shapeY + shapeHeight <= y + height
      // );
    });

    // console.log(shapesToCopy);

    const copiedShapes = shapesToCopy.map((shape) => shape.copy());

    return copiedShapes;
  }

  /**
   * @param {Object} area
   * @param {Point} position
   */
  pasteArea(copiedShapes, position) {
    const { x, y } = position;

    copiedShapes.forEach((shape) => {
      shape.id += "_copy";
      // shape.position.x += x;
      // shape.position.y += y;
      // console.log(shape);
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
    // const filename = "test.png";

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
    return this.#shapes;
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
