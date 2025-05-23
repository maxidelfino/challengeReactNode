# 🚛 Sistema de Gestión de Camiones Cisterna

## 📋 Descripción del Proyecto

Esta plataforma fullstack permite gestionar el despacho de camiones cisterna para la distribución de combustibles. Ofrece un sistema de autenticación seguro y un dashboard administrativo donde los usuarios pueden visualizar, registrar y dar seguimiento en tiempo real a los viajes, conductores, combustibles, origen y destino de cada despacho.

<img width="1459" alt="dashboard" src="https://github.com/user-attachments/assets/c71dbd3e-51ab-47d9-b713-6693ee6bdf0c" />

## 🎯 Características Principales

- **Autenticación segura** con JWT
- **Dashboard interactivo** con tabla de viajes
- **Filtrado y ordenamiento** por múltiples criterios
- **Gestión completa de viajes** (crear, editar, cancelar)
- **Validaciones de negocio** (límites de litros, fechas válidas)
- **Exportación de datos** a Excel
- **Estadísticas en tiempo real**
- **Dockerización completa** del stack

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **TailwindCSS** para estilos
- **React Router DOM** para navegación
- **Axios** para peticiones HTTP
- **Joi** para validaciones de formularios
- **XLSX** para exportación de datos
- **Lucide React** para iconos

### Backend
- **Node.js** con Express
- **TypeScript** para tipado estático
- **MongoDB** como base de datos
- **Mongoose** para modelado de datos
- **JWT** para autenticación
- **Joi** para validaciones
- **Docker** para contenerización

## 🚀 Instalación y Uso

### Requisitos Previos
- Docker y Docker Compose instalados

### Pasos para Ejecutar
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/maxidelfino/challengeReactNode.git
   cd challengeReactNode
   ```

2. Iniciar los contenedores:
   ```bash
   docker-compose up --build
   ```

3. Acceder a la aplicación:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000/api

4. Credenciales de prueba:
   - Email: admin@example.com
   - Contraseña: 123456

### Comandos Útiles

| Acción                                    | Comando               |
| ----------------------------------------- | --------------------- |
| Iniciar todos los servicios               | `docker-compose up -d --build` |
| Parar y eliminar **todos** los servicios  | `docker-compose down` |
| Parar solo el contenedor `backend`        | `docker stop backend` |
| Eliminar el contenedor `backend` detenido | `docker rm backend`   |
| Ejecutar seed de datos                    | `docker exec -it backend npm run seed` |

## 📊 Funcionalidades

### Autenticación
- Sistema de login con email y contraseña
- Registro de nuevos usuarios
- Protección de rutas mediante JWT
- Validación de formularios en tiempo real

### Dashboard Administrativo
- Tabla interactiva de viajes con ordenamiento y filtros
- Estadísticas de viajes (total, en tránsito, finalizados, cancelados)
- Distribución de combustibles
- Total de litros transportados

### Gestión de Viajes
- Creación de nuevos viajes mediante modal
- Edición de viajes existentes
- Cancelación de viajes (soft delete)
- Visualización detallada de cada viaje
- Exportación de datos a Excel

## 📁 Estructura del Proyecto

```
/
├── backend/                # Servidor Node.js con Express
│   ├── src/
│   │   ├── controllers/    # Controladores de la API
│   │   ├── models/         # Modelos de datos (Mongoose)
│   │   ├── routes/         # Rutas de la API
│   │   ├── middlewares/    # Middlewares (auth, validación)
│   │   ├── services/       # Lógica de negocio
│   │   ├── repositories/   # Acceso a datos
│   │   ├── validations/    # Esquemas de validación (Joi)
│   │   └── index.ts        # Punto de entrada
│   ├── docs/               # Documentación de la API
│   └── Dockerfile          # Configuración de Docker
│
├── frontend/               # Cliente React con TypeScript
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── context/        # Contextos (Auth, Toast)
│   │   ├── pages/          # Páginas principales
│   │   ├── utils/          # Utilidades y helpers
│   │   ├── validations/    # Esquemas de validación (Joi)
│   │   └── App.tsx         # Componente principal
│   └── Dockerfile          # Configuración de Docker
│
└── docker-compose.yml      # Configuración de servicios
```

## 🔐 API REST

La API proporciona endpoints para gestionar usuarios y viajes:

### Autenticación

- **POST /api/auth/register**: Registra un nuevo usuario
- **POST /api/auth/login**: Autentica un usuario y devuelve token JWT

### Viajes

- **GET /api/viajes**: Obtiene viajes con paginación y filtros
- **GET /api/viajes/all**: Obtiene todos los viajes (para exportación)
- **GET /api/viajes/stats**: Obtiene estadísticas de viajes
- **GET /api/viajes/:id**: Obtiene un viaje específico
- **POST /api/viajes**: Crea un nuevo viaje
- **PUT /api/viajes/:id**: Actualiza un viaje existente
- **DELETE /api/viajes/:id**: Cancela un viaje (soft delete)

Para más detalles, consulte la [documentación completa de la API](./backend/docs/API.md).

## ⚠️ Validaciones y Reglas de Negocio

### Validaciones de Viajes
- **Camión**: Obligatorio, 3-20 caracteres, solo letras mayúsculas, números y guiones
- **Conductor**: Obligatorio, 2-50 caracteres, solo letras y espacios
- **Origen/Destino**: Obligatorios, 2-50 caracteres, deben ser diferentes entre sí
- **Combustible**: Obligatorio, valores válidos: "Diésel", "Nafta", "GNC"
- **Cantidad de litros**: Obligatorio, número entero entre 1 y 30,000
- **Fecha de salida**: Obligatoria, no puede ser anterior a la fecha actual

### Reglas de Negocio
- Los viajes eliminados cambian su estado a "Cancelado" (soft delete)
- No se pueden registrar viajes con más de 30,000 litros
- La fecha de salida no puede estar en el pasado
