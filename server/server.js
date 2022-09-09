var express = require('express');
var app = express();
const fs = require("fs");
const crypto = require('crypto');

const fileDir = "serverdata";
let fileName = 'random-bytes.txt'


if(!fs.existsSync(fileDir)){
  fs.mkdirSync(fileDir)
}

 fileName = `./${fileDir}/${fileName}`;

const fileSizeInBytes = Number.parseInt(process.argv[2]) || 1000;
console.log(`Writing ${fileSizeInBytes} bytes`)

function generate_random_data1(size){
    var chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var len = chars.length;
    var random_data = [];

    while (size--) {
        random_data.push(chars[Math.random()*len | 0]);
    }

    return random_data.join('');
}

const writer = fs.createWriteStream(fileName)

writetoStream(fileSizeInBytes, () => console.log(`File created: ${fileName}`));

function writetoStream(bytesToWrite, callback) {
    const step = 1000;
    let i = bytesToWrite;
    write();
    function write() {
        let ok = true;
        do {
            const chunkSize = i > step ? step : i;
            const buffer = generate_random_data1(bytesToWrite)

            i -= chunkSize;
            if (i === 0) {
                // Last time!
                writer.write(buffer, callback);
            } else {
                ok = writer.write(buffer);
            }
        } while (i > 0 && ok);

        if (i > 0) {
            writer.once('drain', write);
        }
    }
}

app.get('/', function (req, res) {
   res.sendFile(__dirname+ fileName.substring(1));
})

app.listen(3000, function () {   
   console.log("app listening on port 3000" )
})