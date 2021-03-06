let objects = [];
let G = 1e4;
let fr = 60;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    massSlider = createSlider(0, 100, 20);
    massSlider.position(20, 20);

    clearButton = createButton("Clear");
    clearButton.position(60, 60);
    clearButton.mouseClicked(clearObjects);

    gSlider = createSlider(1e2, 1e10, 1e4);
    gSlider.position(20, 100);

    frameRate(fr);
}

function clearObjects() {
    objects = [];
}

function draw() {
    background(0);
    G = gSlider.value();

    for (i = 0; i < objects.length; i++) {
        objects[i].display()
        const M = objects[i].mass;

        nF_x = 0;
        nF_y = 0;

        for (j = 0; j < objects.length; j++) {

            // F_g = GMm/r^2
            dx = objects[j].x - objects[i].x;
            dy = objects[j].y - objects[i].y;

            r = dx ** 2 + dy ** 2;
            if (r != 0) {
                F = G * M * objects[j].mass / r;
                theta = Math.atan(dy / dx);

                F_x = Math.abs(F * Math.cos(theta));
                F_y = Math.abs(F * Math.sin(theta));

                if (objects[j].x < objects[i].x) {
                    F_x = -F_x;
                }
                if (objects[j].y < objects[i].y) {
                    F_y = -F_y;
                }

                const k = (1 / fr) / M;
                if ((objects[j].x - (k * F_x + objects[i].x) < 0) == (dx < 0) ||
                    (objects[j].y - (k * F_y + objects[i].y) < 0) == (dy < 0)
                ) {
                    nF_x += F_x;
                    nF_y += F_y;
                }k
            }


        }

        // F = ma -> a = F/m
        // v = at -> t = size of one frame
        v_x = nF_x * (1 / fr) / M;
        v_y = nF_y * (1 / fr) / M;

        objects[i].x += v_x;
        objects[i].y += v_y;
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