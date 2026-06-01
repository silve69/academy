Ext.define('Academy.view.sports.Sports', {
    extend: 'Academy.view.common.ModuleGrid',
    xtype: 'sportsview',

    title: 'Deportes',
    searchableFields: ['nombre', 'descripcion', 'estado'],
    store: {
        type: 'sports'
    },

    columns: [{
        text: 'Deporte',
        dataIndex: 'nombre',
        flex: 1,
        renderer: function (value) {
            return Academy.util.Renderers.sportTag(value);
        }
    }, {
        text: 'Descripcion',
        dataIndex: 'descripcion',
        flex: 2
    }, {
        text: 'Estado',
        dataIndex: 'estado',
        width: 120,
        renderer: function (value) {
            return Academy.util.Renderers.statusBadge(value, {
                activo: 'aa-badge-ok',
                inactivo: 'aa-badge-warn'
            });
        }
    }]
});
