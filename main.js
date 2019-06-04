let objects = [];
//let G = 6.67e-11;


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
    for (i = 0; i < objects.length; i++) {
        objects[i].display()
    }
    background(0);
    //console.log(mouseX, mouseY);
}

function mouseClicked() {
    const mass = massSlider.value();
    if (mouseX > 150 && mouseY > 40) {
        console.log("Ehl");
        objects.push(new Obj(mass, mouseX, mouseY));
    }
    return false;
}


class Obj{
    constructor(mass, x, y){
        this.mass = mass;
        this.x = x;
        this.y = y;
    }
    display(){
        ellipse(this.x, this.y, this.mass, this.mass);
    }
}