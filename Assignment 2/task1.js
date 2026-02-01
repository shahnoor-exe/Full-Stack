var svg = document.getElementById("drawingArea");
var clearBtn = document.getElementById("clearBtn");

var drawing = false;
var line = null;
var points = "";

function startDrawing(e) {
    drawing = true;
    points = e.offsetX + "," + e.offsetY;
    line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    line.setAttribute("points", points);
    line.setAttribute("fill", "none");
    line.setAttribute("stroke", "black");
    svg.appendChild(line);
}

function draw(e) {
    if (drawing) {
        points = points + " " + e.offsetX + "," + e.offsetY;
        line.setAttribute("points", points);
    }
}

function stopDrawing() {
    drawing = false;
}

function clearAll() {
    svg.innerHTML = "";
}

svg.addEventListener("mousedown", startDrawing);
svg.addEventListener("mousemove", draw);
svg.addEventListener("mouseup", stopDrawing);
clearBtn.addEventListener("click", clearAll);
