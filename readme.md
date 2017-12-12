# Basics **BackboneJS**

## Modelos

Ejemplo de un modelo. Crear una instancia del modelo Libro.
```
var primerLibro = new Libro ({
    titulo: 'La Odisea',
    autor: 'Homero',
    categoria: 'Literatura'
});
```

Transformar el modelo en un JSON
```
primerLibro.toJSON();
```

Recuperar el valor de uno de los atributos de la instancia del modelo
```
primerLibro.get('titulo');
primerLibro.get('autor');
```

Modificar el valor de uno de los atributos de la instancia del modelo
```
primerLibro.set('autor','Desconocido');
primerLibro.set({
    titulo: 'l@ od1s3a',
    autor: 'Desconocido'
});
```

#### Sincronización del modelo con los datos almacenados
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

#### Validaciones sobre el modelo

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