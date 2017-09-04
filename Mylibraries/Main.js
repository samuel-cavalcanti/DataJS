var tables = [];

function draw() {

  frameRate(30);

  if (ready.status && !ready.toPrint)
    ready.setup();

  else if (ready.countFrame >= dataSource.snapshotNumber) {
    Network.start();
    ready.andEnded();
  } else if (ready.status && ready.toPrint)
    ready.andPrinting();
  else if (!ready.status && !ready.tables && !ready.toPrint) {


  }




}



var Network = {
  node: [],


  start: function() {
    rowsOfTable = 1; // 1 linha é o header do csv
    for (i = 0; i < dataSource.sizeSOM; i++) {
      Network.node[i] = [];

      for (j = 0; j < dataSource.sizeSOM; j++) {
        Network.node[i][j] = new Node();

        for (k = 2; k < tables[tables.length - 1][rowsOfTable].length; k++) {
          Network.node[i][j].information.push(tables[tables.length - 1][rowsOfTable][k])
        }

        rowsOfTable++;
      }
    }


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

      for (value = 0; value < texto.length ; value++) {
        if (value < texto.length - 2)
          sample.push(parseFloat(texto[value]));
        else
          posSample.push(parseFloat(texto[value]));

      }


        Network.findBest(sample,posSample[0],posSample[1]);

        //console.log(Network.findBest(sample,posSample[0],posSample[1]));








    }



  },

  print: function() {
    for (i = 0; i < dataSource.sizeSOM; i++)
      for (j = 0; j < dataSource.sizeSOM; j++)
        console.log("node[" + i + "][" + j + "]: " + Network.node[i][j].information);

  },

  findBest: function(sample, initPos, finalPos) {
    winner = [0,0];
    // add kWin
    bestD = Network.node[0][0].distance(sample, initPos, finalPos);
  //  console.log(dataSource.sizeSOM);


    for (nodesI = 0; nodesI < dataSource.sizeSOM; nodesI++)
      for (nodesJ = 0; nodesJ < dataSource.sizeSOM; nodesJ++) {
        d = Network.node[nodesI][nodesJ].distance(sample, initPos, finalPos);
        if (d < bestD) {
          bestD = d;
          winner[0] = nodesI;
          winner[1] = nodesJ;
        }
      }

    return winner;

  },

}

function Node() {
  this.information = [];
  this.distance = function(sIn, initPos, finalPos) {
    sum = 0;
    for (i = initPos; i <= finalPos && i < sIn.length; i++) {
      sum += (this.information[i] - sIn[i]) * (this.information[i] - sIn[i]);
    }
    return sqrt(sum);
  };

}
