Ext.define('Academy.view.inventory.Inventory', {
    extend: 'Academy.view.common.ModuleGrid',
    xtype: 'inventoryview',

    title: 'Inventario',
    searchableFields: ['producto', 'tipo_movimiento', 'referencia'],
    store: {
        type: 'inventory'
    },

    columns: [{
        text: 'Producto',
        dataIndex: 'producto',
        flex: 1.6
    }, {
        text: 'Movimiento',
        dataIndex: 'tipo_movimiento',
        width: 130,
        renderer: function (value) {
            return Academy.util.Renderers.movement(value);
        }
    }, {
        text: 'Cantidad',
        dataIndex: 'cantidad',
        width: 110,
        align: 'right'
    }, {
        text: 'Referencia',
        dataIndex: 'referencia',
        flex: 1
    }]
});
