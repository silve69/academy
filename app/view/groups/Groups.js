Ext.define('Academy.view.groups.Groups', {
    extend: 'Academy.view.common.ModuleGrid',
    xtype: 'groupsview',

    title: 'Grupos',
    searchableFields: ['nombre', 'disciplina', 'nivel', 'entrenador'],
    store: {
        type: 'groups'
    },

    columns: [{
        text: 'Grupo',
        dataIndex: 'nombre',
        flex: 1.4
    }, {
        text: 'Disciplina',
        dataIndex: 'disciplina',
        flex: 1,
        renderer: function (value) {
            return Academy.util.Renderers.sportTag(value);
        }
    }, {
        text: 'Nivel',
        dataIndex: 'nivel',
        width: 120
    }, {
        text: 'Entrenador',
        dataIndex: 'entrenador',
        flex: 1.1
    }, {
        text: 'Ocupacion',
        width: 180,
        renderer: function (value, meta, record) {
            return Academy.util.Renderers.occupancy(record.get('activos'), record.get('capacidad'));
        }
    }]
});
