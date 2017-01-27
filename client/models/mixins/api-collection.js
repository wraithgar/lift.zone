
'use strict';

//Base mixin for collections to interact w/ api
var App = require('ampersand-app');
var Sync = require('ampersand-sync');

module.exports = {
    links: {},
    next: function () {

        if (this.links && this.links.next) {
            this.fetch({ url: this.links.next, reset: true });
        }
    },
    hasNext: function () {

        return this.links && this.links.next;
    },
    prev: function () {

        if (this.links && this.links.prev) {
            this.fetch({ url: this.links.pref, reset: true });
        }
    },
    hasPrev: function () {

        return this.links && this.links.prev;
    },
    ajaxConfig: function () {

        var headers = {};
        if (App.accessToken) {
            headers.Authorization = 'Bearer ' + App.accessToken;
        }
        return {
            headers: headers
        };
    },
    sync: function (event, collection, options) {

        var self = this;
        var error = options.error;
        var success = options.success;

        self.links = {};

        options.error = function (resp) {

            //4xx errors that aren't 404
            //if (resp.statusCode > 400 && resp.statusCode !== 404 && resp.statusCode !== 409 && resp.statusCode < 500) {
            if (resp.statusCode === 401 || resp.statusCode === 403) {
                App.setAccessToken(undefined);
            }
            if (error) {
                error(collection, resp, options);
            }
        };
        options.success = function (body, ignored, resp) {

            var link = resp.headers.link;
            if (link) {
                link.replace(/<([^>]*)>;\s*rel=([\w]*)/g, function (m, uri, type) {

                    self.links[type] = uri;
                });
            }
            if (success) {
                success(body, ignored, resp);
            }
        };
        return Sync.apply(this, arguments);
    }
};
