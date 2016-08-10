'use strict';

var Router = require('ampersand-router');
var App = require('ampersand-app');
var Moment = require('moment');

var AboutPage = require('./pages/about');
var BaseActivities = require('./models/base-activities');
var FitocracyPage = require('./pages/fitocracy');
var HomePage = require('./pages/home');
var LogPage = require('./pages/log');
var LoginPage = require('./pages/login');
var MePage = require('./pages/me');
var NotFoundPage = require('./pages/not-found');
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
        'utils': 'utils',
        'utils/parser': 'parser',
        'utils/fitocracy': 'fitocracy',
        'utils/531': 'wendler531',
        'about': 'about',
        'login': 'login',
        'signup': 'signup',
        'privacy': 'privacy',
        'recover': 'recover',
        //Authenticated
        'log': 'log',
        'me': 'me',
        'validate': 'validate',
        'workouts/:date': 'workout',
        'logout': 'logout',
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

        this.trigger('page', new AboutPage({ assetsUrl: App.assetsUrl }));
    },
    wendler531: function () {

        this.trigger('page', new Wendler531Page({
            model: new Wendler531Model()
        }));
    },
    login: function () {

        this.trigger('page', new LoginPage());
    },
    logout: function () {

        App.setAccessToken(undefined);
        this.redirectTo('/');
    },
    signup: function () {

        this.trigger('page', new SignupPage());
    },
    recover: function () {

        if (App.me.loggedIn) {
            return this.navigate('/me');
        }
        this.trigger('page', new RecoverPage());
    },
    //Authenticated routes
    validate: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new ValidatePage({ model: App.me }));
    },
    me: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new MePage({ model: App.me }));
    },
    log: function () {

        var self = this;
        if (!App.me.loggedIn) {
            return self.navigate('/login');
        }
        if (App.me.id) {
            return self.trigger('page', new LogPage({ model: new WorkoutModel() }));
        }
        App.me.once('change:id', function () {

            self.trigger('page', new LogPage({ model: new WorkoutModel() }));
        });
    },
    workout: function (date) {

        var self = this;
        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        if (App.me.id) {
            return self.trigger('page', new WorkoutPage({ model: new WorkoutModel({ date: Moment(date, 'YYYY-MM-DD') }) }));
        }
        App.me.once('change:id', function () {

            self.trigger('page', new WorkoutPage({ model: new WorkoutModel({ date: Moment(date, 'YYYY-MM-DD') }) }));
        });
    }
});
