import { Point } from "./point";
import { Border } from "./shapes/border";
import { Brush } from "./shapes/brush";
import { Circle } from "./shapes/primitives/circle";
import { Label } from "./shapes/primitives/label";
import { Line } from "./shapes/primitives/line";
import { Picture } from "./shapes/primitives/picture";
import { Rectangle } from "./shapes/primitives/rectangle";
import { Triangle } from "./shapes/primitives/triangle";

export class ShapeFactory {
  static async createImage({ x, y, path }) {
    const position = new Point(x, y);
    const border = new Border({ color: "red", width: 2, type: [] });
    const picture = new Picture(path, {
      position: position,
      rotation: 0,
      width: 200,
      height: 100,
      border: border,
    });

    return picture;
  }

  static createCircle({ x, y }) {
    const position = new Point(x, y);
    const border = new Border({ color: "blue", width: 2, type: [] });
    const circle = new Circle({
      position: position,
      rotation: 0,
      color: "orange",
      width: 100,
      height: 100,
      border: border,
    });

    return circle;
  }

  static createLabel({ x, y }) {
    const position = new Point(x, y);
    const border = new Border({ color: "blue", width: 2, type: [] });
    const label = new Label("Hello, World!", {
      position: position,
      rotation: 0,
      color: "red",
      width: 200,
      height: 50,
      border: border,
    });

    return label;
  }
  static createRectangle({ x, y }) {
    const position = new Point(x, y);
    const border = new Border({ color: "green", width: 2, type: [] });
    const rectangle = new Rectangle({
      position: position,
      rotation: 0,
      color: "red",
      width: 200,
      height: 50,
      border: border,
    });
    console.log(rectangle);
    return rectangle;
  }

  static createLine({ x, y }) {
    const startPoint = new Point(x - 100, y - 100);
    const endPoint = new Point(x, y);
    const line = new Line(startPoint, endPoint, {
      rotation: 0,
      color: "green",
    });

    return line;
  }

  static createTriangle({ x, y }) {
    const position = new Point(x, y);
    const border = new Border({ color: "blue", width: 2, type: [] });
    const triangle = new Triangle({
      position: position,
      rotation: 0,
      color: "orange",
      width: 100,
      height: 100,
      border: border,
    });

    return triangle;
  }

  static createBrush() {
    const color = "red";
    const brush = new Brush(color);
    return brush;
  }
}
