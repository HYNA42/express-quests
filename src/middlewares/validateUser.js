import { body, validationResult } from "express-validator";

export const validateUser = [
  // Validation des champs de la table users
  body("firstname")
    .notEmpty()
    .withMessage("Le champ 'firstname' est obligatoire.")
    .isLength({ max: 255 })
    .withMessage("Le prénom ne doit pas dépasser 255 caractères."),
  body("lastname")
    .notEmpty()
    .withMessage("Le champ 'lastname' est obligatoire.")
    .isLength({ max: 255 })
    .withMessage("Le nom de famille ne doit pas dépasser 255 caractères."),
  body("email")
    .notEmpty()
    .withMessage("Le champ 'email' est obligatoire.")
    .isLength({ max: 255 })
    .withMessage("L'email ne doit pas dépasser 255 caractères.")
    .isEmail()
    .withMessage("Veuillez fournir une adresse e-mail valide."),
  body("city")
    .optional() // Optionnel, pas obligatoir
    .isLength({ max: 255 })
    .withMessage("La ville ne doit pas dépasser 255 caractères."),
  body("language")
    .optional() // Optionnel, pas obligatoir
    .isLength({ max: 255 })
    .withMessage("La langue ne doit pas dépasser 255 caractères."),

  // Vérification des résultats de validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ validationErrors: errors.array() });
    }
    next();
  },
];
