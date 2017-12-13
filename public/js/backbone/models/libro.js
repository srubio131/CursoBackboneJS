var Libro = Backbone.Model.extend({

    urlRoot: '/libros',

    // Se llama cuando se crea una nueva instancia del modelo
    initialize: function () {
        console.log('Se ha creado una nueva instancia');

        // Al utilizar el método "Set" o "Get" se desencadenan dos eventos: change y change:<nombre_atributo>
        // Se queda a la escucha de cambios en el modelo y si hay cambios se ejecuta el callback
        this.on('change', function () {
            console.log('El modelo ha cambiado');
        })
    },

    // Se pueden asignar valores por defecto con la propiedad 'defaults'
    defaults: {
        autor: 'Desconocido'
    }
});

