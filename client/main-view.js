'use strict';

var App = require('ampersand-app');
var View = require('ampersand-view');
var ViewSwitcher = require('ampersand-view-switcher');
var Dom = require('ampersand-dom');
var LocalLinks = require('local-links');

module.exports = View.extend({
    template: require('./templates/body.pug'),
    autoRender: true,
    events: {
        'click a[href]': 'handleLinkClick'
    },
    session: {
        message: 'string',
        assetsUrl: 'string'
    },
    bindings: {
        'message': [
            {
                type: 'text',
                hook: 'page-message'
            }, {
                type: 'toggle',
                hook: 'page-message'
            }
        ],
        'model.displayName': {
            type: 'text',
            hook: 'nav-user-name'
        },
        'model.link': {
            type: 'attribute',
            name: 'href',
            hook: 'nav-user-name'
        },
        'model.isAdmin': {
            type: 'toggle',
            hook: 'nav-admin'
        },
        'model.loggedIn': [
            {
                type: 'booleanClass',
                no: 'button',
                hook: 'nav-user-name'
            }, {
                type: 'toggle',
                hook: 'nav-logout'
            }
        ]
    },
    initialize: function () {

        this.listenTo(App.router, 'page', this.handlePage);
        this.assetsUrl = App.assetsUrl;
    },
    render: function () {

        this.renderWithTemplate(this);
        this.pages = new ViewSwitcher(this.queryByHook('page-container'), {
            show: function (view) {

                $(view.el).foundation();
            }
        });
    },
    handlePage: function (pageView) {

        this.message = '';
        App.currentPage = pageView;
        Dom.removeClass(this.query('.top-bar'), 'expanded');
        this.pages.set(pageView);
        this.setActiveNavItem();
    },
    handleLinkClick: function (e) {


        var localPath = LocalLinks.pathname(e);
        if (localPath) {
            e.preventDefault();
            App.navigate(localPath);
            // Hacky way to get nav dropdowns to close.
            e.target.blur();
            setTimeout(document.body.click.bind(document.body), 0);
        }
    },
    setActiveNavItem: function () {

        var path = window.location.pathname;

        this.queryAll('[data-hook=navigation] a').forEach(function (aTag) {

            if (path.indexOf(aTag.pathname) === 0 && aTag.getAttribute('href') !== '#' && aTag.pathname !== '/') {
                //if (aTag.pathname === path) {
                Dom.addClass(aTag.parentNode, 'active');
            }
            else {
                Dom.removeClass(aTag.parentNode, 'active');
            }
        });
    }
});
