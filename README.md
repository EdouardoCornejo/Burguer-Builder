# Burguer Builder

Aplicación de una sola página para **armar una hamburguesa de forma interactiva**: se añaden y quitan ingredientes desde un panel de control y la hamburguesa se redibuja al instante. Cada capa de ingrediente está dibujada con **CSS puro** (`clip-path`, degradados, `box-shadow` y `@keyframes`), así que el proyecto es un ejercicio de **composición de componentes en React, estado y _CSS art_**, hecho con **React + TypeScript + Vite**.

**Demo:** [burguer-builder-two.vercel.app](https://burguer-builder-two.vercel.app)

![Tech](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Tech](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tech](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Tech](https://img.shields.io/badge/CSS3-Art-1572B6?logo=css)
![Tech](https://img.shields.io/badge/ESLint-8-4B32C3?logo=eslint)
![Tech](https://img.shields.io/badge/Prettier-3-F7B93E?logo=prettier)

---

## Tabla de contenidos

- [Burguer Builder](#burguer-builder)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Qué hace el proyecto](#qué-hace-el-proyecto)
  - [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
    - [Requisitos](#requisitos)
    - [Instalación](#instalación)
    - [Scripts](#scripts)
  - [Controles](#controles)
  - [Cómo funciona](#cómo-funciona)
    - [1. `src/App.tsx`](#1-srcapptsx)
    - [2. `components/ingredients/`](#2-componentsingredients)
    - [3. `components/organism/controls/`](#3-componentsorganismcontrols)
    - [4. `components/atoms/`](#4-componentsatoms)
    - [Flujo de la aplicación](#flujo-de-la-aplicación)
  - [Calidad, CI y despliegue](#calidad-ci-y-despliegue)
  - [Tecnologías](#tecnologías)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Personalización](#personalización)
  - [Limitaciones conocidas](#limitaciones-conocidas)
  - [Licencia](#licencia)

---

## Qué hace el proyecto

- **Cinco ingredientes**: lechuga (`salad`), bacon (`beacon`), queso (`cheese`), carne (`meat`) y tomate (`tomato`).
- **Añadir** cualquier ingrediente tantas veces como se quiera; las capas se apilan en orden entre los dos panes.
- **Quitar** un ingrediente elimina su **primera aparición** en la pila.
- **Reiniciar** la hamburguesa con el icono junto al título, que gira al pulsarlo.
- **Animaciones**: cada capa nueva "cae" con `layer-drop`, y un aviso animado ("¡Agrega ingredientes!") aparece cuando la hamburguesa está vacía.
- **Ingredientes dibujados con CSS**: formas con `clip-path`, degradados y pseudo-elementos, sin imágenes en la pila.
- **_Responsive_** (por debajo de 600px) y respeto de `prefers-reduced-motion`.

---

## Cómo ejecutar el proyecto

### Requisitos

- **Node.js 22 o superior** (`engines` en `package.json`; la CI usa Node 24).
- **Yarn Classic** 1.x (el repo incluye `yarn.lock`).

### Instalación

```bash
git clone git@github.com:EdouardoCornejo/Burguer-Builder.git
cd Burguer-Builder
yarn
yarn dev
```

Vite sirve la app en `http://localhost:5173` con recarga en caliente.

### Scripts

| Comando             | Comando real                                                   | Qué hace                                       |
| ------------------- | -------------------------------------------------------------- | ---------------------------------------------- |
| `yarn dev`          | `vite`                                                         | Servidor de desarrollo con HMR.                |
| `yarn build`        | `tsc && vite build`                                            | Comprueba tipos y genera el bundle en `dist/`. |
| `yarn preview`      | `vite preview`                                                 | Sirve localmente el build de producción.       |
| `yarn lint`         | `eslint . --report-unused-disable-directives --max-warnings 0` | Lint; falla con cualquier warning.             |
| `yarn lint:fix`     | `eslint . --report-unused-disable-directives --fix`            | Lint aplicando correcciones automáticas.       |
| `yarn format:fix`   | `prettier --write .`                                           | Formatea todo el proyecto.                     |
| `yarn format:check` | `prettier --check .`                                           | Comprueba el formato (lo usa la CI).           |
| `yarn prepare`      | `husky`                                                        | Instala los Git hooks tras `yarn install`.     |

---

## Controles

| Elemento                  | Acción                                              |
| ------------------------- | --------------------------------------------------- |
| **Add** (en cada fila)    | Añade una capa de ese ingrediente a la hamburguesa. |
| **Remove** (en cada fila) | Quita la primera capa de ese ingrediente.           |
| Icono de reinicio (↻)     | Vacía la hamburguesa y lanza la animación de giro.  |

---

## Cómo funciona

### 1. `src/App.tsx`

Es el contenedor: guarda todo el estado y el _layout_ del pan.

- **`AVAILABLE_INGREDIENTS`** — lista fija de tipos que se muestran en el panel.
- **`ingredients`** (`useState<string[]>`) — la pila real, con repeticiones y en orden. Es la única fuente de verdad.
- **`addIngredient`** — añade el ingrediente al final del array.
- **`removeIngredient`** — filtra el array descartando solo el índice de la primera aparición (`ingredients.indexOf(ingredient)`).
- **`restartBurger`** — vacía la pila y añade la clase `rotate` al icono `.restart`, retirándola en `animationend`.

### 2. `components/ingredients/`

**`Ingredients`** recorre la pila y pinta un `<div className={`${ingredient} layer-in`}>` por capa. `ingredients.css` define las clases `.salad`, `.beacon`, `.cheese`, `.meat` y `.tomato`: **el identificador del ingrediente es a la vez dato, clave de imagen y nombre de clase CSS**.

### 3. `components/organism/controls/`

**`Controls`** construye el mapa `ingredientsImages` (iconos PNG de `src/assets`) y renderiza una fila por ingrediente disponible: icono + etiqueta + botones.

### 4. `components/atoms/`

- **`Icons`** — `<img>` del ingrediente a partir del mapa de imágenes.
- **`Buttons`** — par **Add** / **Remove** que invoca los _callbacks_ `addIngredient` y `removeIngredient` recibidos por _props_.

### Flujo de la aplicación

```
main.tsx
  └─ App  (useState: ingredients[])
       ├─ título + icono ↻ ── onClick → restartBurger() → setIngredients([])
       ├─ bread-top
       ├─ Ingredients ← ingredients        → un <div class="meat layer-in"> por capa
       ├─ bread-bottom
       └─ Controls ← AVAILABLE_INGREDIENTS, addIngredient, removeIngredient
            └─ por ingrediente: Icons + "Ingredient X" + Buttons
                                                      ├─ Add    → addIngredient(x)
                                                      └─ Remove → removeIngredient(x)
```

---

## Calidad, CI y despliegue

- **ESLint + Prettier** con `lint-staged`: el _pre-commit_ de Husky (`.husky/pre-commit`) formatea y lintéa los archivos en _stage_.
- **CI** (`.github/workflows/ci.yml`) — en cada push y PR a `main`, con Node 24: `yarn install --frozen-lockfile`, `format:check`, `lint` y `build`.
- **Deploy** (`.github/workflows/deploy.yml`) — en cada push a `main` repite la verificación y, si pasa, despliega en producción con la Vercel CLI (`vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`). Necesita los _secrets_ `VERCEL_TOKEN`, `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID`.
- `vercel.json` desactiva los despliegues automáticos de la integración Git de Vercel, de modo que el único camino a producción es el workflow.

---

## Tecnologías

- **React 18** — componentes y `useState`.
- **TypeScript** (`strict`) — _props_ tipadas.
- **Vite 5** — servidor de desarrollo y build.
- **CSS3** — formas con `clip-path`, degradados, `box-shadow` y `@keyframes`; un `.css` por componente (clases globales, sin CSS Modules).
- **ESLint**, **Prettier**, **Husky**, **lint-staged**, **GitHub Actions**, **Vercel CLI**.

---

## Estructura del proyecto

```
Burguer-Builder/
├── .github/workflows/
│   ├── ci.yml                    # Verificación en push/PR
│   └── deploy.yml                # Verificación + deploy a Vercel
├── .husky/pre-commit
├── public/
│   └── hamburger-burger.svg      # Favicon
├── src/
│   ├── assets/                   # Iconos PNG de ingredientes + renew.svg
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── ctrlBtn/          # Buttons.tsx + buttons.css
│   │   │   └── Icons/            # Icons.tsx + icons.css
│   │   ├── ingredients/          # Ingredients.tsx + ingredients.css (formas CSS)
│   │   ├── organism/
│   │   │   └── controls/         # Controls.tsx + controls.css
│   │   └── index.ts
│   ├── App.tsx                   # Estado, lógica y pan
│   ├── App.css                   # Pan, semillas y animaciones
│   ├── index.css                 # Estilos globales
│   └── main.tsx
├── eslint.config.js
├── index.html
├── vercel.json
├── vite.config.ts
└── package.json
```

---

## Personalización

| Qué                        | Dónde                                        | Por defecto                                   |
| -------------------------- | -------------------------------------------- | --------------------------------------------- |
| Ingredientes disponibles   | `AVAILABLE_INGREDIENTS` en `App.tsx`         | `salad`, `beacon`, `cheese`, `meat`, `tomato` |
| Forma/colores de cada capa | `ingredients.css`                            | Una clase por ingrediente                     |
| Animación de entrada       | `@keyframes layer-drop` en `ingredients.css` | `0.45s`                                       |
| Tamaño del lienzo          | `.box` en `App.css`                          | `500px × 450px` (`90%` × `300px` en móvil)    |

> Para añadir un ingrediente hay que tocar varios sitios: `AVAILABLE_INGREDIENTS`, el mapa `ingredientsImages` de `Controls` (con su PNG en `src/assets`) y una clase CSS con el mismo nombre en `ingredients.css`.

---

## Limitaciones conocidas

- El bacon se llama `beacon` en los datos, el asset (`beacon.png`) y la clase CSS; el proyecto mezcla también `burger` y `burguer`.
- `Ingredients` usa el índice como `key`.
- La interfaz `IngredientImages` de `Icons` no incluye `tomato` y se resuelve con un _cast_.
- `restartBurger` manipula el DOM directamente (`document.querySelector` + `classList`) en lugar de usar estado o `ref`.
- No hay tests.

---

## Licencia

Proyecto de uso libre con fines educativos y de práctica.
