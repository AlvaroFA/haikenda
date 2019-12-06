# HaiKenda

**Aplicación Web para Xestión de quendas de traballo**

Proxecto Final de Ciclo Superior de FP Desenvolvemento de Aplicións Web, feito con React e Firebase

## Pricipáis librerías utilizadas
 
| Libraria | Descripción |
| ------------- | ------------- |
| `create-react-app` | Permite creación de forma rápida e sinxela de esquemas para proxectos en React. Utilizada sólo durante o desenrolo, non se empaqueta. |
| `fullcalendar`  | JavaScript Calendar open source |
| `firebase` | Conten a funcionalidade necesaria de comunicación co backend.
| `react-router-dom` | Xestión do enrutado durante a navegación na aplicación.

## Primeiros pasos

### Instalación do runtime

Para o desenrolo, é necesario instalar o runtime de node:

* [`node v12.13.1`](https://nodejs.org/es/download/)
    * [Manual de instalacion de node.js](https://github.com/nodesource/distributions/blob/master/README.md) na maioria dos sistema operativos
    * Unha vez instalado executamos `node -v` para verificar que a instalación foi realizada correctamente.

* [`npm v6.12.1`](https://www.npmjs.com/get-npm)
    * A instalacion de npm xa ven incluida en node.js.
    * Para verificar a correcta instalacion, executamos `npm --v`, con isto obtemos a versión instalada.

### Instalación das dependencias NPM

Unha vez verificadas ambas librerias estén correctas:
* `npm install` - Descarga e instalación as librarias necesarias declaradas no [`package-lock.json`](package-lock.json). 

### Execución da aplicación

* `npm start` -  Inicia un servidor en local, desplegando nel a aplicación web
* `npm run-script build` - Xera o bundle de tódolos assets necesarios na carpeta [`build`](build)


### Configuración de Firebase

#### Creación do proxecto en Firebase

Dita creación esta explicada na seguinte ligazón https://firebase.google.com/docs/web/setup#create-firebase-project

#### Rexistro da aplicación 

Para que o correcto uso de Firebase hai que rexistrar a aplicación, dito procedemento ven descrito na seguinte ligazón https://firebase.google.com/docs/web/setup#register-app

A configuración do teu proxecto debe gardarse en [`src/components/firebase/config.js`](src/components/firebase/config.js)

Estes parámetros de configuración proporcionaranse durante o seu rexistro, aínda que tamén se poden obter despóis [seguindo estes pasos](https://support.google.com/firebase/answer/7015592)

Máis información sobre este [obxecto de configuración de Firebase aquí](https://firebase.google.com/docs/web/setup#config-object)

#### Autenticación

Na consola de Firebase `Authentication` > `Métodos de Inicio de sesión` habilitamos os proveedores `Correo electrónico/contraseña` e `Anónimo`

Esto vainos permitir autenticarnos con usuario email e contrasinal.

#### Autorización para o acceso á base de datos

Na consola de Firebase `Database` > `Reglas` copia o contido de [`firebase_db_rules`](firebase_db_rules)

Esto permitirá protexer os datos, de forma que sólo os usuarios rexistrados poidan lelos, e solo os administradores poidan editalos.

#### Datos mínimos iniciais da base de datos

Para poder acceder á aplicación, vai ser necesario polo menos un usuario administrador.
Vai á sección de Authentication da túa consola de firebase, e registra o teu usuario administrador con Email e Contrasinal.
A continuación copia o seu UID.

Vai agora á sección de Database, e recrea a estructura que aparece en [`firebase_db_setup_data`](firebase_db_setup_data)

Esto permitirache acceder con este usuario administrador.

#### Despregue da aplicación en Firebase

Unha vez executado a instrucción `npm run-script build` hai que seguir os pasos indicados en https://firebase.google.com/docs/web/setup#install-cli-deploy

Antes de despregar introduce o ID do teu proxecto de Firebase en [`.firebaserc`](.firebaserc)