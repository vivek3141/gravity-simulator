let objects = [];
let G = 6.67e-11;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    massSlider = createSlider(0, 100, 20);
    massSlider.position(20, 20);

    clearButton = createButton("Clear");
    clearButton.position(60, 60);
    clearButton.mouseClicked(clearObjects);
}

function clearObjects() {
    objects = [];
    //console.log("HELLpooo");
    //    background(0);
    //    setup();
}

function draw() {
    background(0);
    for (i = 0; i < objects.length; i++) {
        objects[i].display()
        const M = objects[i].mass;

        net_force = [0, 0];
        for (j = 0; j < objects.length; j++) {
            if (j == i) {
                continue;
            }
            else {
                // F_g = GMm/r^2
                dx = objects[j].x - objects[i].x
                dy = objects[j].y - objects[i].y
                r = dx ** 2 + dy ** 2;
                F = G * M * objects[j].mass / r

            }
        }
    }

    //console.log(mouseX, mouseY);
}

function mouseClicked() {
    const mass = massSlider.value();
    if (mouseX > 150 && mouseY > 40) {
        objects.push(new Obj(mass, mouseX, mouseY));
    }
    return false;
}


class Obj {
    constructor(mass, x, y) {
        this.mass = mass;
        this.x = x;
        this.y = y;
    }
    display() {
        ellipse(this.x, this.y, this.mass, this.mass);
    }
}