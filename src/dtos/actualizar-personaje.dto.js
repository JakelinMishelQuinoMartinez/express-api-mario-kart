export class ActualizarPersonajeDTO {
  constructor(body) {
    if (body.nombre !== undefined) {
      this.nombre = body.nombre.trim();
    }
    if (body.categoria !== undefined) {
      this.categoria = body.categoria;
    }
    if (body.objeto !== undefined) {
      this.objeto = body.objeto.trim();
    }
  }
}