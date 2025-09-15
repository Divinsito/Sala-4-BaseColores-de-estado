# 📅 GHL Calendario Demo
Django + React | API GoHighLevel | GitHub

Sistema web de integración con **GoHighLevel (GHL)** para la gestión de calendarios y citas.  
Este proyecto implementa una **arquitectura fullstack** que conecta un backend en **Django** con un frontend en **React**, mostrando en tiempo real calendarios y permitiendo la creación de citas.  

Es la **base obligatoria para todas las salas** y demuestra cómo consumir la API de GHL con un **Private Integration Token**.

---

## 📖 Descripción del Proyecto
El sistema ofrece una solución práctica para integrar servicios de **GHL** dentro de una aplicación web propia.  
El backend expone endpoints REST para **listar calendarios** y **crear citas**, mientras que el frontend consume estos endpoints para mostrar los datos en una tabla interactiva y un formulario.  

Además, se incluye un **plus visual**: los calendarios se muestran con colores según su estado:
- 🟢 Activo  
- 🔴 Inactivo  

Este proyecto puede usarse como **plantilla base** para desarrollos más avanzados o para demos rápidas de integraciones con GHL.

---

## 🏗️ Características Principales
- 🔐 **Conexión con GHL** mediante Private Integration Token.  
- 🌐 **API REST en Django** para gestionar calendarios y citas.  
- 🖥️ **Frontend en React** con Vite para desarrollo rápido.  
- 🎨 **Tabla interactiva** con calendarios y estados visuales.  
- 📋 **Formulario simple** para crear nuevas citas.  
- 📱 **Diseño responsivo** que funciona en móviles y tablets.  
- ⚡ **Soporte CORS** para comunicación fluida entre frontend y backend.  

---

## 🚀 Instalación y Configuración

### 🔹 Prerrequisitos
- Python 3.11+  
- Node.js 18+  
- pip (gestor de paquetes de Python)  
- Git  


### 🔹 BACKEND (Django)

- cd ghl-backend
- python -m venv venv

- venv\Scripts\activate      # Windows

- pip install -r requirements.txt
- python manage.py runserver

### 🔹 Frontend (React)

- cd ../ghl-frontend
- npm install
- npm run dev

📁 Estructura del Proyecto

ghl-calendario-demo/
│
├── ghl-backend/         # Código del backend (Django + DRF)
│   ├── core/            # Configuración principal y settings
│   ├── api/             # Endpoints de integración con GHL
│   └── manage.py
│
├── ghl-frontend/        # Código del frontend (React + Vite)
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/       # Vistas principales
│   │   └── App.jsx      # Punto de entrada del frontend
│   └── package.json
│
└── README.md            # Documentación principal



