Ext.define('Academy.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onMainReady: function () {
        var view = this.getView();
        var user = view.getSessionUser() || {};
        var device = view.getDeviceProfile() || {};
        var nav = this.lookup('navigation');

        this.lookup('userText').setText((user.name || 'Usuario') + ' - ' + (user.role || 'Perfil'));
        view.toggleCls('aa-mobile-device', Boolean(device.isMobileDevice));
        this.lookup('menuButton').setHidden(!device.isMobileDevice);

        nav.getSelectionModel().select(0);
        this.showRoute('dashboard');
    },

    onNavigationSelect: function (grid, record) {
        if (record.get('disabled')) {
            return;
        }

        this.showRoute(record.get('route'));
    },

    showRoute: function (route) {
        var content = this.lookup('contentPanel');
        var title = this.lookup('titleText');
        var card = content.down('#' + route);
        var titles = {
            dashboard: 'Dashboard',
            students: 'Alumnos',
            groups: 'Grupos',
            schedules: 'Horarios',
            attendance: 'Asistencia',
            payments: 'Pagos',
            messages: 'Comunicacion',
            sports: 'Deportes',
            coaches: 'Entrenadores',
            inventory: 'Inventario',
            reports: 'Reportes'
        };

        if (!card) {
            return;
        }

        content.setActiveItem(card);
        title.setText(titles[route] || 'AcademyAdmin');

        if (card.refreshData) {
            card.refreshData();
        }
    },

    onToggleMobileMenu: function () {
        var nav = this.lookup('navigation');
        nav.setHidden(!nav.isHidden());
    },

    onLogoutClick: function () {
        Academy.app.logout();
    }
});
