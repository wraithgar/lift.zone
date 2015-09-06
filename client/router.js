'use strict';

var Router = require('ampersand-router');
var app = require('ampersand-app');
var xhr = require('xhr');
var querystring = require('querystring');
var moment = require('moment');

var AboutPage = require('./pages/about');
var Activities = require('./models/activities');
var BaseActivities = require('./models/base-activities');
var FitocracyPage = require('./pages/fitocracy');
var HomePage = require('./pages/home');
var LogPage = require('./pages/log');
var LoginPage = require('./pages/login');
var MePage = require('./pages/me');
var NotFoundPage = require('./pages/notFound');
var ParserPage = require('./pages/parser');
var PrivacyPage = require('./pages/privacy');
var RecoverPage = require('./pages/recover');
var SignupPage = require('./pages/signup');
var UtilsPage = require('./pages/utils');
var ValidatePage = require('./pages/validate');
var Wendler531Model = require('./models/wendler531');
var Wendler531Page = require('./pages/wendler531');
var WorkoutModel = require('./models/workout');
var WorkoutPage = require('./pages/workout');

module.exports = Router.extend({
    routes: {
        //Unauthenticated
        '': 'home',
        'log': 'log',
        'utils': 'utils',
        'utils/parser': 'parser',
        'utils/fitocracy': 'fitocracy',
        'utils/531': 'calc531',
        'about': 'about',
        'login': 'login',
        'logout': 'logout',
        'signup': 'signup',
        'privacy': 'privacy',
        'recover': 'recover',
        //Authenticated
        'me': 'me',
        'validate': 'validate',
        'workouts/:date': 'workout',
        //Catchall
        '*catchall': 'notfound'
    },

    //Unauthenticated routes
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
        this.trigger('page', new ParserPage({
            collection: new BaseActivities()
        }));
    },
    fitocracy: function () {
        this.trigger('page', new FitocracyPage({
            collection: new BaseActivities()
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
    login: function () {
        this.trigger('page', new LoginPage());
    },
    logout: function () {
        app.setAccessToken(undefined);
        this.redirectTo('/');
    },
    signup: function () {
        this.trigger('page', new SignupPage());
    },
    recover: function () {
        if (app.me.loggedIn) {
            return this.me();
        }
        this.trigger('page', new RecoverPage());
    },
    //Authenticated routes
    validate: function () {
        if (!app.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new ValidatePage({ model: app.me }));
    },
    me: function () {
        if (!app.me.loggedIn) {
            return this.navigate('/login');
        }
        return this.trigger('page', new MePage({
            model: app.me
        }));
    },
    workout: function (date) {
        if (!app.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new WorkoutPage({
            model: new WorkoutModel({date: moment(date, 'YYYY-MM-DD')})
        }));
    }
});
