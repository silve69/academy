Ext.define('Academy.Application', {
    extend: 'Ext.app.Application',

    name: 'Academy',

    requires: [
        'Academy.util.Api',
        'Academy.util.Device',
        'Academy.util.Renderers',
        'Academy.view.login.Login',
        'Academy.view.main.Main'
    ],

    stores: [
        'Navigation',
        'Students',
        'Groups',
        'Schedules',
        'Attendance',
        'Payments',
        'Messages',
        'Sports',
        'Coaches',
        'Inventory'
    ],

    defaultToken: 'dashboard',

    launch: function () {
        Ext.tip.QuickTipManager.init();
        Academy.device = Academy.util.Device.getProfile();

        Academy.util.Api.me({
            success: function (user) {
                this.startSession(user);
            },
            failure: function () {
                this.showLogin();
            },
            scope: this
        });
    },

    startSession: function (user) {
        Academy.currentUser = user || null;
        Ext.destroy(this.loginView);
        this.mainView = Ext.create('Academy.view.main.Main', {
            sessionUser: Academy.currentUser,
            deviceProfile: Academy.device
        });
    },

    showLogin: function () {
        Ext.destroy(this.mainView);
        this.loginView = Ext.create('Academy.view.login.Login', {
            listeners: {
                loginsuccess: 'startSession',
                scope: this
            }
        });
    },

    logout: function () {
        Academy.util.Api.logout({
            callback: function () {
                Academy.currentUser = null;
                this.showLogin();
            },
            scope: this
        });
    }
});
