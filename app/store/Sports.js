Ext.define('Academy.store.Sports', {
    extend: 'Ext.data.Store',
    alias: 'store.sports',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombre', type: 'string' },
        { name: 'descripcion', type: 'string' },
        { name: 'estado', type: 'string' }
    ],

    proxy: {
        type: 'ajax',
        url: 'api/deportes.php',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
