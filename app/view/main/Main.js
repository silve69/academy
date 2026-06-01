Ext.define('Academy.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'mainview',

    requires: [
        'Academy.view.main.MainController',
        'Academy.view.dashboard.Dashboard',
        'Academy.view.students.Students',
        'Academy.view.groups.Groups',
        'Academy.view.schedules.Schedules',
        'Academy.view.attendance.Attendance',
        'Academy.view.payments.Payments',
        'Academy.view.messages.Messages',
        'Academy.view.sports.Sports',
        'Academy.view.coaches.Coaches',
        'Academy.view.inventory.Inventory',
        'Academy.view.reports.Reports'
    ],

    controller: 'main',
    cls: 'aa-viewport',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    config: {
        sessionUser: null,
        deviceProfile: null
    },

    items: [{
        xtype: 'toolbar',
        cls: 'aa-topbar',
        height: 58,
        items: [{
            xtype: 'component',
            cls: 'aa-topbar-brand',
            html: '<span class="aa-brand-mark aa-brand-mark-small">AA</span><strong>AcademyAdmin</strong>'
        }, {
            xtype: 'button',
            text: 'Menu',
            reference: 'menuButton',
            hidden: true,
            handler: 'onToggleMobileMenu'
        }, {
            xtype: 'tbtext',
            reference: 'titleText',
            cls: 'aa-title-text',
            text: 'Dashboard'
        }, '->', {
            xtype: 'tbtext',
            reference: 'userText',
            cls: 'aa-user-text',
            text: ''
        }, {
            xtype: 'button',
            text: 'Salir',
            handler: 'onLogoutClick'
        }]
    }, {
        xtype: 'container',
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'grid',
            reference: 'navigation',
            cls: 'aa-navigation',
            width: 230,
            hideHeaders: true,
            store: {
                type: 'navigation'
            },
            columns: [{
                dataIndex: 'text',
                flex: 1,
                renderer: function (value, meta, record) {
                    meta.tdCls = record.get('disabled') ? 'aa-nav-disabled' : '';
                    return '<span class="' + record.get('iconCls') + '"></span>' + Ext.htmlEncode(value);
                }
            }],
            listeners: {
                select: 'onNavigationSelect'
            }
        }, {
            xtype: 'container',
            reference: 'contentPanel',
            cls: 'aa-content',
            flex: 1,
            layout: 'card',
            items: [{
                xtype: 'dashboardview',
                itemId: 'dashboard'
            }, {
                xtype: 'studentsview',
                itemId: 'students'
            }, {
                xtype: 'groupsview',
                itemId: 'groups'
            }, {
                xtype: 'schedulesview',
                itemId: 'schedules'
            }, {
                xtype: 'attendanceview',
                itemId: 'attendance'
            }, {
                xtype: 'paymentsview',
                itemId: 'payments'
            }, {
                xtype: 'messagesview',
                itemId: 'messages'
            }, {
                xtype: 'sportsview',
                itemId: 'sports'
            }, {
                xtype: 'coachesview',
                itemId: 'coaches'
            }, {
                xtype: 'inventoryview',
                itemId: 'inventory'
            }, {
                xtype: 'reportsview',
                itemId: 'reports'
            }]
        }]
    }],

    listeners: {
        afterrender: 'onMainReady'
    }
});
