//setting variables

const http = require("http"),
	fs = require("fs"),
	url = require("url");

//CREATING SERVER
//create variable http and assigning it to HHTP module using function createServer

http
	.createServer((request, response) => {
		var addr = request.url,
			q = url.parse(addr, true),
			filePath = "";
		//parse request.url in order to determine if URL contains word"documentation" ,
		//if yes returns "documentation.html", if not "index.html" file
		if (q.pathname.includes("documentation")) {
			filePath = __dirname + "/documentation.html";
		} else {
			filePath = "index.html";
		}

		//URL module grab and read a URL request then fs module send back appropiate file
		fs.readFile(filePath, function(err, data) {
			if (err) {
				throw err;
			}
			//use fs module to log request URL and timestamp and append it to the "log.txt" file
			fs.appendFile(
				"log.txt",
				"URL: " + addr + "\nTimestamp: " + new Date() + "\n\n",
				function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("Added to log.");
					}
				}
			);
			response.writeHead(200, { "Content-Type": "text/html" });
			response.write(data);
			response.end();
		});
	})
	// setting server to listen for request on port 8080
	.listen(8080);
console.log("listening on port 8080");
