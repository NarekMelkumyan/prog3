class Gishatich {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.multiply = 0;
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(t) {
        this.newDirections()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == t) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        let azatTexer = this.chooseCell(0)
        let datarkTex = random(azatTexer)
        if (datarkTex) {
            let x = datarkTex[0]
            let y = datarkTex[1]
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
    }
    eat() {
        let uteluTexer = this.chooseCell(2)
        let uteluTex = random(uteluTexer)
        if (uteluTex) {
            let x = uteluTex[0]
            let y = uteluTex[1]
            matrix[y][x] = 3
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++
            this.energy++

            for (let i in eatArr) {
                if (x == eatArr[i].x && y == eatArr[i].y) {
                    eatArr.splice(i, 1)
                }
            }
            if (this.multiply == 5) {
                this.mul()
                this.multiply = 0;
            }
        }
        else
            this.move()
        this.energy--
        if (this.energy <= 0) {
            this.die()
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in gishArr) {
            if (this.x == gishArr[i].x && this.y == gishArr[i].y) {
                gishArr.splice(i, 1)
            }
        }
    }
    mul() {
        let azatTex = this.chooseCell(0)
        let kord = random(azatTex)
        if (kord) {
            let x = kord[0]
            let y = kord[1]
            matrix[y][x] = 2;
            let gishatich = new Gishatich(x, y)
            gishArr.push(gishatich)
        }
    }
}