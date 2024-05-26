import { Controls } from "./controls.js";
import { Point } from "./point.js";

const MODE = {
  DRAW: "Draw",
  MOVE: "Move",
  SELECT: "Select",
  CREATE: "Create",
};

// const shapeCreate = {
//   Rectangle: this.controls.createRectangle,
//   Circle: this.controls.createCircle,
//   // Add other shapes here...
// };

export class UserInterface {
  controls;
  selectedShape;

  shapesCreate;

  mouseHold;
  startSelecting;
  sizeSelecting;
  readToPaste;

  shapeCreating;

  mode;

  constructor() {
    this.controls = new Controls();
    this.init();
    this.selectMode = true;

    this.mode = MODE.DRAW;
    this.mouseHold = false;
    this.startSelecting = undefined;
    this.sizeSelecting = {};
    this.readToPaste = false;
    this.shapeCreating = undefined;
  }

  init() {
    const scene = this.controls.scene;

    scene.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
    scene.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
    scene.canvas.addEventListener("mousemove", this.onMouseMove.bind(this));

    this.shapesCreate = {
      Rectangle: this.controls.createRectangle,
      Circle: this.controls.createCircle,
      Import: this.controls.createImage,
      Label: this.controls.createLabel,
      Line: this.controls.createLine,
      Triangle: this.controls.createTriangle,
    };

    const primitivesBtn = document.getElementsByClassName("primitives");
    Array.from(primitivesBtn).forEach((btn) => {
      btn.addEventListener("click", this.onCreateShape.bind(this));
    });
  }

  onCreateShape(event) {
    const shapeType = event.target.innerText;
    this.mode = MODE.CREATE;
    this.createShape = this.shapesCreate[shapeType];
    // return this.shapeCreate[shapeType]();
    // this.controls.createRectangle()
  }

  onMouseDown({ offsetX, offsetY }) {
    const position = new Point(offsetX, offsetY);
    const scene = this.controls.scene;

    this.mouseHold = true;
    switch (this.mode) {
      case MODE.DRAW:
        this.controls.startBrushDrawing(position);
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
        console.log("LOG");
        this.shapeCreating = this.createShape();
        this.startSelecting = position;
        const area = {
          x: this.startSelecting.x,
          y: this.startSelecting.y,
          width: 0,
          height: 0,
        };
        this.shapeCreating.width = area.width;
        this.shapeCreating.height = area.height;
        this.shapeCreating.position.x = this.startSelecting.x + area.width / 2;
        this.shapeCreating.position.y = this.startSelecting.y + area.height / 2;
        scene.selectArea(area);
        break;

      default:
        break;
    }
  }

  onMouseUp() {
    const scene = this.controls.scene;
    switch (this.mode) {
      case MODE.DRAW:
        this.controls.stopBrushDrawing();
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
          this.readToPaste = true;
          this.shapeCreating = undefined;
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
    const position = new Point(event.offsetX, event.offsetY);
    const scene = this.controls.scene;

    if (isMouseClicked) {
      switch (this.mode) {
        case MODE.DRAW:
          this.controls.keepBrushDrawing(position);
          break;
        case MODE.MOVE:
          if (this.selectedShape) {
            this.selectedShape.position = position;
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
  }
}
