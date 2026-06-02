Ext.define('Academy.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    onMainReady: function () {
        var view = this.getView();
        var user = view.getSessionUser() || {};
        var device = view.getDeviceProfile() || {};
        var nav = this.lookup('navigation');
        var root = nav.getStore().getRoot();
        var dashboardNode = nav.getStore().findNode('route', 'dashboard');
        var isMobile = Boolean(device.isMobileDevice || Ext.Element.getViewportWidth() <= 760);

        this.ensureNavigationChildren(root);

        this.lookup('userText').setText((user.name || 'Usuario') + ' - ' + (user.role || 'Perfil'));
        this.updateProfileAvatar(user);
        view.toggleCls('aa-mobile-device', isMobile);
        this.lookup('menuButton').setHidden(!isMobile);
        this.lookup('logoutButton').setHidden(isMobile);
        this.lookup('settingsButton').setText('');

        if (isMobile) {
            nav.hide();
        }

        if (dashboardNode) {
            nav.getSelectionModel().select(dashboardNode);
        }
        this.showRoute('dashboard');
    },

    ensureNavigationChildren: function (root) {
        var groups = {
            Academia: [{
                route: 'students',
                text: 'Alumnos',
                iconCls: 'x-fa fa-user-graduate',
                sectionIconCls: 'x-fa fa-user-graduate',
                leaf: true
            }, {
                route: 'groups',
                text: 'Grupos',
                iconCls: 'x-fa fa-users',
                sectionIconCls: 'x-fa fa-users',
                leaf: true
            }, {
                route: 'sports',
                text: 'Deportes',
                iconCls: 'x-fa fa-medal',
                sectionIconCls: 'x-fa fa-medal',
                leaf: true
            }, {
                route: 'coaches',
                text: 'Entrenadores',
                iconCls: 'x-fa fa-running',
                sectionIconCls: 'x-fa fa-running',
                leaf: true
            }],
            Operacion: [{
                route: 'schedules',
                text: 'Horarios',
                iconCls: 'x-fa fa-calendar-alt',
                sectionIconCls: 'x-fa fa-calendar-alt',
                leaf: true
            }, {
                route: 'attendance',
                text: 'Asistencia',
                iconCls: 'x-fa fa-clipboard-check',
                sectionIconCls: 'x-fa fa-clipboard-check',
                leaf: true
            }, {
                route: 'messages',
                text: 'Comunicacion',
                iconCls: 'x-fa fa-comments',
                sectionIconCls: 'x-fa fa-comments',
                leaf: true
            }],
            Administracion: [{
                route: 'payments',
                text: 'Pagos',
                iconCls: 'x-fa fa-credit-card',
                sectionIconCls: 'x-fa fa-credit-card',
                leaf: true
            }, {
                route: 'inventory',
                text: 'Inventario',
                iconCls: 'x-fa fa-boxes',
                sectionIconCls: 'x-fa fa-boxes',
                leaf: true
            }, {
                route: 'reports',
                text: 'Reportes',
                iconCls: 'x-fa fa-chart-pie',
                sectionIconCls: 'x-fa fa-chart-pie',
                leaf: true
            }]
        };

        Ext.Object.each(groups, function (name, children) {
            var node = root.findChild('text', name);

            if (node && !node.hasChildNodes()) {
                node.appendChild(children);
                node.set('leaf', false);
                node.set('expanded', false);
            }
        });
    },

    onNavigationItemClick: function (view, record) {
        if (record && !record.isLeaf()) {
            if (record.isExpanded()) {
                record.collapse();
            } else {
                this.collapseSiblingMenus(record);
                record.expand();
            }

            return;
        }

        this.openNavigationRecord(record);
    },

    onNavigationBeforeItemExpand: function (node) {
        this.collapseSiblingMenus(node);
    },

    collapseSiblingMenus: function (record) {
        if (!record || !record.parentNode) {
            return;
        }

        record.parentNode.eachChild(function (sibling) {
            if (sibling !== record && !sibling.isLeaf() && sibling.isExpanded()) {
                sibling.collapse();
            }
        });
    },

    onNavigationSelectionChange: function (selectionModel, records) {
        var record = records && records.length ? records[0] : null;

        if (record && record.isLeaf()) {
            this.openNavigationRecord(record);
        }
    },

    openNavigationRecord: function (record) {
        var view = this.getView();
        var nav = this.lookup('navigation');
        var device = view.getDeviceProfile() || {};
        var isMobile = Boolean(device.isMobileDevice || Ext.Element.getViewportWidth() <= 760);

        if (!record) {
            return;
        }

        if (!record.isLeaf()) {
            return;
        }

        if (record.get('disabled')) {
            return;
        }

        this.showRoute(record.get('route'));

        if (isMobile) {
            this.closeMobileMenu();
        }
    },

    showRoute: function (route) {
        var content = this.lookup('contentPanel');
        var title = this.lookup('titleText');
        var card = content.down('#' + route);
        var titles = {
            dashboard: 'Dashboard',
            students: 'Alumnos',
            groups: 'Grupos',
            schedules: 'Horarios',
            attendance: 'Asistencia',
            payments: 'Pagos',
            messages: 'Comunicacion',
            sports: 'Deportes',
            coaches: 'Entrenadores',
            inventory: 'Inventario',
            reports: 'Reportes'
        };

        if (!card) {
            return;
        }

        content.setActiveItem(card);
        title.setHtml(this.sectionTitle(route, titles[route] || 'AcademyAdmin'));

        if (card.refreshData) {
            card.refreshData();
        }
    },

    onToggleMobileMenu: function () {
        var nav = this.lookup('navigation');

        if (nav.isHidden()) {
            this.openMobileMenu();
        } else {
            this.closeMobileMenu();
        }
    },

    onCloseMobileMenu: function () {
        this.closeMobileMenu();
    },

    onMobileMaskReady: function (mask) {
        mask.getEl().on('click', this.closeMobileMenu, this);
    },

    onSettingsButtonClick: function () {
        var nav = this.lookup('navigation');

        if (nav && !nav.isHidden()) {
            this.closeMobileMenu();
        }
    },

    openMobileMenu: function () {
        var nav = this.lookup('navigation');
        var mask = this.lookup('mobileMenuMask');
        var navEl;
        var maskEl;

        if (!nav.isHidden()) {
            return;
        }

        nav.show();
        mask.show();
        navEl = nav.getEl();
        maskEl = mask.getEl();

        navEl.stopAnimation();
        maskEl.stopAnimation();
        navEl.setStyle({
            opacity: 0,
            transform: 'translateX(-18px)'
        });
        maskEl.setStyle('opacity', 0);

        Ext.defer(function () {
            navEl.animate({
                duration: 180,
                easing: 'ease-out',
                to: {
                    opacity: 1,
                    transform: 'translateX(0)'
                }
            });
            maskEl.animate({
                duration: 180,
                easing: 'ease-out',
                to: {
                    opacity: 1
                }
            });
        }, 1);
    },

    closeMobileMenu: function () {
        var nav = this.lookup('navigation');
        var mask = this.lookup('mobileMenuMask');
        var navEl;
        var maskEl;

        if (nav.isHidden()) {
            mask.hide();
            return;
        }

        navEl = nav.getEl();
        maskEl = mask.getEl();

        navEl.stopAnimation();
        maskEl.stopAnimation();
        navEl.animate({
            duration: 160,
            easing: 'ease-in',
            to: {
                opacity: 0,
                transform: 'translateX(-18px)'
            },
            callback: function () {
                nav.hide();
                navEl.setStyle({
                    opacity: '',
                    transform: ''
                });
            }
        });
        maskEl.animate({
            duration: 160,
            easing: 'ease-in',
            to: {
                opacity: 0
            },
            callback: function () {
                mask.hide();
                maskEl.setStyle('opacity', '');
            }
        });
    },

    onProfileClick: function () {
        Ext.Msg.alert('Mi Perfil', 'La configuracion del perfil se agregara en la siguiente etapa.');
    },

    onSettingsClick: function () {
        Ext.Msg.alert('Configuracion', 'Los items de configuracion se iran definiendo poco a poco.');
    },

    onLogoutClick: function () {
        Academy.app.logout();
    },

    updateProfileAvatar: function (user) {
        var avatar = this.lookup('profileAvatar');
        var name = user.name || 'Usuario';
        var initials = Ext.Array.map(String(name).split(/\s+/), function (part) {
            return part.charAt(0);
        }).join('').substring(0, 2).toUpperCase();
        var photo = user.photo || user.avatar || user.profilePhoto || '';
        var html = photo ?
            '<img src="' + Ext.htmlEncode(photo) + '" alt="Foto de ' + Ext.htmlEncode(name) + '">' :
            '<span>' + Ext.htmlEncode(initials || 'U') + '</span>';

        avatar.setHtml(html);
    },

    sectionTitle: function (route, text) {
        var nav = this.lookup('navigation');
        var node = nav ? nav.getStore().findNode('route', route) : null;
        var iconCls = node ? node.get('sectionIconCls') || node.get('iconCls') : '';

        return '<span class="' + Ext.htmlEncode(iconCls) + ' aa-section-title-icon"></span>' + Ext.htmlEncode(text);
    }
});
