/* Código feito por Samuel e Dorgival */

var csvFile;
var teste = [];
var table = [];
var tables = [];
var countFrame;
var CsvName;

var ready = {// i'm Ready, Promotion...
    status: false,
    toPrint: false,
    countFrame: 0,
    setup: function () {


        // calculando o tamanho do nodo em relação ao tamanho do canvas
        dataSource.snapshotNumber = tables.length;
        dataSource.sizeSOM = Math.sqrt(tables[0].length - 2);
        dataSource.limitXposition = 5 + ((tables[0][0].length - 3) * 8);
        //  console.log(tables.length); 




        ready.toPrint = true;

    },

    andPrinting: function () {
        //  print(ready.countFrame);
        //console.log(ready.countFrame);
        frameRate(20);
        for (row = 1; row <= tables[ready.countFrame].length - 2; row++) {
            //  console.log(ready.countFrame);
            /////////////////////////////
            // Draw a weights of node

            //  console.log(table.length);
            dataSource.pullWeightsNode(row, tables[ready.countFrame]);
            /////////////////////////////

        }
        ready.countFrame += 1;

    },
    andEnded: function () {
        ready.countFrame = 0;
        status = false;
        toPrint = false;
        countFrame = 0;
        done = " Visualization is over";
        textSize(32);
        fill(0, 102, 153);
        text(done, 50, 530);
        tables = [];
        dataSource.snapshotNumber = -1;
        dataSource.sizeSOM = -1;
    }

};


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

    if (tables[csvFile.length - 1])
        ready.status = true;


}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}


const selectionData = 1;

//Apenas adapta os valores das tabelas ao tamanho das c�lulas de visualiza��o no browser.
function conversor(x) {
    return x *= 5;
}

// Objeto para guardar configura��es sobre base de dados do bra�o
// dados usados beta e gamma


var dataSource = {
    sizeSOM: -1,
    snapshotNumber: 1,
    dataName: -1,
    postionXWeight: 5,
    postionYWeight: 32,
    limitXposition: -1,
    xNode: 4,
    yNode: 4,
    countNodeX: 0,
    countNodeY: 0,

    pullWeightsNode: function (r, table) {
        //  console.log(table[0].length);
        for (c = 2; c < table[0].length; c++) {
            //   console.log(c);
            weight = table[r][c];
            x = table[r][0]; //O valor real de x, é usado para montar as posiõees de cada célula.
            y = table[r][1]; //O valor real de y, é usado para montar as posições de cada célula.

            dataSource.drawWeightsNode(weight, c);
        }
        dataSource.countNodeX++;
        dataSource.xNode += 44;
        if (dataSource.countNodeX >= dataSource.sizeSOM) {
            dataSource.xNode = 4;
            dataSource.yNode += 44;
            dataSource.countNodeX = 0;
            dataSource.countNodeY++;
            if (dataSource.countNodeY >= dataSource.sizeSOM) {
                dataSource.countNodeY = 0;
                dataSource.yNode = 4;

            }

        }


    },

    drawWeightsNode: function (weight, count2Rect) {
        //  console.log("teste");

        weight = conversor(weight);

        // xNode = nodeSpacing / 2 + x * (nodeSize + nodeSpacing);
        //  yNode = nodeSpacing / 2 + y * (nodeSize + nodeSpacing);

        if (count2Rect == 2)
            rect(dataSource.xNode, dataSource.yNode, 35, 35);



        x = dataSource.xNode + dataSource.postionXWeight;
        y = dataSource.yNode + dataSource.postionYWeight - weight;

       // console.log("posWeightX: " + x + " posWeightY: " + y);

        fill(0, 0, 0);
        ellipse(dataSource.xNode + dataSource.postionXWeight, dataSource.yNode + dataSource.postionYWeight - weight, 3, 3);
        fill(255, 255, 255);



        if (dataSource.postionXWeight < dataSource.limitXposition)
            dataSource.postionXWeight += 8;
        else
            dataSource.postionXWeight = 5;

    }
};
a = 525;
const Size = a;
function setup() {
    createCanvas(Size, Size);
    background(240);



}
function createEllipse(rx, ry, tam, tam) {

}

function draw() {

    frameRate(30);

    if (ready.status && !ready.toPrint)
        ready.setup();

    else if (ready.countFrame >= dataSource.snapshotNumber) {
        //ready.andEnded();
    }
//    


    else if (ready.status && ready.toPrint)
        ready.andPrinting();




}
