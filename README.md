# API de personajes de Mario Kart

API REST para crear y administrar personajes inspirados en Mario Kart. Está construida con Node.js, Express y MySQL. Cada personaje tiene nombre, categoría de peso y objeto favorito; las operaciones permiten crear, listar, consultar, actualizar y eliminar registros.

## Requisitos

- Node.js 20.6 o posterior (compatible con `--env-file`).
- MySQL en ejecución.
- Una base de datos y una tabla `personajes` disponibles.

La aplicación consulta las columnas `id`, `nombre`, `categoria`, `objeto` y `createdAt`. Si aún no tienes la tabla, puedes crearla con:

```sql
CREATE DATABASE IF NOT EXISTS mario_kart;
USE mario_kart;

CREATE TABLE IF NOT EXISTS personajes (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(60) NOT NULL,
  categoria ENUM('ligero', 'medio', 'pesado') NOT NULL,
  objeto VARCHAR(60) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

## Instalación y configuración

Desde esta carpeta, instala las dependencias y prepara las variables de conexión:

```bash
npm install
```

En PowerShell, copia el archivo de ejemplo y edita `.env` con los datos de tu MySQL:

```powershell
Copy-Item .env.example .env
```

Si usas Bash, el comando equivalente es `cp .env.example .env`.

Inicia la API:

```bash
npm run dev
```

También puedes iniciarla sin modo de recarga con `npm start`. El servidor usa el puerto `4000` y verifica la conexión con MySQL antes de empezar a escuchar.

## Endpoints

La URL base es `http://localhost:4000`. Las respuestas de la API están en JSON, salvo la eliminación exitosa (que no devuelve contenido).

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/health` | Comprueba que la API esté activa. |
| `GET` | `/api/v1/personajes` | Lista los personajes, de más reciente a más antiguo. |
| `GET` | `/api/v1/personajes/:id` | Obtiene un personaje por su ID. |
| `POST` | `/api/v1/personajes` | Crea un personaje. |
| `PATCH` | `/api/v1/personajes/:id` | Actualiza uno o varios campos enviados. |
| `DELETE` | `/api/v1/personajes/:id` | Elimina un personaje. |
| `GET` | `/api/v1/preferencia` | Consulta la última categoría guardada en una cookie. |

Para crear un personaje, el cuerpo debe tener los tres campos requeridos. El nombre acepta entre 3 y 60 caracteres, el objeto entre 1 y 60, y la categoría debe ser `ligero`, `medio` o `pesado`.

### Ejemplo de JSON para agregar un personaje

Usa este cuerpo en una solicitud `POST` a `http://localhost:4000/api/v1/personajes`. En Postman, Bruno o Insomnia selecciona **Body → JSON** (o **raw → JSON**) y agrega el encabezado `Content-Type: application/json`:

```json
{
  "nombre": "Yoshi",
  "categoria": "medio",
  "objeto": "Huevo de Yoshi"
}
```

Una creación correcta responde con estado `201`, el objeto creado bajo `data` y una cookie `ultimaCategoria` válida durante una hora.

## Pruebas desde la terminal con curl

Con la API ejecutándose, puedes usar estos comandos. El ejemplo guarda la cookie de creación en `cookies.txt` para consultar luego la preferencia:

```bash
# Estado de la API
curl -i http://localhost:4000/health

# Crear un personaje
curl -i -X POST http://localhost:4000/api/v1/personajes \
  -H 'Content-Type: application/json' \
  -c cookies.txt \
  -d '{"nombre":"Yoshi","categoria":"medio","objeto":"Huevo de Yoshi"}'

# Listar personajes
curl -i http://localhost:4000/api/v1/personajes

# Consultar un personaje (reemplaza 1 por un ID existente)
curl -i http://localhost:4000/api/v1/personajes/1

# Actualizar campos (todos son opcionales en PATCH)
curl -i -X PATCH http://localhost:4000/api/v1/personajes/1 \
  -H 'Content-Type: application/json' \
  -d '{"objeto":"Caparazón verde"}'

# Consultar la última categoría enviada al crear un personaje
curl -i -b cookies.txt http://localhost:4000/api/v1/preferencia

# Eliminar un personaje (respuesta 204 sin cuerpo)
curl -i -X DELETE http://localhost:4000/api/v1/personajes/1
```

También puedes importar cada comando `curl` en Postman, Bruno o Insomnia. Para una ruta con `:id`, reemplaza `1` por un ID que exista en tu base de datos.

## Respuestas y errores

- `201`: personaje creado.
- `200`: consulta o actualización correcta.
- `204`: personaje eliminado correctamente.
- `400`: ID inválido o datos que no pasan la validación; el detalle aparece en `errores`.
- `404`: personaje o ruta no encontrada.
- `500`: error al procesar la solicitud, por ejemplo, un problema de base de datos.

Cada respuesta incluye el encabezado `X-API-Version: 1.0.0`.