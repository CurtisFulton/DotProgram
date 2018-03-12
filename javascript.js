const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

let dotSize;
let numRed;
let numBlue;

window.addEventListener('load', function() {
	dotSize = document.getElementById('dotSize').value;
	numRed = document.getElementById('numRed').value;
	numBlue = document.getElementById('numBlue').value;

	RedrawCanvas();
})

window.addEventListener('resize', function() {
	RedrawCanvas();
})

function RedrawCanvas() {
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight - (window.innerHeight * 0.11);

	RedrawDots();
}

function RedrawDots() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	let filledPositions = [];

	for (let i = 0; i < numRed; i++) {
		let targetPoint = GetPlaceablePositon(filledPositions);
		filledPositions.push(targetPoint);

		DrawDot(targetPoint.x, targetPoint.y, dotSize, '#FF0000');
	}

	for (let i = 0; i < numBlue; i++) {
		let targetPoint = GetPlaceablePositon(filledPositions);
		filledPositions.push(targetPoint);

		DrawDot(targetPoint.x, targetPoint.y, dotSize, '#0000FF');
	}
}

function GetPlaceablePositon(filledPositions) {
	let targetX, targetY, intersects;

	for (let i = 0; i < 2000; i++) {
		intersects = false;

		targetX = (Math.random() * (canvas.width - dotSize * 2)) + (dotSize * 1);
		targetY = (Math.random() * (canvas.height - dotSize * 2)) + (dotSize * 1);

		for (let i = 0; i < filledPositions.length; i++) {
			let dist = Math.sqrt(Math.pow(filledPositions[i].x - targetX, 2) + Math.pow(filledPositions[i].y - targetY, 2));

			if (dist <= dotSize * 2.5)
				intersects = true;
		}

		if (!intersects)
			break;
	}

	return {
		x : targetX,
		y : targetY
	}
}

function DrawDot(x, y, size, colour) {
	ctx.fillStyle = colour;
	ctx.beginPath();
	ctx.arc(x, y, size, 0*Math.PI, 2*Math.PI) 
	ctx.fill();
}

function UpdateNumRed(value) {
	if (value <= 0) 
		return;

	numRed = value;
	RedrawCanvas();
}

function UpdateNumBlue(value) {
	if (value <= 0) 
		return;

	numBlue = value;
	RedrawCanvas();
}

function UpdateDotSize(value) {
	if (value <= 0) 
		return;

	dotSize = value;
	RedrawCanvas();
}