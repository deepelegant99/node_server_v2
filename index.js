const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //filepath
  const filepath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  //Set content Type
  let contentType = "text/html";
  const extname = path.extname(filepath);
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  //Read File
  fs.readFile(filepath,(err, content)=>{
      if(err){
        if(err.code == "ENOENT"){
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)=>{
                res.writeHead(404, {'Content-Type':'text/html'})
                res.end(content, "utf8")
            })
        }else{
            //server Error
            res.writeHead(500)
            res.end(`Server Error: ${err.code}`)
        }

      }else{
          res.writeHead(200,{'Content-Type':contentType})
          res.end(content, "utf8")
      }
  })

});

const PORT = process.env.PORT || 5000;
server.listen(PORT);
