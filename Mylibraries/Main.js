
function draw() {

  frameRate(30);

  if (ready.status && !ready.toPrint)
    ready.setup();

  else if (ready.countFrame >= dataSource.snapshotNumber) {
    Som.start();
    ready.andEnded();
  } else if (ready.status && ready.toPrint)
    ready.andPrinting();
  else if (!ready.status && !ready.tables && !ready.toPrint) {


  }




}
