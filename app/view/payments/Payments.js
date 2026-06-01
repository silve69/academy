Ext.define('Academy.view.payments.Payments', {
    extend: 'Academy.view.common.ModuleGrid',
    xtype: 'paymentsview',

    title: 'Pagos',
    searchableFields: ['alumno', 'concepto', 'estado'],
    store: {
        type: 'payments'
    },

    columns: [{
        text: 'Alumno',
        dataIndex: 'alumno',
        flex: 1.2
    }, {
        text: 'Concepto',
        dataIndex: 'concepto',
        flex: 1.4
    }, {
        text: 'Monto',
        dataIndex: 'monto',
        width: 170,
        align: 'right',
        renderer: function (value, meta, record) {
            return Academy.util.Renderers.moneyWithMeter(value, meta, record);
        }
    }, {
        text: 'Vence',
        dataIndex: 'fecha_vencimiento',
        width: 130
    }, {
        text: 'Pagado',
        dataIndex: 'fecha_pago',
        width: 130,
        renderer: function (value) {
            return value || '-';
        }
    }, {
        text: 'Estado',
        dataIndex: 'estado',
        width: 120,
        renderer: function (value) {
            return Academy.util.Renderers.paymentState(value);
        }
    }]
});
