Ext.define('Academy.view.messages.Messages', {
    extend: 'Academy.view.common.ModuleGrid',
    xtype: 'messagesview',

    title: 'Comunicacion',
    searchableFields: ['titulo', 'mensaje', 'canal', 'enviado_a', 'estado'],
    store: {
        type: 'messages'
    },

    columns: [{
        text: 'Titulo',
        dataIndex: 'titulo',
        flex: 1.2
    }, {
        text: 'Mensaje',
        dataIndex: 'mensaje',
        flex: 1.8
    }, {
        text: 'Canal',
        dataIndex: 'canal',
        width: 130,
        renderer: function (value) {
            return Academy.util.Renderers.channel(value);
        }
    }, {
        text: 'Destino',
        dataIndex: 'enviado_a',
        width: 120
    }, {
        text: 'Fecha',
        dataIndex: 'fecha_envio',
        width: 170
    }, {
        text: 'Estado',
        dataIndex: 'estado',
        width: 120,
        renderer: function (value) {
            return Academy.util.Renderers.statusBadge(value, {
                enviado: 'aa-badge-ok',
                programado: 'aa-badge-warn',
                borrador: 'aa-badge-neutral'
            });
        }
    }]
});
