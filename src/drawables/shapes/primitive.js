import { Shape } from "../shape.js";
import { Border } from "./border.js";

/**
 *
 * * Abstract Class Primitive.
 *
 * @class Primitive
 * @extends {Shape}
 *
 * @typedef {Object} Primitive
 * @property {Point} position
 * @property {Number} rotation
 * @property {String} color
 * @property {Border} border
 * @property {Number} width
 * @property {Number} height
 */

export class Primitive extends Shape {
  position;
  rotation;
  color;
  border;
  width;
  height;

  constructor(params = {}) {
    super();

    const { position, rotation, color, border, width, height } = params;

    this.position = position;
    this.rotation = rotation;
    this.color = color;
    this.border = border;
    this.width = width;
    this.height = height;

    if (this.constructor == Primitive) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  draw() {
    // console.log("Drawing");
  }

  drawBorder(ctx) {
    const { x, y } = this.position;
    if (this.border && Number(this.border.width) > 0) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.strokeStyle = this.border.color;
      ctx.lineWidth = this.border.width;
      ctx.setLineDash(this.border.type);
      ctx.translate(x, y);
      ctx.rotate(this.rotation);
      ctx.strokeRect(
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    }
  }

  isPoint({ x, y }, ctx) {
    console.log("hek");
    const corners = this.getRotatedRectangleCorners();
    const bbox = this.getBoundingBox(corners);

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = "black";

    ctx.translate(bbox.x, bbox.y);
    ctx.rotate(0);
    ctx.fillRect(-bbox.width / 2, -bbox.height / 2, bbox.width, bbox.height);

    return (
      x >= bbox.x - bbox.width / 2 &&
      x <= bbox.x + bbox.width / 2 &&
      y >= bbox.y - bbox.height / 2 &&
      y <= bbox.y + bbox.height / 2
    );
  }

  getRotatedRectangleCorners() {
    const { x, y } = this.position;
    const { width, height, rotation } = this;

    const cx = x + width / 2;
    const cy = y + height / 2;

    const corners = [
      { x: x, y: y }, // Top-left
      { x: x + width, y: y }, // Top-right
      { x: x, y: y + height }, // Bottom-left
      { x: x + width, y: y + height }, // Bottom-right
    ];

    const rotatedCorners = corners.map((corner) => {
      const dx = corner.x - cx;
      const dy = corner.y - cy;
      return {
        x: cx + dx * Math.cos(rotation) - dy * Math.sin(rotation),
        y: cy + dx * Math.sin(rotation) + dy * Math.cos(rotation),
      };
    });

    return rotatedCorners;
  }

  getBoundingBox(corners) {
    const xValues = corners.map((point) => point.x);
    const yValues = corners.map((point) => point.y);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    const width = maxX - minX;
    const height = maxY - minY;

    const xBboxDiff = Math.abs(this.width - width);
    const yBboxDiff = Math.abs(this.height - height);

    let xPos = minX - xBboxDiff / 2;
    let yPos = minY - yBboxDiff / 2;

    if (this.endPoint) {
      xPos += (this.endPoint.x - this.position.x) / 2;
      yPos += (this.endPoint.y - this.position.y) / 2;
    }

    return {
      x: xPos,
      y: yPos,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  isInsideArea(area) {
    const { x, y, width, height } = area;
    const corners = this.getRotatedRectangleCorners();
    const boundingBox = this.getBoundingBox(corners);

    const bboxPoints = [
      {
        x: boundingBox.x + boundingBox.width / 2,
        y: boundingBox.y + boundingBox.height / 2,
      },

      {
        x: boundingBox.x - boundingBox.width / 2,
        y: boundingBox.y + boundingBox.height / 2,
      },

      {
        x: boundingBox.x + boundingBox.width / 2,
        y: boundingBox.y - boundingBox.height / 2,
      },

      {
        x: boundingBox.x - boundingBox.width / 2,
        y: boundingBox.y - boundingBox.height / 2,
      },
    ];

    const minX = Math.min(x, x + width);
    const maxX = Math.max(x, x + width);
    const maxY = Math.max(y, y + height);
    const minY = Math.min(y, y + height);

    return bboxPoints.every(
      (point) =>
        point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
    );
  }

  /**
   * @return {Point}
   */
  get position() {
    return this.position;
  }

  /**
   * @return {Number}
   */
  get rotation() {
    return this.rotation;
  }

  /**
   * @return {String}
   */
  get color() {
    return this.color;
  }

  /**
   * @return {Border}
   */
  get border() {
    return this.border;
  }

  /**
   * @return {Number}
   */
  get width() {
    return this.width;
  }

  /**
   * @return {Number}
   */
  get height() {
    return this.height;
  }

  /**
   * @param {Point} newPosition
   */
  set position(newPosition) {
    this.position = newPosition;
  }

  /**
   * @param {Number} newRotation
   */
  set rotation(newRotation) {
    this.rotation = newRotation;
  }

  /**
   * @param {String} newColor
   */
  set color(newColor) {
    this.color = newColor;
  }

  /**
   * @param {Border} newBorder
   */
  set border(newBorder) {
    this.border = newBorder;
  }

  /**
   * @param {Number} newWidth
   */
  set width(newWidth) {
    this.width = newWidth;
  }

  /**
   * @param {Number} newHeight
   */
  set height(newHeight) {
    this.height = newHeight;
  }

  getProperties() {
    return ["width", "height", "position", "rotation", "color", "border"];
  }
}
