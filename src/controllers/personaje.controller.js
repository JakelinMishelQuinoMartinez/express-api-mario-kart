import { CrearPersonajeDTO } from "../dtos/crear-personaje.dto.js";
import { ActualizarPersonajeDTO } from "../dtos/actualizar-personaje.dto.js";
import { personajeService } from "../services/personaje.service.js";

export async function crearPersonaje(req, res, next) {
  try {
    const datos = new CrearPersonajeDTO(req.body);
    const personaje = await personajeService.crear(datos);
    res.cookie("ultimaCategoria", personaje.categoria, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60,
    });
    res.status(201).json({ data: personaje });
  } catch (error) {
    next(error);
  }
}

export async function listarPersonajes(req, res, next) {
  try {
    const personajes = await personajeService.listar();
    res.json({ data: personajes });
  } catch (error) {
    next(error);
  }
}

export async function obtenerPersonaje(req, res, next) {
  try {
    const personaje = await personajeService.buscarPorId(req.params.id);
    if (!personaje) return res.status(404).json({ error: "Personaje no encontrado" });
    res.json({ data: personaje });
  } catch (error) {
    next(error);
  }
}

export async function actualizarPersonaje(req, res, next) {
  try {
    const datos = new ActualizarPersonajeDTO(req.body);
    const personaje = await personajeService.actualizar(req.params.id, datos);
    if (!personaje) return res.status(404).json({ error: "Personaje no encontrado" });
    res.json({ data: personaje });
  } catch (error) {
    next(error);
  }
}
