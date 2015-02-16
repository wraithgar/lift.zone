var Router = require('ampersand-router');
var app = require('ampersand-app');
var xhr = require('xhr');
var querystring = require('querystring');

var AboutPage = require('./pages/about');
var FitocracyPage = require('./pages/fitocracy');
var MePage = require('./pages/me');
var ParserPage = require('./pages/parser');
var LogPage = require('./pages/log');
var UtilsPage = require('./pages/utils');
var HomePage = require('./pages/home');
var NotFoundPage = require('./pages/notFound');
var Wendler531Model = require('./models/wendler531');
var Wendler531Page = require('./pages/wendler531');
var Activities = require('./models/activities');
var PrivacyPage = require('./pages/privacy');
var WorkoutModel = require('./models/workout');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'me': 'me',
        'log': 'log',
        'utils': 'utils',
        'utils/parser': 'parser',
        'utils/fitocracy': 'fitocracy',
        'utils/531': 'calc531',
        'about': 'about',
        'auth/callback': 'auth',
        'login': 'login',
        'logout': 'logout',
        'privacy': 'privacy',
        '*catchall': 'notfound'
    },

    notfound: function () {
        this.trigger('page', new NotFoundPage());
    },
    privacy: function () {
        this.trigger('page', new PrivacyPage());
    },
    home: function () {
        this.trigger('page', new HomePage());
    },
    log: function () {
        this.trigger('page', new LogPage({
            model: new WorkoutModel()
        }));
    },
    utils: function () {
        this.trigger('page', new UtilsPage());
    },
    parser: function () {
        app.activities.reset();
        this.trigger('page', new ParserPage({
            collection: new Activities()
        }));
    },
    me: function () {
        this.trigger('page', new MePage({
            model: app.models.me
        }));
    },
    fitocracy: function () {
        app.activities.reset();
        this.trigger('page', new FitocracyPage({
            collection: new Activities()
        }));
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
                app.setAccessToken(body.authorization);
            }
            return self.redirectTo('/');
        });
    },
    login: function () {
        window.location.replace(app.accountsUrl + '/login?redirect=lift.zone');
    },
    logout: function () {
        app.setAccessToken(undefined);
        this.redirectTo('/');
    }
});
