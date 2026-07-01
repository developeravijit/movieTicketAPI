require("dotenv").config();
const express = require("express");
const DbConnect = require("./app/config/db");
const logger = require("./app/utils/logger");
const morgan = require("morgan");
const router = require("./app/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger.json");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDocument = swaggerJSDoc(swaggerOptions);

const app = express();

DbConnect();

// Morgan
app.use(morgan("dev"));

// Json Config
app.use(express.json());

app.use(router);

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {
  logger.info(`Port running on server ${PORT}`);
});
