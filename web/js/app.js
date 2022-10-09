class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    get xy() {
        return [this.x, this.y]
    }
}

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d')
const middle = canvas.height / 2
const btmMid = new Point(middle, canvas.height)

function applyContext(options) {
    for (let opt of Object.keys(options)) {
        if (opt in ctx) ctx[opt]= options[opt] 
    }
}

function drawLineP(start, end, options = {}) {
    applyContext(options)
    ctx.beginPath()
    ctx.moveTo(...start.xy)
    ctx.lineTo(...end.xy)
    ctx.stroke()
}

function edgeGrid(density = 100) {
    edges = {
        top: [],
        bottom: [],
        left: [],
        right: []
    }
    arr = []
    for(let w = 0; w <= canvas.width; w += density) {
        edges.top.push(new Point(w, 0))
    }
    edges.bottom = edges.top.map(p => new Point(p.x, canvas.height))

    for(let h = 0; h <= canvas.height; h += density) {
        edges.left.push(new Point(0, h))
    }
    edges.right = edges.left.map(p => new Point(canvas.height, p.y))

    return edges
}

function drawGrid() {
    for (let i = 0; i <= 90; i+=10) {
        drawLineP(midBottomStart, new Point(i, canvas.height))
    }
}

function p(x, y) {
    return new Point(x, y)
}

function draw() {
    if (!canvas.getContext) return

    // set line stroke and line width
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    const edgePoints = edgeGrid()
    console.log({edgePoints})
    for (let [edge, points] of Object.entries(edgePoints)) {
        if (edge == 'bottom') continue
        console.log(edge)
        points.forEach(pt => {
            drawLineP(btmMid, pt)
        })
    }
}

draw();

