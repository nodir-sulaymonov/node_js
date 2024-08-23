const fs = require('fs');

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
//
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log('File written');

//No Blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf8',(err, data1) => {
    if (err) return console.log('Error 💥');
    fs.readFile(`./txt/${data1}.txt`, 'utf8',(err, data2) => {
        console.log(data2);
        fs.readFile(`./txt/append.txt`, 'utf8',(err, data3) => {
            console.log(data3);

            fs.writeFile(`./txt/final.txt`,`${data2}\n${data3}`, `utf8`,err => {
                if (err) return console.log('Error 💥');
                console.log('You are file has been written to:\n');
            })
        });
    });
});
console.log('will read file');

