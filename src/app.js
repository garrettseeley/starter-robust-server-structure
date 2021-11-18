const express = require("express");
const app = express();
const counts = require("./data/counts-data");

const flipsRouter = require("./flips/flips.router")

// TODO: Follow instructions in the checkpoint to implement ths API.

app.use(express.json());

app.use("/flips", flipsRouter);
// Middleware function to validate the request body

app.use("/counts/:countId", (req, res, next) => {
  const { countId } = req.params;
  const foundCount = counts[countId];

  if (foundCount === undefined) {
    next({status: 404, message: `Count id not found: ${countId}`});
  } else {
    res.json({ data: foundCount });
  }
});

app.use("/counts", (req, res) => {
  res.json({ data: counts });
});

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({error: message});
});

module.exports = app;
