// Import de la base de données
import database from "../../database.js";

/**------------------------- FILMS ----------------------------------*/

// GET Récupérer tous les films
export const getMovies = async (req, res) => {
  try {
    let sql = "SELECT * from movies";
    const sqlValues = [];
    const color = req.query.color;
    const max_duration = req.query.max_duration;
    if (color != null) {
      sql += " WHERE color = ?";
      sqlValues.push(color, max_duration);
    }

    if (max_duration != null) {
      color ? (sql += " AND duration <= ?") : " WHERE duration <= ?";
      sqlValues.push(max_duration);
    }

    const [movies] = await database.query(sql, sqlValues);
    res.status(200).json(movies);
  } catch (err) {
    // console.error("Erreur lors de l'exécution de la requête:", err);
    res.status(500).send("Erreur lors de la récupération des films");
  }
};

// GET Récupérer un film par ID
export const getMovieById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [movie] = await database.query(
      "SELECT * from movies WHERE `id` = ?",
      [id]
    );
    if (movie.length > 0) {
      res.json(movie);
    } else {
      res.status(404).send("Le film recherché n'existe pas");
    }
  } catch (err) {
    res.status(500).send("Erreur dans la tentative de récupération du film");
  }
};

// POST Créer un nouveau film
export const postMovie = async (req, res) => {
  //destructuration de req.body
  const { title, director, year, color, duration } = req.body;

  try {
    const sql =
      "INSERT INTO `movies`(`title`, `director`, `year`, `color`, `duration`) VALUES (?,?,?,?,?)";
    const values = [title, director, year, color, duration];
    const [result] = await database.execute(sql, values); // Utilise execute()

    console.log(result);
    res.status(201).json({
      message: "Film ajouté avec succès!,Post route is working 🎉",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Erreur SQL:", err); // Log l'erreur pour plus de détails
    res.status(500).send("Erreur dans la tentative de création du film");
  }
};

//PUT mettre à jour un film
export const putMovie = async (req, res) => {
  try {
    //destructuration de req.body
    const { title, director, year, color, duration } = req.body;
    const id = parseInt(req.params.id);
    const sql =
      "UPDATE `movies` SET `title`= ?,`director` = ?, `year` = ?,  `color` = ?, `duration` = ?  WHERE `id` = ?  ";
    const values = [title, director, year, color, duration, id];

    const [result] = await database.execute(sql, values);
    console.log(result);
    if (result.affectedRows === 0) {
      res.sendStatus(404); // Aucun film mis à jour
    } else {
      res.sendStatus(204); // Mise à jour réussie sans contenu de retour
    }
  } catch (err) {
    res.status(500).send("Erreur dans la tentative de modification du film");
    console.log(err);
  }
};
//DELETE supprimer un film
export const deleteMovie = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM `movies` WHERE `id` = ?";
    const values = [id];

    const [result] = await database.execute(sql, values);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
    console.log(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Erreur dans la tentative de suppression du film");
  }
};
/**-----------------------UTILISATEURs---------------------------------*/

// GET Récupérer tous les utilisateurs
export const getUsers = async (req, res) => {
  try {
    let sql = "SELECT * FROM users";
    const sqlValues = [];

    // Récupérer les paramètres optionnels language et city s'ils existent
    const language = req.query.language;
    const city = req.query.city;

    if (language != null) {
      sql += " WHERE language = ?";
      sqlValues.push(language);
    }
    if (city != null) {
      sql += language ? " AND city = ?" : " WHERE city = ?";
      sqlValues.push(city);
    }

    const [users] = await database.query(sql, sqlValues);
    res.status(200).json(users);
  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs:", err);
    res.status(500).send("Erreur lors de la récupération des utilisateurs");
  }
};

// GET Récupérer un utilisateur par ID
export const getUsersByID = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [user] = await database.query("SELECT * from users WHERE `id` = ?", [
      id,
    ]);
    if (user.length > 0) {
      res.json(user);
    } else {
      res.status(404).send("L'utilisateur recherché n'existe pas");
    }
  } catch (err) {
    res
      .status(500)
      .send("Erreur dans la tentative de récupération de l'utilisateur");
  }
};

//POST creer un nouvel utilisateur
export const postUser = async (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  try {
    const sql =
      "INSERT INTO `users`(`firstname`, `lastname`, `email`, `city`, `language`) VALUES (?,?,?,?,?)";
    const values = [firstname, lastname, email, city, language];
    const [result] = await database.execute(sql, values); // Utilise execute()

    console.log(result);
    res.status(201).json({
      message:
        "Nouveau utilisateur ajouté avec succès!,Post route is working 🎉",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Erreur SQL:", err); // Log l'erreur pour plus de détails
    res
      .status(500)
      .send("Erreur dans la tentative de création de l'utilisateur");
  }
};

//PUT mettre à jour un utilisateur
export const putUser = async (req, res) => {
  try {
    //destructuration de req.body
    const { firstname, lastname, email, city, language } = req.body;
    const id = parseInt(req.params.id);
    const sql =
      "UPDATE `users` SET `firstname`= ?,`lastname` = ?, `email` = ?,  `city` = ?, `language` = ?  WHERE `id` = ?  ";
    const values = [firstname, lastname, email, city, language, id];

    const [result] = await database.execute(sql, values);
    console.log(result);
    if (result.affectedRows === 0) {
      res.sendStatus(404); // Aucun utilisateur mis à jour
    } else {
      res.sendStatus(204); // Mise à jour réussie sans contenu de retour
    }
  } catch (err) {
    res
      .status(500)
      .send("Erreur dans la tentative de modification de l'utilisateur");
    console.log(err);
  }
};

//DELETE supprimer un utilisateur
export const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sql = "DELETE FROM `users` WHERE `id` = ?";
    const values = [id];

    const [result] = await database.execute(sql, values);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
    console.log(result);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send("Erreur dans la tentative de suppression de l'utilisateur");
  }
};
