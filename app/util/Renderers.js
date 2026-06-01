Ext.define('Academy.util.Renderers', {
    singleton: true,

    studentCard: function (value, meta, record) {
        var name = String(value || '');
        var group = record.get('grupo') || '';
        var initials = Ext.Array.map(name.split(' '), function (part) {
            return part.charAt(0);
        }).join('').substring(0, 2).toUpperCase();

        return [
            '<div class="aa-student-cell">',
            '<span class="aa-avatar">', Ext.htmlEncode(initials || 'AA'), '</span>',
            '<span><strong>', Ext.htmlEncode(name), '</strong><em>', Ext.htmlEncode(group), '</em></span>',
            '</div>'
        ].join('');
    },

    sportTag: function (value) {
        var text = String(value || 'Academia');
        var cls = 'aa-sport-generic';
        var normalized = text.toLowerCase();

        if (normalized.indexOf('fut') !== -1) {
            cls = 'aa-sport-football';
        } else if (normalized.indexOf('bas') !== -1 || normalized.indexOf('basket') !== -1) {
            cls = 'aa-sport-basket';
        } else if (normalized.indexOf('vol') !== -1) {
            cls = 'aa-sport-volley';
        } else if (normalized.indexOf('atlet') !== -1) {
            cls = 'aa-sport-track';
        }

        return '<span class="aa-sport-tag ' + cls + '">' + Ext.htmlEncode(text) + '</span>';
    },

    progress: function (value, options) {
        options = options || {};
        var numeric = Math.max(0, Math.min(100, Number(value || 0)));
        var label = options.label || numeric + '%';
        var cls = numeric >= 90 ? 'aa-progress-strong' : numeric >= 75 ? 'aa-progress-ok' : 'aa-progress-warn';

        return [
            '<div class="aa-progress-cell">',
            '<div class="aa-progress-track"><span class="', cls, '" style="width:', numeric, '%"></span></div>',
            '<strong>', Ext.htmlEncode(label), '</strong>',
            '</div>'
        ].join('');
    },

    occupancy: function (active, capacity) {
        var total = Number(capacity || 0);
        var current = Number(active || 0);
        var percent = total ? Math.round((current / total) * 100) : 0;

        return this.progress(percent, {
            label: current + '/' + total
        });
    },

    statusBadge: function (value, map) {
        var text = String(value || '');
        var normalized = text.toLowerCase();
        var cls = map && map[normalized] ? map[normalized] : 'aa-badge-neutral';

        return '<span class="aa-badge ' + cls + '">' + Ext.htmlEncode(text || '-') + '</span>';
    },

    attendanceState: function (value) {
        var normalized = String(value || '').toLowerCase();
        var cls = normalized === 'presente' ? 'aa-dot-ok' : normalized === 'ausente' ? 'aa-dot-danger' : 'aa-dot-warn';

        return '<span class="aa-state-dot ' + cls + '"></span>' + this.statusBadge(value, {
            presente: 'aa-badge-ok',
            ausente: 'aa-badge-danger',
            retardo: 'aa-badge-warn'
        });
    },

    paymentState: function (value) {
        return this.statusBadge(value, {
            pagado: 'aa-badge-ok',
            pendiente: 'aa-badge-warn',
            vencido: 'aa-badge-danger'
        });
    },

    moneyWithMeter: function (value, meta, record) {
        var amount = Number(value || 0);
        var status = String(record.get('estado') || '').toLowerCase();
        var percent = Math.min(100, Math.round((amount / 1000) * 100));
        var cls = status === 'pagado' ? 'aa-progress-strong' : status === 'vencido' ? 'aa-progress-danger' : 'aa-progress-warn';

        return [
            '<div class="aa-money-cell">',
            '<strong>', Ext.util.Format.currency(amount, '$', 0), '</strong>',
            '<div class="aa-progress-track"><span class="', cls, '" style="width:', percent, '%"></span></div>',
            '</div>'
        ].join('');
    },

    movement: function (value) {
        var isIn = value === 'in';
        var label = isIn ? 'Entrada' : 'Salida';
        var cls = isIn ? 'aa-badge-ok' : 'aa-badge-warn';

        return '<span class="aa-movement ' + cls + '">' + (isIn ? '+' : '-') + '</span>' + this.statusBadge(label, {
            entrada: 'aa-badge-ok',
            salida: 'aa-badge-warn'
        });
    },

    timeSlot: function (start, end) {
        return [
            '<div class="aa-time-slot">',
            '<span></span>',
            '<strong>', Ext.htmlEncode(start || '--:--'), '</strong>',
            '<em>', Ext.htmlEncode(end || '--:--'), '</em>',
            '</div>'
        ].join('');
    },

    channel: function (value) {
        var normalized = String(value || '').toLowerCase();
        var cls = normalized === 'whatsapp' ? 'aa-channel-whatsapp' : normalized === 'email' ? 'aa-channel-email' : 'aa-channel-default';

        return '<span class="aa-channel ' + cls + '">' + Ext.htmlEncode(value || '-') + '</span>';
    }
});
