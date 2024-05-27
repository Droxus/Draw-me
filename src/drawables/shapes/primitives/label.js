import { Primitive } from "../primitive.js";

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

    const width = this.width || ctx.measureText(this.text).width;
    const height = this.height || parseInt(ctx.font, 10);
    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    ctx.fillText(this.text, 0, 0);

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
