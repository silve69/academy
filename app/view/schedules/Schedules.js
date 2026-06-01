Ext.define('Academy.view.schedules.Schedules', {
    extend: 'Academy.view.common.ModuleGrid',
    xtype: 'schedulesview',

    title: 'Horarios',
    searchableFields: ['grupo', 'dia', 'lugar'],
    store: {
        type: 'schedules'
    },

    columns: [{
        text: 'Grupo',
        dataIndex: 'grupo',
        flex: 1.4
    }, {
        text: 'Dia',
        dataIndex: 'dia',
        width: 130
    }, {
        text: 'Horario',
        dataIndex: 'hora_inicio',
        width: 170,
        renderer: function (value, meta, record) {
            return Academy.util.Renderers.timeSlot(value, record.get('hora_fin'));
        }
    }, {
        text: 'Lugar',
        dataIndex: 'lugar',
        flex: 1
    }]
});
