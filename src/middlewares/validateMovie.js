import { body, validationResult } from "express-validator";

export const validateMovie = [
  // validation des champs de la table movies
  body("title")
    .notEmpty()
    .withMessage("Le champ 'title' est obligatoire.")
    .isLength({ max: 255 })
    .withMessage("Le titre ne doit pas dépasser 255 caractères."),
  body("director")
    .notEmpty()
    .withMessage("Le champ 'director' est obligatoire.")
    .isLength({ max: 255 })
    .withMessage("Le directeur ne doit pas dépasser 255 caractères."),
  body("year")
    .notEmpty()
    .withMessage("Le champ 'year' est obligatoire.")
    .isLength({ max: 255 })
    .withMessage("L'année ne doit pas dépasser 255 caractères."),
  body("color")
    .notEmpty()
    .withMessage("Le champ 'color' est obligatoire.")
    .isLength({ max: 255 })
    .withMessage("La couleur ne doit pas dépasser 255 caractères."),
  body("duration")
    .notEmpty()
    .withMessage("Le champ 'duration' est obligatoire.")
    .isInt({ min: 1 })
    .withMessage("La durée doit être un entier positif."),

  // vérification des résultats de validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array() });
    }
    next();
  },
];
