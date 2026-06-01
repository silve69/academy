Ext.define('Academy.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function () {
        var view = this.getView();
        var form = this.lookup('form').getForm();
        var button = view.down('button');

        if (!form.isValid()) {
            return;
        }

        button.setDisabled(true);
        view.setLoading('Validando acceso...');

        Academy.util.Api.login(form.getValues(), {
            success: function (user) {
                view.fireEvent('loginsuccess', user);
            },
            failure: function (payload) {
                Ext.Msg.alert('Acceso', payload && payload.message ? payload.message : 'No fue posible iniciar sesion.');
            },
            callback: function () {
                view.setLoading(false);
                button.setDisabled(false);
            }
        });
    }
});
