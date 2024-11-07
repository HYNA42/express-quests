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
  deleteMovie,
  deleteUser,
} from "./controllers/movieControllers.js";

import { validateMovie } from "./middlewares/validateMovie.js";
import { validateUser } from "./middlewares/validateUser.js";
const app = express();
app.use(express.json()); // Permet à Express de lire les données JSON


//Declaration des routes

/**Movies routing */
app.get("/api/movies", getMovies);
app.get("/api/movies/:id", getMovieById);
// app.post("/api/movies", postMovie);
app.post("/api/movies", validateMovie, postMovie);
app.put("/api/movies/:id", validateMovie, putMovie);
app.delete("/api/movies/:id", deleteMovie);

/**Users routing*/
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUsersByID);
app.post("/api/users", validateUser, postUser);
app.put("/api/users/:id", validateUser, putUser);
app.delete("/api/users/:id", deleteUser);

export default app;
