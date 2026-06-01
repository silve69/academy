Ext.define('Academy.store.Attendance', {
    extend: 'Ext.data.Store',
    alias: 'store.attendance',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'alumno', type: 'string' },
        { name: 'grupo_id', type: 'int' },
        { name: 'fecha', type: 'string' },
        { name: 'estado', type: 'string' },
        { name: 'observaciones', type: 'string' }
    ],

    proxy: {
        type: 'ajax',
        url: 'api/asistencia.php',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
