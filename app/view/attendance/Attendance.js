Ext.define('Academy.view.attendance.Attendance', {
    extend: 'Academy.view.common.ModuleGrid',
    xtype: 'attendanceview',

    title: 'Asistencia',
    searchableFields: ['alumno', 'fecha', 'estado', 'observaciones'],
    store: {
        type: 'attendance'
    },

    columns: [{
        text: 'Alumno',
        dataIndex: 'alumno',
        flex: 1.4
    }, {
        text: 'Fecha',
        dataIndex: 'fecha',
        width: 130
    }, {
        text: 'Estado',
        dataIndex: 'estado',
        width: 120,
        renderer: function (value) {
            return Academy.util.Renderers.attendanceState(value);
        }
    }, {
        text: 'Observaciones',
        dataIndex: 'observaciones',
        flex: 1.4
    }]
});
