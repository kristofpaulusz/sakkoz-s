window.addEventListener("load", init);

function ID(elem) {
  return document.getElementById(elem);
}
// function board() {
//     var verA = "\"width: 50px; height: 50px; background: white; border: 1px solid black; padding: 40px;\"";
//     var verB = "\"width: 50px; height: 50px; background: black; border: 1px solid black; padding: 40px;\"";
//     var txt = "";
//     var valtas = false;
//     for (let index = 0; index < 64; index++) {
//        if (!valtas) {
//            if (index%2==0) {
//                 txt = txt + "<div id=\"tile" + index + "\" style=" + verA + "></div>";
//            }
//            else {
//                 txt = txt + "<div id=\"tile" + index + "\" style=" + verB + "></div>";
//            }
//            if ((index+1)%8==0 && index!=0) {
//                valtas = true
//            }
//        }
//        else  {
//             if (index%2==0) {
//                 txt = txt + "<div id=\"tile" + index + "\" style=" + verB + "></div>";
//             }
//             else {
//                 txt = txt + "<div id=\"tile" + index + "\" style=" + verA + "></div>";
//             }
//             if ((index+1)%8==0 && index!=0) {
//                 valtas = false
//        }
//     }
//     ID("chessboard").innerHTML = txt;
// }
// }
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
        txt = txt + '<div id="tile' + index + '" style=' + verA + "></div>";
      } else {
        txt = txt + '<div id="tile' + index + '" style=' + verB + "></div>";
      }
      if ((index + 1) % base == 0 && index != 0) {
        valtas = true;
      }
    } else {
      if (index % 2 == 0) {
        txt = txt + '<div id="tile' + index + '" style=' + verB + "></div>";
      } else {
        txt = txt + '<div id="tile' + index + '" style=' + verA + "></div>";
      }
      if ((index + 1) % base == 0 && index != 0) {
        valtas = false;
      }
    }
    ID("chessboard").innerHTML = txt;
  }
}
function pawn(event) {
  console.log(event.target.id);
  ID(event.target.id).innerHTML =
    '<img src="picks/pawn_coloredB.png" alt="" style="width: 100%;">';
}

function init() {
  var my_board = 8;
  board(my_board);

  for (let index = 0; index < my_board * my_board; index++) {
    ID("tile" + String(index)).addEventListener("click", pawn);
  }
}
