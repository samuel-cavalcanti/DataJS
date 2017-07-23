/* Código  feito por Dorgival
	editado por Samuel
*/


//var x1 = document.getElementById("01");


var csvFile;
var teste = [];
var table = [];
var tables = [];
var initialXNode;
var initialYNode;
var nodeSpacing;
var nodeSize;
var countFrame;
var CsvName;

var ready = { // i'm Ready, Promotion...
  status: false,
  toPrint: false,
  countFrame:0,
  setup: function() {
    if (ready.status && !ready.toPrint) {

      // calculando o tamanho do nodo em relação ao tamanho do canvas
      dataSource.snapshotNumber =  tables.length;
      dataSource.sizeSOM = Math.sqrt(tables[0].length -2);

    //  console.log(tables.length);

      nodeDrawSize = (width / dataSource.sizeSOM);
      nodeSpacing = (nodeDrawSize * 20) / 100;
      nodeSize = nodeDrawSize - nodeSpacing;

      initialXNode = nodeDrawSize / 2;
      initialYNode = nodeDrawSize / 2;

      //count the columns
      //  print(table.getRowCount() + " total rows in table");
      //    print(table.getColumnCount() + " total columns in table");
      ready.toPrint = true;
    }
  },

  andPrinting: function() {


    if (ready.status && ready.toPrint) {
      //console.log(ready.countFrame);
      frameRate(20);


      if (ready.countFrame >= dataSource.snapshotNumber){
        done = " Visualization is over"
        textSize(32);
        fill(0, 102, 153);
        text(done,50,530);

        return;

      }


      for (row = 1; row <= tables[ready.countFrame].length - 2; row++) {
      //  console.log(ready.countFrame);
        /////////////////////////////
        // Draw a weights of node

        dataSource.drawWeightsNode(row, tables[ready.countFrame]);
        /////////////////////////////

      }
      ready.countFrame += 1;


    }

  }

};


const selectionData = 1;

//Apenas adapta os valores das tabelas ao tamanho das c�lulas de visualiza��o no browser.
function conversor(x) {
  return x *= 5;
}

// Objeto para guardar configura��es sobre base de dados do bra�o
// dados usados beta e gamma



//  create the button
var file = document.createElement("INPUT");
file.setAttribute("type", "file");
file.setAttribute("multiple", "");
file.setAttribute("onchange", "handleFiles(this.files)");
file.setAttribute("accept", ".csv");
document.body.appendChild(file);



//copy; Mounir Messelmeni 2012 https://github.com/MounirMesselmeni/html-fileapi.git

function handleFiles(files) {
  // Check for the various File API support.

  if (window.FileReader) {
    csvFile = files;
    //CsvName = files.split('0', 1);
    // FileReader are supported.
    for (i = 0; i < files.length; i++)
      getAsText(files[i]);
  } else {
    alert('FileReader are not supported in this browser.');
  }
}

function getAsText(fileToRead) {
  var reader = new FileReader();
  // Handle errors load
  reader.onload = loadHandler;
  reader.onerror = errorHandler;
  // Read file into memory as UTF-8
  reader.readAsText(fileToRead);
}

function loadHandler(event) {
  var csv = event.target.result;
  //teste = event;
  processData(csv);
}

function processData(csv) {
  var allTextLines = csv.split(/\r\n|\n/);
  //  testee = csv;
  var lines = [];
  while (allTextLines.length) {
    lines.push(allTextLines.shift().split(','));
  }

  tables.push(lines);

  if(tables[csvFile.length -1])
    ready.status =true;


}

function errorHandler(evt) {
  if (evt.target.error.name == "NotReadableError") {
    alert("Canno't read file !");
  }
}




var dataSource = {
  sizeSOM:-1,
  snapshotNumber: -1,
  dataName: -1,
  drawWeightsNode: function(r, table) {
  //  console.log("teste");
    x = table[r][0];
    //O valor real de x, sem convers�o, � usado para montar as posi��es de cada c�lula.
    y = table[r][1];
    //O valor real de y, sem convers�o, � usado para montar as posi��es de cada c�lula.
    beta = table[r][2];
    gamma = table[r][3];
    rx = table[r][4];
    ry = table[r][5];
    beta = conversor(beta);
    gamma = conversor(gamma);
    rx = conversor(rx);
    ry = conversor(ry);
    xNode = nodeSpacing / 2 + x * (nodeSize + nodeSpacing);
    yNode = nodeSpacing / 2 + y * (nodeSize + nodeSpacing);

    rect(xNode, yNode, nodeSize, nodeSize);

    fill(0, 0, 0);
    ellipse(xNode + 5, yNode + 32 - beta, 3, 3); //beta
    ellipse(xNode + 13, yNode + 32 - gamma, 3, 3); //gama
    ellipse(xNode + 21, yNode + 32 - rx, 3, 3); // rx
    ellipse(xNode + 29, yNode + 32 - ry, 3, 3); //ry
    fill(255, 255, 255);
  }
};







function setup() {
  createCanvas(500, 550);
  background(240);
  countFrame = 0;





}

function draw() {

  ready.setup();

  ready.andPrinting();



}
