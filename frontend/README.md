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

<img width="1470" alt="register" src="https://github.com/user-attachments/assets/7e2a47e9-0bce-4e0f-bcab-569f9b7d2c9e" />
<img width="1470" alt="login" src="https://github.com/user-attachments/assets/37802c25-74bf-47fa-800e-60511b0ecbfc" />
<img width="1459" alt="dashboard" src="https://github.com/user-attachments/assets/0eb76c5a-9dee-409d-ad4a-f1806bd0cdea" />
<img width="1462" alt="addTravel" src="https://github.com/user-attachments/assets/4f9eeb1c-05f2-4275-928d-268c88a47df3" />
<img width="1463" alt="detailTravel" src="https://github.com/user-attachments/assets/bb701c99-d3bd-4e90-af47-dd42b1db914f" />
