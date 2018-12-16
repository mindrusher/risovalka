var doc = document;


var size = doc.getElementById('sizeSelect');
var newColor = doc.getElementById('color');
var canvas = doc.getElementById('canv');
var ctx = canvas.getContext('2d');
var xCoord = doc.getElementById('xCoord');
var yCoord = doc.getElementById('yCoord');
var tools = ['brush', 'rectangle'];
var activeTool = '';


var system = {
	width: canvas.getAttribute('width'),
	height: canvas.getAttribute('height'),
	currentColor: newColor.value,
	currentTool: '',
	brushSize : size.value
};

var selectTool = function (evt) {};
var getCoordinates = function (evt) {

	let xyMas = [];
	let x = evt.offsetX;
	let y = evt.offsetY;

	xyMas = {x : x, y : y, draw: true};

	xCoord.innerText = x;
	yCoord.innerText = y;
	//ctx.fillRect(x, y, 10, 10);
	//console.log(evt);
	return xyMas;
};

var renderSystem = function (obj, elem, action) {
	obj[elem] = action;
	console.log('done!');
	console.log(obj);
};

var switchTool = function (button) {
	if (button.id == 'brush') {
		alert('brush selected');
		return 'brush';
	} else if (button.id == 'notbrush') {
		alert('NOT brush selected');
		return 'NOT brush';
	} else if (button.id == 'notbrush2') {
		alert('NOT brush 2 selected');
		return 'NOT brush 2';
	}
};

var switchSize = function (list) {
	return list.value;
};

var switchColor = function (colorInput) {
	let a = newColor.value;
	return a;
};

var mouseActions = function (evt) {
	if (evt.target.classList.contains('toolButton') == true) {
		console.log(system);
		renderSystem(system, 'currentTool', switchTool(evt.target));
	} else if (evt.target.id == 'sizeSelect') {
		renderSystem(system, 'brushSize', switchSize(evt.target));
	} else if (evt.target.id == 'color') {
		renderSystem(system, 'currentColor', switchColor(evt.target));
		console.log(evt);
	}
};

var startDraw = function (evt) {
	if (system.currentTool == 'brush') {
		drawLines (evt);
	}
};

var endDraw = function (evt) {
	canvas.onmousemove = null;
};

var drawLines = function (evt) {
	canvas.onmousemove = function (evt) {
		ctx.beginPath ();
		ctx.fillStyle = system.currentColor;
		ctx.fillRect (xCoord.innerText , yCoord.innerText, system.brushSize, system.brushSize);
	}
	
};


canvas.addEventListener('mousemove', getCoordinates);
doc.addEventListener('click', mouseActions);
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', endDraw);
