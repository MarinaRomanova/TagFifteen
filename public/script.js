let numbers = []; //array of numbers to be displayed
let emptyI, emptyJ, carre; //Indexes of the empty element [3][3]
let count = 0; //counter of moves
let tbody = document.getElementsByTagName("tbody")[0];

window.onload = function () {
    carre = document.getElementById("carre");
    startGame();
    document.getElementById("reset").onclick = function(){
        tbody.innerHTML="";
        startGame();
    } 
}

function startGame() {
    display();
    mixPieces()
}

//Below is a winning combinantion
function display() {
    for (let i = 0; i < 4; i++) {
        numbers[i] = [];
        for (let j = 0; j < 4; j++) {
            if (i + j != 6)
                numbers[i][j] = i * 4 + j + 1; // if i = 0, j=0 returns 1, if i=0, j=1 returns 2,
            /* if i =0, j= 2 returns 3, if i=0, j=3 returns 4
            if i = 1, j=0 returns 5, if i=1, j=1 returns 6, etc.
            1 - 2 - 3 - 4
            5 - 6 - 7 - 8
            9 - 10- 11 -12
            13 -14 -15- "" => the last number has index of [3][3], thus it should be empty
            to calculate use : 6 = x*1 + j*1 +k
            10 = x*2+j*1 +k , etc.*/
            else {
                numbers[i][j] = "";
            }

        }
    }
}


//function to swap two pieces
function change(num, i1, j1, i2, j2) {
    let x = num[i1][j1];
    num[i1][j1] = num[i2][j2];
    num[i2][j2] = x;
}

//To mix pieces in the start:
function mixPieces() {
    emptyI = 3;
    emptyJ = 3;
    for (let i = 0; i < 100; i++) { //number of times to mix, could be used for difficulty level
        //number between 0 and 3 corresponding to col of tab:
        switch (Math.round(Math.random() * 3)) {
            case 0:
                if (emptyJ != 0) change(numbers, emptyI, emptyJ, emptyI, --emptyJ) // move left 
                break;
            case 1:
                if (emptyI != 0) change(numbers, emptyI, emptyJ, --emptyI, emptyJ) //moveup
                break;
            case 2:
                if (emptyJ != 3) change(numbers, emptyI, emptyJ, emptyI, ++emptyJ) // move right
                break;
            case 3:
                if (emptyI != 3) change(numbers, emptyI, emptyJ, ++emptyI, emptyJ) //move down
                break;
        }
        //console.log(numbers);

    }
    
    for (let i = 0; i < 4; ++i) {
        var row = document.createElement("tr");
        for (let j = 0; j < 4; ++j) {
            let cell = document.createElement('td');
            cell.id = i + " " + j;
            cell.onclick = onClick;
            cell.innerHTML = numbers[i][j];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
        console.log(row);

    }

}

function onClick(event) {
    let cell = event.target;
    //getting position by parsing id ex. id [0 1] row 0 col 1:
    i = cell.id.charAt(0); //row of a clicked cell
    j = cell.id.charAt(2); //col of a clicked cell
    console.log(i, j);
    //Verify if there is an empty cell next to clicked cell
    //they should be in the same row or col axe and the difference of the second coordinate should be 1
    count++; //incrementing click counter
    if ((i == emptyI && Math.abs(j - emptyJ) == 1) || (j == emptyJ && Math.abs(i - emptyI) == 1)) {
        
        console.log('moveHor' + Math.abs(j - emptyJ));
        console.log('moveVert' + Math.abs(i - emptyI));
        console.log("clickedCell " + cell.id);
        console.log('empty ' + emptyI + " " + emptyJ);


        document.getElementById(emptyI + " " + emptyJ).innerHTML = cell.innerHTML; //switching innerHTML of a clicked cell and empty cell
        //passing new position to empty cell
        cell.innerHTML = '';
        emptyI = i;
        emptyJ = j;
        
        
        let victory = true;
        //checking if it is a winner combination
        //see function display() on line 16 for the logic
        for (i = 0; i < 4; ++i) {
            for (j = 0; j < 4; ++j) {
                if (i + j != 6 && document.getElementById(i + " " + j).innerHTML != i * 4 + j + 1) {
                    victory = false;
                }
            }

        }

        if (victory) alert(`You won in ${count} moves`);

    }

}