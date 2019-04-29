//խոտի կլասը
class Grass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // this.energy = 5;
        this.multiply = 0; //բազմացման գործակից
        this.directions = [];

    }
    //շրջապատի հետազոտության մատրիցը
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

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
        this.newDirections();
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

    //mul() Բազմացում
    mul() {
        this.multiply++;
        if (this.multiply == 8) {
            //Հետազոտում է շրջապատը, որոնում դատարկ տարածքներ
            var fundCords = this.getDirections(0);
            var cord = random(fundCords);
            if (cord) {
                var x = cord[0];
                var y = cord[1];

                //Ավելացնում է նոր խոտ խոտերի զանգվածում
                var norXot = new Grass(x, y);
                xotArr.push(norXot);

                //Ավելացնում է նոր խոտի մասին գրառում հիմնական matrix-ում 
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}
//խոտակերի կլասը
class Eatgrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 3;
        this.directions = [];
    }

    //շրջապատի հետազոտության մատրիցը
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

    //հետազոտում է շրջապատը, որոնում է հետաքրքրող կերպարներին
    //կերպարը որոշվում է t արգումենտով
    getDirections(t) {
        this.newDirections();
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



    //move() շարժվել
    move() {
        //որոնում է դատարկ տարածքներ
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //կատարում է տեղափոխություն հիմնական matrix-ում 
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //թարմացնում է սեփական կորդինատները
            this.x = x;
            this.y = y;
        }
    }


    //eat()-ուտել
    eat() {
        //հետազոտում է շրջակայքը, որոնում է սնունդ
        var fundCords = this.getDirections(1);
        var cord = random(fundCords);

        //եթե կա հարմար սնունդ
        if (cord) {
            var x = cord[0];
            var y = cord[1];

            //հիմնական մատրիցայում տեղափոխվում է կերած սննդի տեղը
            //իր հին տեղը դնում է դատարկ վանդակ
            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            //փոխում է սեփական կորդինատները օբյեկտի մեջ
            this.x = x;
            this.y = y;

            //բազմացման գործակիցը մեծացնում է
            this.multiply++;

            //մեծացնում է էներգիան
            this.energy++;

            //!!! ԿԱՐԵՎՈՐ !!! սննդի զանգվածից ջնջում է կերված սնունդը
            //խոտակերի համար դա խոտն է, խոտերի զանգվածի մեջ xotArr
            for (var i in xotArr) {
                if (x == xotArr[i].x && y == xotArr[i].y) {
                    xotArr.splice(i, 1);
                }
            }

            //եթե պատրաստ է բազմացմանը, բազմանում է 
            if (this.multiply == 10) {
                this.mul()
                this.multiply = 0;
            }


        } else {
            //եթե չկա հարմար սնունդ 
            this.move();
            this.energy--;
            if (this.energy <= 0) { //մահանում է, եթե էներգիան 3֊ից ցածր է
                this.die();
            }
        }
    }

    //mul() բազմանալ
    mul() {
        //փնտրում է դատարկ տարածք
        var fundCords = this.getDirections(0);
        var cord = random(fundCords);

        //եթե կա բազմանում է
        if (cord) {
            var x = cord[0];
            var y = cord[1];
            // this.multiply++;
            //ստեղծում է նոր օբյեկտ (այստեղ խոտակեր) 
            //և տեղադրում է այն խոտակերների զանգվածի մեջ
            var norXotaker = new Eatgrass(x, y);
            eatArr.push(norXotaker);

            //հիմնական matrix-ում կատարում է գրառում նոր խոտի մասին
            matrix[y][x] = 2;
            // this.multiply = 0; //????????
        }
    }

    //die() մահանալ
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in eatArr) {
            if (this.x == eatArr[i].x && this.y == eatArr[i].y) {
                eatArr.splice(i, 1);
            }
        }
    }

}

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
        let datark = random(azat)
        
        if (datark) {


            let x = datark[0]
            let y = datark[1]

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


            for (let i in gishArr) {
             if (x == gishArr[i].x && y == gishArr[i].y) {
                if (this.multiply == 5) {
                    this.mul()
                    this.multiply = 0;
    }}}}}

    mul() {
        let a = this.chooseCell(0)
        let b = random(a)
        if (b) {
            let x = b[0]
            let y = b[1]
            matrix[x][y] = 4
            let Mutant = new Mutant(x, y)
            mutantArr.push(Mutant)
        }
    }
    die() {
        matrix[this.y][this.x] = 0
        for (let i in mutantArr) {
            if (this.x == mutantArr[i].x && this.y == mutantArr[i].y) {
                mutantArr.splice(i, 1)
            }
        }
    }
}



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

