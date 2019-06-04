let objects = [];
let G = 1e5;
let fr = 24;


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    massSlider = createSlider(0, 100, 20);
    massSlider.position(20, 20);

    clearButton = createButton("Clear");
    clearButton.position(60, 60);
    clearButton.mouseClicked(clearObjects);

    frameRate(fr);
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

        nF_x = 0;
        nF_y = 0;

        for (j = 0; j < objects.length; j++) {
            if (j == i) {
                continue;
            }
            else {
                // F_g = GMm/r^2
                dx = objects[j].x - objects[i].x;
                dy = objects[j].y - objects[i].y;

                r = dx ** 2 + dy ** 2;
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

                nF_x += F_x;
                nF_y += F_y;

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