Ext.define('Academy.view.reports.Reports', {
    extend: 'Ext.panel.Panel',
    xtype: 'reportsview',

    requires: [
        'Academy.view.reports.ReportsController'
    ],

    controller: 'reports',
    title: 'Reportes',
    bodyCls: 'aa-page-body',
    border: false,
    scrollable: true,
    layout: 'fit',

    items: [{
        xtype: 'container',
        reference: 'reportBody',
        cls: 'aa-report-grid',
        padding: 16,
        html: ''
    }],

    tbar: ['->', {
        text: 'Actualizar',
        handler: function (button) {
            button.up('reportsview').refreshData();
        }
    }],

    refreshData: function () {
        this.getController().loadReports();
    }
});
