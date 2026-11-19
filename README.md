<div align="center">

  <img src="public/logo+.png" alt="Infocod Logo" width="220" />

  # **Infocod — Plataforma Digital & Arquitectura de Software**
  
  **Sistemas de Información a Medida • Business Intelligence • Inteligencia Artificial**

  [![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-19.2.4-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)](#licencia)

  <p align="center">
    <em>"Tu negocio genera datos todos los días. Nosotros los convertimos en decisiones. Sistemas web invencibles y software de alto rendimiento."</em>
  </p>

  [Sitio Web](https://infocod.codes) • [Explorar Productos](#-ecosistema-de-productos) • [Instalación](#-instalación-y-puesta-en-marcha) • [Arquitectura](#-arquitectura-y-estructura-del-código) • [Contacto](#-contacto--soporte)

</div>

---

## 📌 Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características Principales](#-características-principales)
- [Ecosistema de Productos](#-ecosistema-de-productos)
- [Servicios Especializados](#-servicios-especializados)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura y Estructura del Código](#-arquitectura-y-estructura-del-código)
- [Instalación y Puesta en Marcha](#-instalación-y-puesta-en-marcha)
  - [Opción A: Clonar con Git](#opción-a-clonar-mediante-git)
  - [Opción B: Descargar Archivo ZIP](#opción-b-descargar-como-archivo-zip)
  - [Variables de Entorno](#-configuración-de-variables-de-entorno)
- [Scripts y Comandos Disponibles](#-scripts-disponibles)
- [Seguridad y Buenas Prácticas](#-seguridad-y-blindaje)
- [Licencia](#-licencia)

---

## 🚀 Acerca del Proyecto

**Infocod Web** es la plataforma web oficial de **Infocod**, una firma de ingeniería y consultoría tecnológica enfocada en el desarrollo de software a medida, automatización empresarial y ciencia de datos.

El proyecto está diseñado bajo los estándares más exigentes de la industria moderna:
- **Cero Deuda Técnica:** Código estructurado en TypeScript estricto con tipado completo de extremo a extremo.
- **Rendimiento Extremo:** Optimización de carga (< 50ms de First Contentful Paint) utilizando Server-Side Rendering (SSR) y Static Site Generation (SSG) de Next.js 16.
- **Identidad Visual de Vanguardia:** Paleta cromática corporativa (Azul Eléctrico `#4F8EF7`, Verde Esmeralda `#00C96B` y Morado Profundo `#6C2BFF`), micro-animaciones fluidas con GSAP y shaders interactivos sobre lienzo HTML5 Canvas.

---

## ✨ Características Principales

* 🌐 **Hero Interactivo CyberGrid:** Fondo procedural de malla tridimensional generado dinámicamente con Canvas 2D, que responde en tiempo real a las coordenadas del cursor del usuario mediante física magnética.
* 🌀 **Animaciones Cinematográficas (GSAP + ScrollTrigger):** Transiciones con difuminado (*blur*), zoom adaptativo, desplazamiento de capas en cascada y texto tipo *Scramble* que decodifica caracteres dinámicamente.
* 🛡️ **Blindaje de Código Frontend:** Módulo `SecurityRules` integrado para prevención avanzada de inspección superficial, deshabilitación de selección arbitraria de textos y control de descarga no autorizada de assets.
* 📬 **Sistema de Contacto y Cotización Transaccional:** Integración con backend de correos automáticos vía **SMTP (Nodemailer + Gmail)**, validación estricta con **Zod** y **React Hook Form**.
* ⚡ **Limitador de Tasa (Rate Limiting):** Protección anti-abuso y prevención de spam mediante **Upstash Redis** (`@upstash/ratelimit`).
* 🔒 **Autenticación y Persistencia con Supabase:** Integración SSR mediante `@supabase/ssr` con políticas de seguridad de nivel de fila (Row-Level Security / RLS).

---

## 📦 Ecosistema de Productos

Infocod desarrolla soluciones propietarias listas para producción:

| Producto | Categoría | Estado | Descripción |
| :--- | :--- | :---: | :--- |
| **Agenda+** | *Productividad & Proyectos* | `App Oficial` | Dashboard integral para gestión de tareas, control de proyectos y seguimiento de hábitos sin distracciones con analíticas de productividad en tiempo real. |
| **Masticod** | *POS & ERP Modular* | `En Desarrollo` | Ecosistema de software de Punto de Venta especializado por industrias (abarrotes, farmacias, ferreterías, retail) sin módulos innecesarios. |
| **DataPilot** | *BI & Inteligencia Artificial* | `En Desarrollo` | Plataforma empresarial de Business Intelligence que conecta bases de datos crudas y las transforma en modelos predictivos y tableros interactivos para decisiones directivas. |

---

## 🛠️ Servicios Especializados

El catálogo de servicios de Infocod cubre 9 áreas fundamentales de tecnología:

1. **Sitios Web de Alto Impacto:** Páginas corporativas y landings de alta conversión optimizadas para SEO técnico.
2. **Sistemas Web a Medida:** Paneles administrativos, intranets y plataformas ERP/CRM de uso intensivo.
3. **Apps Móviles:** Aplicaciones nativas y multiplataforma con rendimiento nativo a 60/120 FPS (iOS y Android).
4. **Business Intelligence (BI):** Pipelines ETL automatizados, modelado de datos y paneles ejecutivos.
5. **Inteligencia Artificial (IA):** Implementación de modelos LLM, RAG (Retrieval-Augmented Generation) y visión computacional.
6. **Automatización (RPA):** Bots y flujos autónomos para eliminar tareas operativas manuales y repetitivas.
7. **Cloud & DevOps:** Despliegue de infraestructura elástica en la nube, pipelines CI/CD y monitoreo continuo.
8. **Consultoría IT & Auditoría:** Diagnóstico de arquitecturas existentes, refactorización y resolución de cuellos de botella.
9. **Plataformas SaaS:** Arquitectura multitenant escalable con pasarelas de pago recurrentes y microservicios.

---

## 💻 Stack Tecnológico

### Frontend & Core
* **Framework:** [Next.js 16.2.12](https://nextjs.org/) (App Router, Server Components y Server Actions)
* **Biblioteca UI:** [React 19.2.4](https://react.dev/) + React DOM 19
* **Lenguaje:** [TypeScript 5](https://www.typescriptlang.org/)
* **Estilizado:** [Tailwind CSS v4](https://tailwindcss.com/) + CSS Modules (`.module.css`)
* **Tipografía:** Google Fonts optimizadas vía `next/font` (Sora, Manrope, JetBrains Mono, Outfit, Bebas Neue, Fraunces)
* **Iconografía:** [Lucide React](https://lucide.dev/)

### Animaciones & Gráficos
* **Motor de Animación:** [GSAP 3.15](https://greensock.com/gsap/) (GreenSock Animation Platform) + `ScrollTrigger`
* **Entorno 3D:** [Three.js](https://threejs.org/) (`three` & `@types/three`)
* **Visualización de Datos:** [Recharts](https://recharts.org/) & [Leaflet / React Leaflet](https://react-leaflet.js.org/)

### Backend, Estado & Servicios
* **Base de Datos & Auth:** [Supabase](https://supabase.com/) (`@supabase/supabase-js`, `@supabase/ssr`)
* **Correos Transaccionales:** [Nodemailer](https://nodemailer.com/) (SMTP de Gmail)
* **Rate Limiting & Caché:** [Upstash Redis](https://upstash.com/) (`@upstash/ratelimit`, `@upstash/redis`)
* **Gestión de Estado:** [Zustand 5](https://github.com/pmndrs/zustand)
* **Formularios & Validación:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

### Calidad de Código & Testing
* **Pruebas Unitarias:** [Vitest](https://vitest.dev/) + `jsdom`
* **Pruebas End-to-End:** [Playwright](https://playwright.dev/)
* **Linting & Git Hooks:** ESLint 9, Husky 9, Commitlint (Conventional Commits)

---

## 📂 Arquitectura y Estructura del Código

```text
infocod-web/
├── docs/                        # Documentación interna y reportes de desarrollo
├── e2e/                         # Pruebas automatizadas de extremo a extremo (Playwright)
├── public/                      # Assets estáticos, videos demostrativos e imágenes
│   ├── images/                  # Mascota Chuy, diagramas de procesos e ilustraciones
│   ├── productos/               # Assets de Agenda+, Masticod y DataPilot
│   └── videos/                  # Demostraciones en video de los productos
├── src/
│   ├── app/                     # Next.js App Router (Rutas, páginas y layouts)
│   │   ├── actions/             # Server Actions (envío de correos, cotizaciones)
│   │   ├── contacto/            # Página de cotización y contacto
│   │   ├── nosotros/            # Historia, misión y visión corporativa
│   │   ├── productos/           # Catálogo detallado de productos
│   │   ├── servicios/           # Detalle de áreas de ingeniería
│   │   ├── globals.css          # Variables CSS y tokens de diseño
│   │   ├── layout.tsx           # Layout global con fuentes y reglas de seguridad
│   │   └── page.tsx             # Página de inicio principal (Landing Page)
│   ├── components/              # Componentes de interfaz reutilizables
│   │   ├── CyberGrid/           # Malla cibernética interactiva con Canvas
│   │   ├── Footer/              # Pie de página corporativo
│   │   ├── LiquidTrail/         # Efecto de rastro fluido
│   │   ├── MagneticAura/        # Efecto de atracción magnética de cursor
│   │   ├── Navbar/              # Barra de navegación con indicador de scroll
│   │   ├── PrinciplesFanScroll/ # Sección de principios en abanico interactivo
│   │   ├── ProductsZigZag/      # Slider dinámico de productos en zig-zag
│   │   ├── ScrambleText/        # Animación de decodificación tipográfica
│   │   ├── SecurityRules.tsx    # Blindaje y control de eventos del cliente
│   │   ├── ServicesAccordion/   # Acordeón horizontal de servicios
│   │   ├── TechMarqueeSection.tsx # Carrusel de tecnologías soportadas
│   │   ├── contacto/            # Formularios y selects personalizados
│   │   └── emails/              # Plantillas de correo con React Email
│   ├── store/                   # Stores globales (Zustand)
│   └── utils/
│       └── supabase/            # Clientes de Supabase para Cliente, Servidor y Middleware
├── .gitignore                   # Exclusión de archivos sensibles y temporales
├── commitlint.config.js         # Configuración de mensajes de commit convencionales
├── next.config.ts               # Configuración avanzada de Next.js
├── package.json                 # Dependencias y scripts del proyecto
├── playwright.config.ts         # Configuración del entorno de pruebas E2E
├── tsconfig.json                # Configuración de compilación de TypeScript
└── vitest.config.ts             # Configuración del test runner unitario
```

---

## 📥 Instalación y Puesta en Marcha

### Prerrequisitos
Asegúrate de tener instaladas las siguientes herramientas en tu entorno local:
* **Node.js:** Versión `20.x` o superior recomendada ([Descargar Node.js](https://nodejs.org/)).
* **Gestor de Paquetes Seguro (Recomendado):**
  * ⚡ **pnpm** *(Altamente Recomendado)*: [Instalar pnpm](https://pnpm.io/installation)
  * 🚀 **bun** *(Alternativa Ultra-rápida y Segura)*: [Instalar bun](https://bun.sh/)
  * 🧶 **yarn** *(v4 / Berry)*: [Instalar yarn](https://yarnpkg.com/)
  * 📦 **npm** *(Soportado, ver nota de seguridad abajo)*
* **Git:** Para clonar el repositorio ([Descargar Git](https://git-scm.com/)).

> [!IMPORTANT]
> ### 🔒 Nota de Seguridad en Dependencias (Supply Chain & Malware Prevention)
> En la industria moderna de software, el registro público de npm ha sufrido incidentes de paquetes maliciosos (*typosquatting*, inyecciones de scripts pre/postinstall y ataques a la cadena de suministro).
> 
> Por política de seguridad en **Infocod**, **recomendamos utilizar `pnpm` o `bun`** en lugar del instalador tradicional de npm:
> - **pnpm** aísla el árbol de dependencias mediante un almacén direccionable por contenido (*content-addressable store*) y enlaces duros (*hard links*), bloqueando el acceso a paquetes no declarados (*phantom dependencies*) y previniendo la ejecución oculta de scripts arbitrarios.
> - **bun** ofrece resolución hermética ultrarrápida con validación estricta de manifiesto.
> - Si decides usar **npm**, te recomendamos ejecutar `npm audit` y considerar la bandera `--ignore-scripts` en entornos no controlados.

---

### Opción A: Clonar mediante Git

1. Abre tu terminal y clona el repositorio:
   ```bash
   git clone https://github.com/AlexaDoca58/Infocodweb.git
   ```

2. Entra al directorio del proyecto:
   ```bash
   cd Infocodweb
   ```

3. Instala las dependencias con tu gestor preferido:
   ```bash
   # Opción 1 (Recomendada por seguridad y aislamiento):
   pnpm install

   # Opción 2 (Ultra-rápido con Bun):
   bun install

   # Opción 3 (Yarn):
   yarn install

   # Opción 4 (npm tradicional):
   npm install
   ```

---

### Opción B: Descargar como Archivo ZIP

1. En la parte superior de la página del repositorio en GitHub, haz clic en el botón verde **`Code`** y selecciona **`Download ZIP`**.
2. Descomprime el archivo `.zip` en tu carpeta de preferencia.
3. Abre una terminal dentro de la carpeta descomprimida y ejecuta:
   ```bash
   # Recomendado:
   pnpm install
   # O alternativamente:
   bun install
   ```

---

### 🔑 Configuración de Variables de Entorno

Crea un archivo llamado `.env.local` en la raíz del proyecto basándote en el siguiente esquema:

```env
# ========================================================
# SUPABASE (Base de datos y Autenticación)
# ========================================================
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# ========================================================
# SERVIDOR DE CORREOS (Nodemailer + Gmail SMTP)
# ========================================================
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="465"
SMTP_USER="infocod.codes@gmail.com"
SMTP_PASS="tu_contraseña_de_aplicacion"
CONTACT_EMAIL="infocod.codes@gmail.com"

# ========================================================
# UPSTASH REDIS (Rate Limiting y Prevención de Abuso)
# ========================================================
UPSTASH_REDIS_REST_URL=https://tu-redis.upstash.io
UPSTASH_REDIS_REST_TOKEN=tu_upstash_token
```

---

## ⚡ Scripts Disponibles

Puedes ejecutar el proyecto con cualquiera de los gestores soportados:

| Tarea / Acción | `pnpm` *(Recomendado)* | `bun` | `npm` | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| **Servidor de Desarrollo** | `pnpm dev` | `bun dev` | `npm run dev` | Inicia en `http://localhost:3000` con Fast Refresh. |
| **Compilar para Producción** | `pnpm build` | `bun run build` | `npm run build` | Compila y optimiza la app generando bundles estáticos. |
| **Iniciar en Producción** | `pnpm start` | `bun run start` | `npm run start` | Levanta el servidor Node de producción optimizado. |
| **Análisis de Código (Lint)** | `pnpm lint` | `bun run lint` | `npm run lint` | Ejecuta ESLint para verificar calidad de sintaxis. |
| **Pruebas Unitarias** | `pnpm test` | `bun test` | `npm test` | Ejecuta el test runner con Vitest. |
| **Pruebas E2E** | `pnpm test:e2e` | `bun run test:e2e` | `npm run test:e2e` | Ejecuta pruebas completas de integración con Playwright. |


---

## 🛡️ Seguridad y Blindaje

El proyecto implementa múltiples capas de protección técnica:
* **Protección de Assets e Inspección:** Módulo reactivo [`SecurityRules.tsx`](src/components/SecurityRules.tsx) que previene accesos indebidos a inspección de código y descargas directas de assets propietarios.
* **Row-Level Security (RLS):** Toda consulta a la base de datos PostgreSQL en Supabase respeta políticas granulares de aislamiento de datos.
* **Rate Limiting por IP:** Los formularios públicos cuentan con límites de peticiones por minuto controlados por Redis para evitar inundaciones o spam masivo.
* **Control de Commits con Husky:** Validación automática de mensajes de commit mediante `commitlint` siguiendo la convención de *Conventional Commits* (`feat:`, `fix:`, `docs:`, `chore:`).

---

## 👥 Equipo y Créditos

* **Desarrollo & Arquitectura:** Equipo de Ingeniería de **Infocod**
* **Mascota Oficial:** Chuy el Zorro 🦊

---

## 📄 Licencia

Este proyecto y todo su código fuente, diseño, marcas comerciales y assets visuales son propiedad exclusiva de **Infocod**. Todos los derechos reservados. No está permitida la redistribución, copia o uso comercial no autorizado de los componentes sin previo consentimiento por escrito.

---

<div align="center">
  <sub>Construido con precisión de ingeniería por <strong>Infocod</strong> • 2026</sub>
</div>
