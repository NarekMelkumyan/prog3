class Mutant {
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
    
    move() {
        let azat = this.chooseCell(0)
        let datark = this.chooseCell(1)
        let found = random(azat.concat(datark));
        if (found) {


            let x = found[0]
            let y = found[1]

            matrix[x][y] = 4
            matrix[this.y][this.x] = 0

            this.x = x
            this.y = y
        }
    }
    eat() {
        
        let utel2 = this.chooseCell(3)
        let found = random(utel2)

        
        if (found) {
            let x = found[0]
            let y = found[1]
            matrix[y][x] = 4
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.multiply++
            this.energy++


            for (let i in mutantArr) {
             if (x == mutantArr[i].x && y == mutantArr[i].y) {
                if (this.multiply == 5) {
                    this.mul()
                    this.multiply = 0;
                }

                
            

        
    }}}}

    mul() {
        let a = this.chooseCell(0)
        let b = random(a)
        if (b) {
            let x = b[0]
            let y = b[1]
            matrix[x][y] = 4
            let gish = new Mutant(x, y)
            mutantArr.push(gish)
        }
    }
    die(){
        matrix[this.x][this.y] = 0
        for (let i in mutantArr) {
            if (this.x == mutantArr[i].x && this.y == mutantArr[i].y) {
                mutantArr.splice(i, 1)
                console.log(this.x,this.y)
            }
        }
    }
}