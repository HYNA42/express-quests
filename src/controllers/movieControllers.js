// Import de la base de données
import database from "../../database.js";

// Récupérer tous les films
export const getMovies = async (req, res) => {
  try {
    const [movies] = await database.query("SELECT * from movies");
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des films");
  }
};

// Récupérer un film par ID
export const getMovieById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [movie] = await database.query("SELECT * from movies WHERE `id` = ?", [id]);
    if (movie.length > 0) {
      res.json(movie);
    } else {
      res.status(404).send("Le film recherché n'existe pas");
    }
  } catch (err) {
    res.status(500).send("Erreur dans la tentative de récupération du film");
  }
};

// Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  try {
    const [users] = await database.query("SELECT * FROM users");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
};

// Récupérer un utilisateur par ID
export const getUsersByID = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [user] = await database.query("SELECT * from users WHERE `id` = ?", [id]);
    if (user.length > 0) {
      res.json(user);
    } else {
      res.status(404).send("L'utilisateur recherché n'existe pas");
    }
  } catch (err) {
    res.status(500).send("Erreur dans la tentative de récupération de l'utilisateur");
  }
};
