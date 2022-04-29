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
  greet() {
    return "I am "+this.color+" and I am standing on "+this.getPosition();
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
// function TAG(elem) {
//   document.getElementsByTagName(elem);
// }
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
  pieces = [];
  // // Gyalog
  for (let i = 0; i < 8; i++) {
    pieces.push(new Gyalog([xAxis[i],"2"],"fehér", eleresi("picks/wPawn.png"), true, false));
    pieces.push(new Gyalog([xAxis[i],"7"],"fekete", eleresi("picks/bPawnB.png"), true, false));
  }
  // // Bástya, Ló, Futó
  let osztalyok = [Bastya, Lo, Futo];
  let feherUtak = ["picks/wRook.png", "picks/wKnight.png", "picks/wBishop.png"]
  let feketeUtak = ["picks/bRookB.png", "picks/bKnightB.png", "picks/bBishopB.png"]
  f = 7;
  for (let i = 0; i < 3; i++) {
    pieces.push(new osztalyok[i]([xAxis[i],"1"],"fehér",eleresi(feherUtak[i]),true))
    pieces.push(new osztalyok[i]([xAxis[f],"1"],"fehér",eleresi(feherUtak[i]),true))
    pieces.push(new osztalyok[i]([xAxis[i],"8"],"fekete",eleresi(feketeUtak[i]),true))
    pieces.push(new osztalyok[i]([xAxis[f],"8"],"fekete",eleresi(feketeUtak[i]),true))
    f -= 1;
  }
  // // Király, Királynő
    osztalyok = [Kiralyno, Kiraly]
    let DE = ["D", "E"]
    feherUtak = ["picks/wQueen.png", "picks/wKing.png"]
    feketeUtak = ["picks/bQueenB.png", "picks/bKingB.png"]
    for (let i = 0; i < 2; i++) {
      pieces.push(new osztalyok[i]([DE[i],"1"],"fehér",eleresi(feherUtak[i]),true))
      pieces.push(new osztalyok[i]([DE[i],"8"],"fekete",eleresi(feketeUtak[i]),true))
    }
  
  return pieces;
}
function draw(csapatok) {
  
   for (let i = 0; i < csapatok.length; i++) {
     ID(csapatok[i].getPosition()).innerHTML = csapatok[i].img;
   } 
  
}
function setIds() {
  let tiles = ID("chessboard").getElementsByTagName("div");
  let ids = 0;
  for (let i = 0; i < yAxis.length; i++) {
    let myX = yAxis[i];
    for (let f = 0; f < xAxis.length; f++) {
      tiles[ids].setAttribute('id', xAxis[f]+myX);
      ids += 1;
    }
  }
}
function lepes(movingPiece) {
  this.innerHTML = movingPiece.img;
  ID(movingPiece.getPosition()).innerHTML = "";
  
}
// function highlightValid(mypiece) {
//   let myArray = ID("chessboard").getElementsByTagName("div");
//   myArray.forEach(function (hm) {
//     console.log(hm);
//   });
//   // myArray.forEach(element => {
//   //   console.log(element);
//   // });
//   // ID("chessboard").getElementsByTagName("div").forEach(validDiv => {
//   //   console.log(validDiv)
//     // validDiv.addEventListener("click", lepes(mypiece))
//   // })
// }
function kattintas() {
 // console.log(this.parentElement.id)
  pieces.forEach(piece => {
    if (piece.getPosition()==this.parentElement.id) {
      let selectedPiece = piece;
      // highlightValid(selectedPiece);
      let validDivs = ID("chessboard").getElementsByTagName("div");
      for (let i = 0; i < validDivs.length; i++) {
        validDivs[i].addEventListener("click", function (event) {
          ID(selectedPiece.getPosition()).innerHTML = "";
          this.innerHTML = selectedPiece.img;
        })
        
      }
    }
  })
}

function init() {
  var my_board = 8;
  board(my_board);
  setIds();
  let pieces = generate();
  draw(pieces);
  // console.log($("img")[0].parentElement);
  $("img").forEach(element => {
    element.addEventListener("mouseover", function () {
      element.setAttribute('class', "selected")
    })
    element.addEventListener("mouseout", function () {
      element.setAttribute('class', "")
    })
    element.addEventListener("click", kattintas)
    
  })
}
