# Basics **BackboneJS**

Ejemplo de un objeto. Crear una instancia del objeto Libro.
```
var primerLibro = new Libro ({
    titulo: 'La Odisea',
    autor: 'Homero',
    categoria: 'Literatura'
});
```

Transformar el objeto en un JSON
```
primerLibro.toJSON();
```

Recuperar el valor de uno de los atributos de la instancia del objeto
```
primerLibro.get('titulo');
primerLibro.get('autor');
```

Modificar el valor de uno de los atributos de la instancia del objeto
```
primerLibro.set('autor','Desconocido');
primerLibro.set({
    titulo: 'l@ od1s3a',
    autor: 'Desconocido'
});
```

## Modelos

```
var Libro = Backbone.Model.extend({

    urlRoot: '/libros',

    // Se llama cuando se crea una nueva instancia del modelo
    initialize: function () {
        console.log('Se ha creado una nueva instancia');

        // Al utilizar el método "Set" o "Get" se desencadenan dos eventos: change y change:<nombre_atributo>
        // Se queda a la escucha de cambios en el modelo y si hay cambios se ejecuta el callback
        this.on('change', function () {
            console.log('El modleo ha cambiado');
        })
    },

    // Se pueden asignar valores por defecto con la propiedad 'defaults'
    defaults: {
        autor: 'Desconocido'
    }
});
```

### Sincronización del modelo con los datos almacenados
Se utiliza la directiva "urlRoot" para solicitudes restfull
> Solo utilizar si el modelo no esta dentro de una colección

```
var Libro = Backbone.Model.extend({
    ...
    urlRoot: '/libros',
    ...
}
```

(GET) Recuperar info del modelo a partir del id:
```
var librouno = new Libro({
    id: '1'
});
librouno.fetch();               // GET /libros/1. Recupera la info de datos.json
librosuno.toJSON();         // Tiene toda la info del libro 1 recuperada del json
```

(POST) Grabar nueva info en el modelo:
```
var libroDos = new Libro({
    titulo: 'Demian',
    autor: 'Herman Hesse',
    categoria: 'Literatura'
}
libroDos.save()             // POST /libros
```

(PUT) Modificar info en el modelo:
```
var libroDos = new Libro({
    titulo: 'Demian',
    autor: 'Herman Hesse',
    categoria: 'Literatura'
}
libroDos.set({
    autor: 'Desconocido'
});
libroDos.save()             // PUT /libros/2
```

(DELETE) Eliminar un modelo:
```
libroDos.destroy();
```

### Validaciones sobre el modelo

```
var Libro = Backbone.Model.extend({
    validate: function(attr) {
        if (!attr.titulo) {
            return 'Debe tener un título!'
        }
    }
});
```

Automáticamente cuando se guarde un modelo se ejecutará la validación.

```
var otroLibro = new Libro();
otroLibro.save();                   // Output: ReferenceError 'Debe tener un título!'

otroLibro.set({
    autor: 'Papito'
});
otroLibro.save();                   // Output: ReferenceError 'Debe tener un título!'

otroLibro.set({
    titulo: 'La luna menguante'
});
otroLibro.save();                   // Output: OK
```

## Vistas

Una vista tiene un atributo (el) que es el elemento DOM donde se almacena la vista.
- Se puede definir 'el' en la vista con los atributos tagName, className, id (o con ninguno)
```
var Libreria = Backbone.View.extend({
    tagName: 'span',                    // Optional
    className: 'nombreClase',           // Optional
    id: 'nombreId'                      // Optional
});
```
El atributo 'el' se visualizaría así:
```
var appView = new Libreria();
appView.el;                         // Output: <span id='nombreId' class="nombreClase"></span>
```

- Se puede definir 'el' en la vista asignandolo a un elemento ya existente del DOM

```
<div class="vista">
</div>
```
```
var Libreria = Backbone.View.extend({
    el: '.vista'            // Pilla el div del index.html que tiene la clase '.vista'
});
```

El atributo 'el' se visualizaría así:
```
var appView = new Libreria();
appView.el;                         // Output: <div class="vista"></div>
```

### $el... o el poder de jQuery

```
var appView = new Libreria();
appView.$el;                    // Output: <div class="vista"></div>

appView.$el.text('Hola mundo con Backbone.js');
appView.$el;                    // Output: <div class="vista">Hola mundo con Backbone.js</div>

appView.$el.css('background','blue');
appView.$el;                    // Output: <div class="vista" style='background-color:blue'></div>

appView.$el.append('<span>Genial</span>');
appView.$el;                    // Output: <div class="vista" style='background-color:blue'><span>Genial</span></div>
```

### Método render()

`Renderiza la vista en la página web`

```
<div class="vista">
</div>
```
```
var Libreria = Backbone.View.extend({
    el: '.vista',

    render: function() {
        this.$el.html('<p>Renderizando...</p>')
    }
});
```

Renderizando una vista...
```
var appView = new Libreria();
appView.render();               // Output: Se pinta dentro de 'el' el contenido de render()
```

### Método initialize()

`Se ejecuta cada vez que creamos una vista`

```
<div class="vista">
</div>
```
```
var Libreria = Backbone.View.extend({
    el: '.vista',

    initialize: function() {
        this.render();           // Se renderiza cada vez que se crea la vista 'Libreria'
    },

    render: function() {
        this.$el.html('<p>Renderizando...</p>')
    }
});
```

Renderizando una vista...
```
var appView = new Libreria();   // Output: Se pinta dentro de 'el' el contenido de render()
```

### Eventos

`Se registran dentro de un hash`

```
<div class="vista">
    <div class="cambiarColor">Cambiar color del texto</div>
</div>
```
```
var Libreria = Backbone.View.extend({
    el: '.vista',

    events: {
        'click .cambiarColor': 'cambiarColor'   // Output: Al hacer click en el div se pinta de rojo
    },

    cambiarColor: function() {
        this.$el.css('color','red');
    }
});
```
