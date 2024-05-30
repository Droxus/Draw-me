import { Shape } from '../shape.js';
import { Border } from './border.js';

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

    let minX = Math.min(...xValues);
    let maxX = Math.max(...xValues);
    let minY = Math.min(...yValues);
    let maxY = Math.max(...yValues);

    const width = maxX - minX;
    const height = maxY - minY;

    const xBboxDiff = this.width - width;
    const yBboxDiff = this.height - height;

    let xPos = 0;
    let yPos = 0;

    if (this.endPoint) {
      const centerX = (this.position.x + this.endPoint.x) / 2;
      const centerY = (this.position.y + this.endPoint.y) / 2;

      const posX1 =
        centerX +
        (this.position.x - centerX) * Math.cos(this.rotation) -
        (this.position.y - centerY) * Math.sin(this.rotation);
      const posX2 =
        centerX +
        (this.endPoint.x - centerX) * Math.cos(this.rotation) -
        (this.endPoint.y - centerY) * Math.sin(this.rotation);
      const posY1 =
        centerY +
        (this.position.x - centerX) * Math.sin(this.rotation) +
        (this.position.y - centerY) * Math.cos(this.rotation);
      const posY2 =
        centerY +
        (this.endPoint.x - centerX) * Math.sin(this.rotation) +
        (this.endPoint.y - centerY) * Math.cos(this.rotation);

      minX = Math.min(posX1, posX2);
      maxX = Math.max(posX1, posX2);
      minY = Math.min(posY1, posY2);
      maxY = Math.max(posY1, posY2);

      xPos = centerX;
      yPos = centerY;
    } else {
      xPos = minX - xBboxDiff / 2;
      yPos = minY - yBboxDiff / 2;
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

  getProperties() {
    return ["width", "height", "position", "rotation", "color", "border"];
  }
}
