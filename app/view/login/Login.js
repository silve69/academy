Ext.define('Academy.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'loginview',

    requires: [
        'Academy.view.login.LoginController'
    ],

    controller: 'login',
    title: 'AcademyAdmin',
    cls: 'aa-login-window',
    width: 380,
    modal: true,
    closable: false,
    draggable: false,
    resizable: false,
    autoShow: true,
    layout: 'fit',

    items: [{
        xtype: 'form',
        bodyPadding: 24,
        reference: 'form',
        defaults: {
            anchor: '100%',
            labelAlign: 'top',
            allowBlank: false,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'component',
            cls: 'aa-login-brand',
            html: '<div class="aa-brand-mark">AA</div><div><strong>AcademyAdmin</strong><span>ExtJS + PHP</span></div>'
        }, {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            value: 'admin@academy-admin.com',
            inputType: 'email'
        }, {
            xtype: 'textfield',
            name: 'password',
            fieldLabel: 'Password',
            value: 'admin123',
            inputType: 'password'
        }]
    }],

    buttons: [{
        text: 'Entrar',
        formBind: true,
        ui: 'default',
        handler: 'onLoginClick'
    }]
});
