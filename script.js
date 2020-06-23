const cellSize = 100;
const cellGap = 5;
const cellCountX = 5;//document.getElementById("gridSizeX").value;
const cellCountY = 5;//document.getElementById("gridSizeY").value;
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

function draw() {
    background(500);    
    
    for (var i = 0; i < cellCountX; i++) {
        for (var j = 0; j < cellCountY; j++) {
            const curr = map[i][j];
            fill(curr.traversible ? 100 : 255);
            rect(curr.i * (cellSize + cellGap) + cellGap, curr.j * (cellSize + cellGap) + cellGap, cellSize, cellSize);
        }
    }
}

function mouseClicked() {
    posX = mouseX / cellCountX - cellGap;
    posY = mouseY / cellCountY - cellGap;
    map[posX][posY].traversible = false;
}

class Node {
    constructor(i, j, traversible) {
        this.i = i;
        this.j = j;
        this.traversible = traversible;
    }
}