// Créer l'application Express
import express from "express";
import {
  getMovies,
  getMovieById,
  getUsers,
  getUsersByID,
  postMovie,
  postUser,
  putMovie,
  putUser,
} from "./controllers/movieControllers.js";

import { validateMovie } from "./middlewares/validateMovie.js";
import { validateUser } from "./middlewares/validateUser.js";
const app = express();
app.use(express.json()); // Permet à Express de lire les données JSON

// Déclarer les routes
app.get("/api/movies", getMovies);
app.get("/api/movies/:id", getMovieById);
// app.post("/api/movies", postMovie);
//validate movies
app.post("/api/movies", validateMovie, postMovie);
app.put("/api/movies/:id", validateMovie, putMovie);

app.get("/api/users", getUsers);
app.get("/api/users/:id", getUsersByID);
app.post("/api/users", validateUser, postUser);
app.put("/api/users/:id", validateUser, putUser);

// const step1 = (req, res, next) => {
//   req.message = "I went through step1";
//   next();
// };

// const step2 = (req, res, next) => {
//   req.message += " and step2";
//   next();
// };

// const lastStep = (req, res) => {
//   res.send(req.message);
// };

// app.get("/justToTest", step1, step2, lastStep);

export default app;
