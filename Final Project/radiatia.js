class Radiatia {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.energy = 8
        this.mul = 0

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
    eat() {
        let uetl = this.chooseCell(1)
        let uetl_2 = this.chooseCell(2)
        let uetl_3 = this.chooseCell(3)
        let uetl_4 = this.chooseCell(4)

        let a = uetl.concat(uetl_2)
        let b = a.concat(uetl_3)
        let c = b.concat(uetl_4)

        let found = random(c)
        if (found) {
            let x = found[0]
            let y = found[1]
            matrix[y][x] = 5
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++
            this.energy++

            for (let i in eatArr) {
            if (x == eatArr[i].x && y == eatArr[i].y) {

                if (this.multiply == 5) {
                    this.mul()
                    this.multiply = 0;
                }

                else
                    this.move()
                this.energy--
                if (this.energy <= 0) {
                    this.die()
                }
                eatArr.splice(i, 1)
            }
            else if (x == xotArr[i].x && y == xotArr[i].y) {
                if (this.multiply == 5) {
                    this.mul()
                    this.multiply = 0;
                }

                else
                    this.move()
                this.energy--
                if (this.energy <= 0) {
                    this.die()
                }
                xotArr.splice(i, 1)
            }

            else if (x = gishArr[i].x && y == gishArr[i].y) {
                if (this.multiply == 5) {
                    this.mul()
                    this.multiply = 0;
                }

                else
                    this.move()
                this.energy--
                if (this.energy <= 0) {
                    this.die()
                }
            }
        
        else if (x = mutantArr[i].x && y == mutantArr[i].y) {
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
        
    }}}

    mul() {
        let a = this.chooseCell(0)
        let b = random(a)
        if (b) {
            let x = b[0]
            let y = b[1]
            matrix[x][y] = 5
            let mutatia = new Radiatia(x, y)
            mutatiaArr.push(mutatia)
        }
    }
    move() {

        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];


            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in radiatiaArr) {
            if (this.x == radiatiaArr[i].x && this.y == radiatiaArr[i].y) {
                radiatiaArr.splice(i, 1)
            }
        }
    }
}