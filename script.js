const cellSize = 100;
const cellGap = 5;
const cellCountX = 15; //document.getElementById("gridSizeX").value;
const cellCountY = 8; //document.getElementById("gridSizeY").value;
const canvasX = cellCountX * (cellSize + cellGap) + cellGap;
const canvasY = cellCountY * (cellSize + cellGap) + cellGap;
let  canvas;
const map = new Array(cellCountX);
for (var i = 0; i < cellCountX; i++) {
    map[i] = new Array(cellCountY);
}

function setup() {
    canvas = createCanvas(canvasX, canvasY);
    for (var i = 0; i < cellCountX; i++) {
        for (var j = 0; j < cellCountY; j++) {
            map[i][j] = new Node(i, j, true);
        }
    }
}

let start = map[0][0];
let end = map[cellCountX -1][cellCountY - 1];

function draw() {
    background(500); 
    const canvasX = cellCountX * (cellSize + cellGap) + cellGap;
    const canvasY = cellCountY * (cellSize + cellGap) + cellGap;
    if (map.length != cellCountX || map[0].length != cellCountY) {
        setup();
    }
    for (var i = 0; i < cellCountX; i++) {
        for (var j = 0; j < cellCountY; j++) {
            const curr = map[i][j];
            fill(curr.getFill());
            rect(curr.i * (cellSize + cellGap) + cellGap, curr.j * (cellSize + cellGap) + cellGap, cellSize, cellSize);
        }
    }
}

function mousePressed() {
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            const n = map[i][j];
            if (mouseX > n.x1 && mouseX < n.x2 && mouseY > n.y1 && mouseY < n.y2) {
                n.clicked();
            }
        }
    }
}

function run() {
    const empty = Array();
    const closedList = Array([cellCountX][cellCountY]);
    for (let i = 0; i < cellCountX; i++) {
        for (let j = 0; j < cellCountY; j++) {
            closedList[i][j] = false;
        }
    }

    let x = start.x;
    let y = start.y;
    start.f = 0;
    start.g = 0;
    start.h = 0;
    start.parent = start;

    const openList = [];
    openList.push(start);
    let destinationFound = false;
}

class Node {
    constructor(i, j, traversible) {
        this.i = i;
        this.j = j;
        this.traversible = traversible;

        this.x1 = this.i * (cellSize + cellGap) + cellGap;
        this.x2 = this.x1 + cellSize;
        this.centerX = this.x1 + (cellSize / 2);

        this.y1 = this.j * (cellSize + cellGap) + cellGap;
        this.y2 = this.y1 + cellSize;
        this.centerY = this.y1 + (cellSize / 2);

        this.h = dist(this.centerX, this.centerY, end.centerX, end.centerY);
        this.f = Infinity;
        this.g = Infinity;

        this.parent;
        this.traversed = false;
    }

    getFill = function() {
        let result = color(255);
        if (this.i == start.i && this.j == start.j) {
            result = color(10, 100, 10);
        } else if (this.i == end.i && this.j == end.j) {
            result = color(150, 10, 10);
        }
        else if (this.traversed) {
            result = color(10, 10, 150);
        } else if (!this.traversible) {
            result = color(100);
        }
        return result;
    }

    clicked = function() {
        this.traversible = !this.traversible;
    }
}