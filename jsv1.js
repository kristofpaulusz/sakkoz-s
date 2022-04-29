window.addEventListener("load", init);

class Babuk {
  constructor(position, color, img, isAlive) {
  this.position = position;
  this.color = color;
  this.img = img;
  this.isAlive = isAlive;
  }
  getPosition() {
    return this.position[0]+this.position[1]
  }
}
class Gyalog extends Babuk {
  constructor(position, color, img, isAlive, has_moved) {
      super(position, color, img, isAlive);
      this.has_moved = has_moved;
  }
}
class Kiraly extends Babuk {
  constructor(position, color, img, isAlive) {
      super(position, color, img, isAlive);
  }
}
class Kiralyno extends Babuk {
  constructor(position, color, img, isAlive) {
      super(position, color, img, isAlive);
  }
}
class Bastya extends Babuk {
  constructor(position, color, img, isAlive) {
      super(position, color, img, isAlive);
  }
}
class Lo extends Babuk {
  constructor(position, color, img, isAlive) {
      super(position, color, img, isAlive);
  }
}
class Futo extends Babuk {
  constructor(position, color, img, isAlive) {
      super(position, color, img, isAlive);
  }
}
// let placeholder = '<img src="picks/wPawn.png" alt="">';
const xAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
const yAxis = ["8", "7", "6", "5", "4", "3", "2", "1"];

function tile(elem) {
  return elem.srcElement.parentElement.id;
}
function eleresi(src) {
  return '<img src="'+src+'" alt="">'
}
function ID(elem) {
  return document.getElementById(elem);
}
function TAG(elem) {
  document.getElementsByTagName(elem);
}
function $(elem) {
  return document.querySelectorAll(elem)
}
function board(base) {
  var verA =
    '"width: 50px; height: 50px; background: white; border: 1px solid black; padding: 10px;"';
  var verB =
    '"width: 50px; height: 50px; background: black; border: 1px solid black; padding: 10px;"';
  var txt = "";
  var valtas = false;
  for (let index = 0; index < base * base; index++) {
    if (!valtas) {
      if (index % 2 == 0) {
        txt = txt + '<div style=' + verA + "></div>";
      } else {
        txt = txt + '<div style=' + verB + "></div>";
      }
      if ((index + 1) % base == 0 && index != 0) {
        valtas = true;
      }
    } else {
      if (index % 2 == 0) {
        txt = txt + '<div style=' + verB + "></div>";
      } else {
        txt = txt + '<div style=' + verA + "></div>";
      }
      if ((index + 1) % base == 0 && index != 0) {
        valtas = false;
      }
    }
    ID("chessboard").innerHTML = txt;
  }
}
function generate() {
  feher = [];
  fekete = [];
  // // Gyalog
  for (let i = 0; i < 8; i++) {
    feher.push(new Gyalog([xAxis[i],"2"],"fehér", eleresi("picks/wPawn.png"), true, false));
    fekete.push(new Gyalog([xAxis[i],"7"],"fekete", eleresi("picks/bPawnB.png"), true, false));
  }
  // // Bástya, Ló, Futó
  let osztalyok = [Bastya, Lo, Futo];
  let feherUtak = ["picks/wRook.png", "picks/wKnight.png", "picks/wBishop.png"]
  let feketeUtak = ["picks/bRookB.png", "picks/bKnightB.png", "picks/bBishopB.png"]
  f = 7;
  for (let i = 0; i < 3; i++) {
    feher.push(new osztalyok[i]([xAxis[i],"1"],"fehér",eleresi(feherUtak[i]),true))
    feher.push(new osztalyok[i]([xAxis[f],"1"],"fehér",eleresi(feherUtak[i]),true))
    fekete.push(new osztalyok[i]([xAxis[i],"8"],"fekete",eleresi(feketeUtak[i]),true))
    fekete.push(new osztalyok[i]([xAxis[f],"8"],"fekete",eleresi(feketeUtak[i]),true))
    f -= 1;
  }
  // // Király, Királynő
    osztalyok = [Kiralyno, Kiraly]
    let DE = ["D", "E"]
    feherUtak = ["picks/wQueen.png", "picks/wKing.png"]
    feketeUtak = ["picks/bQueenB.png", "picks/bKingB.png"]
    for (let i = 0; i < 2; i++) {
      feher.push(new osztalyok[i]([DE[i],"1"],"fehér",eleresi(feherUtak[i]),true))
      fekete.push(new osztalyok[i]([DE[i],"8"],"fekete",eleresi(feketeUtak[i]),true))
    }
  
  return [feher, fekete];
}
function draw(csapatok) {
  for (let f = 0; f < csapatok.length; f++) {
   for (let i = 0; i < csapatok[f].length; i++) {
     ID(csapatok[f][i].getPosition()).innerHTML = csapatok[f][i].img;
   } 
  }
}
function init() {
  var my_board = 8;
  board(my_board);

  let tiles = ID("chessboard").getElementsByTagName("div");
  let ids = 0;
  for (let i = 0; i < yAxis.length; i++) {
    let myX = yAxis[i];
    for (let f = 0; f < xAxis.length; f++) {
      tiles[ids].setAttribute('id', xAxis[f]+myX);
      ids += 1;
    }
  }
  draw(generate());
  var figurak = $("img");
  for (let i = 0; i < figurak.length; i++) {
    figurak[i].addEventListener("click", function (event) {
        console.log(tile(event))
    
    })
    
  }
}
