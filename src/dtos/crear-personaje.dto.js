export class CrearPersonajeDTO {
  constructor(body) {
    this.nombre = body.nombre.trim();
    this.categoria = body.categoria;
    this.objeto = body.objeto.trim();
  }
}