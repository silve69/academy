Ext.define('Academy.view.coaches.Coaches', {
    extend: 'Academy.view.common.ModuleGrid',
    xtype: 'coachesview',

    title: 'Entrenadores',
    searchableFields: ['nombre', 'deporte', 'telefono', 'email', 'certificacion', 'estado'],
    store: {
        type: 'coaches'
    },

    columns: [{
        text: 'Entrenador',
        dataIndex: 'nombre',
        flex: 1.2
    }, {
        text: 'Deporte',
        dataIndex: 'deporte',
        flex: 1,
        renderer: function (value) {
            return Academy.util.Renderers.sportTag(value);
        }
    }, {
        text: 'Telefono',
        dataIndex: 'telefono',
        width: 130
    }, {
        text: 'Email',
        dataIndex: 'email',
        flex: 1.3
    }, {
        text: 'Certificacion',
        dataIndex: 'certificacion',
        flex: 1.4
    }, {
        text: 'Estado',
        dataIndex: 'estado',
        width: 110,
        renderer: function (value) {
            return Academy.util.Renderers.statusBadge(value, {
                activo: 'aa-badge-ok',
                inactivo: 'aa-badge-warn'
            });
        }
    }]
});
