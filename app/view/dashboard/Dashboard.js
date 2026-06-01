Ext.define('Academy.view.dashboard.Dashboard', {
    extend: 'Ext.panel.Panel',
    xtype: 'dashboardview',

    requires: [
        'Academy.view.dashboard.DashboardController'
    ],

    controller: 'dashboard',
    bodyCls: 'aa-page-body',
    scrollable: true,
    border: false,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: [{
        xtype: 'container',
        cls: 'aa-kpi-grid',
        reference: 'kpiGrid',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        defaults: {
            xtype: 'component',
            cls: 'aa-kpi-card',
            flex: 1
        },
        items: [{
            reference: 'studentsKpi',
            html: ''
        }, {
            reference: 'groupsKpi',
            html: ''
        }, {
            reference: 'attendanceKpi',
            html: ''
        }, {
            reference: 'revenueKpi',
            html: ''
        }]
    }, {
        xtype: 'container',
        cls: 'aa-dashboard-grid',
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        defaults: {
            flex: 1,
            margin: 8
        },
        items: [{
            xtype: 'grid',
            title: 'Agenda inmediata',
            reference: 'scheduleGrid',
            store: {
                fields: ['dia', 'hora', 'grupo', 'sede']
            },
            columns: [{
                text: 'Dia',
                dataIndex: 'dia',
                width: 90
            }, {
                text: 'Hora',
                dataIndex: 'hora',
                width: 90
            }, {
                text: 'Grupo',
                dataIndex: 'grupo',
                flex: 1
            }, {
                text: 'Sede',
                dataIndex: 'sede',
                flex: 1
            }]
        }, {
            xtype: 'panel',
            title: 'Siguiente etapa',
            bodyPadding: 18,
            html: [
                '<div class="aa-next-step">',
                '<strong>Base ExtJS preparada para mantenimiento compartido.</strong>',
                '<p>La deteccion movil vive en <code>Academy.util.Device</code> y no depende solo de resolucion.</p>',
                '<p>El siguiente bloque sera migrar Grupos, Pagos y Asistencia con stores REST.</p>',
                '</div>'
            ].join('')
        }]
    }],

    refreshData: function () {
        this.getController().loadDashboard();
    }
});
