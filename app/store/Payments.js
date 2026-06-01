Ext.define('Academy.store.Payments', {
    extend: 'Ext.data.Store',
    alias: 'store.payments',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'alumno', type: 'string' },
        { name: 'concepto', type: 'string' },
        { name: 'monto', type: 'number' },
        { name: 'fecha_vencimiento', type: 'string' },
        { name: 'fecha_pago', type: 'string' },
        { name: 'estado', type: 'string' }
    ],

    proxy: {
        type: 'ajax',
        url: 'api/pagos.php',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
