Ext.define('Academy.view.reports.ReportsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reports',

    loadReports: function () {
        var view = this.getView();

        view.setLoading('Cargando reportes...');

        Academy.util.Api.request({
            url: 'api/reportes.php',
            success: function (data) {
                this.renderReports(data || {});
            },
            failure: function (payload) {
                Ext.Msg.alert('Reportes', payload && payload.message ? payload.message : 'No se pudieron cargar los reportes.');
            },
            callback: function () {
                view.setLoading(false);
            },
            scope: this
        });
    },

    renderReports: function (data) {
        var html = '';

        Ext.Object.each(data, function (section, values) {
            html += '<section class="aa-report-card"><h2>' + Ext.htmlEncode(this.titleize(section)) + '</h2>';
            html += '<div class="aa-report-items">';

            Ext.Object.each(values || {}, function (key, value) {
                html += '<div><span>' + Ext.htmlEncode(this.titleize(key)) + '</span><strong>' + Ext.htmlEncode(String(value)) + '</strong></div>';
            }, this);

            html += '</div></section>';
        }, this);

        this.lookup('reportBody').setHtml(html || '<div class="aa-empty">Sin datos de reportes.</div>');
    },

    titleize: function (value) {
        return String(value || '')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, function (letter) {
                return letter.toUpperCase();
            });
    }
});
