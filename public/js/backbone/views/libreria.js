var Libreria = Backbone.View.extend({
    // tagName: 'span',                    // Optional
    // className: 'nombreClase',           // Optional
    // id: 'nombreId'                      // Optional

    el: '.vista',

    initialize: function() {
        this.render();           // Se renderiza cada vez que se crea la vista 'Libreria'
    },

    render: function() {
        this.$el.html('<p>Renderizando...</p>')
    }
});