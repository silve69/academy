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
            html: '<img src="assets/images/logo_small.png" alt="AcademyAdmin">'
        }, {
            xtype: 'button',
            cls: 'aa-mobile-menu-button',
            ui: 'plain',
            iconCls: 'x-fa fa-bars',
            tooltip: 'Abrir menu',
            width: 42,
            height: 42,
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
            xtype: 'component',
            reference: 'profileAvatar',
            cls: 'aa-profile-avatar',
            html: ''
        }, {
            xtype: 'button',
            reference: 'settingsButton',
            cls: 'aa-settings-button',
            iconCls: 'x-fa fa-cog',
            text: '',
            width: 58,
            height: 42,
            handler: 'onSettingsButtonClick',
            menuAlign: 'tr-br',
            menu: {
                width: 220,
                cls: 'aa-settings-menu',
                items: [{
                    xtype: 'container',
                    cls: 'aa-settings-menu-head',
                    layout: {
                        type: 'hbox',
                        align: 'middle'
                    },
                    items: [{
                        xtype: 'image',
                        src: 'assets/images/isotipo_small.png',
                        alt: 'AcademyAdmin',
                        width: 42,
                        height: 42,
                        margin: '0 12 0 0'
                    }, {
                        xtype: 'container',
                        flex: 1,
                        html: '<div class="aa-settings-app"><b>AcademyAdmin</b><span>Version 1.0.0</span></div>'
                    }]
                }, '-', {
                    text: 'Mi Perfil',
                    iconCls: 'x-fa fa-address-card',
                    handler: 'onProfileClick'
                }, {
                    text: 'Configuracion',
                    iconCls: 'x-fa fa-cog',
                    handler: 'onSettingsClick'
                }, '-', {
                    text: 'Cerrar Sesion',
                    iconCls: 'x-fa fa-power-off',
                    handler: 'onLogoutClick'
                }]
            }
        }, {
            xtype: 'button',
            reference: 'logoutButton',
            text: 'Salir',
            handler: 'onLogoutClick'
        }]
    }, {
        xtype: 'container',
        reference: 'bodyWrap',
        cls: 'aa-main-body',
        flex: 1,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'treepanel',
            reference: 'navigation',
            cls: 'aa-navigation',
            width: 260,
            hideHeaders: true,
            rootVisible: false,
            useArrows: true,
            animate: true,
            lines: false,
            store: {
                type: 'navigation'
            },
            columns: [{
                xtype: 'treecolumn',
                dataIndex: 'text',
                flex: 1
            }],
            listeners: {
                beforeitemexpand: 'onNavigationBeforeItemExpand',
                itemclick: 'onNavigationItemClick',
                selectionchange: 'onNavigationSelectionChange'
            }
        }, {
            xtype: 'component',
            reference: 'mobileMenuMask',
            cls: 'aa-mobile-menu-mask',
            hidden: true,
            listeners: {
                afterrender: 'onMobileMaskReady'
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
