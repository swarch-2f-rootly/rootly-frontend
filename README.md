# plantapp-frontend
Frontend repository for PlantApp - created and managed with terraform
# 🌱 ROOTLY - Sistema de Monitoreo Agrícola

<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.0-purple?style=for-the-badge&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.0-blue?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Framer_Motion-11-pink?style=for-the-badge&logo=framer" alt="Framer Motion">
</div>

## 📋 Descripción

ROOTLY es una plataforma de monitoreo agrícola de próxima generación que permite a los agricultores optimizar sus cultivos mediante el análisis de datos en tiempo real. El sistema captura información de sensores IoT, procesa los datos y genera reportes analíticos para facilitar la toma de decisiones.

## ✨ Características

### 🔧 **Funcionalidades Principales**
- **Monitoreo en Tiempo Real**: Visualización de datos de sensores con gráficos interactivos
- **Métricas Agrícolas**: Seguimiento de temperatura, humedad y sensores activos
- **Dashboard Interactivo**: Panel de control con animaciones fluidas y efectos visuales
- **Responsive Design**: Optimizado para dispositivos móviles y desktop
- **Animaciones Avanzadas**: Efectos de scroll, hover y transiciones suaves

### 🎨 **Características de Diseño**
- **Tema Natural**: Paleta de colores inspirada en la naturaleza (verdes, aguamarina, azules)
- **Efectos Visuales**: Split text, count up, click spark, true focus y rotating text
- **Glassmorphism**: Efectos de vidrio y transparencias modernas
- **Gradientes Dinámicos**: Fondos con transiciones suaves entre colores
- **Iconografía Consistente**: Iconos de Lucide React para una experiencia visual coherente

## 🚀 Tecnologías Utilizadas

### **Frontend**
- **React 19** - Framework principal con TypeScript
- **Vite 5.0** - Herramienta de construcción y desarrollo
- **Tailwind CSS** - Framework de utilidades CSS
- **Framer Motion** - Biblioteca de animaciones
- **Lucide React** - Iconos modernos y consistentes

### **Animaciones y Efectos**
- **React Spring** - Animaciones basadas en física
- **React Intersection Observer** - Detección de elementos en viewport
- **Custom Components** - Componentes personalizados para efectos especiales

### **Herramientas de Desarrollo**
- **TypeScript** - Tipado estático para mayor robustez
- **PostCSS** - Procesamiento de CSS
- **ESLint** - Linting de código
- **Prettier** - Formateo de código

## 📦 Instalación

### **Prerrequisitos**
- Node.js 18+ 
- npm o yarn

### **Pasos de Instalación**

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/rootly-frontend.git
cd rootly-frontend
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o
yarn dev
```

4. **Abrir en el navegador**
```
http://localhost:3000
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── Hero.tsx         # Sección principal con navegación y dashboard
│   ├── CollaborationSection.tsx  # Sección de colaboración
│   ├── Footer.tsx       # Pie de página con CTA
│   ├── StatsSection.tsx # Sección de métricas
│   └── BackgroundElements.tsx    # Elementos de fondo animados
├── App.tsx              # Componente principal
├── App.css              # Estilos globales y variables CSS
├── main.tsx             # Punto de entrada de la aplicación
└── index.css            # Estilos base
```

## 🎯 Componentes Principales

### **Hero Section**
- Navegación integrada con logo ROOTLY
- Título principal con efecto split text
- Botones de acción con efectos click spark
- Dashboard de monitoreo en tiempo real
- Métricas de sensores con animaciones

### **Collaboration Section**
- Texto rotativo con palabras dinámicas
- Lista de sensores con búsqueda
- Efectos de scroll y animaciones de entrada

### **Footer**
- Call-to-action con gradientes
- Efectos de fondo animados
- Botones con efectos hover

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run preview      # Vista previa de la construcción
npm run lint         # Linting del código

```

<div align="center">
  <p>Hecho con ❤️ para revolucionar la agricultura</p>
  <p>🌱 ROOTLY - Donde la tecnología encuentra la naturaleza</p>
</div>