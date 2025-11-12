# 🎵 Cartelera de Músicos

Aplicación web fullstack para visualizar conciertos de artistas, con perfiles personalizados, enlaces multimedia y gestión de usuarios. Permite a los visitantes registrarse, iniciar sesión, explorar perfiles de cantantes y acceder a fechas de conciertos mediante enlaces externos.

---

## 🚀 ¿Cómo correr el proyecto?

### 🔧 Requisitos previos

- Node.js y npm instalados
- MySQL/MariaDB corriendo localmente
- XAMPP (opcional, si usás entorno local con MariaDB)
- Visual Studio Code (recomendado)

### 📦 Instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/astradamanuel/proyecto.cartelera.git
cd proyecto.cartelera

Backend
cd backend
npm install
cp .env.example .env  # Configurar credenciales de MySQL
npm start

Frontend
cd ../frontend
npm install
npm run dev
