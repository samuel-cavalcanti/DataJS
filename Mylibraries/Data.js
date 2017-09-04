/* Código feito por Samuel e Dorgival */


//  create the button
var file = document.createElement("INPUT");
file.setAttribute("type", "file");
file.setAttribute("multiple", "");
file.setAttribute("onchange", "handleFiles(this.files)");
file.setAttribute("accept", ".csv");
document.body.appendChild(file);



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
    node: [],

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

    drawWeightsNode: function (weight, count2Rect) {
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

    }

};
