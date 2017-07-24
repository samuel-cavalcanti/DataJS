var tables = [];

var ready = {// i'm Ready, Promotion...
    status: false,
    toPrint: false,
    countFrame: 0,
    TamCanvas:500,
    setup: function () {


        // calculando o tamanho do nodo em relação ao tamanho do canvas
        dataSource.snapshotNumber = tables.length;
        dataSource.sizeSOM = Math.sqrt(tables[0].length - 2);
        dataSource.limitXposition = 5 + ((tables[0][0].length - 3) * 8);
        dataSource.sizeNode =  (25/3)*tables[0][0].length -15; 
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
