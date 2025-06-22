# 🎰 Proyecto Casino “La Rula te Seca”

> Aplicación de consola en TypeScript que simula un Casino con tres juegos: Tragamonedas, Ruleta y Mayor o Menor.  
> Proyecto creado como ejercicio práctico en un curso de programación web full-stack.

---

## 📋 Índice

1. [Descripción](#-descripción)  
2. [Características](#-características)  
3. [Tecnologías](#-tecnologías)  
4. [Estructura del proyecto](#-estructura-del-proyecto)  
5. [Instalación](#-instalación)  
6. [Uso](#-uso)  
7. [Scripts disponibles](#-scripts-disponibles)  
8. [Cómo contribuir](#-cómo-contribuir)  
9. [Licencia](#-licencia)  

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



- **`src/`**: código fuente en TypeScript.  
- **`ClasePrincipal/Casino.ts`**: clase Singleton que almacena y gestiona el saldo.  
- **`Juegos/*`**: cada juego en su propia carpeta, con su menú y lógica.  
- **`utils/`**: funciones de lectura/escritura de archivos y manejo de errores.  
- **`main.ts`**: punto de entrada y menú principal.  

---

## 🚀 Instalación

1. Clona el repositorio:
   ```markdown
   git clone https://github.com/tu-usuario/proyecto-casino.git

   ```

2. Instala dependencias:

   ```bash
   npm install
   ```
3. Asegúrate de tener creado el archivo de saldo (opcional, se creará al guardar por primera vez):

   ```bash
   echo "0" > saldo.txt
   ```

---

## ▶️ Uso

Inicia la aplicación con:

```bash
npm start
```

Verás el menú principal en consola. Navega ingresando el número de opción y ¡disfruta del Casino!

---

## 🧩 Scripts disponibles

| Comando         | Descripción                                        |
| --------------- | -------------------------------------------------- |
| `npm start`     | Ejecuta `ts-node src/main.ts`                      |
| `npm run build` | Compila TypeScript a JavaScript (si lo configuras) |

> **Nota**: en un entorno educativo puede que no tengas aún configurado un `build` completo.

---

## 🤝 Cómo contribuir

1. Haz un **fork** del repositorio.
2. Crea una **rama** (`git checkout -b feature/nombre-feature`).
3. **Commit** tus cambios (`git commit -m 'Agrega nueva funcionalidad'`).
4. **Push** a la rama (`git push origin feature/nombre-feature`).
5. Abre un **Pull Request**.

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

> 📝 **Tip:**
>
> * Mantén actualizado el README conforme avances en el curso.
> * Añade capturas de pantalla si luego planeas migrar a una interfaz gráfica.
> * Si el proyecto crece, separa la sección de [Documentación detallada](#) en un Wiki o carpeta `docs/`.

```

---

### ¿Cómo usar esta plantilla?

1. **Copia** el contenido a un archivo `README.md` en la raíz de tu proyecto.  
2. **Reemplaza** los fragmentos entre comillas o los ejemplos (`tu-usuario`, rutas, descripciones).  
3. **Añade** o quita secciones según tus necesidades (por ejemplo, si no usas tests, elimina esa parte).  
4. A medida que aprendas nuevas prácticas, puedes **completar** apartados como “Tests”, “Despliegue” o “CI/CD”.  

¡Listo! Con esto tendrás un README claro, completo y adaptado a un proyecto de curso inicial.
```

