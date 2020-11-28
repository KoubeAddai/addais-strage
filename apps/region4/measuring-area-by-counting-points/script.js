"use strict";
console.log("JS ready.");

/*▼変数
/*Dom*/
const blackPen = document.getElementById("blackPen");
const whitePen = document.getElementById("whitePen");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
/*アクション回数*/
let countBlack = 0;
let countWhite = 0;

/*▼関数*/
/*乱整数を返す*/
function random (start, end) {
  /*startもendも含む*/
  return Math.floor( Math.random () * end ) + start;
}
/*角度をラジアンに変換する*/
function degToRad (degree) {
  return degree * Math.PI / 180;
}
/*Canvasに図形を描画する*/
function draw () {
  ctx.beginPath();
  ctx.arc(
    /*X座標*/
    random(0, 200),
    /*Y座標*/
    random(0, 200),
    /*半径*/
    random(10, 50),
    /*開始角*/
    degToRad(0),
    /*終了角*/
    degToRad(360),
    /*半時計周り？*/
    true
  );
  ctx.fillStyle = this.color;
  ctx.fill();
  /*ボタン回数を数えて表示*/
  switch (this.color) {
    case "black":
      countBlack++;
      setTableData ("blackTd", countBlack);
      break;
    case "white":
      countWhite++;
      setTableData ("whiteTd", countWhite);
      break;
  }
  /*面積計算・表示関数の呼び出し*/
  setTableData("areaTd", calcArea());
}
/*Canvasの黒点を数えて個数を返す*/
function calcArea () {
  let countArea = 0;
  /*（4色 * 200px * 200px）個の要素からR成分だけの配列を生成*/
  let redComs = ctx.getImageData(0,0,200,200).data.filter(function(e,n){
    /*0を含む4の倍数番目の値のみ取り出す*/
    return n % 4 === 0;
  });
  console.log(redComs);
  /*配列からR成分が0である要素を探して個数を返す*/
  for ( let i=0; i<redComs.length; i++ ) if (redComs[i]===0) countArea++;
  console.log(countArea);
  return countArea;
}
/*特定のIDを持つHTML要素に数字を挿入する*/
function setTableData (tdId, num) {
  document.getElementById(tdId).textContent = "" + num;
}

/*▼初期化処理*/
ctx.fillStyle = "rgb(255, 255,255)";
ctx.fillRect(0, 0, 200, 200);

/*▼イベントリスナー*/
blackPen.addEventListener("click", {
  color: "black",
  handleEvent: draw
});
whitePen.addEventListener("click", {
  color: "white",
  handleEvent: draw
});
