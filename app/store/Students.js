Ext.define('Academy.store.Students', {
    extend: 'Ext.data.Store',
    alias: 'store.students',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombre', type: 'string', mapping: function (data) { return data.nombre || data.name || ''; } },
        { name: 'edad', type: 'int', mapping: function (data) { return data.edad || data.age || 0; } },
        { name: 'grupo', type: 'string', mapping: function (data) { return data.grupo || data.group || ''; } },
        { name: 'estado', type: 'string', mapping: function (data) { return data.estado || data.status || 'Activo'; } },
        { name: 'asistencia', type: 'int', mapping: function (data) { return data.asistencia || data.attendance || 0; } },
        { name: 'pago', type: 'string', mapping: function (data) { return data.pago || data.payment_status || 'Pendiente'; } }
    ],

    proxy: {
        type: 'ajax',
        url: 'api/alumnos.php',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
