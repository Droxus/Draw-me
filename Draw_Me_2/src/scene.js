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
  #color = "white";

  constructor() {
    this.id = this.#generateId().next().value;

    this.canvas = document.getElementById("mainCanvas");
    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth - this.canvas.offsetLeft;
    this.canvas.height = window.innerHeight - this.canvas.offsetTop;
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
  add(newShape) {
    this.#shapes.push(newShape);
  }

  /**
   * @param {Number} id
   */
  remove(id) {
    this.#shapes = this.#shapes.filter((shape) => shape.id !== id);
  }

  /**
   * @param {Object} position
   * @returns {Array}
   */
  find(position) {
    return this.#shapes.filter((shape) => shape.isPoint(position));
  }

  async update() {
    // console.log(this.#shapes);
    this.clear();
    this.ctx.save();
    // this.#shapes.forEach(async function (shape) {
    //   await shape.draw(this.ctx);
    // });

    for (const shape of this.#shapes) {
      await shape.draw(this.ctx);
    }
    this.ctx.restore();
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
}
