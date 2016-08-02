'use strict';

const Router = require('ampersand-router');
const App = require('ampersand-app');
const Moment = require('moment');

const AboutPage = require('./pages/about');
const BaseActivities = require('./models/base-activity-collection');
const FitocracyPage = require('./pages/fitocracy');
const HomePage = require('./pages/home');
const LogPage = require('./pages/log');
const LoginPage = require('./pages/login');
const MePage = require('./pages/me');
const NotFoundPage = require('./pages/not-found');
const ParserPage = require('./pages/parser');
const PrivacyPage = require('./pages/privacy');
const RecoverPage = require('./pages/recover');
const SignupPage = require('./pages/signup');
const UtilsPage = require('./pages/utils');
const ValidatePage = require('./pages/validate');
const Wendler531Model = require('./models/wendler531');
const Wendler531Page = require('./pages/wendler531');
const WorkoutModel = require('./models/workout');
const WorkoutPage = require('./pages/workout');

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

        this.trigger('page', new AboutPage());
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
        return this.trigger('page', new MePage({
            model: App.me
        }));
    },
    log: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new LogPage({
            model: new WorkoutModel()
        }));
    },
    workout: function (date) {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new WorkoutPage({
            model: new WorkoutModel({ date: Moment(date, 'YYYY-MM-DD') })
        }));
    }
});
