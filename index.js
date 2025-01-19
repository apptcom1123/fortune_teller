const http = require("http"); // 引入 HTTP 模組
const fs = require("fs"); // 引入文件系統模組
const path = require("path"); // 處理文件路徑

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // 讀取並回傳 HTML 檔案內容
    fs.readFile(path.join(__dirname, "index.html"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/script.js") {
    // 回傳 JavaScript 文件
    fs.readFile(path.join(__dirname, "script.js"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(data);
    });
  } else if (req.url === "/style.css") {
    // 回傳 CSS 文件
    fs.readFile(path.join(__dirname, "style.css"), "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else if (req.url === "/fortune-teller.png") {
    // 回傳圖片
    fs.readFile(path.join(__dirname, "fortune-teller.png"), (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
        return;
      }
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(data);
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// 啟動伺服器
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
