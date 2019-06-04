let objects = [];
let G = 6.67e-11;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    massSlider = createSlider(0, 100, 20);
    massSlider.position(20, 20);
}

function draw() {
    for (i = 0; i < objects.length; i++) {
        draw(objects[i].obj);
    }
    background(0);
}

function mouseClicked() {
    const mass = massSlider.value();
    object = { obj: ellipse(mouseX, mouseY, mass, mass), mass: mass }
    objects.push(object);
    return false;
}