/*global app*/
var Router = require('ampersand-router');
var AboutPage = require('pages/about');
var FitocracyPage = require('pages/fitocracy');
var HomePage = require('pages/home');
var Wendler531Page = require('pages/wendler531');
var Wendler531Model = require('models/wendler531');
var querystring = require('querystring');
var xhr = require('xhr');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'fitocracy': 'fitocracy',
        '531': 'calc531',
        'about': 'about',
        'auth/callback': 'auth',
    },
    home: function () {
        app.activities.reset();
        this.trigger('page', new HomePage());
    },
    fitocracy: function () {
        app.activities.reset();
        this.trigger('page', new FitocracyPage());
    },
    about: function () {
        this.trigger('page', new AboutPage());
    },
    calc531: function () {
        this.trigger('page', new Wendler531Page({
            model: new Wendler531Model()
        }));
    },
    auth: function () {
        var self = this;
        var token = querystring.parse(window.location.search.slice(1)).token;
        if (!token) {
            return this.redirectTo('/');
        }

        xhr({
            url: app.apiUrl + '/validate?token=' + encodeURIComponent(token),
            json: true,
        }, function (err, resp, body) {
            if (!err && resp.statusCode === 200) {
                app.accessToken = body.authorization;
                app.me.fetch();
            }
            return self.redirectTo('/');
        });
    }
});
