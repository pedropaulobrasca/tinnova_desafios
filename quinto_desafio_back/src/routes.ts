import express from "express";

export const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});
