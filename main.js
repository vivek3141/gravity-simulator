let objects = [];
let G = 6.67e-11;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    massSlider = createSlider(0, 255, 100);
    massSlider.position(20, 20);
}

function draw() {
    for (i = 0; i < objects.length; i++) {
        draw(objects[i].obj);
    }
    background(0);
}

function mouseClicked() {
    object = { obj: ellipse(mouseX, mouseY, 20, 20), mass: 10 }
    objects.push(object);
    return false;
}