import { MODE } from "../constants.js";
import { ShapeFactory } from "../drawables/factory.js";
import { Point } from "../drawables/point.js";
import { Scene } from "../scene/Scene.js";

// const shapeClasses = {
//   Rectangle: Rectangle,
//   Circle: Circle,
//   // Add other shapes here...
// };

export class Controls {
  currentShape;

  scene;
  controls;
  selectedShape;

  shapesCreate;

  mouseHold;
  startSelecting;
  sizeSelecting;
  readToPaste;

  shapeCreating;

  mode;

  /**
   *
   * @param {Scene} scene
   */
  constructor(scene) {
    this.scene = scene;
    this.mode = MODE.SELECT;
    this.mouseHold = false;
    this.startSelecting = undefined;
    this.sizeSelecting = {};
    this.readToPaste = false;
    this.shapeCreating = undefined;
    this.isPainting = false;

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.scene.canvas.addEventListener("mousedown", this.onMouseDown);
    this.scene.canvas.addEventListener("mouseup", this.onMouseUp);
    this.scene.canvas.addEventListener("mousemove", this.onMouseMove);
  }

  destroy() {
    if (this.scene) {
      this.scene.canvas.removeEventListener("mousedown", this.onMouseDown);
      this.scene.canvas.removeEventListener("mouseup", this.onMouseUp);
      this.scene.canvas.removeEventListener("mousemove", this.onMouseMove);
      this.scene.destroy();
      this.scene = null;
    }
  }

  createNextShapeWith(producer) {
    this.mode = MODE.CREATE;
    this.createShape = producer;
  }

  async onMouseDown(event) {
    const { offsetX, offsetY } = event;
    const position = new Point(offsetX, offsetY);
    const scene = this.scene;

    this.mouseHold = true;
    switch (this.mode) {
      case MODE.DRAW:
        this.startBrushDrawing(position);
        break;
      case MODE.MOVE:
        const foundShapes = scene.find(position);
        this.selectedShape = foundShapes[0];
        break;
      case MODE.SELECT:
        if (this.readToPaste) {
          this.mouseHold = false;
          const area = {
            x: this.startSelecting.x,
            y: this.startSelecting.y,
            width: this.sizeSelecting.width,
            height: this.sizeSelecting.height,
          };

          const xDiff = position.x - this.startSelecting.x;
          const yDiff = position.y - this.startSelecting.y;

          const copiedShapes = scene.copyArea(area);
          copiedShapes.map((shape) => {
            shape.position.x += xDiff;
            shape.position.y += yDiff;
            if (shape.endPoint) {
              shape.endPoint.x += xDiff;
              shape.endPoint.y += yDiff;
            }
          });
          scene.pasteArea(copiedShapes, position);
          this.readToPaste = false;
          this.sizeSelecting = {};
          this.startSelecting = undefined;
        } else {
          this.startSelecting = position;
          const area = {
            x: this.startSelecting.x,
            y: this.startSelecting.y,
            width: 0,
            height: 0,
          };
          scene.selectArea(area);
        }
        break;

      case MODE.CREATE:
        console.log("creating shape");
        this.shapeCreating = await this.createShape(position);
        this.scene.add(this.shapeCreating);
        this.scene.update();
        this.startSelecting = position;
        const area = {
          x: this.startSelecting.x,
          y: this.startSelecting.y,
          width: 0,
          height: 0,
        };
        this.shapeCreating.width = area.width;
        this.shapeCreating.height = area.height;
        if (this.shapeCreating.position) {
          this.shapeCreating.position.x =
            this.startSelecting.x + area.width / 2;
          this.shapeCreating.position.y =
            this.startSelecting.y + area.height / 2;
        }
        scene.selectArea(area);
        break;

      default:
        break;
    }
  }

  onMouseUp() {
    switch (this.mode) {
      case MODE.DRAW:
        this.stopBrushDrawing();
        break;
      case MODE.MOVE:
        this.selectedShape = undefined;
        break;
      case MODE.SELECT:
        if (this.mouseHold) {
          this.readToPaste = true;
        }
        break;

      case MODE.CREATE:
        if (this.mouseHold) {
          this.shapeCreating = undefined;
          this.mode = MODE.SELECT;
        }
        break;

      default:
        break;
    }

    this.mouseHold = false;
  }

  onMouseMove(event) {
    // console.log(event);
    const isMouseClicked = event.which != 0;
    if (!isMouseClicked) return;
    const position = new Point(event.offsetX, event.offsetY);
    const scene = this.scene;
    switch (this.mode) {
      case MODE.DRAW:
        this.keepBrushDrawing(position);
        break;
      case MODE.MOVE:
        if (this.selectedShape) {
          let prevPosition = this.selectedShape.position;
          this.selectedShape.position = position;
          if (this.selectedShape.endPoint) {
            const xDiff = position.x - prevPosition.x;
            const yDiff = position.y - prevPosition.y;
            this.selectedShape.endPoint.x += xDiff / 2;
            this.selectedShape.endPoint.y += yDiff / 2;
            this.selectedShape.position.x -= xDiff / 2;
            this.selectedShape.position.y -= yDiff / 2;
          }
          scene.update();
        }
        break;
      case MODE.SELECT:
        if (this.mouseHold) {
          scene.update();

          this.sizeSelecting.width = position.x - this.startSelecting.x;
          this.sizeSelecting.height = position.y - this.startSelecting.y;

          const area = {
            x: this.startSelecting.x,
            y: this.startSelecting.y,
            width: this.sizeSelecting.width,
            height: this.sizeSelecting.height,
          };
          scene.selectArea(area);
        }
        break;

      case MODE.CREATE:
        if (this.mouseHold) {
          scene.update();

          this.sizeSelecting.width = position.x - this.startSelecting.x;
          this.sizeSelecting.height = position.y - this.startSelecting.y;

          const area = {
            x: this.startSelecting.x,
            y: this.startSelecting.y,
            width: this.sizeSelecting.width,
            height: this.sizeSelecting.height,
          };
          this.shapeCreating.width = Math.abs(area.width);
          this.shapeCreating.height = Math.abs(area.height);
          this.shapeCreating.position.x =
            this.startSelecting.x + area.width / 2;
          this.shapeCreating.position.y =
            this.startSelecting.y + area.height / 2;
          scene.selectArea(area);
        }
        break;

      default:
        break;
    }
  }

  startBrushDrawing({ x, y }) {
    const brush = ShapeFactory.createBrush();
    this.scene.add(brush);
    this.currentShape = brush;
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
}
