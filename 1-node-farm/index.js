const fs = require('fs');
const http = require('http');
const url = require('url');

//////////////////////////////////////////////
//FILES

// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
//
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log('File written');

//No Blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf8',(err, data1) => {
//     if (err) return console.log('Error 💥');
//     fs.readFile(`./txt/${data1}.txt`, 'utf8',(err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf8',(err, data3) => {
//             console.log(data3);
//
//             fs.writeFile(`./txt/final.txt`,`${data2}\n${data3}`, `utf8`,err => {
//                 if (err) return console.log('Error 💥');
//                 console.log('You are file has been written to:\n');
//             })
//         });
//     });
// });
// console.log('will read file');


///////////////////////////////////
///SERVER
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%FROM%}/g, product.from)
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%ID%}/g, product.id)

    if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

    return output;
}
const tempOverview = fs.readFileSync(`${__dirname}/templates/template.overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template.card.html`, 'utf-8');
// const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName=  req.url;

    // overwiew page
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
        res.end(output);

     //   product page
    } else if (pathName === '/product') {
        res.end('This is product');

        // api
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json'});
        res.end(data);

        //not found
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('<h1>Not Found</h1>');
    }
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening on 8000');
});



