const app = require('./app')

// Setup Server
const port = 8081;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`);
}




    
