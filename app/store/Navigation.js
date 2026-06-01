Ext.define('Academy.store.Navigation', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.navigation',

    defaultRootProperty: 'children',
    folderSort: false,

    fields: [
        'route',
        'text',
        'iconCls',
        'disabled',
        'sectionIconCls',
        { name: 'leaf', type: 'boolean' },
        { name: 'expanded', type: 'boolean' }
    ],

    root: {
        expanded: true,
        children: [{
            route: 'dashboard',
            text: 'Dashboard',
            iconCls: 'x-fa fa-chart-line',
            leaf: true
        }, {
            text: 'Academia',
            iconCls: 'x-fa fa-futbol',
            expanded: false,
            children: [{
                route: 'students',
                text: 'Alumnos',
                iconCls: 'x-fa fa-user-graduate',
                sectionIconCls: 'x-fa fa-user-graduate',
                leaf: true
            }, {
                route: 'groups',
                text: 'Grupos',
                iconCls: 'x-fa fa-users',
                sectionIconCls: 'x-fa fa-users',
                leaf: true
            }, {
                route: 'sports',
                text: 'Deportes',
                iconCls: 'x-fa fa-medal',
                sectionIconCls: 'x-fa fa-medal',
                leaf: true
            }, {
                route: 'coaches',
                text: 'Entrenadores',
                iconCls: 'x-fa fa-running',
                sectionIconCls: 'x-fa fa-running',
                leaf: true
            }]
        }, {
            text: 'Operacion',
            iconCls: 'x-fa fa-clipboard-list',
            expanded: false,
            children: [{
                route: 'schedules',
                text: 'Horarios',
                iconCls: 'x-fa fa-calendar-alt',
                sectionIconCls: 'x-fa fa-calendar-alt',
                leaf: true
            }, {
                route: 'attendance',
                text: 'Asistencia',
                iconCls: 'x-fa fa-clipboard-check',
                sectionIconCls: 'x-fa fa-clipboard-check',
                leaf: true
            }, {
                route: 'messages',
                text: 'Comunicacion',
                iconCls: 'x-fa fa-comments',
                sectionIconCls: 'x-fa fa-comments',
                leaf: true
            }]
        }, {
            text: 'Administracion',
            iconCls: 'x-fa fa-briefcase',
            expanded: false,
            children: [{
                route: 'payments',
                text: 'Pagos',
                iconCls: 'x-fa fa-credit-card',
                sectionIconCls: 'x-fa fa-credit-card',
                leaf: true
            }, {
                route: 'inventory',
                text: 'Inventario',
                iconCls: 'x-fa fa-boxes',
                sectionIconCls: 'x-fa fa-boxes',
                leaf: true
            }, {
                route: 'reports',
                text: 'Reportes',
                iconCls: 'x-fa fa-chart-pie',
                sectionIconCls: 'x-fa fa-chart-pie',
                leaf: true
            }]
        }]
    }
});
