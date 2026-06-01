Ext.Loader.setConfig({
    enabled: true,
    disableCaching: true,
    paths: {
        Academy: 'app'
    }
});

Ext.application({
    name: 'Academy',
    extend: 'Academy.Application',
    appFolder: 'app',
    requires: [
        'Academy.*'
    ]
});
