Ext.define('Academy.util.Device', {
    singleton: true,

    getProfile: function () {
        var nav = window.navigator || {};
        var ua = nav.userAgent || '';
        var hasCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        var hasTouch = nav.maxTouchPoints > 0 || nav.msMaxTouchPoints > 0 || Ext.supports.Touch;
        var extPhone = Ext.os && Ext.os.is && Ext.os.is.Phone;
        var extTablet = Ext.os && Ext.os.is && Ext.os.is.Tablet;
        var uaMobile = /Android|iPhone|iPad|iPod|Mobile|Windows Phone/i.test(ua);

        return {
            isPhone: Boolean(extPhone || (hasTouch && hasCoarsePointer && /iPhone|Android.*Mobile|Windows Phone/i.test(ua))),
            isTablet: Boolean(extTablet || (hasTouch && hasCoarsePointer && /iPad|Android(?!.*Mobile)/i.test(ua))),
            isTouch: Boolean(hasTouch),
            hasCoarsePointer: Boolean(hasCoarsePointer),
            isMobileDevice: Boolean(extPhone || extTablet || (hasTouch && hasCoarsePointer && uaMobile)),
            platform: Ext.os ? Ext.os.name : 'unknown'
        };
    }
});
