const fs = require("fs");

let filenames = fs.readdirSync("./database");
filenames.forEach((file) => {
fechas.push(file);
});


// npm install brfs 
// $ browserify -t brfs ./codigo2.js > ./bundle.js
