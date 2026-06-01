Ext.define('Academy.store.Schedules', {
    extend: 'Ext.data.Store',
    alias: 'store.schedules',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'grupo', type: 'string' },
        { name: 'dia', type: 'string' },
        { name: 'hora_inicio', type: 'string' },
        { name: 'hora_fin', type: 'string' },
        { name: 'lugar', type: 'string' }
    ],

    proxy: {
        type: 'ajax',
        url: 'api/horarios.php',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
