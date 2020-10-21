# Consideraciones de la solución

## Componente car-edit

Este componente fue modificado para poder anexarle el DNI de un propietario al vehículo y poder así saber a quién pertenece el vehículo.
Nota: Cabe señalar que este, no realiza la validación de que se tenga en la API (https://thawing-chamber-47973.herokuapp.com/owners) el registro del owner.

## Componente car-list

Este componente fue modificado para permitir observar a parte de la lista de vehículos, un mensaje que contiene la información del DNI del propietario de cada vehículo en caso de que este vehículo esté anexado a un propietario.

## Componente owner-list

Este componente fue creado para poder mostrar la lista de owners ingresados a la API (https://thawing-chamber-47973.herokuapp.com/owners), además para poder realizar la eliminación de varios que sean seleccionados mediante los checkbox.
Nota: Esto último mediante el botón de "Remove Selected Owners" que borra a aquellos que estén seleccionados en ese momento.

## Componente owner-edit

Este componente fue creado para poder editar un owner existente en la API (https://thawing-chamber-47973.herokuapp.com/owners) o para agregar a un nuevo owner.
Nota: Cabe señalar que en la edición aparece el botón de "Delete", mientras que si se va a agregar entonces dicho botón no estaría.

## Shared car.service

Este es un servicio que contiene el CRUD correspondiente a los vehículos. Este se ha modificado para que no apunte a la API https://thawing-chamber-47973.herokuapp.com/cool-cars, puesto que esta tiene problemas de disponibilidad así que se optó por apuntar a la API https://thawing-chamber-47973.herokuapp.com/cars. Así que con este servicio se logra poder hacer las peticiones HTTP de get, put, post y delete hacia la API.

## Shared owner

Este es un servicio que contiene el CRUD correspondiente a los propietarios (owners). Este se ha creado para poder gestionar los propietarios de tal modo que mediante una conexión hacia la API (https://thawing-chamber-47973.herokuapp.com/owners) poder hacer peticiones HTTP de tipo get, put, post y delete.

## Application paths

Las diferentes rutas contenidas en la aplicación son: 
http://localhost:4200/car-list (esta es la ruta por defecto por lo cual puede ser accedida también mediante http://localhost:4200)
http://localhost:4200/owner-list
http://localhost:4200/car-edit/:id (donde ":id" es la id del vehículo a editar)
http://localhost:4200/owner-edit/:id (donde ":id" es la id del owner a editar)

## Considerations

- Cabe aclarar que en el momento de borrar uno o varios propietarios. El sistema procede a borrar su asociación a los diferentes vehículos que este tenga mediante su DNI.

- En el momento de listar los vehículos, se procedió a asociar el DNI del owner del propietario, esto con el fin de identificar inequívocamente al dueño de este.

- Es posible que ocurra inconvenientes al momento de visualizar las imágenes de los vehículos, esto ocurre por posibles problemas del servicio de la API de GIPHY.

# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
