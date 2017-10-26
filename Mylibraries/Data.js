/* Código feito por Samuel e Dorgival */


//  create the button
var file = document.createElement("INPUT");
file.setAttribute("type", "file");
file.setAttribute("multiple", "");
file.setAttribute("onchange", "handleFiles(this.files)");
file.setAttribute("accept", ".csv");
document.body.appendChild(file);


function showFindBest() {
  var findBestButton = document.createElement("INPUT");
  findBestButton.setAttribute("type", "submit");
  findBestButton.setAttribute("value", "findBest");
  document.body.appendChild(findBestButton);

  var testSample = document.createElement("INPUT");
  testSample.setAttribute("type", "text");
  testSample.setAttribute("value", "0.5,0.5,0.5,0,3");
  testSample.setAttribute("min", "100");
  testSample.setAttribute("max", "300");
  document.body.appendChild(testSample);

  findBestButton.onclick = function() {
    sample = [];
    posSample = [];
    texto = testSample.value;
    texto = texto.split(",");

    for (value = 0; value < texto.length; value++) {
      if (value < texto.length - 2)
        sample.push(parseFloat(texto[value]));
      else
        posSample.push(parseFloat(texto[value]));

    }


    Som.findBest(sample, posSample[0], posSample[1]);

    //console.log(Som.findBest(sample,posSample[0],posSample[1]));
  }
}



const selectionData = 1;

//Apenas adapta os valores das tabelas ao tamanho das células de visualização no browser.
function conversor(x) {
  return x *= 10;
}

// Objeto para guardar configuraçoes sobre base de dados do braço
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
  sizeNode: 35,


  pullWeightsNode: function(r, table) {
    //  console.log(table[0].length);
    for (c = 2; c < table[0].length; c++) {
      //   console.log(c);
      weight = table[r][c];
      x = table[r][0]; //O valor real de x, é usado para montar as posiõees de cada célula.
      y = table[r][1]; //O valor real de y, é usado para montar as posições de cada célula.

      dataSource.drawWeightsNode(weight, c);
    }
    dataSource.countNodeX++;
    dataSource.xNode += 4 + dataSource.sizeNode;
    if (dataSource.countNodeX >= dataSource.sizeSOM) {
      dataSource.xNode = 4;
      dataSource.yNode += 4 + dataSource.sizeNode;
      dataSource.countNodeX = 0;
      dataSource.countNodeY++;
      if (dataSource.countNodeY >= dataSource.sizeSOM) {
        dataSource.countNodeY = 0;
        dataSource.yNode = 4;

      }

    }


  },

  drawWeightsNode: function(weight, count2Rect) {
    //  console.log("teste");

    weight = conversor(weight);

    // xNode = nodeSpacing / 2 + x * (nodeSize + nodeSpacing);
    //  yNode = nodeSpacing / 2 + y * (nodeSize + nodeSpacing);

    if (count2Rect == 2)
      rect(dataSource.xNode, dataSource.yNode, dataSource.sizeNode, dataSource.sizeNode);



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

  },


shuffle : function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
};
