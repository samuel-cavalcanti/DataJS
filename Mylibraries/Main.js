
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
