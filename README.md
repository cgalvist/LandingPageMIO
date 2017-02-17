# MIO Landing Page

Desarrollado con Gulp y AngularJS.

## Ejecutar proyecto por primera vez
Asegúrese de que en el equipo tenga instalado npm y nodejs escribiendo las siguientes órdenes en la linea de comandos. Deberá aparecer el número de versión de cada una:

* node -v
* npm -v

NOTA: si el paquete "node" no se encuentra en los repositorios del sistema, instale el paquete "nodejs-legacy".

Luego se debe ubicar en la carpeta del proyecto y ejecutar el comando "npm install".

Después de unos minutos, se debe instalar Gulp en caso de no estarlo. Para esto se debe ejecutar la orden "sudo npm install -g gulp". Luego de realizarlo se verifica si versión escribiendo la orden "gulp -v".

## Ejecutar
Con Gulp, puede ejecutar el servidor escribiendo `gulp dev` en la linea de comandos para entornos de desarrollo. También puede solo realizar las tareas de optimización escribiendo `gulp`.

## Otros
Para evitar problemas con los tiempos de carga de las imágenes, se recomienda reducir su tamaño. Puede ejecutar esta orden a modo de ejemplo en la carpeta "static/images/photos". No olvide ejecutar el comando `gulp` o `gulp dev` luego de hacer los cambios:

```shell
mogrify -resize 1024 *.jpg
```

## Herramientas y módulos utilizados

### Node
* angular
* angular-material
* angular-ui-router

### Gulp
* gulp-concat
* gulp-uglify
* gulp-imagemin
* imagemin-pngcrush
* gulp-watch
* gulp-connect
