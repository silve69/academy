Ext.define('Academy.store.Coaches', {
    extend: 'Ext.data.Store',
    alias: 'store.coaches',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombre', type: 'string' },
        { name: 'deporte', type: 'string' },
        { name: 'telefono', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'certificacion', type: 'string' },
        { name: 'estado', type: 'string' }
    ],

    proxy: {
        type: 'ajax',
        url: 'api/entrenadores.php',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
