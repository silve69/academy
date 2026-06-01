Ext.define('Academy.util.Api', {
    singleton: true,

    baseUrl: 'api/',

    request: function (config) {
        config = config || {};

        return Ext.Ajax.request(Ext.apply({
            method: 'GET',
            timeout: 30000,
            headers: {
                Accept: 'application/json'
            },
            success: function (response) {
                var payload = this.decode(response);

                if (!payload || payload.success === false) {
                    Ext.callback(config.failure, config.scope, [payload, response]);
                    return;
                }

                Ext.callback(config.success, config.scope, [payload.data, payload.meta, payload]);
            },
            failure: function (response) {
                Ext.callback(config.failure, config.scope, [this.decode(response), response]);
            },
            callback: function (options, success, response) {
                Ext.callback(config.callback, config.scope, [options, success, response]);
            },
            scope: this
        }, config));
    },

    decode: function (response) {
        if (!response || !response.responseText) {
            return null;
        }

        return Ext.decode(response.responseText, true);
    },

    me: function (config) {
        return this.request(Ext.apply({
            url: this.baseUrl + 'Auth.php?action=me'
        }, config));
    },

    login: function (credentials, config) {
        return this.request(Ext.apply({
            url: this.baseUrl + 'Auth.php?action=login',
            method: 'POST',
            jsonData: credentials
        }, config));
    },

    logout: function (config) {
        return this.request(Ext.apply({
            url: this.baseUrl + 'Auth.php?action=logout',
            method: 'POST'
        }, config));
    }
});
