import pool from "../config/database.js";

export const personajeService = {
  async crear(datos) {
    const [result] = await pool.execute(
      "INSERT INTO personajes (nombre, categoria, objeto) VALUES (?, ?, ?)",
      [datos.nombre, datos.categoria, datos.objeto],
    );
    return this.buscarPorId(result.insertId);
  },

  async listar() {
    const [rows] = await pool.execute("SELECT * FROM personajes ORDER BY createdAt DESC");
    return rows;
  },

  async buscarPorId(id) {
    const [rows] = await pool.execute("SELECT * FROM personajes WHERE id = ?", [id]);
    return rows[0] ?? null;
  },

  async actualizar(id, datos) {
    const fields = Object.keys(datos);
    if (fields.length === 0) return this.buscarPorId(id);

    const assignments = fields.map((field) => `\`${field}\` = ?`).join(", ");
    await pool.execute(`UPDATE personajes SET ${assignments} WHERE id = ?`, [
      ...fields.map((field) => datos[field]),
      id,
    ]);
    return this.buscarPorId(id);
  },

  async eliminar(id) {
    const personaje = await this.buscarPorId(id);
    if (!personaje) return null;
    await pool.execute("DELETE FROM personajes WHERE id = ?", [id]);
    return personaje;
  },
};
