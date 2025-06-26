# 🎰 Proyecto Casino “La Rula te Seca”

> Aplicación de consola en TypeScript que simula un Casino con tres juegos: Tragamonedas, Ruleta y Mayor o Menor.  
> Proyecto creado como ejercicio práctico en un curso de programación web full-stack.

---

## 👥 Equipo de desarrollo

- **Santiago Casal** (@santysnk)  
- **Vanina Labrunee** (@VaninaL)

---

## 📋 Índice

1. [Descripción](#-descripción)  
2. [Equipo de desarrollo](#-equipo-de-desarrollo)  
3. [Características](#-características)  
4. [Tecnologías](#-tecnologías)  
5. [Estructura del proyecto](#-estructura-del-proyecto)  
6. [Instalación](#-instalación)  
7. [Uso](#-uso)  
8. [Scripts disponibles](#-scripts-disponibles)  
9. [Recursos del proyecto](#-recursos-del-proyecto)   

---

## 📌 Descripción

Breve explicación de qué hace la aplicación, para qué sirve y el contexto educativo:

- Simula un Casino de consola donde el usuario puede:
  - Cargar créditos.  
  - Jugar a Tragamonedas (dos variantes: Frutas y Bar).  
  - Jugar a Mayor o Menor con cartas.  
  - Jugar a la Ruleta (número, color, par/impar).  
- Guarda el saldo entre sesiones en un archivo de texto.

---

## ✨ Características

- Patrón **Singleton** para gestionar el saldo global del jugador.  
- Juegos implementados siguiendo una **interfaz común** (`IJuego`).  
- Sistema de menús en consola con `readline-sync`.  
- Persistencia de saldo en `saldo.txt`.  
- Lógica de juego modular: carpeta `Juegos` con subcarpetas para cada juego.  

---

## 🛠 Tecnologías

- **TypeScript**  
- **Node.js** (>= 14.x)  
- [readline-sync](https://www.npmjs.com/package/readline-sync)  
- [random-js](https://www.npmjs.com/package/random-js)  
- **ts-node** para ejecutar directamente sin compilar.  

---

## 📁 Estructura del proyecto

```

📦src
┣ 📂ClasePrincipal
┃ ┗ 📜Casino.ts
┣ 📂Juegos
┃ ┣ 📂Tragamonedas
┃ ┃ ┣ 📂Clases
┃ ┃ ┃ ┣ 📜AbsTragamonedas.ts
┃ ┃ ┃ ┣ 📜TragamonedasBar.ts
┃ ┃ ┃ ┗ 📜TragamonedasFrutas.ts
┃ ┃ ┗ 📂Menu
┃ ┃   ┣ 📜menuTragamonedas.ts
┃ ┃   ┣ 📜menuBar.ts
┃ ┃   ┗ 📜menuFrutas.ts
┃ ┣ 📂Ruleta
┃ ┃ ┣ 📜ruleta.ts
┃ ┃ ┗ 📜menuRuleta.ts
┃ ┗ 📂mayorMenor
┃     ┣ 📜mayorMenor.ts
┃     ┗ 📜menuMayorMenor.ts
┣ 📂utils
┃ ┣ 📜ArchivoTxt.ts
┃ ┗ 📜ManejadorErrores.ts
┣ 📜InterfaceJuego.ts
┗ 📜main.ts
📜package.json
📜tsconfig.json

```

- **`src/`**: código fuente en TypeScript.  
- **`ClasePrincipal/Casino.ts`**: clase Singleton que almacena y gestiona el saldo.  
- **`Juegos/*`**: cada juego en su propia carpeta, con su menú y lógica.  
- **`utils/`**: funciones de lectura/escritura de archivos y manejo de errores.  
- **`main.ts`**: punto de entrada y menú principal.  

---

## 🚀 Instalación

1. Clona el repositorio:
   ```
   git clone https://github.com/tu-usuario/proyecto-casino.git
   ```

2. Instala dependencias:

   ```
   npm install
   ```
3. Asegúrate de tener creado el archivo de saldo (opcional, se creará al guardar por primera vez):

   ```
   > saldo.txt
   ```

---

## ▶️ Uso

Inicia la aplicación con:

```
npm start
```

Verás el menú principal en consola. Navega ingresando el número de opción y ¡disfruta del Casino!

---

## 🧩 Scripts disponibles

| Comando         | Descripción                                                    |
| --------------- | -------------------------------------------------------------- |
| `npm start`     | Ejecuta el proyecto directamente con `ts-node src/main.ts`.    |
| `npm run build` | Compila todo el TypeScript de `src/` a JavaScript en `dist/` usando `tsc`. |

> **Nota**:  
> - Durante el desarrollo puedes seguir usando `npm start` con **ts-node**.  
> - Si prefieres trabajar con los archivos `.js` resultantes (por ejemplo, para revisarlos o compartirlos), ejecuta `npm run build` y encontrarás el JavaScript generado en la carpeta `dist/`.  

---

## 📋 Recursos del proyecto

### 🔐 Acceso al repositorio (público)  


### 📊 Acceso al Project Board (GitHub Projects)  
https://github.com/users/santysnk/projects/1  
> El board es independiente del repositorio. Estos mismos cuatro usuarios pueden verlo y gestionarlo:  
> - **Braian Aued** (`auedBraian`)  
> - **Santiago Casal** (`santysnk`)  
> - **docentefip** (`docentefip`)  
> - **Vanina Labrunee** (`VaninaL`)  

### 📂 Otros recursos con acceso restringido

- **Diagrama de clases (Google Drive)**  
  https://drive.google.com/file/d/1vGcDIswa6QSm65mlJU17ybUjWCR7KoLF/view?usp=sharing  
  > Solo para:  
  > - docentefip@gmail.com  
  > - talento.cepit@normaltandil.edu.ar  
  > - **Vanina Labrunee** (`VaninaL`)
  > - **Santiago Casal** (`santysnk`)  

- **Hoja de pruebas de funcionalidad (Google Sheets)**  
  https://docs.google.com/spreadsheets/d/16XljvDeYndlTsZMwNvMAoXfqKyhaBW1bmgQAvCX-hB0/edit?usp=sharing  
  > Solo para:  
  > - docentefip@gmail.com  
  > - talento.cepit@normaltandil.edu.ar  
  > - **Vanina Labrunee** (`VaninaL`)
  > - **Santiago Casal** (`santysnk`)

- **Documentación Proyecto de programa Casino (Google Sheets)**  
  https://docs.google.com/document/d/1CEpoDkQXUuhO8Q9LQ48e8CkFYeeOL-I0AvUh0YzwKUQ/edit?usp=drive_link 
  > Solo para:  
  > - docentefip@gmail.com  
  > - talento.cepit@normaltandil.edu.ar  
  > - **Vanina Labrunee** (`VaninaL`)
  > - **Santiago Casal** (`santysnk`) 
  

---




