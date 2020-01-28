//creating server using node's http Module//

const http = require("http"),
	fs = require("fs"),
	url = require("url");

http
	.createServer((request, response) => {
		// 		response.writeHead(200, { "Content-Type": "text/html" });
		var addr = request.url,
			q = url.parse(addr, true),
			filePath = "";

		// 		//parsing request.url to check if URL contains word "documentation"
		// 		//if yes returns documentation.html if not index.html

		if (q.pathname.includes("documentation")) {
			filePath = __dirname + "/documentation.html";
		} else {
			filePath = "index.html";
		}

		// 		//appending log of the URL to the end of log.txt file
		fs.appendFile(
			"log.txt",
			"URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
			function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log("Added to log");
				}

				response.writeHead(200, { "Content-Type": "text/html" });
				response.write(data);
				response.end();
			}
		);
	})
	.listen(8080);
console.log("listening on port 8080");
