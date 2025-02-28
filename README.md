# SmartMoni - Mobile Banking Simulator 📱

SmartMoni es una aplicación móvil desarrollada con **React Native + Expo** que simula las funcionalidades esenciales de una aplicación de banca móvil.

---

## 📋 Funcionalidades

✅ Consultar saldo de cuentas.  
✅ Visualizar transacciones recientes.  
✅ Realizar transferencias entre cuentas.  
✅ Autenticación con Google (OAuth).  
✅ Manejo de inactividad (user inactivity).  
✅ Soporte multilenguaje (i18n).

---

## 📂 Estructura Principal

```txt
/
├── API/
├── Features/
│   ├── Accounts/
│   ├── Transfers/
│   ├── Auth/
├── Navigation/
├── Core/
├── Types/
├── UI/
├── Hooks/
├── Modules/
├── Contexts/
├── API/
├── Routes/
├── Services/
├── Utils/
└── Types/
```

---

## 🛠️ Requisitos Previos

Antes de ejecutar la app, asegúrate de tener:

- Node.js 22.12.0
- Yarn instalado
- Emulador o dispositivo físico configurado
- `json-server` para servir el mock API

---

## 🔑 Configuración de Variables de Entorno

Para que la aplicación funcione correctamente, es necesario crear un archivo llamado `.env` en la raíz del proyecto.

Este archivo `.env` contiene variables de entorno como la URL de la API y las credenciales necesarias para la autenticación con Google. Por motivos de seguridad, este archivo **no está incluido en el repositorio**.

El archivo `.env` ha sido enviado por correo electrónico. Una vez recibido, simplemente colócalo en la raíz del proyecto, al mismo nivel que el `package.json`, y la app estará lista para ejecutarse.

Si no has recibido el archivo `.env`, por favor avísame para reenviarlo.

---

## 🚀 Instrucciones de Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/ManuGC22/smartmoni.git
cd smartmoni
```

2. Instala las dependencias:

```bash
yarn install
```

3. Crea un archivo `.env` .

4. Ejecuta el mock API:

```bash
yarn mock-api
```

---

## ▶️ Ejecución de la App

### Ejecutar en iOS (si tienes Mac):

```bash
yarn ios
```

### Ejecutar en Android:

```bash
yarn android
```

---

## ✅ Pruebas Unitarias

Para ejecutar los tests unitarios:

```bash
yarn test
```

---

## ⚠️ Notas Importantes

- En Android, la app se conecta al mock API usando:
  ```
  http://10.0.2.2:3001
  ```
- En iOS o Web, usa:
  ```
  http://localhost:3001
  ```

---

## 📜 Tecnologías Clave

| Tecnología             | Uso               |
| ---------------------- | ----------------- |
| React Native + Expo    | Core de la App    |
| TypeScript             | Tipado seguro     |
| Expo Router            | Navegación        |
| Axios                  | Consumo de API    |
| Jest + Testing Library | Pruebas unitarias |
| json-server            | Mock API          |
| Husky + Lint-Staged    | Pre-commit checks |

---

## 📬 Contacto

Para cualquier duda o aclaración sobre la prueba técnica, puedes contactarme a manugc.dev@gmail.com
