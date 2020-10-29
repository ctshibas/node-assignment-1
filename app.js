// import the http module to spin up node.js server, also dotenv for porting configs etc.
const http = require('http');
const dotenv = require('dotenv');

/** CUSTOM MODULES **/
const reqHandler = require('./routes');

// now to bring in the configuration
dotenv.config({ path: './config/config.env' });

// port variable
const PORT = process.env.PORT || 3000;

// making the server and listen
const server = http.createServer(reqHandler);
server.listen(PORT, console.log(`You are now listening on port ${PORT}!`));