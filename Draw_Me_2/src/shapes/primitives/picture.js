import { Primitive } from "../primitive.js";

/**
 *
 * * Class Picture.
 *
 * @class Picture
 * @extends {Primitive}
 *
 * @typedef {Object} Picture
 * @property {String} source
 */

export class Picture extends Primitive {
  source;
  image;

  constructor(source, params) {
    super(params);
    this.source = source;
  }

  async draw(ctx) {
    const { x, y } = this.position;

    // console.log(this.image);
    if (this.image == undefined) {
      await this.loadImage();
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(x, y);
    ctx.rotate(this.rotation);
    // console.log(this.image);
    // console.log(this.width, this.height);
    ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    this.drawBorder(ctx);
  }

  async loadImage() {
    return new Promise((resolve, reject) => {
      this.image = new Image();
      this.image.src = this.source;

      this.image.onload = () => {
        resolve();
      };
      this.image.onerror = () => {
        reject();
      };
    });
  }

  /**
   * @return {String}
   */
  get source() {
    return this.source;
  }
}
