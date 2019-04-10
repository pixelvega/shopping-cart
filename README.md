# Shopping-cart

Creación de un carrito de e-commerce con HTML5, SASS y Vanilla JS

## Instalación

Necesitarás instalar [Node.js](https://nodejs.org/) y [Gulp](https://gulpjs.com), luego:

1. Descarga o clona el repositorio
2. Instala las dependencias locales con `$ npm install`
3. Arranca el proyecto con `$ gulp`

##Requisitos

###Requisitos funcionales

1. Añadir y restar unidades al carrito limitando a 1 unidad mínima de producto.
2. Eliminar un artículo del carrito.
3. Mostrar y ocultar el carrito haciendo click en un botón.

###Requisitos de diseño

1. Ajuste máximo al prototipo dado.

## Explicación del código js

###Recogida y muestra de datos

- Simulación de una petición fetch a un json local.
- Se guardan los datos en una variable global data
- Se agrupan los datos por fechas en un array bidimensional
- Se pintan los datos:
  1. Se crean variables para guardar la lista de items (_listItems_), la cabecera de la lista que muestra la fecha (_header_), el template de cada artículo de la lista (_template_), y la fecha que irá en la cabecera (_date_).
  2. Recorre el array, en la primera iteracción recogemos la fecha y guardamos el contenido del _header_, que mostrará la fecha.
  3. Recorre los elementos de la segunda dimensión del array con bucle for:
     - Recorre cada item para asignar los valores de las propiedades de cada objeto del array como contenido y datos a cada elemento html guardados en la variable _template_.
     - Guarda el contenido del template en la variable _listItems_ en cada iteración.
     - Comprueba si es el último elemento del array y guarda en la variable _cartList_ la cabecera de la lista, todos los items de la lista y añade el cierre de la lista para entrar en la siguiente iteración de la primera dimensión.
  4. Al finalizar todas las iteraciones pinta todo el contenido en el DOM.
  5. Añade los eventos listener a cada botón para sumar/restar unidades y para eliminar cada item.

###Eventos

- Añadir unidades de producto:
  1. Recoge el id del botón a través de un atributo data que es igual a la id única del item.
  2. Guarda en una variable la referencia al elemento html donde se muestran las unidades del producto también a través de su atributo data-id, que es igual al del botón y el del item.
  3. Recorre los datos (array de objetos) almacenados en la variable data y busca el item que se corresponde con el valor del atributo data-id y suma una unidad a la propiedad del objeto que cumple esta condición.
  4. Actualiza el contenido del elemento HTML referenciado.
  5. Llama a las funciones pra actualizar el total y subtotal, y el total de artículos del carrito.
- Restar unidades de producto:
  - Se realizan las mismas operaciones pero se añade la condición de que la cantidad de unidades mínima del producto sea igual a 1.
- Eliminar un item:
  1. Recoge el id del producto a través del atributo data-id que guarda el botón.
  2. Referencia el elemento del DOM que coincide con esa misma id.
  3. Referencia al elemento padre de éste.
  4. Recorre data, y cuando encuentra el item que coincide con la id, elimina el elemento, a través de su padre.
  5. Para eliminar la cabecera y el elemento <ul> cuando ya no hay items que se correspondan con esa fecha:
     - Comprueba si hay un hijo o menos con la propiedad _length_ (cada elemento dentro del _ul_ es un hijo, por lo que si sólo queda la cabecera _h5_ tendrá un hijo aunque no queden items).
     - Si se cumple esta condición, elimina el elemento padre (la _ul_).
     - Actualiza data.
     - Llama a la función que obtiene y repinta el total de artículos, y la función que calcula y repinta el total y subtotal de la cuenta.

###Funciones

- Mostrar el total de artículos:

  - Esta función recibe data, recorre cada item y guarda en una variable el total de unidades de todos los artículos.
  - Pinta en el elemento referenciado del DOM el valor de esa variable.

- Mostrar el total y el subtotal de la cuenta:
  - Recorre data y guarda en una variable el resultado de operar las unidades de cada item por el precio de éste, este dato es el subtotal.
  - El total se obtiene de aplicar un descuento del 30% al subtotal.
  - Pinta en los elementos del DOM estos valores reduciendo los decimales del producto a dos con el método _toFixed()_.

##Estilos css:

- Sistema **GRID** de css para crear la rejilla del layout:

  - Se ha escogido este sistema para no alterar el orden natural de lectura de los elementos del DOM.
  - En el elemento padre se asignan las diferentes áreas o celdas de contenido que tendrá la rejilla, y posteriormente a los hijos se les asigna un área determinada.
    Igual que con las propiedades de flexbox o float se pueden posicionar los elementos tomando como referencia el contenedor padre, en este caso el área asignada.

- Uso de **flexbox** para posicionar los elementos en línea.

- Uso de **Animación** para la transición del overlay cuando se muestra el carrito.

- Uso de **transición de posición** para mostrar u ocultar el carrito.

- Uso de **mixins** de sass para la tipografía.

- **Media queries** con breakpoint en 768px para la versión Desktop.

- Uso de **variables** para los colores definidos en el prototipo.
