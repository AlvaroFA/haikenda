# HELLO THERE !!!!

# HaiKenda- Aplicación Web para Xestión de quendas de traballo

Proxecto Final de Ciclo Superior de FP Desenvolvemento de Aplicións Web, feito con React


## Librerias utilizadas

- Principais librarias:
 
| Libraria | Descripción |
| ------------- | ------------- |
| FullCalendar  | JavaScript Calendar open source |
| create react application| Permite creación de forma rápida e sinxela de esquemas para proxectos en React |
| FireBase| Conten a funcionalidade necesaria de comunicación co backend.
|react-router-dom| Xestión do enrutado durante a navegación na aplicación.

## Primeiros pasos

Instalación:

Link de node  https://nodejs.org/es/download/

Link para o manual de instalacion de node.js na maioria dos sistema operativos
https://github.com/nodesource/distributions/blob/master/README.md.

Unha vez instalado executamos node -v para verificar ca instalación foi realizada correctamente.

Link de npm   https://www.npmjs.com/get-npm
A instalacion de npm xa ven incluida en node.js.
Para verificar a correcta instalacion, executamos `npm --v`, con is obtemos a versión instalada.

## Versiones mínimas de librarias
| Libraria | Versión |
| ------------- | ------------- |
| Node  | v13.1.0 |
| NPM  | 6.13.0 |

Unha vez verificadas ambas librerias estén correctas, executamos npm install no  directorio onde está albergado o código.
Con isto comenzará a descarga e instalación das librarias necesarias. Unha vez finalizado o proceso, executamos a instrucción 

`npm start`

## Configuración de Firebase 

### Accedemos a Firebase e creamos o proxecto
A configuración de Firebase para proxecto está na ruta `"src\components\firebase\config.js"`. Neste arquivo tense que poñer a configuracion correspondente o proxecto creado en Firebase
### Regras da Bases de datos
A configuración paraa as regras de permisos na Base de datos de Firebase están ubicada en `"\haikenda\firebase_db_rules"`
```
{
  "rules": {
    "timetable": {
      ".read": "auth!=null && root.child('workers').child(auth.uid).exists()",
      ".write": "auth!=null && root.child('workers').child(auth.uid).child('worker/admin').val()===true"
    },
    "workers": {
      ".read": "auth!=null && root.child('workers').child(auth.uid).exists()",
      ".write": "auth!=null && root.child('workers').child(auth.uid).child('worker/admin').val()===true"
    },
    "workshift": {
      ".read": "auth!=null && root.child('workers').child(auth.uid).exists()",
      ".write": "auth!=null && root.child('workers').child(auth.uid).child('worker/admin').val()===true"
    }
  }
}
```
### Métodos de authenticación 

Na consola de ´firebase/Authentication´ habilitamos os proveedores de inicio de sesión Correo electrónico / contrasinal e anónimo



