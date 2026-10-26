import { body, param, validationResult } from "express-validator";

const responderErrores = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

export const validarCrearPersonaje = [
  body("nombre").trim().isLength({ min: 3, max: 60 })
    .withMessage("El nombre debe tener entre 3 y 60 caracteres"),
  body("categoria").isIn(["ligero", "medio", "pesado"])
    .withMessage("La categoría debe ser ligero, medio o pesado"),
  body("objeto").trim().isLength({ min: 1, max: 60 })
    .withMessage("El objeto debe tener entre 1 y 60 caracteres"),
  responderErrores,
];

export const validarActualizarPersonaje = [
  body("nombre").optional().trim().isLength({ min: 3, max: 60 }),
  body("categoria").optional().isIn(["ligero", "medio", "pesado"]),
  body("objeto").optional().trim().isLength({ min: 1, max: 60 }),
  responderErrores,
];

export const validarPersonajeId = [
  param("id").isInt({ min: 1 }).withMessage("El id debe ser un número entero positivo"),
  responderErrores,
];
