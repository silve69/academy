Ext.define('Academy.store.Groups', {
    extend: 'Ext.data.Store',
    alias: 'store.groups',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'nombre', type: 'string' },
        { name: 'disciplina', type: 'string' },
        { name: 'nivel', type: 'string' },
        { name: 'entrenador', type: 'string' },
        { name: 'capacidad', type: 'int' },
        { name: 'activos', type: 'int' }
    ],

    proxy: {
        type: 'ajax',
        url: 'api/grupos.php',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    autoLoad: false
});
