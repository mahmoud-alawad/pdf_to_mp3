const fs = require('fs');
const childProcess = require('child_process');
const http = require('http');

// Read the PDF file into a stream
// const pdfStream = fs.createReadStream('path/to/file.pdf');

// // Spawn a new process to run the pdftotext command
// const pdftotext = childProcess.spawn('pdftotext', ['-', '-']);

// // Pipe the PDF stream into the pdftotext process
// pdfStream.pipe(pdftotext.stdin);

// // Read the output of the pdftotext process and write it to a new file
// pdftotext.stdout.pipe(fs.createWriteStream('text.txt'));

// // Once the text file has been created, spawn a new process to run the ffmpeg command
// pdftotext.on('close', () => {
//     const ffmpeg = childProcess.spawn('ffmpeg', ['-i', 'text.txt', 'output.mp3']);
// });


const server = http.createServer((req, res) => {
    // If the route is '/', send the contents of 'index.html' as the response
    if (req.url === '/') {
        fs.readFile('./views/index.html', 'utf8', (err, data) => {
            if (err) {
                // If there is an error reading the file, send a 500 Internal Server Error response
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end(err.message);
            } else {
                // Otherwise, send the contents of the file as the response
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
      
    } else {
        // If the route is not '/', send a 404 Not Found response
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
    if (req.url.startsWith('/?pdfFile=')) {
        let body = '0';
        console.log(req);
        req.on('data', chunck=>{
            body+= chunck.toString();
        });
        req.on('end',()=>{
            const data = new URLSearchParams(body);
            const pdf = data.get('pdfFile');
            console.log(pdf);
        });
    }
});

server.listen(3000);





