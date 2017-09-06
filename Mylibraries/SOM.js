/*
    void findWinner(Sample *s, int &i, int &j);  feito
    void findBest( std::vector<double>  &infoB, int initPos, int finalPos);  feito
    void executeOneIt(); feito
    void execute();
    double distancePos(int aX, int aY, int bX, int bY); feito
    double distanceVector(std::vector<double>  &infoA, std::vector<double>  &infoB);
    double compareRange(int x, int y, int iStart, int iEnd,  std::vector<double>  &info);
    void enableNodes(); feito
    void  updateWeight(Sample *s, int iWin, int jWin); feito
    void getNodeFeatures(int i, int j, std::vector<double>  &info);
    void loadNodes(std::string fileName);
    void saveNodes(std::string fileName, std::string fileHeader, bool showTerminal);
    void printNodes(bool showTerminal = false); feito com outro nome no caso, SOM.print
    void setDataSet(DataSet* dataSet);
    void setSizeNetwork(int sizeNetwork);
    int getSizeNetwork() const;
    void initializeNodes(int sizeNodes = 2, bool positivesValues = false, double intensity = 20);    feito
    int validatePos(int pos);  feito
*/

var Som = {
  node: [], // mesmas caracteristicas do codigo em C++
  learningRate: 0.2,
  minLearningRate: 0.01,
  maxIteration: 15000,
  maxEpoch: 200,
  debug: true,
  currentIt: 0,
  contDisabled: 0,
  epoch: 0,
  sigma: 1.5,
  alpha: 0.2, // duvida
  sampleI:0, // caracteristica do dataSet
  currentSample:"error",
  sizeNetwork: -1,


/* Som.start , é uma função utilizada para peseudo inicializar a SOM
*  e utilizar o metodo findBest
*/
  start: function() { // ignorar, por enquanto
    rowsOfTable = 1; // 1 linha é o header do csv
    Som.sizeNetwork = dataSource.sizeSOM;
    for (i = 0; i < Som.sizeNetwork; i++) {
      Som.node[i] = [];

      for (j = 0; j < Som.sizeNetwork; j++) {
        Som.node[i][j] = new Node();

        for (k = 2; k < tables[tables.length - 1][rowsOfTable].length; k++) {
          Som.node[i][j].information.push(tables[tables.length - 1][rowsOfTable][k])
        }

        rowsOfTable++;
      }
    }
    /* está localizada no Data.js, ela cria o botão
      para o usuario digitar a Sample, pos inicial
      e final do vetor, igual a findBest em C++

    */
    showFindBest();
  },

  print: function() { //emprime todos os neuronios da rede
    for (i = 0; i < Som.sizeNetwork; i++)
      for (j = 0; j < Som.sizeNetwork; j++)
        console.log("node[" + i + "][" + j + "]: " + Som.node[i][j].information);

  },
// Som::findBest, igual ao C++, mas sem a verificação se o neuronio está habilitado
  findBest: function(sample, initPos, finalPos) {
    winner = [0, 0];
    // add kWin
    bestD = Som.node[0][0].distanceFindBest(sample, initPos, finalPos);
    //  console.log(Som.sizeNetwork);


    for (nodesI = 0; nodesI < Som.sizeNetwork; nodesI++)
      for (nodesJ = 0; nodesJ < Som.sizeNetwork; nodesJ++) {
        d = Som.node[nodesI][nodesJ].distanceFindBest(sample, initPos, finalPos);
        if (d < bestD) {
          bestD = d;
          winner[0] = nodesI;
          winner[1] = nodesJ;
        }
      }

    return winner;


  },
// igua ao C++
  findWinner: function(sample, Winner) {
    winner = [0, 0];
    bestD = Som.node[0][0].distance(sample);
                              //o tamanho da rede Som
    for (nodesI = 0; nodesI < Som.sizeNetwork; nodesI++)
      for (nodesJ = 0; nodesJ < Som.sizeNetwork; nodesJ++) {
        if (Som.node[nodesI][nodesJ].enable) {
          d = Som.node[nodesI][nodesJ].distance(sample);
          if (d < bestD) {
            bestD = d;
            winner[0] = nodesI;
            winner[1] = nodesJ;
          }
        }
      }

  },

  initializeNodes: function(sizeNode, positivesValues, intensity) {
    maxIntensity = 10000;
    intensity = maxIntensity * intensity;

    for (nodesI = 0; nodesI < Som.sizeNetwork; nodesI++)
      for (nodesJ = 0; nodesJ < Som.sizeNetwork; nodesJ++) {
        info = [];
        for (l = 0; l < sizeNode; l++) {
          if (positivesValues)
            a = (Math.random() % parseInt(intensity)) / maxIntensity;
          else
            a = (Math.random() % parseInt(intensity)) / maxIntensity - (intensity / maxIntensity) / 2.0;

          info.push(a);
        }
        Som.node[nodesI][nodesJ].information = info;
      }

  },

  enableNodes: function() {
    for (nodesI = 0; nodesI < Som.sizeNetwork; nodesI++)
      for (nodesJ = 0; nodesJ < Som.sizeNetwork; nodesJ++) {
        Som.node[nodesI][nodesJ].setEnabled(true);
      }
  },

  validatePos: function(pos) {
    if (pos >= Som.sizeNetwork)
      pos = Som.sizeNetwork - 1;
    if (pos < 0)
      pos = 0;

  },
  distancePos: function(aX, aY, bX, bY) {
    return Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
  },

  updateWeight: function(Sample, winner) {
    jAnt = Som.validatePos(winner[1] - sizeNetwork / 3);
    jPost = Som.validatePos(winner[1] + sizeNetwork / 3);
    iAnt = Som.validatePos(winner[0] - sizeNetwork / 3);
    iPost = Som.validatePos(winner[0] + sizeNetwork / 3);

    for (i = iAnt; i <= iPost; i++)
      for (j = jAnt; j <= jPost; j++) {
        // calcula a distância na grade entre o vencedor e um vizinho (i,j)
        neighboorFunction = Som.alpha * Math.exp(-(Som.distancePos(i, j, winner[0], winner[1]) / (Som.sigma * Som.sigma)));
        Som.node[i][j].updateFeatures(neighboorFunction, sample);
      }
    Som.node[winner[0]][winner[1]].setEnabled(false);
    Som.contDisabled++;

  },

  getRandomSample: function (sample){
    sample = adefinir
    if(Som.sampleI == 0)
        return true;
    else
        return false;

  },

  executeOneIt: function() {
    if (Som.contDisabled >= Som.sizeNetwork * Som.sizeNetwork)
      Som.enableNodes();

      firstSample = Som.getRandomSample(Som.currentSample);

      if(firstSample){
        Som.epoch++;
       //enable all nodes of the network
       Som.enableNodes();
       // update all rates
       // update learning rate
       Som.alpha = Som.learningRate * ((Som.maxEpoch - Som.epoch) / (Som.maxEpoch));
       if (Som.alpha < Som.minLearningRate)
           Som.alpha = Som.minLearningRate;
       //update the gain G (sigma)
       Som.sigma = (1 - 0.01) * Som.sigma;
      }

    winner = [];
    Som.findWinner(Som.currentSample, winner[0], winner[1]);

    // atualiza os pesos
    Som.updateWeight(Som.currentSample, winner[0], winner[1]);
  /*
    if ((Som.currentIt % 100000 == 0) && (Som.debug))
        Som.print();
  */

    Som.currentIt++;

  },

}



function Node() {
  this.information = [];
  this.enable = false;
  this.distanceFindBest = function(sIn, initPos, finalPos) {
    sum = 0;
    for (i = initPos; i <= finalPos && i < sIn.length; i++) { // orivaldo verificar
      sum += (this.information[i] - sIn[i]) * (this.information[i] - sIn[i]);
    }
    return sqrt(sum);
  };
  this.distance = function(sIn) {
    sum = 0;

    for (i = 0; i < sIn.length && i < this.length; i++) {
      sum += (this.information[i] - sIn[i]) * (this.information[i] - sIn[i]);
    }
    return sqrt(sum);
  };

  this.setEnabled = function(enable) {
    this.enable = enable;
  };

  this.updateFeatures = function(d, sample) { // orivaldo, verificar
    for (i = 0; i < this.information.length && i < sample.length; i++) {
      this.information[i] += d * (sample[i] - this.information[i]);
    }

  };



}
