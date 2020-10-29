// this file will be for the routes that will be used in the app file, also this is for filestreams
const fs = require('fs');

/* make a requestHandler that does the folllowing:
* handles two routes (a) "/" (b) "/users"
* (a) when navigated to this page it will have a dummy message
* (b) when navigated to this page it'll have a list of dummy users
* 
* 
* function has 2 params: req, res
*/
const requestHandler = (req, res) => {
	const url = req.url;
	const method = req.method;

	// if the url is just "/" - give greeting
	if (url === "/") {
		// Don't forget to set the Headers
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<head><title>Assignment 1 webpage</title></head>');
        res.write('<body><h1>Hello from my page!</h1></body>');

        // now to also include from to be posted to "/create-user" page
        res.write('<form action="/create-user" method="POST"><input name="username" type="text"><button type="Submit">Send</button></form>');
		res.write('</html>');
		return res.end(); // end of response
	}

	// if the url -> "/users", then return a hard-coded listy
	if (url === "/users") {
		// Don't forget to set the Headers
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<head><title>Dummy User List</title></head>');
		res.write('<body><ul><li>Corneille</li><li>Joss</li><li>Remi</li><li>Spence</li></ul></body>')
		res.write('</html>');
		return res.end(); // end of response
	}

	// in the event that we submit the username in the input field
	// we check the url: create-user and the method: POST
	if (url === "/create-user" && method === "POST") {
		// parse the body of the response
		const body = [];

		// to receive the data in "chunks" - works as a buffer
		req.on('data', (chunks) => {
			// add to array - the buffer that is
			body.push(chunks);
		});

		// now with that request we convert the buffer to text
		// and then log the text to the console
		// OPTIONAL: RETURN TO HOMEPAGE??
		return req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			console.log(parsedBody);

			// now, we redirect to the homepage
			// set status code, location and end
			res.statusCode = 302;
			res.setHeader('Location', '/');
			res.end(); // end of response
		});
	}


};

module.exports = requestHandler;
