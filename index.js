/*Primary file 
*
*
*/

//Dependencies
const express = require("express");
const cors = require("cors");
const database = require("./database");
require('dotenv').config();
const swaggerUI = require("swagger-ui-express");
swaggerDocument = require('./swagger.json');
const swaggerDist = require('swagger-ui-dist');
const swaggerUiAssetPath = swaggerDist.getAbsoluteFSPath('./swagger.json'); // <-- errors out

const app = express();
app.use('/swagger', express.static(swaggerUiAssetPath));
app.use(cors());

// parse requests of content-type - applcation/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//Routes middleware
const Routes = require("./routes");

// routes
app.get('/', (req, res) => {
  res.send("Welcome to Xidjumane!")
})
app.use("/api/", Routes);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use((req, res, next) => {
  res.status(404).send({ error: "Not found" })
  next()
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*app.init = () => {
  database.connect();
  database.seeders();

}

app.init(); */