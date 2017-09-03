
var ready = {// i'm Ready, Promotion...
    status: false,
    toPrint: false,
    tables: true,
    countFrame: 0,
    TamCanvas:500,
    setup: function () {


        // calculando o tamanho do nodo em relação ao tamanho do canvas
        dataSource.snapshotNumber = Network.nodes.length;
        dataSource.sizeSOM = Math.sqrt(Network.nodes[0].length - 2);
        dataSource.limitXposition = 5 + ((Network.nodes[0][0].length - 3) * 8);
        dataSource.sizeNode =  (25/3)*Network.nodes[0][0].length -15; 
        ready.TamCanvas = 4*(dataSource.sizeSOM+1) + (dataSource.sizeSOM* dataSource.sizeNode) ;
        const Size = ready.TamCanvas;
         createCanvas(Size, Size);
        //  console.log(tables.length); 




        ready.toPrint = true;

    },

    andPrinting: function () {
        //  print(ready.countFrame);
        //console.log(ready.countFrame);
        frameRate(20);
        for (row = 1; row <= Network.nodes[ready.countFrame].length - 2; row++) {
            //  console.log(ready.countFrame);
            /////////////////////////////
            // Draw a weights of node

            //  console.log(table.length);
            dataSource.pullWeightsNode(row, Network.nodes[ready.countFrame]);
            /////////////////////////////

        }
        ready.countFrame += 1;

    },
    andEnded: function () {
        ready.countFrame = 0;
        ready.status = false;
        ready.toPrint = false;
        ready.tables = false;
        ready.countFrame = 0;
        dataSource.snapshotNumber = 1;
        dataSource.sizeSOM = -1;
    }

};
