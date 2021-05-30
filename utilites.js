//Tri Le
function $selector(s) {
    return document.querySelector(s);
} 

function $id(i) {
    return document.getElementById(i);
}

function $name(n) {
    return document.getElementsByName(n);
}

function getRandomInt(max) {
	return 1 + Math.floor(Math.random() * max);
}


function sleep(ms) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < ms);
  }