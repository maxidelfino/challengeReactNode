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
**Response (201):**

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

**Errores:**
- `400`: Email ya en uso
- `500`: Error interno del servidor

---

### POST `/api/auth/login`
Autentica un usuario existente y devuelve un token.

**Request Body (JSON):**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "secreta123"
}
```

**Response (200):**
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

**Errores:**
- `400`: Credenciales inválidas
- `500`: Error interno del servidor

---

## 🚛 Viajes
> Todos los endpoints requieren autenticación con Bearer Token.

### GET `/api/viajes`
Obtiene viajes con paginación y filtros opcionales.

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Query Parameters:**
- `page` (opcional): Número de página (default: 1)
- `limit` (opcional): Elementos por página (default: 10)
- `conductor` (opcional): Filtrar por nombre del conductor (búsqueda parcial)
- `combustible` (opcional): Filtrar por tipo de combustible exacto
- `estado` (opcional): Filtrar por estado exacto

**Ejemplo:**
```
GET /api/viajes?page=2&limit=5&conductor=Juan&combustible=Diésel&estado=En tránsito
```

**Response (200):**
```json
{
  "viajes": [
    {
      "_id": "uuid",
      "camion": "CAM-001",
      "conductor": "Juan Pérez",
      "origen": "Buenos Aires",
      "destino": "Córdoba",
      "combustible": "Diésel",
      "cantidad_litros": 12000,
      "fecha_salida": "2025-08-01T10:00:00Z",
      "estado": "En tránsito",
      "createdAt": "2025-07-01T10:00:00Z",
      "updatedAt": "2025-07-01T10:00:00Z"
    }
  ],
  "total": 50,
  "pages": 10
}
```

---

### GET `/api/viajes/all`
Obtiene todos los viajes sin paginación (útil para exportación).

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Query Parameters:**
- `conductor` (opcional): Filtrar por nombre del conductor
- `combustible` (opcional): Filtrar por tipo de combustible
- `estado` (opcional): Filtrar por estado

**Response (200):**
```json
[
  {
    "_id": "uuid",
    "camion": "CAM-001",
    "conductor": "Juan Pérez",
    "origen": "Buenos Aires",
    "destino": "Córdoba",
    "combustible": "Diésel",
    "cantidad_litros": 12000,
    "fecha_salida": "2025-08-01T10:00:00Z",
    "estado": "Programado"
  }
]
```

---

### GET `/api/viajes/stats`
Obtiene estadísticas generales de los viajes.

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response (200):**
```json
{
  "total": 150,
  "enTransito": 45,
  "finalizados": 80,
  "cancelados": 25,
  "totalLitros": 2500000,
  "combustibles": {
    "Diésel": 75,
    "Nafta": 50,
    "GNC": 25
  }
}
```

---

### GET `/api/viajes/:id`
Obtiene un viaje específico por su ID.

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response (200):**
```json
{
  "_id": "uuid",
  "camion": "CAM-001",
  "conductor": "Juan Pérez",
  "origen": "Buenos Aires",
  "destino": "Córdoba",
  "combustible": "Diésel",
  "cantidad_litros": 12000,
  "fecha_salida": "2025-08-01T10:00:00Z",
  "estado": "En tránsito",
  "createdAt": "2025-07-01T10:00:00Z",
  "updatedAt": "2025-07-01T10:00:00Z"
}
```

**Errores:**
- `404`: Viaje no encontrado

---

### POST `/api/viajes`
Crea un nuevo viaje.

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body (JSON):**
```json
{
  "camion": "CAM-001",
  "conductor": "Juan Pérez",
  "origen": "Buenos Aires",
  "destino": "Córdoba",
  "combustible": "Diésel",
  "cantidad_litros": 15000,
  "fecha_salida": "2025-08-01T10:00:00Z"
}
```

**Response (201):**
```json
{
  "_id": "uuid",
  "camion": "CAM-001",
  "conductor": "Juan Pérez",
  "origen": "Buenos Aires",
  "destino": "Córdoba",
  "combustible": "Diésel",
  "cantidad_litros": 15000,
  "fecha_salida": "2025-08-01T10:00:00Z",
  "estado": "En tránsito",
  "createdAt": "2025-07-01T10:00:00Z",
  "updatedAt": "2025-07-01T10:00:00Z"
}
```

**Errores:**
- `400`: Datos inválidos (con detalles de validación)

---

### PUT `/api/viajes/:id`
Actualiza un viaje por su ID.

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Request Body (JSON):**
```json
{
  "camion": "CAM-001",
  "conductor": "Juan Pérez",
  "origen": "Buenos Aires",
  "destino": "Córdoba",
  "combustible": "Diésel",
  "cantidad_litros": 20000,
  "fecha_salida": "2025-08-01T10:00:00Z",
  "estado": "Finalizado"
}
```

**Response (200):**
```json
{
  "_id": "uuid",
  "camion": "CAM-001",
  "conductor": "Juan Pérez",
  "origen": "Buenos Aires",
  "destino": "Córdoba",
  "combustible": "Diésel",
  "cantidad_litros": 20000,
  "fecha_salida": "2025-08-01T10:00:00Z",
  "estado": "Finalizado",
  "createdAt": "2025-07-01T10:00:00Z",
  "updatedAt": "2025-07-01T12:00:00Z"
}
```

**Errores:**
- `400`: Datos inválidos
- `404`: Viaje no encontrado

---

### DELETE `/api/viajes/:id`
Cancela un viaje (cambia estado a "Cancelado", no elimina físicamente).

**Headers:**
```
Authorization: Bearer JWT_TOKEN
```

**Response (200):**
```json
{
  "message": "Viaje cancelado",
  "viaje": {
    "_id": "uuid",
    "camion": "CAM-001",
    "conductor": "Juan Pérez",
    "origen": "Buenos Aires",
    "destino": "Córdoba",
    "combustible": "Diésel",
    "cantidad_litros": 15000,
    "fecha_salida": "2025-08-01T10:00:00Z",
    "estado": "Cancelado",
    "createdAt": "2025-07-01T10:00:00Z",
    "updatedAt": "2025-07-01T14:00:00Z"
  }
}
```

**Errores:**
- `404`: Viaje no encontrado

---

## ⚠️ Validaciones y Reglas de Negocio

### Validaciones de Viajes
- **Camión**: Obligatorio, 3-20 caracteres, solo letras mayúsculas, números y guiones
- **Conductor**: Obligatorio, 2-50 caracteres, solo letras y espacios
- **Origen**: Obligatorio, 2-50 caracteres
- **Destino**: Obligatorio, 2-50 caracteres, debe ser diferente al origen
- **Combustible**: Obligatorio, valores válidos: "Diésel", "Nafta", "GNC"
- **Cantidad de litros**: Obligatorio, número entero entre 100 y 30,000
- **Fecha de salida**: Obligatoria, no puede ser anterior a la fecha actual
- **Estado**: Opcional, valores válidos: "En tránsito", "Finalizado", "Cancelado"

### Validaciones de Usuario
- **Email**: Obligatorio, formato válido de correo electrónico, único
- **Contraseña**: Obligatoria, mínimo 6 caracteres, debe contener mayúscula, minúscula y número
- **Rol**: Obligatorio, valores válidos: "user", "admin"

### Reglas de Negocio
- Los viajes eliminados cambian su estado a "Cancelado" (soft delete)
- No se pueden registrar viajes con más de 30,000 litros
- La fecha de salida no puede estar en el pasado
- El origen y destino no pueden ser iguales
- Los tokens JWT expiran en 8 horas para login y 7 días para registro

---

## 📌 Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | Operación exitosa |
| 201 | Recurso creado exitosamente |
| 400 | Datos inválidos o error de validación |
| 401 | No autorizado (token inválido o faltante) |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

## 🔐 Autenticación

Todos los endpoints de viajes requieren autenticación mediante Bearer Token:

```
Authorization: Bearer <JWT_TOKEN>
```

### Obtener Token
1. Registrarse: `POST /api/auth/register`
2. Iniciar sesión: `POST /api/auth/login`

### Usuario Demo
Para pruebas, puedes usar:
- **Email**: admin@example.com
- **Contraseña**: 123456

---

## 📊 Ejemplos de Uso

### Crear un viaje completo
```bash
curl -X POST http://localhost:4000/api/viajes \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "camion": "CAM-001",
    "conductor": "Juan Pérez",
    "origen": "Buenos Aires",
    "destino": "Córdoba",
    "combustible": "Diésel",
    "cantidad_litros": 15000,
    "fecha_salida": "2025-08-01T10:00:00Z"
  }'
```

### Obtener viajes filtrados
```bash
curl "http://localhost:4000/api/viajes?conductor=Juan&estado=En%20tránsito&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Obtener estadísticas
```bash
curl http://localhost:4000/api/viajes/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🚀 Notas de Implementación

- La API utiliza MongoDB como base de datos
- Los timestamps (createdAt, updatedAt) se manejan automáticamente
- Los filtros de texto son case-insensitive
- La paginación por defecto es de 10 elementos por página
- Los errores de validación incluyen detalles específicos en español
- El endpoint `/all` está optimizado para exportación de datos
