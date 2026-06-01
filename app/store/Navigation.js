Ext.define('Academy.store.Navigation', {
    extend: 'Ext.data.Store',
    alias: 'store.navigation',

    fields: ['route', 'text', 'iconCls', 'disabled'],

    data: [
        { route: 'dashboard', text: 'Dashboard', iconCls: 'aa-icon aa-icon-dashboard' },
        { route: 'students', text: 'Alumnos', iconCls: 'aa-icon aa-icon-students' },
        { route: 'groups', text: 'Grupos', iconCls: 'aa-icon aa-icon-groups' },
        { route: 'schedules', text: 'Horarios', iconCls: 'aa-icon aa-icon-schedules' },
        { route: 'attendance', text: 'Asistencia', iconCls: 'aa-icon aa-icon-attendance' },
        { route: 'payments', text: 'Pagos', iconCls: 'aa-icon aa-icon-payments' },
        { route: 'messages', text: 'Comunicacion', iconCls: 'aa-icon aa-icon-messages' },
        { route: 'sports', text: 'Deportes', iconCls: 'aa-icon aa-icon-sports' },
        { route: 'coaches', text: 'Entrenadores', iconCls: 'aa-icon aa-icon-coaches' },
        { route: 'inventory', text: 'Inventario', iconCls: 'aa-icon aa-icon-inventory' },
        { route: 'reports', text: 'Reportes', iconCls: 'aa-icon aa-icon-reports' }
    ]
});
