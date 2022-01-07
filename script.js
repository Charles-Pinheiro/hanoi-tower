let container = document.getElementById("container");

let box1 = document.getElementById("box1");
let box2 = document.getElementById("box2");
let box3 = document.getElementById("box3");

let bar1 = document.getElementById("bar1");
let bar2 = document.getElementById("bar2");
let bar3 = document.getElementById("bar3");

let disk1 = document.getElementById("disk1");
let disk2 = document.getElementById("disk2");
let disk3 = document.getElementById("disk3");
let disk4 = document.getElementById("disk4");

let spanMovies = document.getElementById("movies");

let boxWin = document.createElement("div");
let restartButton = document.createElement("button");

//=========logic=========

const resetSelectedBox = () => {

    let children = document.querySelectorAll("#container > *");
    for (let i = 0; i < children.length; i++) {
        children[i].classList.remove("selectedBox");
    }
}

let lastDisk = null;

const diskValue = (disk) => {
    if(disk === disk4) {
        return 4
    }
    if(disk === disk3) {
        return 3
    }
    if(disk === disk2) {
        return 2
    }
    if(disk === disk1) {
        return 1
    }
}

let counter = 0;

const selectBox = (event) => {
    resetSelectedBox();

    let tower = event.currentTarget;
    let bar = tower.lastElementChild;
    let last = bar.lastElementChild;

    if (lastDisk !== null) {

        let diskInTower = diskValue(last);
        let selectedDisk = diskValue(lastDisk);

        if (diskInTower > selectedDisk) {
            lastDisk = null;
        } else {
            counter += 1
            spanMovies.innerHTML = `${counter}`;
            bar.appendChild(lastDisk);
            lastDisk = null;
        }
    } else {
        lastDisk = last;
    }

    if (lastDisk !== null) {
        tower.classList.add("selectedBox");
    }
}

const winner = () => {

    let children3 = bar3.children.length;

    if (children3 === 4) {
        boxWin.id = "win";
        container.appendChild(boxWin);

        let message = document.createElement("p");
        message.id = "winMessage";
        message.innerHTML = "Você Venceu!"


        restartButton.id = "winButton";
        restartButton.innerHTML = "Recomeçar"

        boxWin.appendChild(message);
        boxWin.appendChild(restartButton);
    }
}

const restart = () => {

    container.removeChild(boxWin);

    counter = 0;
    spanMovies.innerHTML = `${counter}`;

    let disks = [disk1, disk2, disk3, disk4];
    for (let i = 0; i < disks.length; i++) {
        bar1.appendChild(disks[i]);
    }
}

box1.addEventListener("click", selectBox);
box2.addEventListener("click", selectBox);
box3.addEventListener("click", selectBox);
box3.addEventListener("click", winner);
restartButton.addEventListener("click", restart);