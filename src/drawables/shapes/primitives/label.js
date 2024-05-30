import { Primitive } from '../primitive.js';

/**
 *
 * * Class Label.
 *
 * @class Label
 * @extends {Primitive}
 *
 * @typedef {Object} Label
 * @property {String} text
 */

export class Label extends Primitive {
  text;

  constructor(text, params) {
    super(params);
    this.text = text;
  }

  draw(ctx) {
    const { x, y } = this.position;
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = this.color;
    ctx.font = this.font || "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lines = this.text.split("\n");
    const longestLineWidth = lines
      .map((line) => ctx.measureText(line).width)
      .sort((a, b) => a - b)
      .pop();
    const lineHeight = parseInt(ctx.font, 10);
    this.width = Math.max(this.width, longestLineWidth);
    const textHeight = lineHeight * lines.length;
    this.height = Math.max(this.height, textHeight);
    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    lines.forEach((line, i) => {
      ctx.fillText(line, 0, 0 - textHeight / 2 + lineHeight * i);
    });
    super.draw(ctx);

    this.drawBorder(ctx);
  }

  /**
   * @return {String}
   */
  get text() {
    return this.text;
  }

  /**
   * @param {String} newText
   */
  set text(newText) {
    this.text = newText;
  }

  getProperties() {
    return ["text"].concat(super.getProperties());
  }
}
