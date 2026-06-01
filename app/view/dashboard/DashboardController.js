Ext.define('Academy.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard',

    loadDashboard: function () {
        var view = this.getView();

        view.setLoading('Cargando dashboard...');

        Academy.util.Api.request({
            url: 'api/dashboard.php',
            success: function (data) {
                this.renderDashboard(data || {});
            },
            failure: function (payload) {
                Ext.Msg.alert('Dashboard', payload && payload.message ? payload.message : 'No se pudo cargar el dashboard.');
            },
            callback: function () {
                view.setLoading(false);
            },
            scope: this
        });
    },

    renderDashboard: function (data) {
        var alumnos = data.alumnos || data.students || [];
        var grupos = data.grupos || data.groups || [];
        var pagos = data.pagos || data.payments || [];
        var horarios = data.horarios || data.schedule || [];
        var activos = Ext.Array.filter(alumnos, function (item) {
            return (item.estado || item.status || '').toLowerCase() === 'activo';
        }).length;
        var asistencia = alumnos.length ? Math.round(Ext.Array.sum(Ext.Array.map(alumnos, function (item) {
            return Number(item.asistencia || item.attendance || 0);
        })) / alumnos.length) : 0;
        var ingresos = Ext.Array.sum(Ext.Array.map(Ext.Array.filter(pagos, function (item) {
            return (item.estado || item.status || '').toLowerCase() === 'pagado';
        }), function (item) {
            return Number(item.monto || item.amount || 0);
        }));

        this.lookup('studentsKpi').setHtml(this.kpi('Alumnos activos', activos, alumnos.length + ' registrados'));
        this.lookup('groupsKpi').setHtml(this.kpi('Grupos abiertos', grupos.length, 'Disciplinas activas'));
        this.lookup('attendanceKpi').setHtml(this.kpi('Asistencia promedio', asistencia + '%', 'Ultimas sesiones'));
        this.lookup('revenueKpi').setHtml(this.kpi('Ingresos cobrados', Ext.util.Format.currency(ingresos, '$', 0), 'Pagos marcados como pagados'));
        this.lookup('scheduleGrid').getStore().loadData(Ext.Array.slice(horarios, 0, 6));
    },

    kpi: function (label, value, detail) {
        return '<span>' + Ext.htmlEncode(label) + '</span><strong>' + Ext.htmlEncode(String(value)) + '</strong><em>' + Ext.htmlEncode(detail) + '</em>';
    }
});
