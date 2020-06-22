const cellSize = 100;
const cellGap = 5;
const cellCountX = 10;//document.getElementById("gridSizeX").value;
const cellCountY = 10;//document.getElementById("gridSizeY").value;
const map = [[]];
map.fill(0);
function setup() {
    createCanvas(cellCountX * (cellSize + cellGap) + cellGap, cellCountY * (cellSize + cellGap) + cellGap);
}

function draw() {
    background(500);
    fill(100);
    for (var i = 0; i < cellCountX; i++) {
        for (var j = 0; j < cellCountY; j++) {
            map[i][j] = new Node(i, j, true);
        }
    }
}

class Node {
    constructor(i, j, traversible) {
        this.i = i;
        this.j = j;
        this.traversible = traversible;
        this.square = rect(i * (cellSize + cellGap) + cellGap, j * (cellSize + cellGap) + cellGap, cellSize, cellSize);
    }
}