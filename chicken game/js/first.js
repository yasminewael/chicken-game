let rocket = { left: 600, top: 550 }
let missiles = [];

let enemies = [
    { top: 100, left: 100 },
    { top: 100, left: 300 },
    { top: 100, left: 500 },
    { top: 100, left: 700 },
    { top: 100, left: 900 },
    { top: 100, left: 1100 },
    { top: 200, left: 100 },
    { top: 200, left: 300 },
    { top: 200, left: 500 },
    { top: 200, left: 700 },
    { top: 200, left: 900 },
    { top: 200, left: 1100 }
]
let stop;
let counter = 0;

function drawEnemies() {
    document.getElementById("enemies").innerHTML = "";
    for (var i = 0; i < enemies.length; i++) {
        document.getElementById("enemies").innerHTML +=
            `<img class="chickens" src="images/BigChicken.png" style="top:${enemies[i].top}px ; left: ${enemies[i].left}px">`
    }
}

drawEnemies();

function moveEnemies() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].top = enemies[i].top + 1;
        enemies[i].top == rocket.top -80 &&
        (clearTimeout(stop),
        document.getElementById("lost").classList.remove("d-none"))
    }
    win()
}

function win(){
    if(counter == 12){
        document.getElementById("win").classList.remove("d-none")

    }
}

function moveMissiles() {
    for (let i = 0; i < missiles.length; i++) {
        missiles[i].top = missiles[i].top - 20;
    }
} 

document.addEventListener("keydown", function (e) {
    console.log(e.keyCode)
    //moveleft
    if (e.keyCode == 39) {
        rocket.left = rocket.left + 50;
        moveRocket()
    }

    //moveright
    if (e.keyCode == 37) {
        rocket.left = rocket.left - 50;
        moveRocket()
    }
    //fire
    if (e.keyCode == 32) {
        missiles.push(
            {
                left: rocket.left,
                top: rocket.top
            })
        drawMissiles()
        audio()
    }
})

function drawMissiles() {
    document.getElementById("missiles").innerHTML = "";
    for (let i = 0; i < missiles.length; i++) {
        document.getElementById("missiles").innerHTML +=
            `<div class="missile" style="left:${missiles[i].left}px ; top:${missiles[i].top}px"></div>`
    }
}

function missileHint(){
    for (let e = 0 ; e < enemies.length ; e++){
        for (let m = 0 ; m < missiles.length ; m++){
            if (
                (missiles[m].top >= enemies[e].top) &&
                (missiles[m].top <= enemies[e].top +50) &&
                (missiles[m].left >= enemies[e].left) &&
                (missiles[m].left <= enemies[e].left +50)
            )
            (missiles.splice(m, 1),
            enemies.splice(e, 1),
            counter ++,
            document.getElementById("score").innerHTML = "score:" + counter    
            
            )
        }
    }
}


function audio(){
let audio = new Audio('one.wav');
audio.play();
}


function moveRocket() {
    document.getElementById("rocket").style.left = rocket.left + "px";
}

function gameLoop() {
    stop = setTimeout(gameLoop, 90);
    moveEnemies();
    drawEnemies()
    drawMissiles();
    moveMissiles();
    missileHint()
}

gameLoop();