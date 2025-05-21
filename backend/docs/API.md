# 📘 API - Documentación de Endpoints

## 🛡️ Autenticación

### POST `/api/auth/register`
Registra un nuevo usuario.

**Request Body (JSON):**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "secreta123",
  "role": "admin"
}
```
**Response:**

```json
{
  "message": "Usuario creado correctamente",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "role": "admin"
  },
  "token": "JWT_TOKEN"
}

```

### POST `/api/auth/login``
Autentica un usuario existente y devuelve un token.

**Request Body (JSON):**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "secreta123"
}
```
**Response:**
```json
{
  "message": "Login exitoso",
  "user": {
    "id": "uuid",
    "email": "usuario@ejemplo.com",
    "role": "admin"
  },
  "token": "JWT_TOKEN"
}
```

## 🚛 Viajes
> Todos los endpoints requieren autenticación con Bearer Token.

## GET `/api/viajes`
Obtiene todos los viajes.

**Headers:**
```json
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
[
  {
    "id": "uuid",
    "origen": "Buenos Aires",
    "destino": "Córdoba",
    "cantidad_litros": 12000,
    "fecha_salida": "2025-08-01T10:00:00Z",
    "estado": "Programado"
  }
]
```

## POST `/api/viajes`
Crea un nuevo viaje.

**Headers:**
```json
Authorization: Bearer JWT_TOKEN
```

**Request Body:**

```json
{
  "origen": "Buenos Aires",
  "destino": "Córdoba",
  "cantidad_litros": 15000,
  "fecha_salida": "2025-08-01T10:00:00Z"
}
```

**Response:**
```json
{
  "message": "Viaje creado",
  "viaje": {
    "id": "uuid",
    "origen": "Buenos Aires",
    "destino": "Córdoba",
    "cantidad_litros": 15000,
    "fecha_salida": "2025-08-01T10:00:00Z",
    "estado": "Programado"
  }
}
```

## PUT `/api/viajes/:id`
Actualiza un viaje por su ID.

**Headers:**
```json
Authorization: Bearer JWT_TOKEN
```

**Request Body (Ejemplo):**
```json
{
  "cantidad_litros": 20000,
  "estado": "En curso"
}
```
**Response:**
```json
{
  "message": "Viaje actualizado",
  "viaje": { ... }
}
```

## DELETE `/api/viajes/:id`
Cancela un viaje (estado → Cancelado).

**Headers:**
```json
Authorization: Bearer JWT_TOKEN
```

**Response:**
```json
{
  "message": "Viaje cancelado",
  "viaje": { ... }
}
```

# ⚠️ Validaciones importantes
- No se pueden registrar viajes con más de 30.000 litros.
- La fecha de salida no puede estar en el pasado.
- Los viajes eliminados cambian su estado a "Cancelado" (no se eliminan físicamente de la DB).

# 📌 Notas
- Asegúrese de usar un token válido para acceder a todos los endpoints protegidos.
- El token JWT debe enviarse en el header:
Authorization: Bearer <TOKEN>
