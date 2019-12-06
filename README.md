# HaiKenda

**Aplicación Web para Xestión de quendas de traballo**

Proxecto Final de Ciclo Superior de FP Desenvolvemento de Aplicións Web, feito con React e Firebase

## Dependencias NPM

- Principais librarias:
 
| Libraria | Descripción |
| ------------- | ------------- |
| fullcalendar  | JavaScript Calendar open source |
| create-react-app | Permite creación de forma rápida e sinxela de esquemas para proxectos en React |
| firebase | Conten a funcionalidade necesaria de comunicación co backend.
| react-router-dom | Xestión do enrutado durante a navegación na aplicación.

## Primeiros pasos

### Instalación do runtime

| Libraria | Versión |
| ------------- | ------------- |
| Node  | v13.1.0 |
| NPM  | 6.13.0 |

* [`node`](https://nodejs.org/es/download/)
    * [Manual de instalacion de node.js](https://github.com/nodesource/distributions/blob/master/README.md) na maioria dos sistema operativos
    * Unha vez instalado executamos `node -v` para verificar que a instalación foi realizada correctamente.

* [`npm`](https://www.npmjs.com/get-npm)
    * A instalacion de npm xa ven incluida en node.js.
    * Para verificar a correcta instalacion, executamos `npm --v`, con isto obtemos a versión instalada.

### Instalación das dependencias

Unha vez verificadas ambas librerias estén correctas, executamos npm install no  directorio onde está albergado o código.
Con isto comenzará a descarga e instalación das librarias necesarias. Unha vez finalizado o proceso, executamos a instrucción 

* `npm start` -  Inicia o servicio en modo desenvolvemento
* `npm run-script build` - Xera o bundle e tódolos assets necesarios

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