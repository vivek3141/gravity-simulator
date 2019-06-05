# Gravity Simulator

Simulates the motion of particles from forces of gravity. 

### Usage

Click to add objects. The top slider changes the mass of objects, the bottom slider adjusts G, the gravitational constant.

### Made Using

* `p5js`

### How it works

Using Netwon's universal gravitational law, the force of gravity between two objects can be calculated. 

![F_g](http://latex2png.com/output//latex_fa51af542f2de64c8d0d5cb7d7d440b4.png)

Each of the vectors can be split into X and Y components and summed up.
The accelration of each particle can be calculated by F=ma.

Finally the velocity of each object can be calculated by 

![velocity](http://latex2png.com/output//latex_10ea9c31d6404130b423af68a6f2c07c.png)

Where t is the duration of one frame.

From [main.js](https://github.com/vivek3141/gravity-simulator/blob/master/main.js)

```javascript
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
```

Where `objects` is an array of objects of class `Obj` defined as follows:

```javascript
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
```
