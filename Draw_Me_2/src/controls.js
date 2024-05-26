import { Scene } from "./scene.js";
import { Brush } from "./shapes/brush.js";
import { Point } from "./point.js";
import { Label } from "./shapes/primitives/label.js";
import { Border } from "./shapes/border.js";
import { Line } from "./shapes/primitives/line.js";
import { Rectangle } from "./shapes/primitives/rectangle.js";
import { Triangle } from "./shapes/primitives/triangle.js";
import { Circle } from "./shapes/primitives/circle.js";
import { Picture } from "./shapes/primitives/picture.js";

// const shapeClasses = {
//   Rectangle: Rectangle,
//   Circle: Circle,
//   // Add other shapes here...
// };

export class Controls {
  currentShape;

  scene;

  constructor() {
    this.scene = new Scene();

    this.createRectangle = this.createRectangle.bind(this);
    this.createCircle = this.createCircle.bind(this);
    this.createImage = this.createImage.bind(this);
    this.createLabel = this.createLabel.bind(this);
    this.createLine = this.createLine.bind(this);
    this.createTriangle = this.createTriangle.bind(this);

    this.createLabel();
    this.createLine();
    this.createRectangle();
    this.createTriangle();
    this.createCircle();
    this.createImage();
    // console.log(this.scene.find(new Point(810, 605)));

    // const area = { x: 100, y: 100, width: 400, height: 400 };
    // const copiedShapes = this.scene.copyArea(area);
    // this.scene.pasteArea(copiedShapes, new Point(100, 400));
    this.isPainting = false;
  }

  // createShape(type) {
  //   const ShapeClass = shapeClasses[type];
  //   if (!ShapeClass) {
  //     throw new Error(`Unknown shape type: ${type}`);
  //   }
  //   return new ShapeClass();
  // }

  startBrushDrawing({ x, y }) {
    this.createBrush();
    this.isPainting = true;
    const point = new Point(x, y);
    this.currentShape.addTracePoint(point);
    this.scene.update();
  }

  keepBrushDrawing({ x, y }) {
    if (this.isPainting) {
      const point = new Point(x, y);
      this.currentShape.addTracePoint(point);
      this.scene.update();
    }
  }

  stopBrushDrawing() {
    this.isPainting = false;
    this.scene.update();
  }

  createBrush() {
    const color = "red";
    const brush = new Brush(color);
    this.scene.add(brush);

    this.currentShape = brush;
    return brush;
  }

  createLabel() {
    const position = new Point(100, 200);
    const border = new Border({ color: "blue", width: 2, type: [] });
    const label = new Label("Hello, World!", {
      position: position,
      rotation: 0,
      color: "red",
      width: 200,
      height: 50,
      border: border,
    });
    this.scene.add(label);
    this.scene.update();

    return label;
  }

  createLine() {
    const startPoint = new Point(400, 400);
    const endPoint = new Point(500, 420);
    const line = new Line(startPoint, endPoint, {
      rotation: 0,
      color: "green",
    });
    this.scene.add(line);
    this.scene.update();

    return line;
  }

  createRectangle() {
    const position = new Point(600, 200);
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
    console.log(this);
    this.scene.add(rectangle);
    this.scene.update();

    console.log(rectangle);

    return rectangle;
  }

  createTriangle() {
    const position = new Point(400, 500);
    const border = new Border({ color: "blue", width: 2, type: [] });
    const triangle = new Triangle({
      position: position,
      rotation: 0,
      color: "orange",
      width: 100,
      height: 100,
      border: border,
    });
    this.scene.add(triangle);
    this.scene.update();

    return triangle;
  }

  createCircle() {
    const position = new Point(200, 300);
    const border = new Border({ color: "blue", width: 2, type: [] });
    const circle = new Circle({
      position: position,
      rotation: 0,
      color: "orange",
      width: 100,
      height: 100,
      border: border,
    });
    this.scene.add(circle);
    this.scene.update();

    return circle;
  }

  createImage() {
    const position = new Point(700, 500);
    const border = new Border({ color: "red", width: 2, type: [] });
    const picture = new Picture("./lion.jpg", {
      position: position,
      rotation: 1,
      width: 200,
      height: 100,
      border: border,
    });
    this.scene.add(picture);
    this.scene.update();

    return picture;
  }
}
