# 🚛 Plataforma de Gestión de Viajes de Camiones Cisterna
Este proyecto es una solución fullstack desarrollada para una empresa de distribución de combustibles. Permite a los administradores autenticar su acceso, registrar y monitorear los viajes de camiones cisterna en tiempo real.

---

## 🔧 Tecnologías Utilizadas
- Frontend: React + TypeScript + TailwindCSS + React Router DOM + Axios
- Autenticación: JWT
- Infraestructura: Docker
- Otros: Joi (validaciones), XLSX (descarga de reportes), ESLint (linting)

---

## 🔐 Autenticación
- Formulario de inicio de sesión con email y contraseña.
- Emisión y almacenamiento de token JWT en localStorage.
- Protección de rutas frontend para evitar accesos no autorizados.

---

## 📊 Dashboard Administrativo
- Tabla interactiva de viajes (ordenar y filtrar por conductor, combustible, estado).
- Modal para crear nuevos viajes.
- Edición y cancelación de viajes.
- Visualización de estadísticas.
- Actualización en tiempo real del estado del dashboard.

---

## 🐳 Uso con Docker
**Requisitos Previos**
- Docker y Docker Compose instalados

**Comandos**
```bash
docker-compose up --build
```

```bash
Frontend: http://localhost:5173
Backend API: http://localhost:4000/api
```

---

## 📁 Estructura del Proyecto
```bash
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── validations/
│   │   └── App.tsx
│   │   └── index.css
│   │   └── main.tsx
│   │   └── types.ts
│   └── .env
│   └── Dockerfile
└── docker-compose.yml
```

---

## 📸 Imágenes
[addTravel.png](./assets/addTravel.png)