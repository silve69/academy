Ext.define('Academy.view.students.Students', {
    extend: 'Ext.grid.Panel',
    xtype: 'studentsview',

    title: 'Directorio de alumnos',
    border: false,
    cls: 'aa-grid-page',
    store: {
        type: 'students'
    },

    tbar: [{
        xtype: 'textfield',
        reference: 'searchField',
        emptyText: 'Buscar alumno o grupo',
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
                    var grid = field.up('grid');
                    grid.applySearch(value);
                },
                buffer: 250
            }
        }
    }, {
        xtype: 'combo',
        reference: 'statusFilter',
        width: 160,
        editable: false,
        value: 'todos',
        store: [
            ['todos', 'Todos'],
            ['Activo', 'Activos'],
            ['Pausa', 'En pausa']
        ],
        listeners: {
            change: function (combo, value) {
                combo.up('grid').applySearch(combo.up('grid').down('textfield').getValue(), value);
            }
        }
    }, '->', {
        text: 'Actualizar',
        handler: function (button) {
            button.up('grid').refreshData();
        }
    }],

    columns: [{
        text: 'Alumno',
        dataIndex: 'nombre',
        flex: 1.5,
        renderer: function (value, meta, record) {
            return Academy.util.Renderers.studentCard(value, meta, record);
        }
    }, {
        text: 'Edad',
        dataIndex: 'edad',
        width: 80,
        align: 'center'
    }, {
        text: 'Grupo',
        dataIndex: 'grupo',
        flex: 1.1
    }, {
        text: 'Estado',
        dataIndex: 'estado',
        width: 110,
        renderer: function (value) {
            return Academy.util.Renderers.statusBadge(value, {
                activo: 'aa-badge-ok',
                pausa: 'aa-badge-warn'
            });
        }
    }, {
        text: 'Asistencia',
        dataIndex: 'asistencia',
        width: 170,
        renderer: function (value) {
            return Academy.util.Renderers.progress(value);
        }
    }, {
        text: 'Pago',
        dataIndex: 'pago',
        width: 150,
        renderer: function (value) {
            return Academy.util.Renderers.paymentState(value);
        }
    }],

    refreshData: function () {
        this.getStore().load();
    },

    applySearch: function (query, status) {
        var store = this.getStore();
        var selectedStatus = status || this.down('combo').getValue();
        var needle = String(query || '').toLowerCase();

        store.clearFilter();
        store.filterBy(function (record) {
            var statusMatch = selectedStatus === 'todos' || record.get('estado') === selectedStatus;
            var text = [record.get('nombre'), record.get('grupo'), record.get('pago')].join(' ').toLowerCase();

            return statusMatch && (!needle || text.indexOf(needle) !== -1);
        });
    }
});
