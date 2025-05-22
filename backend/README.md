# 🚛 Backend - Gestión de Viajes

Este proyecto implementa una **API RESTful** para la gestión de viajes de transporte de carga. Incluye un sistema de **autenticación con JWT**, validaciones de negocio, y un CRUD completo para administrar viajes.

---

## 📌 Descripción General

La API permite a usuarios autenticados:

- Registrarse e iniciar sesión con email y contraseña.
- Obtener un token JWT para autenticarse.
- Crear, listar, actualizar y cancelar viajes.
- Validar restricciones de negocio como límite de litros o fechas inválidas.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js** con **TypeScript**
- **Express.js**
- **MongoDB** con **Mongoose**
- **JWT** (JSON Web Token) para autenticación
- **Docker** y **Docker Compose** para contenedores
- **Faker.js** para generar datos de prueba

---

## 🧩 Estructura del Proyecto

```json
/challengeReactNode/
│
├── /backend/
│   ├── /docs/
│   │   └── API.md
│   ├── /src/
│   │   ├── /controllers/
│   │   ├── /middlewares/
│   │   ├── /models/
│   │   ├── /repositories/
│   │   ├── /routes/
│   │   ├── /seed/
│   │   ├── /services/
│   │   ├── /validations/
│   │   ├── index.ts
│   ├── .env
│   └── Dockerfile
│   └── tsconfig.json
│   └── package.json
│   └── README.md
```

---

## ▶️ Cómo levantar la aplicación

Toda la aplicación está dockerizada. Basta con ejecutar:

```bash
docker-compose up -d --build
```

- **mongo**: Base de datos MongoDB
- **backend**: API RESTful en Node.js/Express

El backend quedará disponible en `http://localhost:4000`.

Para detener y limpiar todos los servicios:

```bash
docker-compose down
```

Para detener o eliminar solo el contenedor `backend`:

```bash
docker stop backend
docker rm backend
```

---

## 🛡️ Autenticación

La autenticación se maneja con JWT. Al registrarse o iniciar sesión, el usuario recibe un token que debe incluir en el header `Authorization` para acceder a los endpoints protegidos.

### Endpoints:

- `POST /api/auth/register` → Crea un nuevo usuario
- `POST /api/auth/login` → Inicia sesión y devuelve un token

---

## 🚛 CRUD de Viajes

Cada viaje tiene la siguiente estructura:

```json
{
  "id": "UUID",
  "camion": "ABC123",
  "conductor": "Juan Pérez",
  "origen": "Planta X",
  "destino": "Estación Y",
  "combustible": "Diésel",
  "cantidad_litros": 15000,
  "fecha_salida": "2025-05-10T14:30:00Z",
  "estado": "En tránsito"
}
```

### Endpoints protegidos (requieren token):
`GET /api/viajes` → Lista todos los viajes

`POST /api/viajes` → Crea un nuevo viaje

`PUT /api/viajes/:id` → Actualiza los datos de un viaje

`DELETE /api/viajes/:id` → Cancela un viaje (elimina lógicamente)

---

## ⚠️ Validaciones de Negocio
- ❌ No se permiten viajes con más de **30.000 litros**.
- ❌ La fecha de salida **no puede estar en el pasado**.
- ❌ Los viajes eliminados no se borran de la DB; solo cambian su `estado` a **"Cancelado"**.

---

## 🧪 Seeding de Base de Datos
Puedes poblar la base de datos con datos de prueba usando:
```bash
docker exec -it backend npm run seed
```
Esto creará usuarios y viajes con datos aleatorios.

---

## 🔐 Headers de Autenticación
Agrega el token JWT a cada request protegido:
```bash
Authorization: Bearer <TOKEN>
```
---

## 🧼 Scripts disponibles
- `npm run dev`: Ejecuta el servidor en modo desarrollo.
- `npm run build`: Compila el proyecto a JavaScript.
- `npm run start`: Corre el servidor en producción.
- `npm run seed`: Población de la base de datos con datos falsos.

---

## 📎 Notas Finales
- Este backend está preparado para ser conectado con un frontend protegido por autenticación.
- Todas las rutas están organizadas por módulos (auth, viajes, etc.).
- Ideal para proyectos de logística, seguimiento de flotas o carga programada.

