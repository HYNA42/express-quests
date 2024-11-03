// Créer l'application Express
import express from "express";
import { getMovies, getMovieById, getUsers, getUsersByID } from "./controllers/movieControllers.js";

const app = express();

// Déclarer les routes
app.get("/api/movies", getMovies);
app.get("/api/movies/:id", getMovieById);
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUsersByID);

export default app;
