Ext.define('Academy.store.Inventory', {
    extend: 'Ext.data.Store',
    alias: 'store.inventory',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'producto', type: 'string' },
        { name: 'tipo_movimiento', type: 'string' },
        { name: 'cantidad', type: 'int' },
        { name: 'referencia', type: 'string' }
    ],

    proxy: {
        type: 'ajax',
        url: 'api/inventario.php',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
