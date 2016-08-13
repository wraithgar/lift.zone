'use strict';

var Router = require('ampersand-router');
var App = require('ampersand-app');
var Moment = require('moment');

var BaseActivities = require('./models/base-activities');

var Pages = require('./pages');

var Wendler531Model = require('./models/wendler531');
var WorkoutModel = require('./models/workout');

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
        'workouts': 'workouts',
        'workouts/new': 'log',
        'me': 'me',
        'validate': 'validate',
        'workouts/:date': 'workout',
        'logout': 'logout',
        //Catchall
        '*catchall': 'notfound'
    },

    //Unauthenticated routes
    notfound: function () {

        this.trigger('page', new Pages['not-found']());
    },
    privacy: function () {

        this.trigger('page', new Pages.privacy());
    },
    home: function () {

        this.trigger('page', new Pages.home());
    },
    utils: function () {

        this.trigger('page', new Pages.utils());
    },
    parser: function () {

        this.trigger('page', new Pages.parser({
            collection: new BaseActivities()
        }));
    },
    fitocracy: function () {

        this.trigger('page', new Pages.fitocracy({
            collection: new BaseActivities()
        }));
    },
    about: function () {

        this.trigger('page', new Pages.about({ assetsUrl: App.assetsUrl }));
    },
    wendler531: function () {

        this.trigger('page', new Pages.wendler531({
            model: new Wendler531Model()
        }));
    },
    login: function () {

        this.trigger('page', new Pages.login());
    },
    logout: function () {

        App.setAccessToken(undefined);
        this.redirectTo('/');
    },
    signup: function () {

        this.trigger('page', new Pages.signup());
    },
    recover: function () {

        if (App.me.loggedIn) {
            return this.navigate('/me');
        }
        this.trigger('page', new Pages.recover());
    },
    //Authenticated routes
    validate: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new Pages.validate({ model: App.me }));
    },
    me: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new Pages.me({ model: App.me }));
    },
    log: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new Pages.log({ model: new WorkoutModel() }));
    },
    workout: function (date) {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        var workoutSummary;
        if (App.workoutSummaries.fetched) {

            workoutSummary = App.workoutSummaries.get(date);
            return this.trigger('page', new Pages.workout({ model: new WorkoutModel({ id: workoutSummary.id }) }));
        }
        this.listenToOnce(App.workoutSummaries, 'reset', function () {

            workoutSummary = App.workoutSummaries.get(date);
            this.trigger('page', new Pages.workout({ model: new WorkoutModel({ id: workoutSummary.id }) }));
        });
    },
    workouts: function () {

        this.trigger('page', new Pages.workouts());
    }
});
