Ext.define('Academy.store.Messages', {
    extend: 'Ext.data.Store',
    alias: 'store.messages',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'titulo', type: 'string' },
        { name: 'mensaje', type: 'string' },
        { name: 'canal', type: 'string' },
        { name: 'enviado_a', type: 'string' },
        { name: 'fecha_envio', type: 'string' },
        { name: 'estado', type: 'string' }
    ],

    proxy: {
        type: 'ajax',
        url: 'api/comunicacion.php',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
