'use strict';

var Router = require('ampersand-router');
var app = require('ampersand-app');
var xhr = require('xhr');
var querystring = require('querystring');
var moment = require('moment');

var AboutPage = require('./pages/about');
var Activities = require('./models/activities');
var FitocracyPage = require('./pages/fitocracy');
var HomePage = require('./pages/home');
var LogPage = require('./pages/log');
var LoginPage = require('./pages/login');
var MePage = require('./pages/me');
var NotFoundPage = require('./pages/notFound');
var ParserPage = require('./pages/parser');
var PrivacyPage = require('./pages/privacy');
var SignupPage = require('./pages/signup');
var UtilsPage = require('./pages/utils');
var Wendler531Model = require('./models/wendler531');
var Wendler531Page = require('./pages/wendler531');
var WorkoutModel = require('./models/workout');
var WorkoutPage = require('./pages/workout');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'me': 'me',
        'log': 'log',
        'workouts/:date': 'workout',
        'utils': 'utils',
        'utils/parser': 'parser',
        'utils/fitocracy': 'fitocracy',
        'utils/531': 'calc531',
        'about': 'about',
        'auth/callback': 'auth',
        'login': 'login',
        'logout': 'logout',
        'signup': 'signup',
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
    workout: function (date) {
        this.trigger('page', new WorkoutPage({
            model: new WorkoutModel({date: moment(date, 'YYYY-MM-DD')})
        }));
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
            model: app.me
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
            url: app.apiUrl + '/login?token=' + encodeURIComponent(token),
            json: true
        }, function (err, resp, body) {
            if (!err && resp.statusCode === 200) {
                app.setAccessToken(body.authorization);
            }
            return self.redirectTo('/');
        });
    },
    login: function () {
        this.trigger('page', new LoginPage());
    },
    logout: function () {
        app.setAccessToken(undefined);
        this.redirectTo('/');
    },
    signup: function () {
        this.trigger('page', new SignupPage());
    }
});
