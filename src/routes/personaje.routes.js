import { Router } from "express";
import {
  crearPersonaje,
  listarPersonajes,
  obtenerPersonaje,
  actualizarPersonaje,
  eliminarPersonaje,
} from "../controllers/personaje.controller.js";

import {
  validarCrearPersonaje,
  validarActualizarPersonaje,
  validarPersonajeId,
} from "../validators/personaje.validator.js";

export const personajeRouter = Router();

personajeRouter.post("/", validarCrearPersonaje, crearPersonaje);
personajeRouter.get("/", listarPersonajes);
personajeRouter.get("/:id", validarPersonajeId, obtenerPersonaje);
personajeRouter.patch("/:id", validarPersonajeId, validarActualizarPersonaje, actualizarPersonaje);
personajeRouter.delete("/:id", validarPersonajeId, eliminarPersonaje);