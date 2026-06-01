Ext.define('Academy.view.common.ModuleGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'modulegrid',

    border: false,
    cls: 'aa-grid-page',

    config: {
        searchableFields: []
    },

    tbar: [{
        xtype: 'textfield',
        reference: 'searchField',
        emptyText: 'Buscar',
        width: 280,
        triggers: {
            clear: {
                cls: 'x-form-clear-trigger',
                handler: function (field) {
                    field.setValue('');
                }
            }
        },
        listeners: {
            change: {
                fn: function (field, value) {
                    field.up('grid').applySearch(value);
                },
                buffer: 250
            }
        }
    }, '->', {
        text: 'Actualizar',
        handler: function (button) {
            button.up('grid').refreshData();
        }
    }],

    refreshData: function () {
        this.getStore().load();
    },

    applySearch: function (query) {
        var store = this.getStore();
        var fields = this.getSearchableFields();
        var needle = String(query || '').toLowerCase();

        store.clearFilter();

        if (!needle) {
            return;
        }

        store.filterBy(function (record) {
            return Ext.Array.some(fields, function (field) {
                return String(record.get(field) || '').toLowerCase().indexOf(needle) !== -1;
            });
        });
    }
});
