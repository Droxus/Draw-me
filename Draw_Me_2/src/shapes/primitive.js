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
    if (this.border) {
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

  isPoint({ x, y }) {
    // console.log(x, y);
    // console.log(this.position.x, this.position.y);
    // console.log(this.width, this.height);
    return (
      x >= this.position.x - this.width / 2 &&
      x <= this.position.x + this.width / 2 &&
      y >= this.position.y - this.height / 2 &&
      y <= this.position.y + this.height / 2
    );
  }

  rotatePoint(point, angle, origin) {
    const radians = (Math.PI / 180) * angle;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const nx =
      cos * (point.x - origin.x) - sin * (point.y - origin.y) + origin.x;
    const ny =
      sin * (point.x - origin.x) + cos * (point.y - origin.y) + origin.y;
    return { x: nx, y: ny };
  }

  // getRotatedBoundingBox() {
  //   const { x, y } = this.position;
  //   const { width, height, rotation } = this;

  //   const halfWidth = width / 2;
  //   const halfHeight = height / 2;

  //   const corners = [
  //     { x: x - halfWidth, y: y - halfHeight },
  //     { x: x + halfWidth, y: y - halfHeight },
  //     { x: x + halfWidth, y: y + halfHeight },
  //     { x: x - halfWidth, y: y + halfHeight },
  //   ];

  //   const rotatedCorners = corners.map((corner) =>
  //     this.rotatePoint(corner, rotation, this.position)
  //   );

  //   const minX = Math.min(...rotatedCorners.map((corner) => corner.x));
  //   const maxX = Math.max(...rotatedCorners.map((corner) => corner.x));
  //   const minY = Math.min(...rotatedCorners.map((corner) => corner.y));
  //   const maxY = Math.max(...rotatedCorners.map((corner) => corner.y));

  //   return {
  //     x: minX,
  //     y: minY,
  //     width: maxX - minX,
  //     height: maxY - minY,
  //   };
  // }

  getRotatedBoundingBox() {
    let minX = this.position.x,
      minY = this.position.y;
    if (this.endPoint) {
      minX = Math.min(this.position.x, this.endPoint.x);
      minY = Math.min(this.position.y, this.endPoint.y);

      minY = minY;
      minX = minX + this.width / 2;
    }

    const x = minX;
    const y = minY;
    const width = this.width;
    const height = this.height;

    return {
      x: x,
      y: y,
      width: width,
      height: height,
    };
  }

  isInsideArea(area) {
    const { x, y, width, height } = area;
    const boundingBox = this.getRotatedBoundingBox();

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
}
