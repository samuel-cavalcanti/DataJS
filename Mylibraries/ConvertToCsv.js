var csvFile;
var tables = [];

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

    if (ready.tables)
        tables.push(lines);
    else {
        tables = [];
        tables.push(lines);
        ready.tables = true;
    }

    if (tables[csvFile.length - 1])
        ready.status = true;


}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}
