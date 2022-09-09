const axios = require('axios');
const fs = require('fs')
const fileDir = './clientdata'
const filename = './clientdata/random-bytes.txt'
if(!fs.existsSync(fileDir)){
    fs.mkdirSync(fileDir)
  }
  
try {
    (async function getFile(){
        try {
            const {data}=await axios.default.get('http://serverContainer:3000');
            if(data){
                console.log('got file');
                fs.writeFile(filename, data, function (err) {
                    if (err) return console.log(err);
                    console.log('saved file');
                  });
            }
        } catch (error) {
            console.log('got error');
        }
    })()
} catch (error) {
    console.log('got error');
}
