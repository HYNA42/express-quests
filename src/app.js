// Créer l'application Express
import express from "express";
import {
  getMovies,
  getMovieById,
  getUsers,
  getUsersByID,
    postMovie,
  postUser
} from "./controllers/movieControllers.js";

const app = express();
app.use(express.json()); // Permet à Express de lire les données JSON

// Déclarer les routes
app.get("/api/movies", getMovies);
app.get("/api/movies/:id", getMovieById);
app.post("/api/movies", postMovie);
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUsersByID);
app.post("/api/users", postUser);

export default app;
