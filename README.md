<a name="readme-top"></a>

# 💼 Users&Posts


<p align="center">
  <img src="https://github.com/angular/angular/blob/main/adev/src/assets/images/press-kit/angular_icon_gradient.gif" alt="angular-logo" width="120px" height="120px"/>
  <br>
  <em>Aplicación web con Angular 18 que implementa un sistema de autenticación con roles y el CRUD de posteos.
    <br>TypeScript - Tailwing - Signals</em>
  <br>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white"/>
  •
  <img src="https://img.shields.io/badge/Jasmine-8A4182?style=for-the-badge&logo=Jasmine&logoColor=white" />
  •
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  •
  <img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />
  •
  <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />
  •
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

## About Users&Posts

Este proyecto es generado con [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4 como aplicación standalone. Implementa un sistema de autenticación basado en roles. Estos roles pueden ser 'user' o 'admin'. Dependiendo del rol, tienen acceso a diferentes funcionalidades, como la visualización, creación o edición de datos obtenidos desde una API externa.

![24shots_so](https://github.com/user-attachments/assets/9df71aad-d5e1-4f65-bf5c-9430fcacad58)

> [!NOTE]
> Hay varios items a destacar, resultado de ser parte de un challange y no una aplicación completa como tal:
> - Simulación de base de datos y llamados a API de usuarios: [Debajo añado las credenciales](#Usuarios-de-prueba) disponibles. En un entorno real, esta simulación no existiría.
> - JWT: Se toma como supuesto que se utiliza un BearerToken, se ha implementado un interceptor que inyecta en la cabecera de las peticiones este token si está disponible.
> - Testing: En algunos componentes como formularios, guards, etc.
 
## 🛠️ Tecnologías utilizadas

- [Angular](https://angular.dev/): Framework principal del proyecto, en su última versión.
- [Tailwind](https://tailwindcss.com/): Framework css para añadir estilos.
- [CSS](https://developer.mozilla.org/es/docs/Web/CSS): Aplicación de css moderno con técnicas como [nesting](https://caniuse.com/css-nesting) o [field-sizing](https://caniuse.com/mdn-css_properties_field-sizing).
- [Lucide Icons](https://lucide.dev/): Librería de iconos.
- [Eslint](https://eslint.org/) y [Prettier](https://prettier.io/): Formato y calidad de código.

## 🚀 Features

- **Responsive Design**: Diseño minimalista, de fácil adaptación atractiva, accesible e intuitiva.
<p align="center">
<img src="https://github.com/user-attachments/assets/823f609d-6a2c-4004-aafa-0e0e4372a489" width='400' align="center">
</p>

- **LazyLoading**: Cada página cuenta con su propia carga perezosa.
- **Standalone Components**: La aplicación esta construida en su totalidad mediante [standalone components](https://angular.dev/guide/components/importing#standalone-components) reduciendo la necesidad de módulos.
- **[Signals](https://angular.dev/guide/signals)**
- **JWT Authentication** (simulada): Bearer Token con injector.
- **Role Guard & Auth Guard**: Protección de rutas.
<p align="center">
<img src="https://github.com/user-attachments/assets/8fdcedba-8f93-4be7-b65b-d32b5188040e" width='400' align="center">
</p>

- **Custom toasts**: Sistema personalizado de toasts (notificaciones).
<p align="center">
<img src="https://github.com/user-attachments/assets/79320b41-6d0f-40ea-a706-08ec8ac583b9" width='500' align="center">
</p>

- **CRUD de posts**:
  - **GET**: Los usuarios "admin" y "user" pueden visualizar los datos obtenidos desde una API externa (por defecto, se utilizó https://jsonplaceholder.typicode.com/).
  - **POST y PATCH: Solo el usuario "admin" puede crear y actualizar datos.**
  - Comunicación con API utilizando el servicio de Angular para realizar solicitudes HTTP
<p align="center">
<img src="https://github.com/user-attachments/assets/8a074fdd-69f2-46cc-94dc-ae848818aa5e" width='400' align="center">
</p>

- **Filtro y paginación**: Implementado mediante signals.
<p align="center">
<img src="https://github.com/user-attachments/assets/594d4349-50f5-42e3-8d23-3198611a24a2" width='600' align="center">
</p>
<br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/f4cf7203-5387-438c-ae77-40a6bd6eae20" width='600' align="center">
</p>

## Usuarios de prueba

- Usuario "admin":
```
Email: admin@test.com
Password: admin123
```

- Usuario "user":
```
Email: user@test.com
Password: user123
```

## Estructura de Carpetas
```bash
src/
├── app/
│   ├── features/                  # Funcionalidades principales
│   │   ├── login/                 # Autenticación
│   │   └── posts/                 # Posts
│   │   │   ├── components/        # Componentes especificos
│   │   │   └── pages/             # Páginas/rutas/vistas
│   ├── shared/                    # Elementos compartidos por todo el sistema
│   │   ├── components/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── layouts/               # Componentes que envuelven el sistema
│   │   ├── models/                # Interfaces y tipos
│   │   ├── services/
│   │   └── utils/                 # Simula la API
│   └── app.routes.ts              # Configuración de rutas protegidas con Lazy Loading
├── environments/                  # Variables de entorno
├── index.html
├── main.ts                        # Bootstrap
└── styles.css                     # Estilos globales y configuración de Tailwind
```

## Instalación y ejecución

> [!WARNING]
> **Node verion**: 	18.19.1 o mayor.

### Instalar dependencias

```
npm install
```

### Servidor local

```
ng serve
```
- Navegar a `http://localhost:4200/`

### Build

```
ng build
```
- Generará el bundle en la carpeta `dist/`

### Tests
```
ng test
```
- Realizado en los componentes más relevantes (Formularios, guards, etc.)
<p align="center">
  <img src="https://github.com/user-attachments/assets/7f387fc6-2338-47f1-b134-db08d620a7a7" width='600' align="center">
</p>
