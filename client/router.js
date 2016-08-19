'use strict';

var Router = require('ampersand-router');
var App = require('ampersand-app');


var Pages = require('./pages');

var BaseActivities = require('./models/base-activities');
var UserActivities = require('./models/user-activities');
var Wendler531Model = require('./models/wendler531');
var WorkoutModel = require('./models/workout');
var AdminUsers = require('./models/admin-users');

module.exports = Router.extend({
    routes: {
        //Unauthenticated
        '': 'home',
        'utils': 'utils',
        'utils/parser': 'parser',
        'utils/fitocracy': 'fitocracy',
        'utils/531': 'wendler531',
        'about': 'about',
        'news': 'news',
        'login': 'login',
        'signup': 'signup',
        'privacy': 'privacy',
        'recover': 'recover',
        'public/workouts/:id': 'publicWorkout',
        //Authenticated
        'workouts': 'workouts',
        'workouts/new': 'editWorkout',
        'workouts/:date': 'showWorkout',
        'workouts/:date/edit': 'editWorkout',
        'activities': 'activities',
        'me': 'me',
        'me/invites': 'invites',
        'validate': 'validate',
        'logout': 'logout',
        //Admin
        'admin': 'admin',
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
    news: function () {

        this.trigger('page', new Pages.news());
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
    publicWorkout: function (id) {

        this.trigger('page', new Pages.publicWorkout({ model: new WorkoutModel({ id: id }) }));
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
    invites: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new Pages.invites({ model: App.me }));
    },
    newWorkout: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new Pages.editWorkout({ model: new WorkoutModel() }));
    },
    editWorkout: function (date) {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        if (App.workoutSummaries.fetched) {

            return this.trigger('page', new Pages.editWorkout({ date: date, model: new WorkoutModel() }));
        }
        this.listenToOnce(App.workoutSummaries, 'reset', function () {

            return this.trigger('page', new Pages.editWorkout({ date: date, model: new WorkoutModel() }));
        });
    },
    showWorkout: function (date) {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        if (App.workoutSummaries.fetched) {

            return this.trigger('page', new Pages.showWorkout({ date: date, model: new WorkoutModel() }));
        }
        this.listenToOnce(App.workoutSummaries, 'reset', function () {

            return this.trigger('page', new Pages.showWorkout({ date: date, model: new WorkoutModel() }));
        });
    },
    workouts: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new Pages.workouts());
    },
    activities: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        this.trigger('page', new Pages.activities({ collection: new UserActivities() }));
    },
    admin: function () {

        if (!App.me.loggedIn) {
            return this.navigate('/login');
        }
        if (!App.me.isAdmin) {
            return this.trigger('page', new Pages['not-found']());
        }
        this.trigger('page', new Pages.admin({ collection: new AdminUsers() }));
    }
});
